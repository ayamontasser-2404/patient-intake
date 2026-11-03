import { createApp } from "./app.js";

const DEFAULT_PORT = 4000;
const DEFAULT_WEB_ORIGIN = "http://localhost:5173";

function readPort(value: string | undefined): number {
  if (value === undefined || value.trim() === "") {
    return DEFAULT_PORT;
  }

  const port = Number(value);
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
  }

  return port;
}

const port = readPort(process.env.PORT);
const webOrigin = process.env.WEB_ORIGIN?.trim() || DEFAULT_WEB_ORIGIN;
const app = createApp(webOrigin);
const server = app.listen(port, "127.0.0.1", () => {
  console.log(`API listening on http://127.0.0.1:${port}`);
});

server.on("error", (error: unknown) => {
  const code =
    typeof error === "object" && error !== null && "code" in error ? String(error.code) : "unknown";
  console.error(`API failed to start (${code}).`);
  process.exit(1);
});
