import { defineTool } from "@grok/agent-sdk/tools"
import * as z from "zod/v4"
import {
  draftKey,
  draftSummary,
  emptyDraft,
  type IntakeDraft,
} from "../lib/intake.ts"

export default defineTool({
  description:
    "Read the current demo intake draft for this session. Use visitId 'demo' unless the user named another visit.",
  inputSchema: z.object({
    visitId: z.string().default("demo"),
  }),
  effect: "read",
  async execute({ visitId }, ctx) {
    const key = draftKey(ctx.session.id, visitId)
    const stored = (await ctx.host.kv.get(key)) as IntakeDraft | undefined
    const draft = stored ?? emptyDraft(visitId)
    return draftSummary(draft)
  },
})
