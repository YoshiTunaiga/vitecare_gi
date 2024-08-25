"use server";

import { ID, Query } from "node-appwrite";
// import { InputFile } from "node-appwrite/file";
// InputFile uses fs that throws out build error
// unless vite.config.ts is configured to resolve fs

import {
  // BUCKET_ID,
  DATABASE_ID,
  // ENDPOINT,
  PATIENT_COLLECTION_ID,
  // PROJECT_ID,
  databases,
  // storage,
  users,
} from "../appwrite.config";
import { parseStringify } from "../utils";

/**
 * TODO:
 * patient.actions.ts:22
 * POST https://cloud.appwrite.io/v1/users 409 (Conflict)
 * createUser	@	patient.actions.ts:22
 * onSubmit	@	PatientForm.tsx:45
 * Show 20 more frames
 * @param user
 * @returns Object
 */
// CREATE APPWRITE USER
export const createUser = async (user: CreateUserParams) => {
  try {
    const existingUser = await users.list([Query.equal("email", [user.email])]);
    if (existingUser.total) {
      return { newUser: existingUser.users[0], isMember: true };
    } else {
      // Create new user -> https://appwrite.io/docs/references/1.5.x/server-nodejs/users#create
      const newuser = await users.create(
        ID.unique(),
        user.email,
        user.phone,
        undefined,
        user.name
      );

      return { newUser: parseStringify(newuser), isMember: false };
    }
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return { newUser: existingUser.users[0], isMember: true };
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

// GET USER
export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the user details:",
      error
    );
    return null;
  }
};

// REGISTER PATIENT
export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    // let file;
    // if (identificationDocument) {
    //   const inputFile =
    //     identificationDocument &&
    //     InputFile.fromBuffer(
    //       identificationDocument?.get("blobFile") as Blob, // special version of file that can be read
    //       identificationDocument?.get("fileName") as string
    //     );

    //   file = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile);
    // }

    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      ID.unique(),
      {
        identificationDocumentId: "",
        identificationDocumentUrl: "",
        ...patient,
      }
      // {
      //   identificationDocumentId: file?.$id ? file.$id : null,
      //   identificationDocumentUrl: file?.$id
      //     ? `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${file.$id}/view??project=${PROJECT_ID}`
      //     : null,
      //   ...patient,
      // }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};

// GET PATIENT
export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      DATABASE_ID!,
      PATIENT_COLLECTION_ID!,
      [Query.equal("userId", [userId])]
    );

    return parseStringify(patients.documents[0]);
  } catch (error) {
    console.error(
      "An error occurred while retrieving the patient details:",
      error
    );
    return null;
  }
};
