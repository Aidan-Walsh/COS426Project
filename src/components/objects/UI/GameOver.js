import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { Font } from 'three/examples/jsm/loaders/FontLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Line, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';


class GameOver extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'gameover';
        this.locked = false;
        this.parent = parent;

        const black = new Color(0x00000);

        const fontJson = require( "three/examples/fonts/gentilis_bold.typeface.json" );
        const font = new Font( fontJson );

        var textGeometry = new TextGeometry("GAME OVER", {
          size: 1,
          height: 1,
          curveSegments: 2,
          font: font  //change this
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

export default GameOver;