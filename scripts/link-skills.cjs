#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..");
const sourceRoot = path.join(repoRoot, "skills");
const targetRoots = [
  "C:\\Users\\Dianen\\.agents\\skills",
  "C:\\Users\\Dianen\\.claude\\skills",
];
const dryRun = process.argv.includes("--dry-run");

function normalizeForCompare(filePath) {
  const normalized = path.normalize(filePath);
  return process.platform === "win32" ? normalized.toLowerCase() : normalized;
}

async function pathExists(filePath) {
  try {
    await fs.lstat(filePath);
    return true;
  } catch (error) {
    if (error && error.code === "ENOENT") {
      return false;
    }
    throw error;
  }
}

async function getRealPath(filePath) {
  return normalizeForCompare(await fs.realpath(filePath));
}

async function listSkillDirectories() {
  const entries = await fs.readdir(sourceRoot, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

async function ensureSkillLink(skillName, targetRoot) {
  const sourcePath = path.join(sourceRoot, skillName);
  const targetPath = path.join(targetRoot, skillName);
  const sourceRealPath = await getRealPath(sourcePath);

  if (await pathExists(targetPath)) {
    const targetRealPath = await getRealPath(targetPath);
    if (targetRealPath === sourceRealPath) {
      console.log(`exists ${targetPath}`);
      return;
    }

    throw new Error(
      [
        `Refusing to replace existing path: ${targetPath}`,
        `Existing target resolves to: ${targetRealPath}`,
        `Expected source resolves to: ${sourceRealPath}`,
        "Remove or rename the existing path, then run this command again.",
      ].join("\n"),
    );
  }

  if (dryRun) {
    console.log(`would link ${targetPath} -> ${sourcePath}`);
    return;
  }

  await fs.symlink(
    sourcePath,
    targetPath,
    process.platform === "win32" ? "junction" : "dir",
  );
  console.log(`linked ${targetPath} -> ${sourcePath}`);
}

async function main() {
  const skills = await listSkillDirectories();
  if (skills.length === 0) {
    throw new Error(`No skill directories found in ${sourceRoot}`);
  }

  for (const targetRoot of targetRoots) {
    if (!dryRun) {
      await fs.mkdir(targetRoot, { recursive: true });
    }

    for (const skillName of skills) {
      await ensureSkillLink(skillName, targetRoot);
    }
  }

  console.log(
    `${dryRun ? "checked" : "linked"} ${skills.length} skills into ${targetRoots.length} target directories`,
  );
}

main().catch((error) => {
  console.error(error.message || error);
  process.exitCode = 1;
});
