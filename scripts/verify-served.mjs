import { execFileSync } from "node:child_process";

const BASE = process.env.SITE_URL || "http://127.0.0.1:3011";
const PASSWORD = process.env.SITE_PASSWORD || "land2expand";

function fail(message) {
  console.error(message);
  process.exit(1);
}

function curl(args) {
  return execFileSync("curl", ["-sS", "-D", "-", ...args], {
    encoding: "utf8",
    maxBuffer: 8 * 1024 * 1024,
  });
}

function splitHttp(raw) {
  const cut = raw.indexOf("\r\n\r\n");
  if (cut === -1) fail(`no HTTP header break from ${BASE}`);
  return { headers: raw.slice(0, cut), body: raw.slice(cut + 4) };
}

function statusOf(headers) {
  const line = headers.split("\r\n")[0] || "";
  const match = line.match(/HTTP\/\S+\s+(\d+)/);
  return match ? Number(match[1]) : 0;
}

const root = splitHttp(curl(["-o", "-", `${BASE}/`]));
if (statusOf(root.headers) !== 307) {
  fail(`GET / expected 307, got ${statusOf(root.headers)}`);
}
if (!/\/login\?next=%2F/.test(root.headers)) {
  fail("GET / did not redirect to /login?next=%2F");
}

const bad = splitHttp(
  curl([
    "-o",
    "-",
    "-X",
    "POST",
    "-H",
    "content-type: application/json",
    "-H",
    "accept: application/json",
    "--data",
    JSON.stringify({ password: "wrong", next: "/" }),
    `${BASE}/api/login`,
  ]),
);
if (statusOf(bad.headers) !== 401) {
  fail(`bad password expected 401, got ${statusOf(bad.headers)}`);
}

const good = splitHttp(
  curl([
    "-o",
    "-",
    "-X",
    "POST",
    "-H",
    "content-type: application/json",
    "-H",
    "accept: application/json",
    "--data",
    JSON.stringify({ password: PASSWORD, next: "/" }),
    `${BASE}/api/login`,
  ]),
);
if (statusOf(good.headers) !== 200) {
  fail(`good password expected 200, got ${statusOf(good.headers)}`);
}
const cookie = (good.headers.match(/set-cookie:\s*([^;\r\n]+)/i) || [])[1];
if (!cookie || !cookie.startsWith("cloudflare_gtm_session=")) {
  fail(`missing cloudflare_gtm_session cookie: ${good.headers}`);
}

const home = splitHttp(
  curl(["-o", "-", "-H", `Cookie: ${cookie}`, `${BASE}/`]),
);
if (statusOf(home.headers) !== 200) {
  fail(`authed GET / expected 200, got ${statusOf(home.headers)}`);
}

const must = [
  "Cloudflare x SpaceXAI",
  "watercolor-pad.png",
  "brand-wordmark",
  "https://cf-assets.www.cloudflare.com/",
  "Room Ops",
  "Paper",
  "Outbound",
  "Sean Middleton",
  "sean.middleton@cursor.com",
  "A fleet of agents for every sales rep",
  ">You<",
  "hero-copy",
  "hero-phone-jobs",
  "hero-bot-demo",
  "hero-phone-notch",
  "hero-phone-header",
  "hero-phone-thread",
  "hero-phone-composer",
  "Sales Outbound",
  "Account Research",
  "Call Follow-up",
  "Deal Desk",
  "Pipeline Health",
  "Renewal Risk",
  "Competitive Intel",
  "Sales Chief of Staff",
  "New signal detected",
];
for (const needle of must) {
  if (!home.body.includes(needle)) {
    fail(`authed home missing ${JSON.stringify(needle)}`);
  }
}

const banned = [
  "Harbor Packet",
  "HeroBlock",
  "watercolor-pad.webp",
  "brand-dd",
  "Datadog",
  "What we heard",
  "Answer security questions overnight",
];
for (const needle of banned) {
  if (home.body.includes(needle)) {
    fail(`authed home still has ${JSON.stringify(needle)}`);
  }
}

console.log("served site matches this Cloudflare restyle");
