import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

// import vitecarelogo from "./assets/vclogo.png";
// import onboardingimg from "./assets/images/onboardingimg.png";
// import PatientForm from "./components/forms/PatientForm";

import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils";
import "./App.css";
import Register from "./pages/patients/[userId]/register/page";

function App() {
  return (
    <div className={cn("min-h-screen bg-dark-300 font-sans antialiased")}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients/:userId/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
