import { BehaviorSubject } from "rxjs";
import { Live } from "./models/Live";
import { Rotation } from "./models/Rotation";

export class LiveService {
  readonly $live = new BehaviorSubject<Live>({ list: [] });

  get live() {
    return this.$live.getValue();
  }

  private get rotations() {
    return this.live.list;
  }

  private get rotationsIds() {
    return this.rotations.map(({ id }) => id);
  }

  private getCurrent(rotations: Rotation[]): Rotation | undefined {
    return rotations[0];
  }

  async init(rotations: Rotation[]): Promise<void> {
    this.$live.next({
      current: this.getCurrent(rotations),
      list: rotations,
    });
  }
}
