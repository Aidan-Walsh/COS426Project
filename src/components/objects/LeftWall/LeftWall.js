import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Plane, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';



class LeftWall extends Group {
    constructor() {
        // Call parent Group() constructor
        super();

  

        const color = new Color('black'); 



        this.name = 'floor';
 
        const geometry = new BufferGeometry(); 

        const vertices = new Float32Array([

          -6,-5, -12, // v1 bottom right vertex
          -6,7,-12, // v2 top right vertex
          -6, 7, 0,  // v3 top left vertex
          -6, 7, 0, // v4
          -6, -5, -12, // v5
          -6, -5, 0 // v6 bottom left vertex
       
          
          ]);


    // square is at x = -6 and is 6x6

        geometry.setAttribute('position', new BufferAttribute(vertices, 3)); 
        const material = new MeshBasicMaterial({color: color, side: DoubleSide}); 
        const mesh = new Mesh (geometry, material); 
        this.add(mesh);




        
    }


}

export default LeftWall;
