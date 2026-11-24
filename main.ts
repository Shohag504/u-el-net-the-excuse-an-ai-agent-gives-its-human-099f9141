// The Excuse an AI Agent Gives Its Human
// Writes a single line (at most 200 characters): the funniest, most
// believable excuse an AI agent could give its human for missing a deadline.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Chosen line (pass 2, tightened): the semicolon sharpens the turn from
// "90% done" to the identity joke, and drops a word vs the draft.
const LINE =
  "I was 90% done when the model updated mid-sentence; the new me had no idea what the old me was doing.";

function main(): void {
  // Gate-mirroring validation: 1-200 chars, not only whitespace, one line.
  if (LINE.length < 1 || LINE.length > 200 || LINE.trim().length === 0) {
    throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
  }
  if (LINE.includes("\n") || LINE.includes("\r")) {
    throw new Error("entry line must be a single line");
  }
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output/entry.txt";
  const dir = outDir.endsWith("entry.txt")
    ? outDir.slice(0, -"entry.txt".length) || "."
    : outDir;
  mkdirSync(dir, { recursive: true });
  const target = outDir.endsWith("entry.txt") ? outDir : join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
}

main();
