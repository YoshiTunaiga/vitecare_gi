// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/react/

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://c8db9dcca8e11c0917a661648198a1ec@o4507772423045120.ingest.us.sentry.io/4507772428550144",

  // Adjust this value in production, or use tracesSampler for greater control
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,

  // Uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: process.env.NODE_ENV === "development",
});
