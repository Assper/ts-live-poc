import { isAfter, isBefore } from "date-fns";
import { BehaviorSubject, first, ReplaySubject, timer } from "rxjs";
import { filter } from "rxjs/operators";
import { Live } from "./models/Live";
import { PlayList, PlayTime } from "./models/PlayTime";
import { Rotation } from "./models/Rotation";
import { PlayTimeRepository } from "./play-time.repository";
import { getNow, isBetween } from "./utils";

export class LiveService {
  readonly $live = new BehaviorSubject<Live>({ list: [] });
  readonly $playTrigger = new ReplaySubject<PlayTime>(1);

  constructor(private repo: PlayTimeRepository) {}

  get live() {
    return this.$live.getValue();
  }

  private get current() {
    return this.live.current;
  }

  private get playList() {
    return this.live.list;
  }

  private getCurrent(list: PlayList): PlayTime | undefined {
    const now = getNow();
    const currents = list.filter(({ start, end }) =>
      isBetween({
        start,
        end,
        date: now,
      })
    );
    currents.sort((a, b) => a.rotation.priority - b.rotation.priority);
    return currents.pop();
  }

  private setCurrent(playTime: PlayTime): void {
    if (
      !this.current ||
      this.current.rotation.priority < playTime.rotation.priority
    ) {
      this.$live.next({
        current: playTime,
        list: this.playList,
      });
    }
  }

  private addPlayEvent(item: PlayTime): void {
    timer(item.start)
      .pipe(
        first(),
        filter(() => !!this.playList.find(({ id }) => item.id === id))
      )
      .subscribe(() => this.setCurrent(item));
  }

  private initPlayEvents(list: PlayList): void {
    const now = getNow();
    list
      .filter(({ start }) => isAfter(start, now))
      .forEach((item) => this.addPlayEvent(item));
  }

  private removeRotationFromPlayList(rotation: Rotation): void {
    const playList = this.playList.filter(
      (item) => item.rotation.id !== rotation.id
    );
    this.$live.next({
      current: this.current,
      list: playList,
    });
  }

  private addRotationToPlayList(rotation: Rotation): void {
    const newItems = this.repo.getByRotation(rotation);
    const playList = this.playList.concat(newItems);
    playList.sort((a, b) => {
      if (isAfter(a.start, b.start)) return -1;
      if (isBefore(a.start, b.start)) return 1;
      return 0;
    });
    this.initPlayEvents(newItems);
    this.$live.next({
      current: this.current,
      list: playList,
    });
  }

  private updateRotationInPlayList(rotation: Rotation): void {
    const newItems = this.repo.getByRotation(rotation);
    const cleanerList = this.playList.filter(
      (item) => item.rotation.id !== rotation.id
    );
    const playList = cleanerList.concat(newItems);
    playList.sort((a, b) => {
      if (isAfter(a.start, b.start)) return -1;
      if (isBefore(a.start, b.start)) return 1;
      return 0;
    });
    this.initPlayEvents(newItems);
    this.$live.next({
      current: this.current,
      list: playList,
    });
  }

  async init(): Promise<void> {
    const list = this.repo.getByToday();
    this.initPlayEvents(list);
    this.$live.next({
      current: this.getCurrent(list),
      list,
    });

    this.repo.$add.subscribe((rotation) => {
      this.addRotationToPlayList(rotation);
    });

    this.repo.$remove.subscribe((rotation) => {
      this.removeRotationFromPlayList(rotation);
    });

    this.repo.$update.subscribe((rotation) => {
      this.updateRotationInPlayList(rotation);
    });
  }
}
