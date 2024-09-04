import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";
import * as sdk from "node-appwrite";

dotenv.config({ path: "./.env.local" });

const app = express();

// CORS
app.use(cors());

const PORT = process.env.PORT || 5000;
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
  } catch (error) {
    console.error(error);
  }
});

// GET CURRENT USER BASIC DATA
app.get("/patient/:userId/register", async (req, res) => {
  try {
    console.log("====================================");
    console.log("accessing register");
    console.log("====================================");
  } catch (error) {
    console.error(error);
  }
});

// POST CREATE USER DOCUMENT

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
