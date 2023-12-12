import { Block, Shape } from ".";
import { Vector3 } from 'three';

class IBlock extends Shape {
    constructor(parent, x,y,z) {
        super(parent);

        this.items.push(new Block(parent, x, y, z, 4));
        this.items.push(new Block(parent, x - 1, y, z, 4));
        this.items.push(new Block(parent, x + 1, y, z, 4));
        this.items.push(new Block(parent, x + 2, y, z, 4));
        for (const item of this.items){
            this.add(item);
        }
    }

    action(event){
        super.action(event);

        if (event.code === "KeyQ") {
            let blocks;
            let rotate;
            if (this.orientation == 0) {
                blocks = [new Vector3(0, -2, 0), new Vector3(1, 1, 0), new Vector3(-1, -1, 0), new Vector3(-2, -2, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 1;
            }
            else if (this.orientation == 1){
                blocks = [new Vector3(-3, 0, 0), new Vector3(1, -1, 0), new Vector3(-1, 1, 0), new Vector3(-2, 2, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 2;
            }
            else if (this.orientation == 2){
                blocks = [new Vector3(0, 0, 0), new Vector3(-1, -1, 0), new Vector3(1, 1, 0), new Vector3(2, 2, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 3;
            }
            else if (this.orientation == 3){
                blocks = [new Vector3(3, 0, 0), new Vector3(-1, 1, 0), new Vector3(1, -1, 0), new Vector3(2, -2, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 0;
            }
        }
    }
}

export default IBlock;
