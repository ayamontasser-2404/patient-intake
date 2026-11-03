import { defineTool } from "@grok/agent-sdk/tools"
import * as z from "zod/v4"
import {
  draftKey,
  draftSummary,
  emptyDraft,
  mergeDraft,
  type IntakeDraft,
} from "../lib/intake.ts"

export default defineTool({
  description:
    "Merge known intake answers into the demo draft. Unknown field ids are ignored. Repeat the same answers safely; the write is idempotent.",
  inputSchema: z.object({
    visitId: z.string().default("demo"),
    answers: z.record(z.string(), z.string()),
  }),
  effect: "idempotent",
  async execute({ visitId, answers }, ctx) {
    const key = draftKey(ctx.session.id, visitId)
    const stored = (await ctx.host.kv.get(key)) as IntakeDraft | undefined
    const draft = mergeDraft(stored ?? emptyDraft(visitId), answers)
    await ctx.host.kv.put(key, draft)
    return draftSummary(draft)
  },
})
