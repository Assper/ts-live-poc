import { addDays, addSeconds } from "date-fns";
import { Rotation } from "../../src/models/Rotation";

const now = new Date();

export const rotations: Rotation[] = [
  {
    id: 1,
    contentName: "First",
    duration: 10,
    priority: 0,
    startDate: now,
    endDate: addDays(now, 1),
    nextPlay: {
      start: now,
      end: addSeconds(now, 10),
    },
  },
];
