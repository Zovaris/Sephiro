#!/usr/bin/env bun
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import * as readline from "node:readline";
import { $ } from "bun";

const root = resolve(import.meta.dir, "..");
const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const noPush = args.includes("--no-push");
const yes = args.includes("--yes") || args.includes("-y");
const bumpArg = args.find((a) => !a.startsWith("--"));

const VERSION_FILES = [
  "package.json",
  "packages/ui/package.json",
  "apps/playground/package.json",
];

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function nextVersion(current, bump) {
  if (/^\d+\.\d+\.\d+$/.test(bump)) return bump;
  const [major, minor, patch] = current.split(".").map(Number);
  if (bump === "major") return `${major + 1}.0.0`;
  if (bump === "minor") return `${major}.${minor + 1}.0`;
  if (bump === "patch") return `${major}.${minor}.${patch + 1}`;
  fail(`unknown bump "${bump}" (use patch|minor|major|x.y.z)`);
}

function ask(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  return new Promise((resolvePromise) => {
    rl.question(question, (answer) => {
      rl.close();
      resolvePromise(answer.trim().toLowerCase());
    });
  });
}

if (!bumpArg) {
  fail(
    "missing bump argument.\nUsage: bun run release <patch|minor|major|x.y.z> [--dry-run] [--no-push] [--yes]",
  );
}

const rootPkgPath = resolve(root, "package.json");
const current = JSON.parse(readFileSync(rootPkgPath, "utf-8")).version;
if (!/^\d+\.\d+\.\d+$/.test(current))
  fail(`invalid semver in package.json: ${current}`);

const next = nextVersion(current, bumpArg);
const tag = `v${next}`;

console.log(`current: v${current}`);
console.log(`release: ${tag}`);
console.log(`files:   ${[...VERSION_FILES, "bun.lock"].join(", ")}`);
if (dryRun) console.log("mode:    dry-run (no writes)");
if (noPush) console.log("push:    skipped (--no-push)");

if (dryRun) process.exit(0);

if (!yes) {
  const answer = await ask(`Release ${tag}? [y/N] `);
  if (answer !== "y" && answer !== "yes") {
    console.log("Aborted.");
    process.exit(0);
  }
}

const status = await $`git -C ${root} status --porcelain`.text();
if (status.trim()) fail("working tree is dirty; commit or stash first");

const existing = await $`git -C ${root} tag -l ${tag}`.text();
if (existing.trim()) fail(`tag ${tag} already exists`);

for (const file of VERSION_FILES) {
  const path = resolve(root, file);
  const data = JSON.parse(readFileSync(path, "utf-8"));
  data.version = next;
  writeFileSync(path, `${JSON.stringify(data, null, 2)}\n`);
}

await $`bun install --cwd ${root}`;

await $`git -C ${root} add ${VERSION_FILES} bun.lock`;
await $`git -C ${root} commit -m ${`chore(release): ${tag}`}`;
await $`git -C ${root} tag -a ${tag} -m ${tag}`;

if (!noPush) {
  await $`git -C ${root} push`;
  await $`git -C ${root} push origin ${tag}`;
}

console.log(`Released ${tag}${noPush ? " (local only)" : ""}.`);
