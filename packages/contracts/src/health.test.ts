import { describe, expect, it } from "vitest";
import { healthResponseSchema } from "./index.js";

describe("healthResponseSchema", () => {
  it("accepts the documented health payload", () => {
    expect(healthResponseSchema.parse({ data: { status: "ok" } })).toEqual({
      data: { status: "ok" },
    });
  });

  it("rejects an unexpected status", () => {
    expect(healthResponseSchema.safeParse({ data: { status: "down" } }).success).toBe(false);
  });

  it("rejects a payload without the data envelope", () => {
    expect(healthResponseSchema.safeParse({ status: "ok" }).success).toBe(false);
  });
});
