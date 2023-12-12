import { Group } from 'three';
import { Block } from ".";


class OBlock extends Group {
    constructor(parent, x,y,z) {
        super();
        this.items = [];
        parent.addToUpdateList(this);
        this.locked = false;
        this.grid = parent.grid;
        this.items.push(new Block(parent, x, y, z, 1));
        this.items.push(new Block(parent, x + 1, y, z, 1));
        this.items.push(new Block(parent, x, y + 1, z, 1));
        this.items.push(new Block(parent, x + 1, y + 1, z, 1));
        for (const item of this.items){
            this.add(item);
        }
    }

    update(timeStamp) {
        if (!this.locked){
            let willCollde = false;
            for(const block of this.items){
                if (block.checkCollision(block, 0, -1, 0)){
                    willCollde = true;
                // remove shadow children if about to collide
                for (let j = 2; j < block.children.length; j++) {
                    block.remove(block.children[j]); 
                    } 
                }
            }
            for(const block of this.items){
                block.update(timeStamp, willCollde);
            }
            for(const block of this.items){
                if (block.locked) {
                    this.locked = true;
                }
            }
            if (this.locked){
                for(const block of this.items){
                    block.locked = true;
                    let x = (block.position.x + 5)/2;
                    let y = (block.position.y + 4)/2;
                    let z = (block.position.z + 11)/2;

                    // remove all previous children that are not the edges and cube, which are 0 and 1 indices
                    // to get rid of shadow when it lands
                    for (let j = 2; j < block.children.length; j++) {
                        block.remove(block.children[j]); 
                }

                    try {this.grid[x][y][z] = true;}
                    catch(error) {return true;}
                            for (let i = 0; i < block.children.length; i++) { // change opacity at bottom
                                block.children[i].material.transparent= true; 
                               block.children[i].material.opacity = 0.4; 
                             }
                }
            }
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