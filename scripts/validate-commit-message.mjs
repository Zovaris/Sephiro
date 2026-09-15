import { readFile } from "node:fs/promises";

const messagePath = process.argv[2];
const conventionalCommit = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([\w./-]+\))?!?: .+/;

if (!messagePath) {
  console.error("Usage: bun run validate:commit .git/COMMIT_EDITMSG");
  process.exit(1);
}

const message = (await readFile(messagePath, "utf8"))
  .split("\n")
  .find((line) => line.trim() && !line.startsWith("#"))
  ?.trim();

if (!message) {
  console.error("Commit message cannot be empty.");
  process.exit(1);
}

if (message.length > 200) {
  console.error(`Commit subject must be 200 characters or fewer (received ${message.length}).`);
  process.exit(1);
}

if (!conventionalCommit.test(message)) {
  console.error("Commit subject must follow Conventional Commits, for example: feat: add tabs component");
  process.exit(1);
}

console.log(`Valid commit message (${message.length}/200): ${message}`);
