import type { Artifact, CroJob, SlideCard } from "./types";

export const ACME_TAIL_SLIDES: SlideCard[] = [
  {
    n: 4,
    kicker: "They said · 4 min ago",
    voice: "them",
    title: "The origin outage",
    body: "We cannot fail traffic over without jumping the CDN, the WAF, and a runbook.",
  },
  {
    n: 5,
    kicker: "Mapped live",
    voice: "us",
    title: "Start with CDN + WAF",
    body: "Same team that already feels the outage. Start there this quarter.",
  },
  {
    n: 6,
    kicker: "They said · 4 min ago",
    voice: "them",
    title: "The security bar",
    body: "Security will not let another edge control plane in without SSO and an audit trail.",
  },
  {
    n: 7,
    kicker: "Mapped live",
    voice: "us",
    title: "SSO, then Workers",
    body: "Named on this call. One team. Workers after they see a faster edge path.",
  },
];

export const ACME_PROCUREMENT: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Acme procurement · overnight invoices",
  paperTitle: "Their questions",
  from: "Jordan Hale, Acme procurement · 5:27am your time",
  marks: [
    {
      text: "Why the $427.51 catch-up, and will it happen again?",
      note: "Billing-system miss on our side, 1 July–17 July. INV-0081 is the one-time correction. Gap is closed.",
      take: true,
    },
    {
      text: "Can the admin portal be trusted? Any more retro charges?",
      note: "Dashboard for usage. Invoices under Billing are the billed record. Flag anything from a closed period before it is billed.",
      take: true,
    },
    {
      text: "How was the $715.55 Teams invoice calculated?",
      note: "Two mid-cycle adds, 19→20→21, not one full-year seat. Proration through 17 July 2027. Seat is $384/year.",
      take: true,
    },
    {
      text: "Spend caps, PO invoicing, per-user limits.",
      note: "Team-wide monthly cap is on Teams. Per-user caps and annual PO are Enterprise. Do not re-trade that from this inbox.",
      take: false,
    },
  ],
  reply: {
    to: "Jordan Hale, Acme procurement",
    subject: "Acme invoices INV-0080 and INV-0081. Answers you can send today",
    body: "Hi Jordan,\n\nINV-0081 ($427.51) is a one-time catch-up for usage 1–17 July that our billing system missed. Not new usage. Gap is closed. No further retros expected; I would flag any closed-period item before it billed.\n\nDashboard = usage. Billing invoices = what was billed. Those should now match. Send any line that does not.\n\nINV-0080 ($715.55) is two mid-cycle seat adds (19→21), not a full-year seat at $384. Renewal date does not change.\n\nTeam-wide spend cap is on Teams. Per-user caps and annual PO are Enterprise. That stays on the order form.\n\nHappy to jump on a call before these are processed.\n\nBest,",
  },
};

export const ACME_OUTBOUND: Extract<Artifact, { kind: "outbound" }> = {
  kind: "outbound",
  title: "Acme outbound",
  account: "Acme",
  hypothesis: [
    {
      k: "Why us",
      body: "On-call still stitches a CDN ticket, a WAF console, and origin failovers to ride out a bot flood. CDN + WAF is the start, not a catalog pitch.",
    },
    {
      k: "Why now",
      body: "Public incident 14 days ago. 47 minutes to fail over origin. Staff platform JD asks for CDN and WAF experience. The pain is current.",
    },
    {
      k: "Why them",
      body: "VP Eng owns time-to-recover. Platform director lives in that stitch. They are the ones who felt the last origin outage.",
    },
  ],
  evidence: [
    {
      source: "Status page · 14 days ago",
      finding:
        "Origin outage, 47 minutes to fail over. Postmortem language is still 'we jumped three tools.'",
    },
    {
      source: "Careers · Staff platform",
      finding:
        "JD asks for 'experience running CDN and WAF across teams.' Open role, posted this month.",
    },
    {
      source: "Engineering blog",
      finding:
        "We outgrew homegrown edge rules. No named replacement. That is the gap.",
    },
  ],
  targets: [
    {
      name: "Priya Shah",
      role: "VP Engineering",
      why: "Owns time-to-recover. Named in the platform hiring chain.",
    },
    {
      name: "Chris Okonkwo",
      role: "Director, Platform",
      why: "Team is the one stitching CDN and WAF today.",
    },
  ],
  page: {
    headline: "Acme's origin outage is a stitching problem",
    body: "The last incident and the Staff platform JD say the same thing. Start CDN + WAF in the platform team. Workers after that team has a week-3 number. Not a product tour.",
  },
};

