import { Group } from 'three';
import { Block } from ".";


class JBlock extends Group {
    constructor(parent, x,y,z, difficulty) {
        super();
        this.items = [];
        this.items.push(new Block(parent, x, y, z, 2, difficulty));
        this.items.push(new Block(parent, x - 1, y, z, 2, difficulty));
        this.items.push(new Block(parent, x + 1, y, z, 2, difficulty));
        this.items.push(new Block(parent, x - 1, y + 1, z, 2, difficulty));
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

export default JBlock;