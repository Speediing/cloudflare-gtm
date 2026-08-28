import type { Artifact, CroJob, SlideCard } from "./types";

export const ACME_TAIL_SLIDES: SlideCard[] = [
  {
    n: 4,
    kicker: "Discovery note · live",
    voice: "them",
    title: "The origin outage",
    body: "Origin failover still means moving between the CDN, the WAF, and a runbook.",
  },
  {
    n: 5,
    kicker: "Mapped live",
    voice: "us",
    title: "Start with CDN + WAF",
    body: "Start with the platform team that already owns the outage response.",
  },
  {
    n: 6,
    kicker: "Discovery note · live",
    voice: "them",
    title: "The security bar",
    body: "Security needs a clear SSO path and an audit trail before rollout.",
  },
  {
    n: 7,
    kicker: "Mapped live",
    voice: "us",
    title: "SSO, then Workers",
    body: "Name the security path first, then run a Workers proof with one team.",
  },
];

export const ACME_PROCUREMENT: Extract<Artifact, { kind: "redlines" }> = {
  kind: "redlines",
  title: "Acme procurement · product questions",
  paperTitle: "Their questions",
  from: "Jordan Hale, Acme procurement · overnight",
  marks: [
    {
      text: "Can you confirm the SSO setup path?",
      note: "The draft points to the current product documentation and flags the plan-specific detail for review.",
      take: true,
    },
    {
      text: "Where can our team review the audit trail?",
      note: "The draft links the relevant security documentation and names the owner who can confirm access.",
      take: true,
    },
    {
      text: "Which controls are included in our current order?",
      note: "The draft checks the order form and holds anything that needs a commercial decision.",
      take: true,
    },
    {
      text: "Who should join if a contract question comes up?",
      note: "Route it to the account team. Do not guess or change terms from the inbox.",
      take: false,
    },
  ],
  reply: {
    to: "Jordan Hale, Acme procurement",
    subject: "Acme product and security questions",
    body: "Hi Jordan,\n\nI pulled the current product, security, and order-form context into one reply. The SSO and audit-trail answers are linked to their source documents. I held the contract question for the account team rather than guessing.\n\nI am happy to bring the right owner into the thread if you want to review any of it live.\n\nBest,\nSean",
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
      body: "A recent origin incident and an open platform role both point to CDN and WAF work.",
    },
    {
      k: "Why them",
      body: "VP Eng owns time-to-recover. Platform director lives in that stitch. They are the ones who felt the last origin outage.",
    },
  ],
  evidence: [
    {
      source: "Recent status update",
      finding:
        "The origin incident required a manual failover across several tools.",
    },
    {
      source: "Careers · Staff platform",
      finding:
        "The open role asks for experience running CDN and WAF across teams.",
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
    body: "The recent incident and the platform role point to the same problem. Start with CDN + WAF in the platform team. Add a Workers proof once the first deployment is working.",
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
      "A generic deck repeats the same pitch. A useful deck reflects the customer's words and gives the team a clear next step before the call ends.",
    botJob:
      "Grok Bot follows the call in Granola, updates the last slides, and maps the discussion to the Cloudflare product that fits.",
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
          label: "Discovery note",
          note: "Origin failover still requires work across the CDN and WAF.",
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
      "Customer language on the slide, plus a product next step, while the call is still live.",
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
                  "The team already agreed to start CDN + WAF. A Workers proof belongs with that work, not in a separate product tour.",
              },
              {
                label: "Risks already named",
                value:
                  "SSO + audit trail. Legal may slow the contract. Cost came up once and is not in this ask. Images is not in the room.",
              },
              {
                label: "Exact ask for next Tuesday",
                value:
                  "Your contact and a security co-owner. A dated SSO path and a written Workers trial scope for one team.",
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
    title: "Answer customer questions without the Slack chase",
    trigger: "A customer question lands",
    backgroundAction: "Searching product knowledge + internal company context",
    problem:
      "A customer question can turn into a week of Slack across product, billing, finance, and legal. The seller waits, the customer waits, and internal experts lose time repeating answers.",
    botJob:
      "Grok Bot watches for the question, searches product knowledge and internal company context, and drafts a sourced reply. The seller reviews instead of chasing teams.",
    storyboard: [
      {
        when: "Overnight",
        label: "A customer question lands. Grok starts while you are offline.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Jordan · Acme procurement",
          subject: "Product and security questions",
          questions: 4,
        },
      },
      {
        when: "Before your workday",
        label: "Grok finds the source for each answer and flags what needs a person.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Billing", answer: "Catch-up explained" },
            { name: "Finance", answer: "Proration checked" },
            { name: "Packaging", answer: "Limits confirmed" },
          ],
          status: "Draft ready · one held",
        },
      },
      {
        when: "Ready by morning",
        label: "A sourced reply is waiting for approval.",
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
          body: "New Acme procurement thread detected overnight. Checking product, security, and order-form context while you are offline.",
        },
        {
          id: "m2",
          from: "paper",
          kind: "text",
          body: "I read the thread and found the source for each answer. One contract question is held for the account team. Nothing has been sent.",
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
    title: "Turn account signals into ready-to-send outreach",
    trigger: "A target account enters your list",
    backgroundAction: "Researching signals + building personalized outreach",
    problem:
      "Cold outbound is a generic sequence. No research, no hypothesis, no evidence, and a name from a list. Pipeline that lands starts with why this account, why now, and who would care.",
    botJob:
      "When an account enters your target list, Grok Bot researches it, explains why Cloudflare and why now, finds the right buyer, then drafts LinkedIn, email, and a page. You decide what sends.",
    storyboard: [
      {
        when: "No meeting yet",
        label: "Acme hits your target list. Grok starts without a prompt.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Acme",
          sources: ["Status page", "Careers", "Engineering"],
          signal: "Recent origin outage",
        },
      },
      {
        when: "After research",
        label: "It turns public evidence into a clear account brief.",
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
          status: "Drafts ready · nothing sent",
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
      "Research, evidence, the right buyer, and sendable drafts. Nothing sends until you approve it.",
    outcome:
      "Add an account to the list. Grok Bot returns the research, buyer map, and personalized outreach.",
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
          body: "Acme entered your target-account list. No meeting yet. Researching the account and finding the people who would feel the pain. Drafts only.",
        },
        {
          id: "m2",
          from: "attach",
          kind: "text",
          body: "I found a recent origin incident and an open platform role that asks for CDN and WAF experience. Building the account brief from those sources, not from a generic persona.",
        },
        {
          id: "m3",
          from: "attach",
          kind: "draft",
          draftLabel: "Account hypothesis",
          artifact: {
            kind: "packet",
            title: "Acme account hypothesis",
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
            body: "Priya, your recent status update and the Staff platform role point to the same issue: on-call still moves between tools to fail over origin. I put together a short note on how the platform team could start with CDN + WAF. Draft only. Nothing sent.",
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
            body: "Priya, the recent origin incident and the Staff platform role both point at work across CDN and WAF. I put together a one-page note on how Cloudflare could start with that platform team. Happy to walk Chris Okonkwo through it too. Draft only until you tap Send.",
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
