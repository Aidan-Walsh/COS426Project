import { Group, Vector3 } from 'three';

class Shape extends Group {
    constructor(parent) {
        super();
        
        parent.addToUpdateList(this);

        this.locked = false;
        this.grid = parent.grid;
        this.blocks = parent.blocks;

        this.orientation = 0;
        this.relative = [];

        this.items = [];
    }

    update(timeStamp) {
        if (this.locked) return
        
        let willCollide = false;
        for (const block of this.items) {
            if (block.checkCollision(block, 0, -1, 0) || block.position.y == -4){
                willCollide = true;

                 // remove shadow children if about to collide
                 for (let j = 2; j < block.children.length; j++) {
                    block.remove(block.children[j]); 
                    }   
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
        let performAction = true;
        if (event.code === "ArrowRight"){
            for(const block of this.items){
                if (block.position.x > 3 || block.locked || block.checkCollision(block, 1, 0, 0)) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.x += 2;
                }
            }
        }
        if (event.code === "ArrowLeft"){
            for(const block of this.items){
                if (block.position.x < -3 || block.locked || block.checkCollision(block, -1, 0, 0)) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.x -= 2;
                }
            }
        }
        if (event.code === "ArrowDown"){
            for(const block of this.items){
                if (block.position.z > -3 || block.locked || block.checkCollision(block, 0, 0, 1)) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.z += 2;
                }
            }
        }
        if (event.code === "ArrowUp"){
            for(const block of this.items){
                if (block.position.z < -9 || block.locked || block.checkCollision(block, 0, 0, -1)) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.z -= 2;
                }
            }
        }
        if (event.code === "Space"){
            for(const block of this.items){
                if (block.position.y < -2 || block.locked || block.checkCollision(block, 0, -1, 0)) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.y -= 2;
                }
            }
        }
    }

    rotate(bound) {
        const relative = [];
        relative.push(new Vector3(0, 0, 0));
        for (let i = 1; i < this.items.length; i++) {
            relative.push(new Vector3(this.relative[i].y, -this.relative[i].x, 0));
        }

        const blocks = [];
        blocks.push(bound);
        for (let i = 1; i < this.items.length; i++) {
            blocks.push(new Vector3().subVectors(relative[i], this.relative[i]));
        }

        if (blocks[0].x < 0 && this.items[0].position.x <= blocks[0].x) return false;
        if (blocks[0].x > 0 && this.items[0].position.x >= blocks[0].x) return false;
        if (blocks[0].y < 0 && this.items[0].position.y <= blocks[0].y) return false;
        if (blocks[0].y > 0 && this.items[0].position.y >= blocks[0].y) return false;
        if (blocks[0].z < 0 && this.items[0].position.z <= blocks[0].z) return false;
        if (blocks[0].z > 0 && this.items[0].position.z >= blocks[0].z) return false;

        for (let i = 1; i < this.items.length; i++) {
            if (this.items[i].checkCollision(this.items[i], blocks[i].x, blocks[i].y, 0)) return false;
        }

        for (let i = 1; i < this.items.length; i++) {
            this.items[i].position.add(blocks[i].clone().multiplyScalar(2));
            this.relative[i] = relative[i];
        }

        return true;
    }
}

export default Shape;