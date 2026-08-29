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
    result: "Account-specific emails ready",
    user: "show me the strongest drafts",
    bot: "ready for review. nothing has been sent.",
  },
  {
    name: "Account Research",
    icon: "research",
    account: "Acme",
    signal: "Staff platform JD asks for CDN and WAF",
    work: "I mapped the platform team, the last origin failover, and the likely CDN + WAF start.",
    result: "Edge brief and buyer map ready",
    user: "brief me before the call",
    bot: "ready here. i'll keep the brief current.",
  },
  {
    name: "Call Follow-up",
    icon: "follow-up",
    account: "Acme discovery",
    signal: "Customer call ended",
    work: "I captured the origin-outage language and the SSO ask, updated the deck, and drafted the recap with owners.",
    result: "Deck and follow-up email ready",
    user: "show me the recap and deck",
    bot: "ready for review. nothing has been sent.",
  },
  {
    name: "Deal Desk",
    icon: "deal-desk",
    account: "Acme procurement",
    signal: "Product and security questions arrived overnight",
    work: "I found the current product, security, and order-form context, then drafted the supported answers and held the contract question.",
    result: "Procurement reply ready",
    user: "show me the supported answers",
    bot: "ready for review. the contract question is held.",
  },
  {
    name: "Pipeline Health",
    icon: "pipeline",
    account: "Enterprise edge pipeline",
    signal: "Edge deals have lost momentum",
    work: "I reviewed activity, security reviews, and next steps, then found the missing SSO path or buyer action in each deal.",
    result: "Deal recovery plans ready",
    user: "show me the account-owner briefs",
    bot: "ready for review. i'll watch for movement.",
  },
  {
    name: "Renewal Risk",
    icon: "renewal",
    account: "Acme",
    signal: "Usage forecast changed",
    work: "I compared the new traffic plan with the current contract and prepared the questions the account team needs answered.",
    result: "Renewal plan review ready",
    user: "show this to the account team",
    bot: "ready for review. i'll track the usage forecast.",
  },
  {
    name: "Competitive Intel",
    icon: "competitive",
    account: "Acme",
    signal: "Another CDN mentioned on the call",
    work: "I pulled the failover concern and drafted a clean comparison of their current stitch versus CDN + WAF on one edge.",
    result: "Edge options talk track ready",
    user: "add it to tomorrow's call brief",
    bot: "added to the draft. the rep has the proof points.",
  },
  {
    name: "Sales Chief of Staff",
    icon: "chief-of-staff",
    account: "Weekly operating review",
    signal: "Edge decisions are still open",
    work: "I gathered pipeline changes, security reviews, procurement questions, and team commitments, then prepared the decisions that need attention.",
    result: "Sales leadership brief ready",
    user: "show me the leadership brief",
    bot: "ready for review. the tracker is up to date.",
  },
];
