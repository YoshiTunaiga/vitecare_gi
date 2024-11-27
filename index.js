import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as sdk from "node-appwrite";
import { ID, Query } from "node-appwrite";
dotenv.config({ path: "./.env.local" });

const app = express();

// CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
app.use(express.json());
const client = new sdk.Client();
const {
  PROJECT_ID,
  API_KEY,
  DATABASE_ID,
  PATIENT_COLLECTION_ID,
  DOCTOR_COLLECTION_ID,
  APPOINTMENT_COLLECTION_ID,
  PUBLIC_BUCKET_ID: BUCKET_ID,
  PUBLIC_ENDPOINT: ENDPOINT, // https://appwrite.io/docs/references/cloud/server-nodejs/users
  PUBLIC_ADMIN_PASSKEY,
} = process.env;

client.setEndpoint(ENDPOINT).setProject(PROJECT_ID).setKey(API_KEY);
// CHECKS IF PROCESS.ENV WORKS
// app.get("/api/secret-data", (req, res) => {
//   const secretValue = process.env.SECRET_VALUE;
//   res.json({ secret: secretValue });
// });

// TODO: Add SDK client from Appwrite to get admin data or create user

// VERIFY ADMIN ACCESS KEY
app.get("/api/:key", (req, res) => {
  try {
    const passkey = req.params.key;

    const decryptKey = atob(passkey);
    if (decryptKey === process.env.PUBLIC_ADMIN_PASSKEY) {
      // localStorage.setItem("accessKey", encryptedKey);
      console.log(`========= APPROVED USER!  =========`);
      res.send({ user: "gi" });
    }
    res.send({ message: "Accessing register" });
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while registering the user" });
  }
});

// GET SINGLE USER
app.get("/patient/:userId", async (req, res) => {
  try {
    const users = new sdk.Users(client);
    const userId = req.params.userId;
    const user = await users.get(userId);
    res.send(JSON.parse(JSON.stringify(user)));
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while fetching the user" });
  }
});

// POST CURRENT USER BASIC DATA
app.post("/patient/register", async (req, res) => {
  try {
    const databases = new sdk.Databases(client);
    const registerPatient = req.body;
    const newPatient = await databases.createDocument(
      DATABASE_ID,
      PATIENT_COLLECTION_ID,
      ID.unique(),
      {
        identificationDocumentId: "",
        identificationDocumentUrl: "",
        ...registerPatient,
      }
    );

    res.send(JSON.parse(JSON.stringify(newPatient)));
  } catch (error) {
    console.error(error);
  }
});

// POST CREATE USER DOCUMENT
// Expected structure of newUser object:
// {
//   ID.unique(),
//   email:string,
//   phone:string,
//   undefined, "required for password"
//   name: string.
// }
app.post("/create-user", async (req, res) => {
  try {
    const users = new sdk.Users(client);
    const { name, email, phone } = req.body;

    const existingUser = await users.list([Query.equal("email", [email])]);
    if (existingUser.total) {
      res.send({
        message: "User already exists",
        newUser: existingUser.users[0],
        isMember: true,
      });
    } else {
      const result = await users.create(
        ID.unique(),
        email,
        phone,
        undefined,
        name
      );
      // Respond with the created user (excluding sensitive information)
      res.send({
        message: "User registered successfully",
        newUser: result,
        isMember: false,
      });
    }
  } catch (error) {
    // Handle potential errors
    console.error("User creation error:", error);

    // Check for specific error types
    if (error.name === "ValidationError") {
      // Mongoose validation error
      return res.status(400).json({
        message: "Invalid user data",
        errors: Object.values(error.errors).map((err) => err.message),
      });
    }

    if (error.code === 11000) {
      // Duplicate key error (e.g., duplicate email)
      return res.status(409).json({
        message: "User already exists",
        field: Object.keys(error.keyPattern)[0],
      });
    }
    // Generic server error
    res.status(500).json({
      message: "Server error during user creation",
      error: error.message,
    });
  }
});

// ADMIN: GET USER APPOINTMENTS LIST
app.get("/admin", async (req, res) => {
  try {
    const userId = req.params.userId;
    const databases = new sdk.Databases(client);
    const appointments = userId
      ? await databases.listDocuments(DATABASE_ID, APPOINTMENT_COLLECTION_ID, [
          sdk.Query.equal("userId", [userId]),
        ])
      : await databases.listDocuments(DATABASE_ID, APPOINTMENT_COLLECTION_ID, [
          sdk.Query.orderDesc("$createdAt"),
        ]);

    const scheduledAppointments = appointments.documents.filter(
      (appointment) => appointment.status === "scheduled"
    );

    const pendingAppointments = appointments.documents.filter(
      (appointment) => appointment.status === "pending"
    );

    const cancelledAppointments = appointments.documents.filter(
      (appointment) => appointment.status === "cancelled"
    );

    let data = {
      totalCount: appointments.total,
      scheduledCount: scheduledAppointments.length,
      pendingCount: pendingAppointments.length,
      cancelledCount: cancelledAppointments.length,
      documents: appointments.documents,
    };

    const initialCounts = {
      scheduledCount: 0,
      pendingCount: 0,
      cancelledCount: 0,
    };

    const counts = appointments.documents.reduce((acc, appointment) => {
      switch (appointment.status) {
        case "scheduled":
          acc.scheduledCount++;
          break;
        case "pending":
          acc.pendingCount++;
          break;
        case "cancelled":
          acc.cancelledCount++;
          break;
      }
      return acc;
    }, initialCounts);

    data.totalCount = appointments.total;
    data = { ...data, ...counts };
    data.documents = appointments.documents;

    res.send({ apptsReturned: JSON.parse(JSON.stringify(data)) });
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
