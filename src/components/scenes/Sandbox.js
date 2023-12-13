import * as Dat from 'dat.gui';
import { OBlock, LBlock, JBlock, IBlock, SBlock, ZBlock, TBlock } from '../objects/Block';
import TetrisScene from './TetrisScene';

class Sandbox extends TetrisScene {
    constructor(highScore) {
        // Call parent Scene() constructor
        super(highScore);

        this.state = {
            gui: new Dat.GUI(),
            IBlocks: true,
            OBlocks: true,
            LBlocks: true,
            JBlocks: true,
            TBlocks: true,
            SBlocks: true,
            ZBlocks: true,
            updateList: []
        };

        this.state.gui.add(this.state, 'IBlocks');
        this.state.gui.add(this.state, 'OBlocks');
        this.state.gui.add(this.state, 'LBlocks');
        this.state.gui.add(this.state, 'JBlocks');
        this.state.gui.add(this.state, 'TBlocks');
        this.state.gui.add(this.state, 'SBlocks');
        this.state.gui.add(this.state, 'ZBlocks');
    }

    update(timeStamp, cameraPosition, cameraTarget) {
        super.update(timeStamp, cameraPosition, cameraTarget);

        if (timeStamp - this.lastUpdate > 10000){
            if (!this.pause) {
                this.difficulty += 0.1;
            }
            this.lastUpdate = timeStamp;
        }
    }

    getBlock() {
        let x = 2;
        let y = 0;
        let z = 2;

        let random = Math.floor(Math.random() * 7);

        if (random == 0 && this.state.TBlocks){
            const block = new TBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 1 && this.state.JBlocks){
            const block = new JBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 2 && this.state.LBlocks){
            const block = new LBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 3 && this.state.OBlocks){
            const block = new OBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 4 && this.state.IBlocks){
            const block = new IBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 5 && this.state.SBlocks){
            const block = new SBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }
        if (random == 6 && this.state.ZBlocks){
            const block = new ZBlock(this, x, y, z);
            this.current = block;
            this.add(block);
            return true;
        }

        return false;
    }

    reset() {
        super.reset();
        this.difficulty = 1;
    }
}

function updateScore(newScore) {
    document.getElementById('score').innerText = `Score: ${newScore}`;
}

function updateHighScore(newHighScore) {
    document.getElementById('high-score').innerText = `High Score: ${newHighScore}`;
}

export default Sandbox;
