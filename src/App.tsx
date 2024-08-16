// Pages
import Home from "./pages/Home";
import Register from "./pages/patients/[userId]/register/page";
import NewAppointment from "./pages/patients/[userId]/new-appointment/page";
import AdminPage from "./pages/admin/page";
import Page from "./pages/sentry-example-page/page";
import RequestSuccess from "./pages/patients/[userId]/new-appointment/success/page";

// Styles
import { ThemeProvider } from "./components/theme-provider";
import { cn } from "./lib/utils";
import "./App.css";

import {
  Routes,
  Route,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import React from "react";

Sentry.init({
  dsn: "https://c8db9dcca8e11c0917a661648198a1ec@o4507772423045120.ingest.us.sentry.io/4507772428550144",
  integrations: [
    Sentry.reactRouterV6BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

function App() {
  return (
    <div className={cn("min-h-screen font-sans antialiased")}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <SentryRoutes>
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
          <Route path="/sentry-example-page" element={<Page />} />
        </SentryRoutes>
      </ThemeProvider>
    </div>
  );
}

export default App;
