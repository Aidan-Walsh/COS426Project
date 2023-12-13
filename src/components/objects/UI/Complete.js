import { Group } from 'three';
import { MeshBasicMaterial, Mesh, Vector3, Color, LineBasicMaterial, EdgesGeometry, LineSegments } from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';

class Complete extends Group {
    constructor(parent) {
      super();

      this.name = 'complete';
      this.locked = false;
      this.parent = parent;

      this.text = new TextGeometry("COMPLETE", {
        size: 1.5,
        height: 1,
        curveSegments: 2,
        font: parent.font  //change this
      });

      this.text.computeBoundingBox();
      this.center = this.text.boundingBox.getCenter(new Vector3());

      this.color = new Color('white');
      this.edge_color = new Color('black');

      this.faceCamera(new Vector3(0, 0, -8), new Vector3(0, 20, 10));
    }

    update(timeStamp) {

    }

    action(event){
      if (event.code === "Space"){
        this.parent.reset();
      }
    }

    faceCamera(cameraPosition, cameraTarget) {
      for (let i = this.children.length - 1; i >= 0; i--) {
        this.remove(this.children[i]);
      }

      const material = new MeshBasicMaterial({color: this.color});
      const mesh = new Mesh(this.text, material);
      const edges = new EdgesGeometry(this.text);
      const lineMaterial = new LineBasicMaterial({color: this.edge_color, linewidth: 2});
      const edgeLines = new LineSegments(edges, lineMaterial);

      
      let p = cameraTarget.clone().sub(this.center);

      //mesh.lookAt(cameraPosition.clone().sub(this.center));
      //edgeLines.lookAt(cameraPosition.clone().sub(this.center));
      mesh.position.set(p.x, p.y, p.z);
      edgeLines.position.set(p.x, p.y, p.z);
      
      this.add(mesh);
      this.add(edgeLines);

      TWEEN.update();
    }
}

export default Complete;