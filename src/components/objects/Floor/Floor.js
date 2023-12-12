import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Plane, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';

import MODEL from './floor.gltf';

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const loader = new GLTFLoader();
        const geometry = new PlaneGeometry(6,6); 
        const color = new Color('black'); 
        const material = new MeshBasicMaterial({color: color, side:DoubleSide}); 

        const plane = new Mesh(geometry, material); 
        this.name = 'floor';
        this.plane = plane; 
        const geometry1 = new BufferGeometry(); 

        const vertices = new Float32Array([
            -6,-5,0, //v1 bottom left vertex
    6,-5,0, // v2 bottom right vertex
    -6,-5,-12, // v3 triangle 1
    -6,-5, -12, // v4 top left vertex
    6,-5,0, // v5
     6,-5,-12   // v6 triangle 2
    ]);

    // square is at y = -5 and is 6x5

        geometry1.setAttribute('position', new BufferAttribute(vertices, 3)); 
        const material1 = new MeshBasicMaterial({color: color, side: DoubleSide}); 
        const mesh = new Mesh (geometry1, material1); 
        this.add(mesh);
        // adjust positioning 
        this.plane.lookAt(new Vector3(0,1,0)); 
       // this.plane.makeTranslation(new Vector3(0,-1,0)); 
   
        
       // this.add(plane);
        this.state = {
            stay: true
        };




        
    }

    update(timeStamp) {
        
        if (this.state.bob) {
            // Bob back and forth
            this.rotation.z = 0.05 * Math.sin(timeStamp / 300);
        }
        if (this.state.twirl > 0) {
            // Lazy implementation of twirl
            this.state.twirl -= Math.PI / 8;
            this.rotation.y += Math.PI / 8;
        }

        // Advance tween animations, if any exist
       
    }
}

export default Floor;
