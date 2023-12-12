import { Group } from 'three';
import { Block } from ".";


class TBlock extends Group {
    constructor(parent, x,y,z) {
        super();
        this.items = [];
        this.locked = false;
        this.items.push(new Block(parent, x, y, z, 5));
        this.items.push(new Block(parent, x, y + 1, z, 5));
        this.items.push(new Block(parent, x + 1, y, z, 5));
        this.items.push(new Block(parent, x - 1, y, z, 5));
        for (const item of this.items){
            this.add(item);
        }
        parent.addToUpdateList(this);
    }

    update(timeStamp) {
        for(const block of this.items){
            if (block.locked) {
                //this.remove(block)
                //this.items = this.items.filter(item => item !== block);
                this.locked = true;
            }
        }
        //console.log(this.items.length);
        if (this.locked){
            for(const block of this.items){
                block.locked = true;
            }
        }
    }

    action(event){
        let performAction = true;
        if (event.key === "ArrowRight"){
            for(const block of this.items){
                if (block.position.x > 3) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.x += 2;
                }
            }
        }
        if (event.key === "ArrowLeft"){
            for(const block of this.items){
                if (block.position.x < -3) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.x -= 2;
                }
            }
        }
        if (event.key === "ArrowDown"){
            for(const block of this.items){
                if (block.position.z > -3) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.z += 2;
                }
            }
        }
        if (event.key === "ArrowUp"){
            for(const block of this.items){
                if (block.position.z < -9) {
                    performAction = false;
                }
            }
            if (performAction) {
                for(const block of this.items){
                    block.position.z -= 2;
                }
            }
        }
    }
}

export default TBlock;