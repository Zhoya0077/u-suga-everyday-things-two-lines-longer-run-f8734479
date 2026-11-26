// Everyday Things, Two Lines — entry program.
// Writes the two-line explanation to /output/entry.txt
// (or $MAKEFUN_OUTPUT_DIR when the harness sets it).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE_1 =
  "A queue is a human train that forgot its engine, so every carriage has to wait for the one in front to shuffle forward.";
const LINE_2 =
  "It maps the waiting in order and how one person's move lets the next one go, but it leaves out that real carriages never get bored, tired, or cut in line.";

const entry = `${LINE_1}\n${LINE_2}\n`;

// Self-checking gate: the gate scorer requires UTF-8 text of 1-400
// characters, and the brief requires exactly two lines, each one sentence.
const lines = entry.trimEnd().split("\n");
if (lines.length !== 2) {
  throw new Error(`entry must be exactly 2 lines, got ${lines.length}`);
}
if (entry.length < 1 || entry.length > 400) {
  throw new Error(`entry must be 1-400 characters, got ${entry.length}`);
}
for (const [i, line] of lines.entries()) {
  if (!line.endsWith(".")) {
    throw new Error(`line ${i + 1} must end with a period: ${line}`);
  }
  if ((line.match(/\./g) || []).length !== 1) {
    throw new Error(`line ${i + 1} must be a single sentence: ${line}`);
  }
  if (line.trim().length === 0) {
    throw new Error(`line ${i + 1} must not be blank`);
  }
}
console.log(`gate ok: ${lines.length} lines, ${entry.length} characters`);

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), entry, "utf8");
console.log(entry);
