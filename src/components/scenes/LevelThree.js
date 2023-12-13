import Level from "./Level";
import { LevelNum } from "../objects/UI";

class LevelThree extends Level {
    constructor(highScore) {
        // Call parent Scene() constructor
        super(highScore);

        this.blockList = [6, 4, 5, 3, 1, 4, 3, 1, 0, 0, 1, 0, 4, 0, 3, 0, 5, 2, 1, 0, 6, 3, 3, 6, 6, 4, 6, 3, 4, 2, 3, 1, 1, 2, 6, 6, 2, 0, 2, 5, 5, 6, 4, 5, 4, 1, 0, 1, 3, 5, 1, 1, 2, 5, 3, 0, 4, 6, 2, 2];
    }

    update(timeStamp, cameraPosition, cameraTarget) {
        super.update(timeStamp, cameraPosition, cameraTarget);

        if (timeStamp - this.lastUpdate > 7500){
            if (!this.pause){
                this.difficulty += 0.2;
            }
            this.lastUpdate = timeStamp;
        }
    }

    reset() {
        super.reset();
        this.difficulty = 2;
        const level = new LevelNum(this, "LEVEL THREE");
        this.add(level);
    }
}

export default LevelThree;