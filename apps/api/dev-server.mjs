import { spawn } from "node:child_process";
import { existsSync } from "node:fs";

const args = ["--import", "tsx", "--watch", "src/server.ts"];

if (existsSync("../../.env")) {
  args.unshift("--env-file=../../.env");
}

const child = spawn(process.execPath, args, { stdio: "inherit" });

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => {
    child.kill(signal);
  });
}

child.on("exit", (code, signal) => {
  if (signal) {
    process.exit(1);
  }

  process.exit(code ?? 0);
});
