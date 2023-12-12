import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
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

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        const size = 6;
        let array = new Array(size);

        for (let i = 0; i < size; i++) {
            array[i] = new Array(size);
            for (let j = 0; j < size; j++) {
                array[i][j] = new Array(size);
                for (let k = 0; k < size; k++) {
                    array[i][j][k] = false;
                }
            }
        }

        this.grid = array;
        this.blocks = [];
        this.difficulty = 1;

        // Add meshes to scene
        const lights = new BasicLights();
        const floor = new Floor(this); 
        const floormesh = new FloorMesh(); 
        const rearwall = new RearWall(); 
        const rearwallmesh = new RearWallMesh(); 
        const rightwall = new RightWall(); 
        const leftwall = new LeftWall(); 
        const leftwallmesh = new LeftWallMesh();
        const rightwallmesh = new RightWallMesh(); 
        const block = new TBlock(this, 2,0,0,0);
   
        this.current = block;
        this.add(lights,  floor, floormesh, rearwall, rearwallmesh, rightwall, leftwall, leftwallmesh, rightwallmesh, block);
        
        this.setupEventListeners();
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList } = this.state;
   
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }

    setupEventListeners() {
        window.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    // Event handler for keydown events
    handleKeyDown(event) {
        console.log(`Key pressed: ${event.key}`);
        // Add your logic here to handle key presses
        // For example, you could check if a specific key was pressed and act accordingly
        this.current.action(event);
    }
}

export default SeedScene;
