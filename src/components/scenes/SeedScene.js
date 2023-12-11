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
import { Block } from '../objects/Block';

class SeedScene extends Scene {
    constructor() {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
           // gui: new Dat.GUI(), // Create GUI for scene
            rotationSpeed: 0,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
       //  const land = new Land();
     //  const flower = new Flower(this);
        const lights = new BasicLights();
        const floor = new Floor(this); 
        const floormesh = new FloorMesh(); 
        const rearwall = new RearWall(); 
        const rearwallmesh = new RearWallMesh(); 
        const rightwall = new RightWall(); 
        const leftwall = new LeftWall(); 
        const leftwallmesh = new LeftWallMesh();
        const rightwallmesh = new RightWallMesh(); 
        const block = new Block(this, 0,0,0,0); // at 0,0 on grid, at height 0, and color is 0 (red)

   
        
        this.add(lights,  floor, floormesh, rearwall, rearwallmesh, rightwall, leftwall, leftwallmesh, rightwallmesh, block);
        

        // Populate GUI
       // this.state.gui.add(this.state, 'rotationSpeed', -5, 5);
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { rotationSpeed, updateList } = this.state;
        this.rotation.y = (rotationSpeed * timeStamp) / 10000;

        // Call update for each object in the updateList
   
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
