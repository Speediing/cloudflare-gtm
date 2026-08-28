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
    blurb: "The human stays in control. Their agents keep the surrounding work moving.",
    color: "#E8E8ED",
    mark: "You",
    seat: true,
  },
  {
    id: "room",
    name: "Room Ops",
    blurb: "Listens on the call. Rewrites the open deck on its own computer.",
    jobId: "standardize-room",
    color: "#34C759",
  },
  {
    id: "inbox",
    name: "Paper",
    blurb: "Watches procurement. Finds answers overnight on its own computer.",
    jobId: "legal-redlines",
    color: "#FF375F",
  },
  {
    id: "cross-sell",
    name: "Outbound",
    blurb: "Researches target accounts. Queues drafts on its own computer.",
    jobId: "attach-engine",
    color: "#FF9500",
  },
];
