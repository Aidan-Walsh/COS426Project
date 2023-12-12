import { Group } from 'three';

class Shape extends Group {
    constructor(parent) {
        super();
        
        parent.addToUpdateList(this);

        this.locked = false;
        this.grid = parent.grid;
        this.blocks = parent.blocks;
        this.orientation = 0;
        this.items = [];
    }

    update(timeStamp) {
        if (this.locked) return
        
        let willCollide = false;
        for (const block of this.items) {
            if (block.checkCollision(block, 0, -1, 0) || block.position.y == -4){
                willCollide = true;
            }
        }

        for (const block of this.items) {
            block.update(timeStamp, willCollide);
        }

        for (const block of this.items) {
            if (block.locked) {
                this.locked = true;
            }
        }

        if (!this.locked) return;

        for (const block of this.items) {
            block.locked = true;

            let c = block.coords();
            
            try {
                this.grid[c.x][c.y][c.z] = true;
                this.blocks[c.x][c.y][c.z] = block;
            }
            catch(error) {
                return true;
            }

            for (let i = 0; i < block.children.length; i++) {
                block.children[i].material.transparent = true; 
                block.children[i].material.opacity = 0.4; 
            }
        }
    }

    action(event) {

    }
}

export default Shape;