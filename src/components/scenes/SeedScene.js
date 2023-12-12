import * as Dat from 'dat.gui';
import { Scene, Color, Mesh } from 'three';
import { Flower, Land } from 'objects';
import { BasicLights } from 'lights';
import Floor from '../objects/Floor/Floor';
import { FloorMesh } from '../objects/FloorMesh';
import { RearWall } from '../objects/RearWall';
import { RearWallMesh } from '../objects/RearWallMesh';
import { RightWall } from '../objects/RightWall';
import { LeftWall } from '../objects/LeftWall';
import { LeftWallMesh } from '../objects/LeftWallMesh';
import { RightWallMesh } from '../objects/RightWallMesh';
import { Block, OBlock, LBlock, JBlock, IBlock, SBlock, ZBlock, TBlock } from '../objects/Block';
import { GameOver } from '../objects/UI';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        this.size = 6;

        this.grid = new Array(this.size);
        this.blocks = new Array(this.size);
        for (let i = 0; i < this.size; i++) {
            this.grid[i] = new Array(this.size);
            this.blocks[i] = new Array(this.size);
            for (let j = 0; j < this.size; j++) {
                this.grid[i][j] = new Array(this.size);
                this.blocks[i][j] = new Array(this.size);
            }
        }
        
        this.setupEventListeners();
        
        this.reset();
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    clearRows(){
        let yPlane = 0;
        let size = 6;
        while (yPlane < 6){
            let clear = true;
            for (let i = 0; i < size; i++) {
                for (let j = 0; j < size; j++) {
                    if (!this.grid[i][yPlane][j]){
                        clear = false;
                        break;
                    }
                }
                if (!clear){
                    break;
                }
            }
            if (clear) {
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        this.grid[i][yPlane][j] = false;
                        this.blocks[i][yPlane][j].parent.remove(this.blocks[i][yPlane][j]);
                        this.blocks[i][yPlane][j] = null;
                    }
                }
                for (let i = 0; i < size; i++) {
                    for (let j = 0; j < size; j++) {
                        for (let k = yPlane + 1; k < size; k++){
                            if (this.grid[i][k][j]){
                                this.grid[i][k][j] = false;
                                this.grid[i][k - 1][j] = true;
                                const block = this.blocks[i][k][j];
                                this.blocks[i][k][j] = null;
                                block.position.y -= 2;
                                this.blocks[i][k - 1][j] = block;
                            }
                        }
                    }
                }
            }
            else {
                yPlane += 1;
            }
        }
    }

    update(timeStamp) {
        this.clearRows();
        if (this.lastUpdate == 0) {
          this.lastUpdate = timeStamp;
        }
        if (timeStamp - this.lastUpdate > 10000){
            this.difficulty += 0.2;
            this.lastUpdate = timeStamp;
        }
        if (this.game == 1){
            if (!this.current || this.current.locked) {
                let random = Math.floor(Math.random() * 7);
                if (random == 0){
                    const block = new TBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 1){
                    const block = new JBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 2){
                    const block = new LBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 3){
                    const block = new OBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 4){
                    const block = new IBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 5){
                    const block = new SBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
                if (random == 6){
                    const block = new ZBlock(this, 2,0,0,0);
                    this.current = block;
                    this.add(block);
                }
            }
            const gameOver = this.current.update(timeStamp);
            if (gameOver) {
                const block = new GameOver(this);
                this.current = block;
                this.add(block);
                this.game = 0;
            }
        }
        this.current.update(timeStamp);
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    // Event handler for keydown events
    handleKeyDown(event) {
        this.current.action(event);
    }

    reset() {
        this.current = null;
        this.game = 1;

        for (let i = this.children.length - 1; i >= 0; i--) {
            this.remove(this.children[i]);
        }

        for (let i = 0; i < this.size; i++) {
            for (let j = 0; j < this.size; j++) {
                for (let k = 0; k < this.size; k++) {
                    this.grid[i][j][k] = false;
                    this.blocks[i][j][k] = null;
                }
            }
        }

        this.state = {
            updateList: [],
        };

        this.difficulty = 1;
        this.lastUpdate = 0;

        const lights = new BasicLights();
        const floor = new Floor(this); 
        const floormesh = new FloorMesh(); 
        const rearwall = new RearWall(); 
        const rearwallmesh = new RearWallMesh(); 
        const leftwall = new LeftWall(); 
        const leftwallmesh = new LeftWallMesh();
   
        this.add(lights, floor, floormesh, rearwall, rearwallmesh, leftwall, leftwallmesh);
    }
}

export default SeedScene;
