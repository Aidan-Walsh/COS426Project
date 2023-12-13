import * as Dat from 'dat.gui';
import { Scene, Color, TextureLoader } from 'three';

import { BasicLights } from 'lights';
import Floor from '../objects/Floor/Floor';
import { FloorMesh } from '../objects/FloorMesh';
import { RearWall } from '../objects/RearWall';
import { RearWallMesh } from '../objects/RearWallMesh';
import { LeftWall } from '../objects/LeftWall';
import { LeftWallMesh } from '../objects/LeftWallMesh';
import { OBlock, LBlock, JBlock, IBlock, SBlock, ZBlock, TBlock } from '../objects/Block';
import { GameOver, Level, Complete } from '../objects/UI';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';

class LevelTwo extends Scene {
    constructor(highScore) {
        // Call parent Scene() constructor
        super();

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        const loader = new TextureLoader(); 
        this.background = loader.load("https://t4.ftcdn.net/jpg/05/16/98/21/360_F_516982134_z3zQOQ9eEXRjT6waxQMwBaTeiqulpsDG.jpg"); 
        this.highScore = highScore;
        this.size = 6;

        const fontJson = require( "three/examples/fonts/gentilis_bold.typeface.json" );
        this.font = new Font( fontJson );

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

        this.blockList = [3, 1, 3, 3, 5, 2, 1, 5, 5, 4, 2, 3, 6, 3, 2, 6, 3, 2, 3, 0, 4, 6, 1, 0, 2, 6, 4, 2, 5, 0, 0, 1, 1, 5, 4, 4, 4, 5, 6, 5];

        this.state = {
            updateList: []
        };
        
        this.setupEventListeners();
        this.reset();
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    clearRows(){
        let yPlane = 0;
        let numClears = 0;
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
                numClears += 1;
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
        if (numClears == 1){
            this.score += (1000 * this.difficulty);
        }
        if (numClears == 2){
            this.score += (3000 * this.difficulty);
        }
        if (numClears == 3){
            this.score += (5000 * this.difficulty);
        }
        if (numClears == 4){
            this.score += (8000 * this.difficulty);
        }
        if (this.score > this.highScore){
            this.highScore = this.score;
        }
        updateHighScore(Math.floor(this.highScore));
        updateScore(Math.floor(this.score));
    }

    update(timeStamp) {
        if (this.lastUpdate == 0) {
          this.lastUpdate = timeStamp;
        }
        if (timeStamp - this.lastUpdate > 10000){
            if (!this.pause){
                this.difficulty += 0.2;
            }
            this.lastUpdate = timeStamp;
        }
        if (!this.pause){
            if (this.game == 1){
                if (!this.current || this.current.locked) {
                    this.clearRows();
                    let blockNum = 7;
                    if (this.index == 40){
                        const block = new Complete(this);
                        this.current = block;
                        this.add(block);
                        this.game = 0;
                    } else {
                        blockNum = this.blockList[this.index];
                        this.index += 1;
                    }
                    if (blockNum == 0){
                        const block = new TBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 1){
                        const block = new JBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 2){
                        const block = new LBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 3){
                        const block = new OBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 4){
                        const block = new IBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 5){
                        const block = new SBlock(this, 2,0,2,0);
                        this.current = block;
                        this.add(block);
                    }
                    if (blockNum == 6){
                        const block = new ZBlock(this, 2,0,2,0);
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
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    // Event handler for keydown events
    handleKeyDown(event) {
        if (!this.pause && this.current){
            this.current.action(event);
        }
        if (event.code === "KeyP"){
            this.pause = !this.pause;
        }
    }

    reset() {
        this.current = null;
        this.pause = false;
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

        this.state.updateList = [];

        this.difficulty = 1.5;
        this.score = 0;
        this.lastUpdate = 0;
        this.index = 0;

        const lights = new BasicLights();
        const floor = new Floor(this); 
        const floormesh = new FloorMesh(); 
        const rearwall = new RearWall(); 
        const rearwallmesh = new RearWallMesh(); 
        const leftwall = new LeftWall(); 
        const leftwallmesh = new LeftWallMesh();
        const level = new Level(this, "LEVEL TWO");
        this.add(lights, floor, floormesh, rearwall, rearwallmesh, leftwall, leftwallmesh, level);
    }
}

function updateScore(newScore) {
    document.getElementById('score').innerText = `Score: ${newScore}`;
}

function updateHighScore(newHighScore) {
    document.getElementById('high-score').innerText = `High Score: ${newHighScore}`;
}

export default LevelTwo;
