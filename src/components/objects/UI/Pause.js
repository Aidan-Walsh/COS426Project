import { Group } from 'three';
import { MeshBasicMaterial, Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


class Pause extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'Paused';
        this.locked = false;
        this.parent = parent;
        console.log(parent); 
        var textGeometry = new TextGeometry(this.name, {
          size: 2,
          height: 1,
          curveSegments: 2,
          
          font: parent.font  //change this
        });

        const material = new MeshBasicMaterial();
        const mesh = new Mesh(textGeometry, material);
        mesh.position.set(-4, 3, 0);
        parent.add(mesh);
    }


    destroyer(parent) {
      parent.remove(parent.children[parent.children.length-1]); 
      
    }
}

export default Pause;