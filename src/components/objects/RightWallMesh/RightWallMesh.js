import { Group } from 'three';
import { MeshBasicMaterial, DoubleSide, Line, Color, BufferGeometry, BufferAttribute} from 'three';



class RightWallMesh extends Group {
    constructor() {
      // Call parent Group() constructor
      super();

      this.name = 'rightwallmesh';
      const color = new Color(0x39FF14); // neon green
      const geometry1 = new BufferGeometry(); 
      const geometry2 = new BufferGeometry(); 
      const geometry3 = new BufferGeometry(); 
      const geometry4 = new BufferGeometry(); 
      const geometry5 = new BufferGeometry(); 
      const geometry6 = new BufferGeometry(); 
      const geometry7 = new BufferGeometry(); 
      const geometry8 = new BufferGeometry(); 
      const geometry9 = new BufferGeometry(); 
      const geometry10 = new BufferGeometry(); 
      const geometry11 = new BufferGeometry(); 
      const geometry12 = new BufferGeometry(); 

      const vertices = new Float32Array([
        6,7,0, // v1 top right vertex
        6,7,-12, // v2 top left vertex
        6,-5,-12,   // v3 bottom left vertex
        6, -5, -12, // v4
        6,7,0,  // v5
        6, -5, 0 // v6 bottom right vertex
      ]);


      // vertical lines
      const line1V = new Float32Array([6, -5,-2, 6, 7, -2]); 
      const line2V = new Float32Array([6, -5, -4, 6, 7, -4]); 
      const line3V = new Float32Array([6, -5, -6, 6,7, -6]); 
      const line4V = new Float32Array([6, -5,-8, 6, 7, -8]); 
      const line5V = new Float32Array([6, -5, -10, 6, 7, -10]); 
      const line11V = new Float32Array([6,-5,-12, 6,7,-12]); 

      // horizontal lines
      const line6V = new Float32Array([6, -3, -12, 6, -3, 0]); 
      const line7V = new Float32Array([6, -1, -12, 6, -1, 0]); 
      const line8V = new Float32Array([6, 1, -12, 6, 1, 0]); 
      const line9V = new Float32Array([6, 3, -12, 6, 3, 0]); 
      const line10V = new Float32Array([6, 5, -12,6, 5, 0]); 
      const line12V = new Float32Array([6,-5,-12, 6,-5, 0]);
      geometry1.setAttribute('position', new BufferAttribute(line1V, 3)); 
      geometry2.setAttribute('position', new BufferAttribute(line2V, 3)); 
      geometry3.setAttribute('position', new BufferAttribute(line3V, 3)); 
      geometry4.setAttribute('position', new BufferAttribute(line4V, 3)); 
      geometry5.setAttribute('position', new BufferAttribute(line5V, 3)); 
      geometry6.setAttribute('position', new BufferAttribute(line6V, 3)); 
      geometry7.setAttribute('position', new BufferAttribute(line7V, 3)); 
      geometry8.setAttribute('position', new BufferAttribute(line8V, 3)); 
      geometry9.setAttribute('position', new BufferAttribute(line9V, 3)); 
      geometry10.setAttribute('position', new BufferAttribute(line10V, 3)); 
      geometry11.setAttribute('position', new BufferAttribute(line11V, 3)); 
      geometry12.setAttribute('position', new BufferAttribute(line12V, 3)); 
      const material = new MeshBasicMaterial({color: color, side: DoubleSide}); 
      const line1 = new Line(geometry1, material); 
      const line2 = new Line(geometry2, material); 
      const line3 = new Line(geometry3, material); 
      const line4 = new Line(geometry4, material); 
      const line5 = new Line(geometry5, material); 
      const line6 = new Line(geometry6, material); 
      const line7 = new Line(geometry7, material); 
      const line8 = new Line(geometry8, material); 
      const line9 = new Line(geometry9, material); 
      const line10 = new Line(geometry10, material); 
      const line11 = new Line(geometry11, material); 
      const line12 = new Line(geometry12, material); 
      this.add(line1);
      this.add(line2);
      this.add(line3); 
      this.add(line4); 
      this.add(line5);
      this.add(line6); 
      this.add(line7); 
      this.add(line8); 
      this.add(line9);
      this.add(line10); 
      this.add(line11);
      this.add(line12);  
    }
}

export default RightWallMesh;
