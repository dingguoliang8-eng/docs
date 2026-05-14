#!/usr/bin/env node
/**
 * 根据 site-config.json 与 DOCS_ENV（或 SITE_PROFILE）更新 docs.json 中的控制台链接。
 * DOCS_ENV: test | production（大小写不敏感）
 */

import { readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const configPath = join(root, "site-config.json");
const docsPath = join(root, "docs.json");

const raw = readFileSync(configPath, "utf8");
const siteConfig = JSON.parse(raw);

const name =
  process.env.DOCS_ENV?.trim().toLowerCase() ||
  process.env.SITE_PROFILE?.trim().toLowerCase() ||
  siteConfig.defaultEnvironment?.trim().toLowerCase() ||
  "test";

const envConfig = siteConfig.environments?.[name];
if (!envConfig?.consoleUrl) {
  console.error(
    `[apply-site-config] Unknown environment "${name}". Valid: ${Object.keys(
      siteConfig.environments || {}
    ).join(", ")}`
  );
  process.exit(1);
}

let url = String(envConfig.consoleUrl).trim();
if (!/^https?:\/\//i.test(url)) {
  console.error(`[apply-site-config] Invalid consoleUrl for "${name}": ${url}`);
  process.exit(1);
}

const docs = JSON.parse(readFileSync(docsPath, "utf8"));
if (!docs.navbar) docs.navbar = {};
if (!docs.navbar.primary) docs.navbar.primary = {};
docs.navbar.primary.type = docs.navbar.primary.type || "button";
docs.navbar.primary.label = docs.navbar.primary.label || "控制台";
docs.navbar.primary.href = url;

writeFileSync(docsPath, JSON.stringify(docs, null, 2) + "\n", "utf8");
console.log(`[apply-site-config] navbar.primary.href → ${url} (DOCS_ENV=${name})`);
