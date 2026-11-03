import { defineTool } from "@grok/agent-sdk/tools"
import { INTAKE_FIELDS } from "../lib/intake.ts"

export default defineTool({
  description:
    "Return the patient intake fields, grouped by section. Call this before asking questions so you use the clinic's field ids.",
  effect: "read",
  async execute() {
    return {
      demo: true,
      notice: "All data is fictional. Do not collect a social security number.",
      fields: INTAKE_FIELDS,
    }
  },
})
