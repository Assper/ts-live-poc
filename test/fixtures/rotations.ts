import { Rotation } from "../../src/models/Rotation";
import { getNow, getToday, getTommorow } from "../../src/utils";

const now = getNow();
const today = getToday();
const tomorrow = getTommorow();

export const rotations: Rotation[] = [
  {
    id: 1,
    contentName: "First",
    duration: 5,
    priority: 0,
    startDate: today,
    endDate: tomorrow,
  },
  {
    id: 2,
    contentName: "Second",
    duration: 8,
    priority: 0,
    startDate: today,
    endDate: tomorrow,
  },
  {
    id: 3,
    contentName: "Third",
    duration: 5,
    priority: 1,
    startDate: today,
    endDate: tomorrow,
  },
  {
    id: 4,
    contentName: "Fourth",
    duration: 5,
    priority: 2,
    startDate: today,
    endDate: tomorrow,
  },
  {
    id: 5,
    contentName: "Fifth",
    duration: 5,
    priority: 3,
    startDate: today,
    endDate: tomorrow,
  },
  {
    id: 6,
    contentName: "Sixth",
    duration: 5,
    priority: 3,
    startDate: today,
    endDate: tomorrow,
  },
];
