import { Group } from 'three';
import { MeshBasicMaterial, Mesh, DoubleSide, Color, Vector3, BoxGeometry, LineBasicMaterial, EdgesGeometry, LineSegments, PlaneGeometry} from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';


class Block extends Group {
    constructor(parent, x, y, z, color_num) {
      super();
      
      this.name = 'block';
      this.locked = false;
      this.lastUpdate = 0;

      this.difficulty = parent.difficulty;
      this.grid = parent.grid;
      this.blocks = parent.blocks;
      
      parent.addToUpdateList(this);
      
      let mapping = this.mapping(x, y, z);
      this.position.set(mapping.x, mapping.y, mapping.z);

      const edge_color = new Color('black');
      switch (color_num) {
        case 0:
          this.color = new Color('red'); 
          break;
        case 1:
          this.color = new Color('yellow'); 
          break;
        case 2:
          this.color = new Color('blue'); 
          break;
        case 3:
          this.color = new Color('orange'); 
          break;
        case 4:
          this.color = new Color('cyan');
          break;
        case 5:
          this.color = new Color('purple');
          break;
        case 6:
          this.color = new Color('green');
          break;
        default:
          this.color = new Color('white');
          break;
      }
      
      const geometry = new BoxGeometry(2, 2, 2); 
      const material = new MeshBasicMaterial({color: this.color, side: DoubleSide});
      const cube = new Mesh(geometry, material);
      const edges = new EdgesGeometry(geometry);
      const lineMaterial = new LineBasicMaterial({color: edge_color, linewidth: 2});
      const edgeLines = new LineSegments(edges, lineMaterial);
      this.add(edgeLines);
      this.add(cube);
    }

    update(timeStamp) {
      if (this.locked) return;

      if (this.lastUpdate == 0) this.lastUpdate = timeStamp;
      
      if (timeStamp - this.lastUpdate > 2000 / this.difficulty) {
        this.position.y -= 2;
        this.lastUpdate = timeStamp;
      }

      this.shadow();
      
      TWEEN.update();
  }

  checkCollision(dx, dy, dz) {
    let c = this.coords();
    
    if (c.x + dx < 0 || c.x + dx > 5) return true;
    if (c.y + dy < 0) return true;
    if (c.z + dz < 0 || c.z + dz > 5) return true;

    if (c.y + dy <= 5 && this.grid[c.x + dx][c.y + dy][c.z + dz]) return true;

    return false;
  }

  lock() {
    this.locked = true;

    this.removeShadow();

    for (let i = 0; i < this.children.length; i++) {
      this.children[i].material.transparent = true; 
      this.children[i].material.opacity = 0.4; 
    }

    let c = this.coords();
    try {
        this.grid[c.x][c.y][c.z] = true;
        this.blocks[c.x][c.y][c.z] = this;
    }
    catch(error) {
        return true;
    }

    return false;
  }

  shadow() {
    this.removeShadow();

    let height = 1;
    while (!this.checkCollision(0, -height, 0)) {
      height += 1;
    }

    let c = this.coords();
    let p = this.mapping(c.x, c.y - height, c.z);

    const geometry = new PlaneGeometry(2, 2);
    const material = new MeshBasicMaterial({color: this.color, side: DoubleSide}); 
    const plane = new Mesh(geometry, material); 

    plane.rotation.x = Math.PI/2; 
    
    plane.position.set(0, -height * 2 + 1, 0); 
    this.add(plane);
  }

  removeShadow() {
    for (let i = 2; i < this.children.length; i++) {
      this.remove(this.children[i]); 
    }
  }

  coords() {
    let x = (this.position.x + 5) / 2;
    let y = (this.position.y + 4) / 2;
    let z = (this.position.z + 11) / 2;
    return new Vector3(x, y, z);
  }

  mapping(ix, iy, iz) {
    let x = ix * 2 - 5;
    let y = iy * 2 + 8;
    let z = iz * 2 - 11; 
    return new Vector3(x, y, z);
  }
}

export default Block;