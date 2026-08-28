import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every sales rep",
    blurb: "The seller stays in control. Their agents handle the work around the deal.",
    color: "#E8E8ED",
    mark: "You",
    seat: true,
  },
  {
    id: "room",
    name: "Room Ops",
    blurb: "Listens to the call and updates the open deck on its own computer.",
    jobId: "standardize-room",
    color: "#34C759",
  },
  {
    id: "inbox",
    name: "Paper",
    blurb: "Watches procurement and finds answers on its own computer.",
    jobId: "legal-redlines",
    color: "#FF375F",
  },
  {
    id: "cross-sell",
    name: "Outbound",
    blurb: "Researches target accounts and drafts outreach on its own computer.",
    jobId: "attach-engine",
    color: "#FF9500",
  },
];
