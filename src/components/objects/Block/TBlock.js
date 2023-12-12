import { Block, Shape } from ".";
import { Vector3 } from 'three';

class TBlock extends Shape {
    constructor(parent, x,y,z) {
        super(parent);

        this.items.push(new Block(parent, x, y, z, 5));
        this.items.push(new Block(parent, x, y + 1, z, 5));
        this.items.push(new Block(parent, x + 1, y, z, 5));
        this.items.push(new Block(parent, x - 1, y, z, 5));
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
                blocks = [new Vector3(0, 0, 0), new Vector3(1, -1, 0), new Vector3(-1, -1, 0), new Vector3(1, 1, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 1;
            }
            else if (this.orientation == 1){
                blocks = [new Vector3(-5, 0, 0), new Vector3(-1, -1, 0), new Vector3(-1, 1, 0), new Vector3(1, -1, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 2;
            }
            else if (this.orientation == 2){
                blocks = [new Vector3(0, 0, 0), new Vector3(-1, 1, 0), new Vector3(1, 1, 0), new Vector3(-1, -1, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 3;
            }
            else if (this.orientation == 3){
                blocks = [new Vector3(5, 0, 0), new Vector3(1, 1, 0), new Vector3(1, -1, 0), new Vector3(-1, 1, 0)];
                rotate = super.rotate(blocks);
                if (rotate) this.orientation = 0;
            }
        }
    }
}

export default TBlock;