export type HeroJobIcon =
  | "outbound"
  | "research"
  | "follow-up"
  | "deal-desk"
  | "pipeline"
  | "renewal"
  | "competitive"
  | "chief-of-staff";

export type HeroJob = {
  name: string;
  icon: HeroJobIcon;
  account: string;
  signal: string;
  work: string;
  result: string;
  user: string;
  bot: string;
};

export const HERO_JOBS: HeroJob[] = [
  {
    name: "Sales Outbound",
    icon: "outbound",
    account: "Acme",
    signal: "Origin outage still on the status page",
    work: "I found the origin outage, the platform owners, and the security bar. I drafted outreach around CDN + WAF in the team that felt it.",
    result: "10 account-specific emails ready",
    user: "send the top 10, they look good",
    bot: "sending now. the rest stay queued.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Acme",
    signal: "Staff platform JD asks for CDN and WAF",
    work: "I mapped the platform team, the last origin failover, and the likely CDN + WAF start.",
    result: "Edge brief and buyer map ready",
    user: "brief me before the call",
    bot: "sent. i'll keep the brief current.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Acme discovery",
    signal: "Customer call ended",
    work: "I captured the origin-outage language and the SSO ask, updated the deck, and drafted the recap with owners.",
    result: "Deck and follow-up email ready",
    user: "send the recap and share the deck",
    bot: "sent. next steps are on both calendars.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "Acme procurement",
    signal: "Invoice questions overnight",
    work: "I checked the catch-up charge, the Teams proration, and the spend-cap ask, then drafted the supported answers.",
    result: "Procurement reply ready",
    user: "hold the enterprise ask",
    bot: "held. the supported answers are ready.",
  },
  {
    name: "Pipeline Health",
    icon: "pipeline",
    account: "Enterprise edge pipeline",
    signal: "Four edge deals lost momentum",
    work: "I reviewed activity, security reviews, and next steps, then found the missing SSO path or buyer action in each deal.",
    result: "Four deal recovery plans ready",
    user: "brief the account owners",
    bot: "briefs sent. i'll watch for movement.",
  },
  {
    name: "Renewal Risk",
    icon: "renewal",
    account: "Acme",
    signal: "Usage forecast changed",
    work: "I compared the new traffic plan with the current contract and prepared the questions the account team needs answered.",
    result: "Renewal plan review ready",
    user: "share this with the account team",
    bot: "shared. i'll track the usage forecast.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "Acme",
    signal: "Another CDN mentioned on the call",
    work: "I pulled the failover concern and drafted a clean comparison of their current stitch versus CDN + WAF on one edge.",
    result: "Edge options talk track ready",
    user: "add it to tomorrow's call brief",
    bot: "added. the rep has the proof points.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "Weekly operating review",
    signal: "Three edge decisions still open",
    work: "I gathered pipeline changes, security reviews, procurement questions, and team commitments, then prepared the decisions that need attention.",
    result: "Sales leadership brief ready",
    user: "send it to the leadership team",
    bot: "sent. next week's tracker is already live.",
  },
];
