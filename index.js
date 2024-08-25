import express from "express";
import cors from "cors";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

const app = express();

// CORS
app.use(cors());

const PORT = process.env.PORT || 5000;

// CHECKS IF PROCESS.ENV WORKS
// app.get("/api/secret-data", (req, res) => {
//   const secretValue = process.env.SECRET_VALUE;
//   res.json({ secret: secretValue });
// });

// TODO: Add SDK client from Appwrite to get admin data or create user

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
    next(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
