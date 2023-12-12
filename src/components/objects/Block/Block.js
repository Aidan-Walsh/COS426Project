import { DynamicCopyUsage, Group, PlaneGeometry } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { MeshBasicMaterial, Mesh, DoubleSide, Line, Color, Vector3, BufferGeometry, BufferAttribute, BoxGeometry, LineBasicMaterial, EdgesGeometry, LineSegments} from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';


class Block extends Group {
    constructor(parent, x,y,z, color_num) {
      // Call parent Group() constructor
      super();
      // difficulty ranges from 0 to INF, each level increases speed by 10%
      this.locked = false;
      this.position.set(x, y, z);
      this.difficulty = parent.difficulty;
      this.grid = parent.grid;

      // where we store everything that will be updated
      this.items = []; 
      // Add self to parent's update list
      parent.addToUpdateList(this);
      // top left coordinate: ( -6,-5, -12)
      // top right coordinate: (6,-5,-12)
      // bottom left coordinate: (-6,-5,0)
      // bottom right coordinate: (6,-5,0)

      // want y to be 8 when z is 0
      // x, y indicate coordinate in 6x6 grid
      // for x: 0 -> -6, 1 -> -4
      // for y: 0 -> -12, 1 -> -10
      let smaller_mapped_x = x*2 - 5; 
      let smaller_mapped_z = z*2 - 11; 
      let smaller_mapped_y = y*2 + 8;


      // if color_num is 0, then use red, 1 = yellow, 2 = blue, else use orange
      let color; 
      if (color_num == 0) {
        color = new Color('red'); 
      }
      else if (color_num == 1) {
        color = new Color('yellow'); 
      }
      else if (color_num == 2) {
        color = new Color('blue'); 
      }
      else if (color_num == 3) {
        color = new Color('orange'); 
      }
      else if (color_num == 4) {
        color = new Color('cyan'); 
      }
      else if (color_num == 5) {
        color = new Color('purple'); 
      }
      else if (color_num == 6) {
        color = new Color('green'); 
      }
      else {
        color = new Color('white');
      }

      const edge_color = new Color('black'); 
      this.name = 'block';

      const geometry = new BoxGeometry( 2, 2, 2 ); 
      const material = new MeshBasicMaterial({ color: color, side: DoubleSide});
      const cube = new Mesh(geometry, material);
      const edges = new EdgesGeometry(geometry);
      const lineMaterial = new LineBasicMaterial({ color: edge_color, linewidth: 2 }); // Black color for the edges
      const edgeLines = new LineSegments(edges, lineMaterial);
      this.add(edgeLines);
      this.add(cube);
      this.position.set(smaller_mapped_x, smaller_mapped_y, smaller_mapped_z);
      this.lastUpdate = 0;
    }

    checkCollision(block, dx, dy, dz){
        let x = (block.position.x + 5)/2;
        let y = (block.position.y + 4)/2;
        let z = (block.position.z + 11)/2;
        if (x + dx >= 0 && x + dx <= 5 && y + dy >= 0 && y + dy <= 5 && z + dz >= 0 && z + dz <= 5){
          if (this.grid[x + dx][y + dy][z + dz]){
            return true;
          }
        }

        // BEGIN CODE FOR SHADOWS
       
          for (let i = 6; i >= 0; i--) {
            let index = i; 
            if (i ==6) index = 5; 
              const geometry = new PlaneGeometry(2,2);
              const color = this.children[1].material.color
              // remove all previous children that are not the edges and cube, which are 0 and 1 indices
              for (let j = 2; j < this.children.length; j++) {
                this.remove(this.children[j]); 
              }
              const material = new MeshBasicMaterial({color: color, side: DoubleSide}); 
              const plane = new Mesh (geometry, material); 
             let changed_y = 0; 
             if (this.grid[x][index][z]) {
              changed_y = -block.position.y -3 + (i*2);
              plane.position.set(0,changed_y,0); 
              plane.rotation.x = Math.PI/2; 
              this.add(plane);
              break; 
             }
             else if (i == 0 && this.grid[x][index][z] != true) {
              changed_y = -block.position.y-4 - 1;
              if (block.position.y == -4) {
                changed_y = 0; 
              }
              plane.position.set(0,changed_y,0); 
              plane.rotation.x = Math.PI/2; 
              this.add(plane);
              break; 
             }        
            }      
      
       // END SHADOWS CODE
        return false;
    }

    update(timeStamp, willCollide) {
      if (!this.locked){
        if (this.lastUpdate == 0) {
          this.lastUpdate = timeStamp;
        }
        if (timeStamp - this.lastUpdate > 2000 / this.difficulty){
          if (willCollide){
            this.locked = true;
          }
          else {
            this.position.y -= 2;
            this.lastUpdate = timeStamp;
          }
        }
      }
      
      // Advance tween animations, if any exist
      TWEEN.update();
  }    


}

export default Block;