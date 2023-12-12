import { Group } from 'three';
import { Block } from ".";


class SBlock extends Group {
    constructor(parent, x,y,z, difficulty) {
        super();
        this.items = [];
        this.items.push(new Block(parent, x, y, z, 6, difficulty));
        this.items.push(new Block(parent, x - 1, y, z, 6, difficulty));
        this.items.push(new Block(parent, x, y + 1, z, 6, difficulty));
        this.items.push(new Block(parent, x + 1, y + 1, z, 6, difficulty));
        for (const item of this.items){
            this.add(item);
        }
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        for(const block of this.items){
            block.update(timeStamp);
        }
    }
}

export default SBlock;