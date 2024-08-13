import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import Register from "./pages/patients/[userId]/register/page";
import NewAppointment from "./pages/patients/[userId]/new-appointment/page";

// Styles
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils";
import "./App.css";
import RequestSuccess from "./pages/patients/[userId]/new-appointment/success/page";
import AdminPage from "./pages/admin/page";

function App() {
  return (
    <div className={cn("min-h-screen bg-dark-300 font-sans antialiased")}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patients/:userId/register" element={<Register />} />
          <Route
            path="/patients/:userId/new-appointment"
            element={<NewAppointment />}
          />
          <Route
            path="/patients/:userId/new-appointment/success"
            element={<RequestSuccess />}
          />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
