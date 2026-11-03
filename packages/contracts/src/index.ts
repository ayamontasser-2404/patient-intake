import { z } from "zod";

export const healthResponseSchema = z.strictObject({
  data: z.strictObject({
    status: z.literal("ok"),
  }),
});

export type HealthResponse = z.infer<typeof healthResponseSchema>;
