import { addSeconds } from "date-fns";
import { PlayList, PlayTime } from "../../src/models/PlayTime";
import { getNow } from "../../src/utils";
import { rotations } from "./rotations";

const now = getNow();

const rawList: Omit<PlayTime, "rotation" | "end">[] = [
  {
    id: 1,
    start: now,
    rotationId: 1,
  },
  {
    id: 2,
    start: now,
    rotationId: 2,
  },
  {
    id: 3,
    start: addSeconds(now, 5),
    rotationId: 3,
  },
  {
    id: 4,
    start: addSeconds(now, 5),
    rotationId: 4,
  },
  {
    id: 5,
    start: addSeconds(now, 10),
    rotationId: 5,
  },
  {
    id: 6,
    start: addSeconds(now, 12),
    rotationId: 6,
  },
];

export const playList: PlayList = rawList.map((item) => {
  const rotation = rotations.find(({ id }) => id === item.rotationId);
  if (!rotation) {
    throw Error(`Rotation with id ${item.rotationId} not found`);
  }
  return {
    ...item,
    end: addSeconds(item.start, rotation.duration),
    rotation,
  };
});
