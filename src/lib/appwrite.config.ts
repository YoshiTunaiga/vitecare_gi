import * as sdk from "node-appwrite";

export const {
  VITE_PROJECT_ID,
  VITE_API_KEY,
  VITE_DATABASE_ID,
  VITE_PATIENT_COLLECTION_ID,
  VITE_DOCTOR_COLLECTION_ID,
  VITE_APPOINTMENT_COLLECTION_ID,
  VITE_PUBLIC_BUCKET_ID: BUCKET_ID,
  VITE_PUBLIC_ENDPOINT: ENDPOINT,
} = import.meta.env;

const client = new sdk.Client();

client
  .setEndpoint(ENDPOINT!)
  .setProject(VITE_PROJECT_ID!)
  .setKey(VITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const users = new sdk.Users(client);
export const messaging = new sdk.Messaging(client);
export const storage = new sdk.Storage(client);
