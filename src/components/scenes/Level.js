import { OBlock, LBlock, JBlock, IBlock, SBlock, ZBlock, TBlock } from '../objects/Block';
import { Complete } from '../objects/UI';
import TetrisScene from './TetrisScene';

class Level extends TetrisScene {
    constructor(highScore) {
        // Call parent Scene() constructor
        super(highScore);

        this.blockList = [];
    }

    getBlock() {
        let x = 2;
        let y = 0;
        let z = 2;

        let blockNum = 7;
        if (this.index == this.blockList.length){
            const block = new Complete(this);
            this.current = block;
            this.add(block);
            this.game = 0;
            return true;
        } else {
            blockNum = this.blockList[this.index];
            this.index += 1;
        }
        if (blockNum == 0){
            const block = new TBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 1){
            const block = new JBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 2){
            const block = new LBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 3){
            const block = new OBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 4){
            const block = new IBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 5){
            const block = new SBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (blockNum == 6){
            const block = new ZBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        return false;
    }

    reset() {
        super.reset();
        this.index = 0;
    }
}

export default Level;
