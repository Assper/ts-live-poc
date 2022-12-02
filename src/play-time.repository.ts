import { ReplaySubject } from "rxjs";
import { PlayList } from "./models/PlayTime";
import { Rotation } from "./models/Rotation";
import { getToday, getTommorow, isBetween } from "./utils";

export class PlayTimeRepository {
  readonly $add = new ReplaySubject<Rotation>(1);
  readonly $remove = new ReplaySubject<Rotation>(1);
  readonly $update = new ReplaySubject<Rotation>(1);

  constructor(private data: PlayList) {}

  getByRotation(rotation: Rotation): PlayList {
    return this.data.filter(({ rotationId }) => rotationId === rotation.id);
  }

  getByToday(): PlayList {
    const today = getToday();
    const tomorrow = getTommorow();
    return this.data.filter(({ start }) =>
      isBetween({
        date: start,
        start: today,
        end: tomorrow,
      })
    );
  }

  getAll(): PlayList {
    return this.data;
  }

  addPlayList(list: PlayList): void {
    this.data.push(...list);
  }

  addRotation(rotation: Rotation, playList: PlayList): void {
    this.addPlayList(playList);
    this.$add.next(rotation);
  }

  removeRotation(rotation: Rotation): void {
    this.data = this.data.filter(
      ({ rotationId }) => rotationId !== rotation.id
    );
    this.$remove.next(rotation);
  }

  updateRotation(rotation: Rotation, playList: PlayList): void {
    this.data = this.data.filter(
      ({ rotationId }) => rotationId !== rotation.id
    );
    this.addPlayList(playList);
    this.$update.next(rotation);
  }
}
