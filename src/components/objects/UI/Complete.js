import { Group } from 'three';
import { MeshBasicMaterial, Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Complete extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'complete';
        this.locked = false;
        this.parent = parent;

        var textGeometry = new TextGeometry("COMPLETE", {
          size: 1,
          height: 1,
          curveSegments: 2,
          font: parent.font  //change this
        });

        const material = new MeshBasicMaterial();
        const mesh = new Mesh(textGeometry, material);
        mesh.position.set(0, 0, 0);
        this.add(mesh);
    }

    update(timeStamp){
      
    }

    action(event){
      if (event.code === "Space"){
        this.parent.reset();
      }
    }
}

export default Complete;