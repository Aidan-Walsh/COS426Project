import { Group } from 'three';
import { Block, Shape } from ".";


class OBlock extends Shape {
    constructor(parent, x,y,z) {
        super(parent);

        this.items.push(new Block(parent, x, y, z, 1));
        this.items.push(new Block(parent, x + 1, y, z, 1));
        this.items.push(new Block(parent, x, y + 1, z, 1));
        this.items.push(new Block(parent, x + 1, y + 1, z, 1));
        for (const item of this.items){
            this.add(item);
        }
    }

    action(event){
        super.action(event);
    }
}

export default OBlock;