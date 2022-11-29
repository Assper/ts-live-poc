import { PlayTime } from "./PlayTime";

export type Rotation = {
  id: number;
  contentName: string;
  duration: number; // seconds
  priority: number;
  startDate: Date;
  endDate: Date;
  nextPlay?: PlayTime;
};
