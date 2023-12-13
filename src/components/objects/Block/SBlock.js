import { Block, Shape } from ".";
import { Vector3 } from 'three';

class SBlock extends Shape {
    constructor(parent, x,y,z) {
        super(parent);

        this.relative = [new Vector3(0, 0, 0), new Vector3(-1, 0, 0), new Vector3(0, 1, 0), new Vector3(1, 1, 0)];

        for (let i = 0; i < this.relative.length; i++) {
            this.items.push(new Block(parent, x + this.relative[i].x, y + this.relative[i].y, z + this.relative[i].z, 6));
        }

        for (const item of this.items){
            this.add(item);
        }
    }

    action(event){
        super.action(event);

        if (event.code === "KeyQ") {
            let bound;
            let rotate;
            if (this.orientation == 0) {
                bound = new Vector3(0, 0, 0);
                rotate = super.rotate(bound);
                if (rotate) this.orientation = 1;
            }
            else if (this.orientation == 1){
                bound = new Vector3(-5, 0, 0);
                rotate = super.rotate(bound);
                if (rotate) this.orientation = 2;
            }
            else if (this.orientation == 2){
                bound = new Vector3(0, 0, 0);
                rotate = super.rotate(bound);
                if (rotate) this.orientation = 3;
            }
            else if (this.orientation == 3){
                bound = new Vector3(5, 0, 0);
                rotate = super.rotate(bound);
                if (rotate) this.orientation = 0;
            }
        }
    }
}

export default SBlock;