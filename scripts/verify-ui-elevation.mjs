#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const read = (p) => fs.readFileSync(path.join(root, p), "utf8");
const fail = [];

const layout = read("app/layout.tsx");
if (!layout.includes("Karla") || layout.includes("Inter")) {
  fail.push("app/layout.tsx must use Karla (not Inter) for body font");
}

const globals = read("app/globals.css");
if (!globals.includes("--font-karla") && !globals.includes("font-karla")) {
  fail.push("app/globals.css must wire Karla into --font-sans");
}
if (!globals.includes(".text-eyebrow") || !globals.includes(".text-display")) {
  fail.push("app/globals.css must define .text-eyebrow and .text-display type roles");
}

const walk = (dir, out = []) => {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    if (ent.name === "node_modules" || ent.name === ".next" || ent.name === "ui") continue;
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) walk(p, out);
    else if (/\.(tsx|ts|jsx|js|mdx)$/.test(ent.name)) out.push(p);
  }
  return out;
};

const emojiRe = /[\u{1F300}-\u{1FAFF}]/u;
for (const file of walk(path.join(root, "components")).concat(walk(path.join(root, "app")))) {
  const text = fs.readFileSync(file, "utf8");
  if (emojiRe.test(text)) fail.push(`Emoji found in ${path.relative(root, file)}`);
}

const below = read("components/home/HomeBelowFold.tsx");
const promoCount = (below.match(/HomePromoBanner/g) || []).length;
if (promoCount > 0) {
  fail.push("HomeBelowFold must not render HomePromoBanner (merged into Eat/Gather)");
}
if (!below.includes("HomeEatGather")) {
  fail.push("HomeBelowFold must include HomeEatGather chapter");
}

if (fail.length) {
  console.error("UI elevation checks failed:\n" + fail.map((f) => ` - ${f}`).join("\n"));
  process.exit(1);
}
console.log("UI elevation checks passed");
