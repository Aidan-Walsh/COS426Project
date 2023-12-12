import { Group } from 'three';
import { Block } from ".";


class IBlock extends Group {
    constructor(parent, x,y,z, difficulty) {
        super();
        this.items = [];
        this.items.push(new Block(parent, x, y, z, 4, difficulty));
        this.items.push(new Block(parent, x - 1, y, z, 4, difficulty));
        this.items.push(new Block(parent, x + 1, y, z, 4, difficulty));
        this.items.push(new Block(parent, x + 2, y, z, 4, difficulty));
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

export default IBlock;