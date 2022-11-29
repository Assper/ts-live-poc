import { rotations } from "../test/fixtures/rotations";
import { LiveService } from "./live.service";

const service = new LiveService();
service.init(rotations).then(() => {
  service.$live.subscribe((live) => {
    const now = new Date();
    console.log(now.toISOString(), live);
  });
});
