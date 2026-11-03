import { defineEval } from "@grok/agent-sdk/evals"

export default defineEval({
  tags: ["smoke"],
  description: "The agent loads the schema and stores a demo personal name.",
  async test(t) {
    await t.send(
      "Start a demo intake for Maya Chen. Save firstName Maya and lastName Chen.",
    )
    t.succeeded()
    t.calledTool("get_intake_schema")
    t.calledTool("save_intake_draft")
  },
})
