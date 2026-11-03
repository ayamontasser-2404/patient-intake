import { healthResponseSchema, type HealthResponse } from "@spi/contracts";
import cors from "cors";
import express, { type Express } from "express";

const JSON_BODY_LIMIT = "100kb";

export function createApp(webOrigin: string): Express {
  const app = express();

  app.disable("x-powered-by");
  app.use(express.json({ limit: JSON_BODY_LIMIT }));
  app.use(
    cors({
      origin: webOrigin,
    }),
  );

  app.get("/api/health", (_request, response) => {
    const body: HealthResponse = { data: { status: "ok" } };
    response.status(200).json(healthResponseSchema.parse(body));
  });

  return app;
}