export const JOBS: CroJob[] = [
  {
    id: "standardize-room",
    number: 1,
    title: "Update decks in real time",
    trigger: "A customer call starts",
    backgroundAction: "Listening to discovery + updating the open deck",
    problem:
      "A generic deck is a pitch they have already sat through. The wow is hearing their own discovery back, then seeing the next product named for their team, while they are still on.",
    botJob:
      "Granola is in while you are on. The last slides become their words and a product suggestion that fits this room. Not last quarter's story.",
    storyboard: [
      {
        when: "Minute 8",
        label: "The call starts. Grok is already listening. No prompt needed.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Acme discovery",
          people: [
            { initials: "JW", name: "You" },
            { initials: "PS", name: "Priya" },
            { initials: "CO", name: "Chris" },
          ],
        },
      },
      {
        when: "Minute 22",
        label: "Their exact language lands in the transcript.",
        scene: "demo",
        visual: {
          kind: "live-transcript",
          timestamp: "14:31",
          speaker: "Priya",
          quote: "We stitch the CDN and the WAF every time there is an origin outage.",
          signals: ["Origin outage", "CDN + WAF"],
        },
      },
      {
        when: "Minute 31",
        label: "Grok maps it to product and rewrites the open deck.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Their words",
          headline: "An origin outage is a stitching problem",
          product: "Start with CDN + WAF",
          status: "3 slides updated",
        },
      },
      {
        when: "Minute 35",
        label: "Present the new slides before the call ends.",
        scene: "deck",
        slides: ACME_TAIL_SLIDES,
      },
    ],
    unlock:
      "Hyper-personalized discovery on the slide, plus a tailored product next step, while they are still on.",
    outcome:
      "One live call becomes a customer-specific deck, before the call ends.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Room Ops",
      subtitle: "Live discovery · slides in their words",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "room",
          name: "Room Ops",
          role: "bot",
          persona: "Turns live discovery into slides that wow this room",
          color: "#34C759",
        },
        {
          id: "slides",
          name: "Slides",
          role: "bot",
          persona: "Maps what they just said to a product suggestion for this team",
          color: "#007AFF",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "Customer call started. I am following Granola and watching for their language, blockers, and product signals. The open deck stays untouched until there is something worth changing.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "Priya just named the origin outage and the security bar in her words. Mapping both to the last slides now while the call is still live.",
        },
        {
          id: "m3",
          from: "room",
          kind: "text",
          body: "Still on. Granola 14:31. Their discovery is the slide. Origin outage and the security bar in their words, then the product that fits this team. They should feel known, not pitched.",
        },
        {
          id: "m4",
          from: "room",
          kind: "draft",
          draftLabel: "Last slides of the open deck · still on",
          artifact: {
            kind: "slides",
            title: "Their words",
            cards: ACME_TAIL_SLIDES,
          },
        },
        {
          id: "m5",
          from: "room",
          kind: "draft",
          draftLabel: "One-pager they can forward",
          artifact: {
            kind: "one-pager",
            title: "Acme one-pager",
            eyebrow: "One-pager",
            sections: [
              {
                heading: "What we covered",
                body: "Start with CDN + WAF. Security needs SSO and an audit trail. Workers as a one-team trial, not a company-wide rollout.",
              },
              {
                heading: "Security path",
                body: "SSO and audit trail named before any extra products. The security lead from this call stays on the next meeting.",
              },
              {
                heading: "Trial",
                body: "Workers in the same team that starts CDN + WAF. Week-3 time-to-recover is the gate. Add scope only after that number.",
              },
              {
                heading: "What we need from you",
                body: "Tuesday with your contact plus a security co-owner. Bring the contract owner if legal will slow SSO.",
              },
            ],
          },
        },
        {
          id: "m6",
          from: "room",
          kind: "draft",
          draftLabel: "Note they can send inside",
          artifact: {
            kind: "packet",
            title: "Forward this inside Acme",
            fields: [
              {
                label: "Problem in their words",
                value:
                  "We cannot fail traffic over without jumping the CDN, the WAF, and a runbook, and security will not let another edge control plane in without SSO and an audit trail.",
              },
              {
                label: "Why now",
                value:
                  "The team already agreed to start CDN + WAF. Workers is useful in that same week-3 window, not after a product tour next quarter.",
              },
              {
                label: "Risks already named",
                value:
                  "SSO + audit trail. Legal may slow the contract. Cost came up once and is not in this ask. Images is not in the room.",
              },
              {
                label: "Exact ask for next Tuesday",
                value:
                  "30 minutes. Your contact + a security co-owner. Dated SSO path. Written Workers trial scope for one team.",
              },
            ],
          },
        },
        {
          id: "m7",
          from: "room",
          kind: "draft",
          draftLabel: "Gmail to your contact",
          artifact: {
            kind: "gmail",
            title: "Forward to your contact",
            to: "Acme contact",
            subject: "Acme / Cloudflare. Tuesday packet (SSO, Workers trial)",
            body: "Forwarding the internal note from today's room. Problem is in your words. Tuesday ask is your contact + a security co-owner, a dated SSO path, and a one-team Workers trial. Nothing else is in the ask.",
          },
        },
        {
          id: "m8",
          from: "room",
          kind: "system",
          body: "Nothing sent. Deck, one-pager, note, and Gmail stay drafts until you tap Send.",
        },
      ],
    },
  },
  {
    id: "legal-redlines",
    number: 2,
    title: "Find product and internal answers fast",
    trigger: "A customer question lands",
    backgroundAction: "Searching product knowledge + internal company context",
    problem:
      "A customer question can turn into a week of Slack across product, billing, finance, and legal. The seller waits, the customer waits, and internal experts lose time repeating answers.",
    botJob:
      "Grok Bot watches for the question, searches product knowledge and internal company context, and drafts a sourced reply. The seller reviews instead of chasing teams.",
    storyboard: [
      {
        when: "5:27am your time",
        label: "Four questions land. Grok starts while you are asleep.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Jordan · Acme procurement",
          subject: "Questions on INV-0080 + 0081",
          questions: 4,
        },
      },
      {
        when: "7:42am",
        label: "Grok has already found and checked every answer.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Billing", answer: "Catch-up explained" },
            { name: "Finance", answer: "Proration checked" },
            { name: "Packaging", answer: "Limits confirmed" },
          ],
          status: "4 / 4 answered",
        },
      },
      {
        when: "7:44am",
        label: "A sourced reply is waiting for one-click approval.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Jordan Hale",
          subject: "INV-0080 + 0081 · answers",
          status: "Ready to approve",
        },
      },
    ],
    unlock:
      "Invoice questions in. A sendable draft out. No week of internal delay.",
    outcome:
      "Grok finds the product and internal context, then drafts the answer. No Slack chase and no seller time wasted.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Paper",
      subtitle: "Procurement questions · draft waiting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "paper",
          name: "Paper",
          role: "bot",
          persona: "Reads overnight procurement mail and drafts the reply so you do not chase billing",
          color: "#FF375F",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "paper",
          kind: "routine",
          body: "New Acme procurement thread detected at 5:27am. Two invoices, four questions. Checking billing, finance, and packaging while you are offline.",
        },
        {
          id: "m2",
          from: "paper",
          kind: "text",
          body: "Already read it overnight. Four questions. Draft is waiting. You do not need to ping billing, finance, or legal for this one. Nothing sent.",
        },
        {
          id: "m3",
          from: "paper",
          kind: "draft",
          draftLabel: "Questions + reply",
          artifact: ACME_PROCUREMENT,
        },
        {
          id: "m4",
          from: "paper",
          kind: "draft",
          draftLabel: "Gmail reply · not sent",
          artifact: {
            kind: "gmail",
            title: "Reply to Acme procurement",
            to: ACME_PROCUREMENT.reply.to,
            subject: ACME_PROCUREMENT.reply.subject,
            body: ACME_PROCUREMENT.reply.body,
          },
        },
        {
          id: "m5",
          from: "paper",
          kind: "system",
          body: "Nothing sent. The reply stays a draft until you tap Send.",
        },
      ],
    },
  },
  {
    id: "attach-engine",
    number: 3,
    title: "Pipeline generation is now easier than ever",
    trigger: "A target account enters your list",
    backgroundAction: "Researching signals + building personalized outreach",
    problem:
      "Cold outbound is a generic sequence. No research, no hypothesis, no evidence, and a name from a list. Pipeline that lands starts with why this account, why now, and who would care.",
    botJob:
      "When an account enters your target list, Grok Bot researches it, writes a 3-why, finds evidence of the pain, names who cares, then drafts LinkedIn, email, and a page. Draft only. You send.",
    storyboard: [
      {
        when: "No meeting yet",
        label: "Acme hits your target list. Grok starts without a prompt.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Acme",
          sources: ["Status page", "Careers", "Engineering"],
          signal: "47-minute origin outage",
        },
      },
      {
        when: "90 seconds later",
        label: "It turns public evidence into a sharp 3-why.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Why us", answer: "CDN + WAF" },
            { label: "Why now", answer: "Origin · 14d ago" },
            { label: "Why them", answer: "Own time-to-recover" },
          ],
        },
      },
      {
        when: "Campaign ready",
        label: "The right buyer gets three personalized drafts.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Priya Shah · VP Engineering",
          channels: ["LinkedIn", "Email", "Acme page"],
          status: "3 drafts · 0 sent",
        },
      },
      {
        when: "Ready for your click",
        label: "Research, message, and account page, all built from their business.",
        scene: "send",
        artifact: ACME_OUTBOUND,
      },
    ],
    unlock:
      "Research, a 3-why, evidence, named buyers, and sendable drafts. Nothing fires until you tap.",
    outcome:
      "One account in. Research, a 3-why, named buyers, and personalized outreach out.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Outbound",
      subtitle: "Research to a first meeting",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "attach",
          name: "Outbound",
          role: "bot",
          persona: "Researches the account, writes the 3-why, and drafts the outreach",
          color: "#FF9500",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "attach",
          kind: "routine",
          body: "Acme entered your target-account list. No meeting yet. Researching the account, building the 3-why, and finding the people who would feel the pain. Drafts only.",
        },
        {
          id: "m2",
          from: "attach",
          kind: "text",
          body: "In the account. Careers, status page, engineering blog. Staff platform JD is asking for CDN and WAF. Status page still has a 47-minute origin outage. Writing the 3-why from that, not from a persona.",
        },
        {
          id: "m3",
          from: "attach",
          kind: "draft",
          draftLabel: "3-why hypothesis",
          artifact: {
            kind: "packet",
            title: "Acme 3-why",
            fields: ACME_OUTBOUND.hypothesis.map((item) => ({
              label: item.k,
              value: item.body,
            })),
          },
        },
        {
          id: "m4",
          from: "attach",
          kind: "draft",
          draftLabel: "Evidence + who cares",
          artifact: {
            kind: "packet",
            title: "Proof, then the people",
            fields: [
              ...ACME_OUTBOUND.evidence.map((item) => ({
                label: item.source,
                value: item.finding,
              })),
              ...ACME_OUTBOUND.targets.map((person) => ({
                label: `${person.name} · ${person.role}`,
                value: person.why,
              })),
            ],
          },
        },
        {
          id: "m5",
          from: "attach",
          kind: "draft",
          draftLabel: "LinkedIn · not sent",
          artifact: {
            kind: "linkedin",
            title: "LinkedIn to Priya Shah",
            to: "Priya Shah",
            role: "VP Engineering, Acme",
            body: "Priya, your status page from 14 days ago and the Staff platform JD say the same thing: on-call still stitches tools to fail over origin. 90 seconds on how CDN + WAF in the platform team would have shortened that outage. Draft only. Nothing sent.",
          },
        },
        {
          id: "m6",
          from: "attach",
          kind: "draft",
          draftLabel: "Gmail · not sent",
          artifact: {
            kind: "gmail",
            title: "Email to Priya Shah",
            to: "Priya Shah, VP Engineering",
            subject: "Acme's last origin outage and the Staff platform JD",
            body: "Priya, the 47-minute origin outage and the Staff platform posting both point at stitching CDN and WAF. I put a one-page note on how Cloudflare would start in that platform team, not a product tour. Happy to walk Chris Okonkwo through it too. Nothing else in the ask. Draft only until you tap Send.",
          },
        },
        {
          id: "m7",
          from: "attach",
          kind: "draft",
          draftLabel: "Page for this account · not live",
          artifact: {
            kind: "one-pager",
            title: ACME_OUTBOUND.page.headline,
            eyebrow: "Page for Acme",
            sections: [
              {
                heading: "What we saw",
                body:
                  ACME_OUTBOUND.evidence[0]?.finding ??
                  "Public incident. The stitch is still the story.",
              },
              {
                heading: "Why this team",
                body:
                  ACME_OUTBOUND.hypothesis.find((item) => item.k === "Why them")
                    ?.body ?? "VP Eng owns time-to-recover.",
              },
              {
                heading: "How the product maps",
                body: ACME_OUTBOUND.page.body,
              },
            ],
          },
        },
        {
          id: "m8",
          from: "attach",
          kind: "system",
          body: "Nothing sent. LinkedIn, Gmail, and the page stay drafts until you tap Send.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
