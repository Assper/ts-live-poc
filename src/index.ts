import { addSeconds } from "date-fns";
import { first, timer } from "rxjs";
import { playList } from "../test/fixtures/play-list";
import { LiveService } from "./live.service";
import { PlayTimeRepository } from "./play-time.repository";

const repo = new PlayTimeRepository(playList);
const service = new LiveService(repo);
service.init().then(() => {
  service.$live.pipe(first()).subscribe((live) => {
    console.log("----- LIVE -----");
    const now = new Date();
    console.log(now.toISOString(), live);
  });

  service.$live.subscribe((live) => {
    console.log("----- CURRENT -----");
    const now = new Date();
    console.log(now.toISOString(), live.current);
  });

  timer(2000).subscribe(() => {
    console.log("----- ADD NEW ROTATION -----");
    const lastItem = playList[playList.length - 1];
    const rotation = {
      ...lastItem.rotation,
      id: 10,
      contentName: "New Item",
      priority: 999,
    };
    const start = addSeconds(lastItem.start, 5);
    repo.addRotation(rotation, [
      {
        id: 10,
        start,
        end: addSeconds(start, rotation.duration),
        rotationId: 10,
        rotation,
      },
    ]);
  });
});
