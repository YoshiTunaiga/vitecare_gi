import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/patient/[userId]/register/page";
import NewAppointment from "./pages/patient/[userId]/new-appointment/page";
import AdminPage from "./pages/admin/page";
import RequestSuccess from "./pages/patient/[userId]/new-appointment/success/page";
import MyAppointments from "./pages/patient/[userId]/my-appointments/page";
import NotFound from "./pages/NotFound";

// Styles
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils";
import "./App.css";

function App() {
  return (
    <div className={cn("min-h-screen font-sans antialiased")}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient/:userId" element={<Register />} />
          <Route
            path="/patient/:userId/new-appointment"
            element={<NewAppointment />}
          />
          <Route
            path="/patient/:userId/my-appointments"
            element={<MyAppointments />}
          />
          <Route
            path="/patient/:userId/new-appointment/success"
            element={<RequestSuccess />}
          />
          {/* <Route path="/admin" element={<AdminPage />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
