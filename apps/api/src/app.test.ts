import { healthResponseSchema } from "@spi/contracts";
import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

const webOrigin = "http://localhost:5173";

describe("GET /api/health", () => {
  it("returns 200 and the documented health payload", async () => {
    const response = await request(createApp(webOrigin)).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/application\/json/);
    expect(response.body).toEqual({ data: { status: "ok" } });
    expect(healthResponseSchema.parse(response.body)).toEqual({
      data: { status: "ok" },
    });
  });

  it("allows the configured frontend origin", async () => {
    const response = await request(createApp(webOrigin)).get("/api/health").set("Origin", webOrigin);

    expect(response.headers["access-control-allow-origin"]).toBe(webOrigin);
  });

  it("does not grant a different origin", async () => {
    const response = await request(createApp(webOrigin)).get("/api/health").set("Origin", "http://evil.example");

    expect(response.headers["access-control-allow-origin"]).toBe(webOrigin);
  });
});
