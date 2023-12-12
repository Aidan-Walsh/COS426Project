import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Line, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


class Score extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'score';
        this.locked = false;
        this.parent = parent;

        var textGeometry = new TextGeometry("Score: 0", {
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
      TWEEN.update();
    }

    action(event){
      if (event.code === "Space"){
        this.parent.reset();
      }
    }
}

export default Score;