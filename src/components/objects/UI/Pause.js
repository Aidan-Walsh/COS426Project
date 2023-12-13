import { Group } from 'three';
import {  MeshBasicMaterial, Mesh, Vector3, Color, LineBasicMaterial, EdgesGeometry, LineSegments  } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';


class Pause extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = 'Paused';
        this.locked = false;
        this.parent = parent;

        this.text = new TextGeometry("PAUSED", {
          size: 1.5,
          height: 1,
          curveSegments: 2,
          font: parent.font  
        });
        this.text.computeBoundingBox();
        this.center = this.text.boundingBox.getCenter(new Vector3());

        this.color = new Color('white');
        this.edge_color = new Color('black');

      this.faceCamera(new Vector3(0, 0, -8), new Vector3(0, 20, 10));

    }


    destroyer(parent) {
      parent.remove(parent.children[parent.children.length-1]); 
      parent.remove(parent.children[parent.children.length-1]); 
      
    }


    faceCamera(cameraPosition, cameraTarget) {

      const material = new MeshBasicMaterial({color: this.color});
      const mesh = new Mesh(this.text, material);
      const edges = new EdgesGeometry(this.text);
      const lineMaterial = new LineBasicMaterial({color: this.edge_color, linewidth: 2});
      const edgeLines = new LineSegments(edges, lineMaterial);

      
      let p = cameraTarget.clone().sub(this.center);

      mesh.position.set(-3, -0.6547499755397439,-4);
      edgeLines.position.set(-3, -0.6547499755397439,-4);
      
      this.add(mesh);
      this.add(edgeLines);
      this.parent.add(mesh); 
      this.parent.add(edgeLines); 

      TWEEN.update();
    }
}

export default Pause;