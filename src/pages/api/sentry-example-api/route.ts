/* eslint-disable no-unreachable */
export const dynamic = "force-dynamic";

// A faulty API route to test Sentry's error monitoring
export function GET() {
  console.log("failing!!");
  throw new Error("Sentry Example API Route Error");

  return Response.json({ data: "Testing Sentry Error..." });
}
