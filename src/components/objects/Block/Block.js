import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide, Line, Color, Vector3, BufferGeometry, BufferAttribute} from 'three';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';


class Block extends Group {
    constructor(parent, x,y,z, color_num, difficulty) {
        // Call parent Group() constructor
        super();

        // difficulty ranges from 0 to INF, each level increases speed by 10%
        this.difficulty = difficulty; 

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
        let smaller_mapped_x = x*2 - 6; 
        let smaller_mapped_z = y*2 - 12; 
        let smaller_mapped_y = z*2 + 8;
        let larger_mapped_x = smaller_mapped_x + 2; 
        let larger_mapped_z = smaller_mapped_z + 2; 
        let larger_mapped_y = smaller_mapped_y + 2; 


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
      else {
         color = new Color('orange'); 
      }

       
        const edge_color = new Color('black'); 
        
        let list_coords = [];


        this.name = 'block';
 
        const geometry = new BufferGeometry();

        // create original block
        let vertices = new Float32Array([
          // front
          -1, -1, 1, 1, -1, 1, -1, 1,  1,
          -1,  1, 1, 1, -1, 1,  1, 1,  1,
          // back
          1, -1, -1, -1, -1, -1,  1, 1, -1,
          1,  1, -1, -1, -1, -1, -1, 1, -1,
          // left
          -1, -1, -1, -1, -1, 1, -1, 1, -1,
          -1,  1, -1, -1, -1, 1, -1, 1,  1,
          // right
          1, -1, 1, 1, -1, -1, 1, 1,  1,
          1,  1, 1, 1, -1, -1, 1, 1, -1,
          // top
          1,  1, -1, -1, 1, -1,  1, 1, 1,
          1,  1,  1, -1, 1, -1, -1, 1, 1,
          // bottom
          1, -1,  1, -1, -1, 1,  1, -1, -1,
          1, -1, -1, -1, -1, 1, -1, -1, -1,
        ])

        
       // now map the vertices to grid and proper height
        for (let i = 0; i < vertices.length; i++) {
          if (i % 3 == 0) {// x coordinate
            if (vertices[i] < 0) {
              vertices[i] = smaller_mapped_x; 

            }
            else {
              vertices[i] = larger_mapped_x; 
            }
          }
          else if (i % 3 == 1) { // y coordinate
            if (vertices[i] < 0) {
              vertices[i] = smaller_mapped_y; 

            }
            else {
              vertices[i] = larger_mapped_y; 
            }
          }
          else {
            if (vertices[i] < 0) {
              vertices[i] = smaller_mapped_z; 

            }
            else {
              vertices[i] = larger_mapped_z; 
            }

          }
        }

       
     

        geometry.setAttribute('position', new BufferAttribute(vertices, 3));

        const material = new MeshBasicMaterial({ color: color, side: DoubleSide});
        const mesh = new Mesh(geometry, material);
        // add block
        this.add(mesh);



        // add black edges
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

        // original positions, but they need to be mapped
        const line1V = new Float32Array([1, -1, 1, -1, -1,  1]); 
        const line2V = new Float32Array([1, -1, 1, 1, -1,  -1]); 
        const line3V = new Float32Array([1, -1, 1, 1, 1,  1]); 
        const line4V = new Float32Array([-1, -1,  1, -1, 1, 1]); 
        const line5V = new Float32Array([-1, -1,  1, -1, -1, -1]); 
        const line6V = new Float32Array([ -1, -1, -1, 1, -1, -1]);
        const line7V = new Float32Array([-1, -1, -1, -1, 1, -1]); 
        const line8V = new Float32Array([-1, 1, -1, 1, 1, -1]); 
        const line9V = new Float32Array([-1, 1, -1, -1, 1, 1]); 
        const line10V = new Float32Array([1, 1, 1, -1, 1, 1]); 
        const line11V = new Float32Array([1, 1, 1, 1, 1, -1]); 
        const line12V = new Float32Array([1, -1, -1, 1, 1, -1]); 

        this.items.push(line1V); 
        this.items.push(line2V); 
        this.items.push(line3V); 
        this.items.push(line4V); 
        this.items.push(line5V); 
        this.items.push(line6V); 
        this.items.push(line7V); 
        this.items.push(line8V); 
        this.items.push(line9V); 
        this.items.push(line10V); 
        this.items.push(line11V); 
        this.items.push(line12V); 


        // begin mapping of edges
        for (let i = 0; i < this.items.length; i++) {
          for (let j = 0; j < this.items[i].length; j++) {

            if (j % 3 == 0) {// x coordinate
              if (this.items[i][j] < 0) {
                this.items[i][j] = smaller_mapped_x; 
  
              }
              else {
                this.items[i][j] = larger_mapped_x; 
              }
            }
            else if (j % 3 == 1) { // y coordinate
              if ( this.items[i][j] < 0) {
                this.items[i][j] = smaller_mapped_y; 
  
              }
              else {
                this.items[i][j] = larger_mapped_y; 
              }
            }
            else {
              if ( this.items[i][j] < 0) {
                this.items[i][j] = smaller_mapped_z; 
  
              }
              else {
                this.items[i][j] = larger_mapped_z; 
              }
  
            }

          }
        }

        this.items.push(vertices); 


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


        const material1 = new MeshBasicMaterial({color: edge_color, side: DoubleSide}); 
        let line1 = new Line(geometry1, material1); 
        let line2 = new Line(geometry2, material1); 
        let line3 = new Line(geometry3, material1); 
        let line4 = new Line(geometry4, material1); 
        let line5 = new Line(geometry5, material1); 
        let line6 = new Line(geometry6, material1); 
        let line7 = new Line(geometry7, material1); 
        let line8 = new Line(geometry8, material1); 
        let line9 = new Line(geometry9, material1); 
        let line10 = new Line(geometry10, material1); 
        let line11 = new Line(geometry11, material1); 
        let line12 = new Line(geometry12, material1); 

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


    update(timeStamp) {
      // bottom y starts off as -5
      let original_difficulty = 500000; 
      for (let i = 0; i < this.difficulty; i++) {
        original_difficulty -= (original_difficulty/10);
      }
      if (this.position.y > -15) { // this -6 is relative to where it starts
        this.position.y -= timeStamp/original_difficulty; 
      }
      
      // Advance tween animations, if any exist
      TWEEN.update();
  }    


}

export default Block;
