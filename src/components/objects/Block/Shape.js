import { Group, Vector3 } from 'three';

class Shape extends Group {
    constructor(parent) {
        super();
        
        parent.addToUpdateList(this);

        this.grid = parent.grid;
        this.blocks = parent.blocks;

        this.relative = [];
        this.items = [];

        this.locked = false;
    }

    update(timeStamp) {
        if (this.locked) return false;
        
        for (const block of this.items) {
            if (block.checkCollision(0, -1, 0)) this.locked = true;
        }

        if (!this.locked) {
            for (const block of this.items) {
                block.update(timeStamp);
            }
            return false;
        }

        for (const block of this.items) {
            if (block.lock()) return true;
        }

        return false;
    }

    action(event) {
        if (event.code === "ArrowRight"){
            for(const block of this.items) {
                if (block.position.x > 3 || block.locked || block.checkCollision(1, 0, 0)) return false;
            }
            for (const block of this.items) {
                block.position.x += 2;
            }
            return true;
        }

        if (event.code === "ArrowLeft"){
            for (const block of this.items) {
                if (block.position.x < -3 || block.locked || block.checkCollision(-1, 0, 0)) return false;
            }
            for (const block of this.items) {
                block.position.x -= 2;
            }
            return true;
        }

        if (event.code === "ArrowDown"){
            for (const block of this.items) {
                if (block.position.z > -3 || block.locked || block.checkCollision(0, 0, 1)) return false;
            }
            for (const block of this.items) {
                block.position.z += 2;
            }
            return true;
        }

        if (event.code === "ArrowUp"){
            for (const block of this.items) {
                if (block.position.z < -9 || block.locked || block.checkCollision(0, 0, -1)) return false;
            }
            for (const block of this.items) {
                block.position.z -= 2;
            }
            return true;
        }

        if (event.code === "Space"){
            for (const block of this.items) {
                if (block.position.y < -2 || block.locked || block.checkCollision(0, -1, 0)) return false;
            }
            for (const block of this.items) {
                block.position.y -= 2;
            }
            return true;
        }

        if (event.code === "KeyQ") {
            return this.rotate(0);
        }

        if (event.code === "KeyW") {
            return this.rotate(1);
        }

        if (event.code === "KeyE") {
            return this.rotate(2);
        }
    }

    rotate(direction) {
        const relative = [];
        for (let i = 0; i < this.items.length; i++) {
            if (direction == 0) relative.push(new Vector3(this.relative[i].y, -this.relative[i].x, this.relative[i].z));
            if (direction == 1) relative.push(new Vector3(this.relative[i].x, this.relative[i].z, -this.relative[i].y));
            if (direction == 2) relative.push(new Vector3(-this.relative[i].z, this.relative[i].y, this.relative[i].x));
        }

        const blocks = [];
        for (let i = 0; i < this.items.length; i++) {
            blocks.push(new Vector3().subVectors(relative[i], this.relative[i]));
        }

        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].checkCollision(blocks[i].x, blocks[i].y, blocks[i].z)) return false;
        }

        for (let i = 0; i < this.items.length; i++) {
            this.items[i].position.add(blocks[i].clone().multiplyScalar(2));
            this.relative[i] = relative[i];
        }
    }
}

export default Shape;