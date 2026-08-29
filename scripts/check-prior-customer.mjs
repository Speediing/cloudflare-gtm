import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const SKIP_DIRS = new Set([
  ".git",
  ".next",
  "node_modules",
  "private",
]);
const SKIP_FILES = new Set(["package-lock.json"]);
const TEXT_EXT = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".mjs",
  ".css",
  ".md",
  ".json",
  ".svg",
  ".wgsl",
  ".html",
  ".txt",
]);

const BANNED = [
  { re: /\bDatadog\b/i, why: "prior customer name" },
  { re: /\bdatadog[-_]/i, why: "prior customer identifier" },
  { re: /datadoghq/i, why: "prior customer domain" },
  { re: /datadogMark/, why: "prior brand mark in shader" },
  { re: /#632ca6/i, why: "Datadog purple" },
  { re: /#4c1d82/i, why: "Datadog purple dark" },
  { re: /rgba\(\s*99\s*,\s*44\s*,\s*166/i, why: "Datadog purple rgb" },
  { re: /\bBits AI\b/, why: "Datadog product" },
  { re: /\bAPM \+ Logs\b/, why: "Datadog product pair" },
  { re: /\bMadeline Ingleby\b/, why: "prior AE" },
  { re: /madeline\.ingleby/i, why: "prior AE email" },
  { re: /What we heard/, why: "omit invented account-plan section" },
  { re: /\bHeroBlock\b/, why: "first-pass invented site" },
  { re: /Harbor Packet/, why: "first-pass invented site" },
  { re: /brand-dd/, why: "prior Datadog lockup class" },
  { re: /watercolor-pad\.webp/, why: "first-pass watercolor asset" },
  { re: /\bmark:\s*["']AE["']/, why: "job title on the fleet seat" },
];

const REQUIRED_WATERCOLORS = new Set([
  "watercolor-attach.png",
  "watercolor-deal.png",
  "watercolor-orbit.png",
  "watercolor-pad.png",
  "watercolor-room.png",
]);

const DATADOG_WATERCOLOR_HASHES = new Set([
  "73faae52872e95f72c7c728be39fd637",
  "07a853391b69873037888ca653649d36",
  "4ee496d688a243fe17ceb3c73b95277e",
  "cb3667f0bb96c72d3389404ae28ae22d",
  "6eebe8dd14371fbdc268ea7d2742069b",
  "a2671e4fc4e64ad2285159da5968feb4",
  "5212bfa06f9c82d8949175320054d44e",
]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    if (SKIP_DIRS.has(name)) continue;
    const full = join(dir, name);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full, out);
      continue;
    }
    if (SKIP_FILES.has(name)) continue;
    const ext = name.includes(".") ? name.slice(name.lastIndexOf(".")) : "";
    if (!TEXT_EXT.has(ext)) continue;
    out.push(full);
  }
  return out;
}

const hits = [];
for (const file of walk(ROOT)) {
  const rel = relative(ROOT, file);
  if (
    rel === "scripts/check-prior-customer.mjs" ||
    rel === "scripts/verify-served.mjs"
  ) {
    continue;
  }
  const text = readFileSync(file, "utf8");
  const lines = text.split("\n");
  for (let i = 0; i < lines.length; i += 1) {
    for (const rule of BANNED) {
      if (rule.re.test(lines[i])) {
        hits.push(`${rel}:${i + 1}: ${rule.why}: ${lines[i].trim()}`);
      }
    }
  }
}

if (hits.length) {
  console.error(`prior-customer leftovers (${hits.length})`);
  for (const hit of hits) console.error(hit);
  process.exit(1);
}

const brandDir = join(ROOT, "public/brand");
const brandFiles = readdirSync(brandDir);
for (const name of brandFiles) {
  if (/^dd_.*\.png$/i.test(name)) {
    console.error(`prior Datadog image remains: public/brand/${name}`);
    process.exit(1);
  }
  if (/^watercolor-.*\.png$/i.test(name) && !REQUIRED_WATERCOLORS.has(name)) {
    console.error(`unexpected inherited watercolor remains: public/brand/${name}`);
    process.exit(1);
  }
}

for (const name of REQUIRED_WATERCOLORS) {
  if (!brandFiles.includes(name)) {
    console.error(`required Cloudflare watercolor is missing: public/brand/${name}`);
    process.exit(1);
  }
  const hash = createHash("md5")
    .update(readFileSync(join(brandDir, name)))
    .digest("hex");
  if (DATADOG_WATERCOLOR_HASHES.has(hash)) {
    console.error(`Datadog watercolor hash remains: public/brand/${name}`);
    process.exit(1);
  }
}

const lockup = readFileSync(
  join(ROOT, "src/components/BrandLockup.tsx"),
  "utf8",
);
if (!/\/brand\/cloudflare-wordmark\.svg/.test(lockup)) {
  console.error("lockup does not use the vendored Cloudflare wordmark");
  process.exit(1);
}

const wordmark = readFileSync(
  join(ROOT, "public/brand/cloudflare-wordmark.svg"),
  "utf8",
);
if (
  !/Official Cloudflare logo kit source: https:\/\/www\.cloudflare\.com\/logo\//.test(
    wordmark,
  )
) {
  console.error("Cloudflare wordmark is missing official source provenance");
  process.exit(1);
}

const css = readFileSync(join(ROOT, "src/app/globals.css"), "utf8");
if (!/--lockup-h:\s*16px/.test(css) || !/--lockup-h:\s*18px/.test(css)) {
  console.error("lockup is missing the required 16px and 18px sizes");
  process.exit(1);
}
if (/hue-rotate|--brand-art-filter/.test(css)) {
  console.error("inherited hue-rotation filter remains in CSS");
  process.exit(1);
}
if (!/object-position:\s*center 52%/.test(css)) {
  console.error("desktop hero watercolor is missing object-position center 52%");
  process.exit(1);
}
if (
  !/main > \.hero-watercolor \+ \.report/.test(css) ||
  !/margin-top:\s*clamp\(-7rem,\s*-8vw,\s*-4rem\)/.test(css)
) {
  console.error("paper overlap selector or desktop values are missing");
  process.exit(1);
}
if (
  !/max-height:\s*min\(48vh,\s*380px\)/.test(css) ||
  !/object-position:\s*center 50%/.test(css) ||
  !/margin-top:\s*-2\.5rem/.test(css)
) {
  console.error("mobile watercolor max-height, object-position, or overlap is missing");
  process.exit(1);
}

console.log("prior-customer check clean");
