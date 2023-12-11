import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Plane, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';



class RearWall extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

  

        const color = new Color('black'); 



        this.name = 'floor';
 
        const geometry = new BufferGeometry(); 



    const vertices = new Float32Array([

-6,-5, -12, // v1 bottom left vertex
6,7,-12, // v2 top right vertex
6,-5,-12,    // v3 bottom right vertex
-6,-5, -12, // v4
6,7,-12, // v5
-6, 7, -12 // v6 top left vertex

]);
    // square is at z = -12 and is 6x5

        geometry.setAttribute('position', new BufferAttribute(vertices, 3)); 
        const material = new MeshBasicMaterial({color: color, side: DoubleSide}); 
        const mesh = new Mesh (geometry, material); 
        this.add(mesh);




        
    }


}

export default RearWall;
