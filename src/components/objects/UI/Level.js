import { Group } from 'three';
import { MeshBasicMaterial, Mesh } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';

class Level extends Group {
    constructor(parent, name) {
        // Call parent Group() constructor
        super();

        this.name = 'level';
        this.locked = false;
        this.parent = parent;

        var textGeometry = new TextGeometry(name, {
          size: 1,
          height: 1,
          curveSegments: 2,
          font: parent.font  //change this
        });

        const material = new MeshBasicMaterial();
        const mesh = new Mesh(textGeometry, material);
        mesh.position.set(-6, 8, -13);
        this.add(mesh);
    }
}

export default Level;