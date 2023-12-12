import { Group } from 'three';
import { MeshBasicMaterial, Mesh, DoubleSide, Color, BufferGeometry, BufferAttribute} from 'three';

class Floor extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        const color = new Color('black'); 
        this.name = 'floor';
        const geometry = new BufferGeometry();
        const vertices = new Float32Array([
            -6,-5,0, //v1 bottom left vertex
            6,-5,0, // v2 bottom right vertex
            -6,-5,-12, // v3 triangle 1
            -6,-5, -12, // v4 top left vertex
            6,-5,0, // v5
            6,-5,-12   // v6 triangle 2
        ]);

        // square is at y = -5 and is 6x5
        geometry.setAttribute('position', new BufferAttribute(vertices, 3)); 
        const material = new MeshBasicMaterial({color: color, side: DoubleSide}); 
        const mesh = new Mesh (geometry, material); 
        this.add(mesh);
    }
}

export default Floor;
