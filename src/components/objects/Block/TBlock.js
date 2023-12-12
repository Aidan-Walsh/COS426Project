import { Group } from 'three';
import { Block } from ".";


class TBlock extends Group {
    constructor(parent, x,y,z) {
        super();
        this.items = [];
        parent.addToUpdateList(this);
        this.locked = false;
        this.grid = parent.grid;
        this.orientation = 0;
        this.items.push(new Block(parent, x, y, z, 5));
        this.items.push(new Block(parent, x, y + 1, z, 5));
        this.items.push(new Block(parent, x + 1, y, z, 5));
        this.items.push(new Block(parent, x - 1, y, z, 5));
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
                    
                    try {this.grid[x][y][z] = true;}
                    catch(error) {return true;}
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
        if (event.code === "KeyQ") {
            let willCollde = false;
            if (this.orientation == 0){
                if (this.items[1].checkCollision(this.items[1], 1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], -1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], 1, 1, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x += 2;
                    this.items[1].position.y -= 2;
                    this.items[2].position.x -= 2;
                    this.items[2].position.y -= 2;
                    this.items[3].position.x += 2;
                    this.items[3].position.y += 2;
                    this.orientation = 1;
                }
            }
            else if (this.orientation == 1){
                if (this.items[0].position.x == -5){
                    willCollde = true;
                }
                if (this.items[1].checkCollision(this.items[1], -1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], -1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], 1, -1, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x -= 2;
                    this.items[1].position.y -= 2;
                    this.items[2].position.x -= 2;
                    this.items[2].position.y += 2;
                    this.items[3].position.x += 2;
                    this.items[3].position.y -= 2;
                    this.orientation = 2;
                }
            }
            else if (this.orientation == 2){
                if (this.items[1].checkCollision(this.items[1], -1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], 1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], -1, -1, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x -= 2;
                    this.items[1].position.y += 2;
                    this.items[2].position.x += 2;
                    this.items[2].position.y += 2;
                    this.items[3].position.x -= 2;
                    this.items[3].position.y -= 2;
                    this.orientation = 3;
                }
            }
            else if (this.orientation == 3){
                if (this.items[0].position.x == 5){
                    willCollde = true;
                }
                if (this.items[1].checkCollision(this.items[1], 1, 1, 0)){
                    willCollde = true;
                }
                if (this.items[2].checkCollision(this.items[2], 1, -1, 0)){
                    willCollde = true;
                }
                if (this.items[3].checkCollision(this.items[3], -1, 1, 0)){
                    willCollde = true;
                }
                if (!willCollde){
                    this.items[1].position.x += 2;
                    this.items[1].position.y += 2;
                    this.items[2].position.x += 2;
                    this.items[2].position.y -= 2;
                    this.items[3].position.x -= 2;
                    this.items[3].position.y += 2;
                    this.orientation = 0;
                }
            }
        }
    }
}

export default TBlock;