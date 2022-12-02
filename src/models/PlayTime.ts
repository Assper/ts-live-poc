import { Rotation } from "./Rotation";

export type PlayTime = {
  id: number;
  start: Date;
  end: Date;
  rotationId: number;
  rotation: Rotation;
};

export type PlayList = PlayTime[];
