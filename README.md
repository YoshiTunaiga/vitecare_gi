<div>
<img width="1200" alt="readmeimg" src="./public/readmeimg.svg">

 <h3 align="center">A HealthCare Management System</h3>

   <div align="center">
      This project was build using the detailed tutorial from <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b></a> YouTube.
    </div>
</div>
</br>

# <a name="table">Table of Contents</a>

1. 📜 [Overview](#overview)
2. ▶️ [Get Started](#getstarted)
3. 🧰 [Tech Stack](#tech-stack)
4. 🔋 [Features](#features)
5. 🚀 [Next Steps](#next-steps)
6. ➕ [More](#more)
7. 🏷️ [Footer](#footer)

# 📜 <a name="overview">Overview</a>

This repository is a Vite React App using TypeScript mirroring a Next.js application from the in-depth tutorial.

# ▶️ <a name="getstarted">Get Started</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Set Up Environment Variables**

Create a new file named `.env.local` in the root of your project and add the following content:

```env
#APPWRITE
PROJECT_ID=
API_KEY=
DATABASE_ID=
PATIENT_COLLECTION_ID=
DOCTOR_COLLECTION_ID=
APPOINTMENT_COLLECTION_ID=
PUBLIC_BUCKET_ID=
PUBLIC_ENDPOINT=https://cloud.appwrite.io/v1

PUBLIC_ADMIN_PASSKEY=111111

SENTRY_AUTH_TOKEN=
```

Replace the placeholder values with your actual Appwrite credentials. You can obtain these credentials by signing up on the [Appwrite website](https://appwrite.io/).

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

# 🧰 <a name="tech-stack">Tech Stack</a>

- React.js
- Vite
- TypeScript
- TailwindCSS
- Shadcn
- AppWrite
- Zod
- Sentry
- Twilio

# 🔋 <a name="features">Features</a>

- ✅ **Register as a Patient:** Users can sign up and create a personal profile as a patient.
- ✅ **Book a New Appointment with Doctor:** Patients can schedule appointments with doctors at their convenience and can book multiple appointments.
- ✅ **Manage Appointments on Admin Side:** Administrators can efficiently view and handle all scheduled appointments.
- ✅ **Confirm/Schedule Appointment from Admin Side:** Admins can confirm and set appointment times to ensure they are properly scheduled.
- ✅ **Cancel Appointment from Admin Side:** Administrators have the ability to cancel any appointment as needed.
- ✅ **Complete Responsiveness:** The application works seamlessly on all device types and screen sizes.

# 🚀 <a name="next-steps">Next Steps</a>

- [ ] **Send SMS on Appointment Confirmation:** Patients receive SMS notifications to confirm their appointment details.
- [ ] **File Upload Using Appwrite Storage:** Users can upload and store files securely within the app using Appwrite storage services.
- [ ] **Manage and Track Application Performance Using Sentry:** The application uses Sentry to monitor and track its performance and detect any errors.
 
# ➕ <a name="more">More</a>

## React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

# 🏷️ <a name="footer">Footer</a>

Thanks to <a href="https://www.youtube.com/@javascriptmastery/videos" target="_blank"><b>JavaScript Mastery</b> for the in-depth tutorial and the best practices explanation.
