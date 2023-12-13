import Level from "./Level";
import { LevelNum } from "../objects/UI";

class LevelTwo extends Level {
    constructor(highScore) {
        // Call parent Scene() constructor
        super(highScore);

        this.blockList = [3, 1, 3, 3, 5, 2, 1, 5, 5, 4, 2, 3, 6, 3, 2, 6, 3, 2, 3, 0, 4, 6, 1, 0, 2, 6, 4, 2, 5, 0, 0, 1, 1, 5, 4, 4, 4, 5, 6, 5];
    }

    update(timeStamp, cameraPosition, cameraTarget) {
        super.update(timeStamp, cameraPosition, cameraTarget);

        if (timeStamp - this.lastUpdate > 10000){
            if (!this.pause){
                this.difficulty += 0.2;
            }
            this.lastUpdate = timeStamp;
        }
    }

    reset() {
        super.reset();
        this.difficulty = 1.5;
        const level = new LevelNum(this, "LEVEL TWO");
        this.add(level);
    }
}

export default LevelTwo;