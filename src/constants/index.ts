import checkIcon from "../assets/icons/check.svg";
import pendingIcon from "../assets/icons/pending.svg";
import cancelledIcon from "../assets/icons/cancelled.svg";
import drgreen from "../assets/images/dr-green.png";
import drleila from "../assets/images/dr-cameron.png";
import drlivingston from "../assets/images/dr-livingston.png";
import drpeter from "../assets/images/dr-peter.png";
import drpowell from "../assets/images/dr-powell.png";
import drramirez from "../assets/images/dr-remirez.png";
import drlee from "../assets/images/dr-lee.png";
import drcruz from "../assets/images/dr-cruz.png";
import drsharma from "../assets/images/dr-sharma.png";

export const GenderOptions = ["male", "female", "other"];

export const PatientFormDefaultValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: new Date(Date.now()),
  gender: "male" as Gender,
  address: "",
  occupation: "",
  emergencyContactName: "",
  emergencyContactNumber: "",
  primaryPhysician: "",
  insuranceProvider: "",
  insurancePolicyNumber: "",
  allergies: "",
  currentMedication: "",
  familyMedicalHistory: "",
  pastMedicalHistory: "",
  identificationType: "Birth Certificate",
  identificationNumber: "",
  identificationDocument: [],
  treatmentConsent: false,
  disclosureConsent: false,
  privacyConsent: false,
};

export const IdentificationTypes = [
  "Birth Certificate",
  "Driver's License",
  "Medical Insurance Card/Policy",
  "Military ID Card",
  "National Identity Card",
  "Passport",
  "Resident Alien Card (Green Card)",
  "Social Security Card",
  "State ID Card",
  "Student ID Card",
  "Voter ID Card",
];

export const Doctors = [
  {
    image: drgreen,
    name: "John Green",
  },
  {
    image: drleila,
    name: "Leila Cameron",
  },
  {
    image: drlivingston,
    name: "David Livingston",
  },
  {
    image: drpeter,
    name: "Evan Peter",
  },
  {
    image: drpowell,
    name: "Jane Powell",
  },
  {
    image: drramirez,
    name: "Alex Ramirez",
  },
  {
    image: drlee,
    name: "Jasmine Lee",
  },
  {
    image: drcruz,
    name: "Alyana Cruz",
  },
  {
    image: drsharma,
    name: "Hardik Sharma",
  },
];

export const StatusIcon = {
  scheduled: checkIcon,
  pending: pendingIcon,
  cancelled: cancelledIcon,
};
