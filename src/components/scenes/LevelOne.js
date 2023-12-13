import Level from "./Level";
import { LevelNum } from "../objects/UI";

class LevelOne extends Level {
    constructor(highScore) {
        // Call parent Scene() constructor
        super(highScore);

        this.blockList = [0, 1, 2, 3, 1, 3, 0, 0, 1, 4, 2, 3, 0, 2, 1, 4, 3, 0, 1, 2];
    }

    update(timeStamp, cameraPosition, cameraTarget) {
        super.update(timeStamp, cameraPosition, cameraTarget);

        if (timeStamp - this.lastUpdate > 10000){
            if (!this.pause){
                this.difficulty += 0.1;
            }
            this.lastUpdate = timeStamp;
        }
    }

    reset() {
        super.reset();
        this.difficulty = 1;
        const level = new LevelNum(this, "LEVEL ONE");
        this.add(level);
    }
}

export default LevelOne;
