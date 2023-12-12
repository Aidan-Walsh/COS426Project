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

export default OBlock;