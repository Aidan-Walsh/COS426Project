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
}

export default Shape;