/**
 * app.js
 *
 * This is the first file loaded. It sets up the Renderer,
 * Scene and Camera. It also starts the render loop and
 * handles window resizes.
 *
 */
import { WebGLRenderer, PerspectiveCamera, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { LevelOne, LevelTwo, LevelThree, Sandbox } from 'scenes';

// Initialize core ThreeJS components
let scene = null;
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });


// BEGIN START SCREEN
// this code is not in a function to make these variables global so that they may 
// be updated
let start = true; 
let begin_event_0 = false; 
const canvas1 =  document.createElement("canvas"); 
const { innerHeight, innerWidth } = window;
canvas1.width = innerWidth; 
canvas1.height = innerWidth;
const ctx = canvas1.getContext("2d"); 
ctx.fillStyle = 'black'; 
ctx.fillRect(0,0, canvas1.width, canvas1.height); 
ctx.font = "bold 64px Arial";
ctx.textAlign = "start"; 
ctx.textBaseline = "bottom"; 
ctx.fillStyle = "#33ff36";

ctx.fillText("3D TETRIS",canvas1.width/2-canvas1.width/5.68,canvas1.height/2 - canvas1.width/17.04);
 ctx.font = "italic 32px Arial";
ctx.fillText("Press Any Button To Begin",canvas1.width/2-canvas1.width/4.8,canvas1.height/2  ); // use timestamp to change luminance

const colors = ["#33ffd6", "red", "orange", "yellow", "blue", "purple", "white"]; 
let index = 1; 
displayHint(); 
createOpeningScreen(); 

// END START SCREEN

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.object.position.set(0, 20, 10);
controls.target = new Vector3(0, 0, -8);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 50;
controls.update();

let sandboxHighScore = 0;
let levelOneHighScore = 0;
let levelTwoHighScore = 0;
let levelThreeHighScore = 0;
let level = -1;

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    if (scene){
        controls.update();
        renderer.render(scene, camera);
        scene.update && scene.update(timeStamp, camera.position, controls.target);
    }

    window.requestAnimationFrame(onAnimationFrameHandler);
};
window.requestAnimationFrame(onAnimationFrameHandler);

// Resize Handler
const windowResizeHandler = () => {
    const { innerHeight, innerWidth } = window;
    renderer.setSize(innerWidth, innerHeight);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
};

windowResizeHandler();
window.addEventListener('resize', windowResizeHandler, false);
const windowKeyHandler = (event) => {

// CLEAR START SCREEN
    if (start) {
        start = false; 
        begin_event_0 = true; 
        canvas1.remove(); 
        clearInterval(ctx.interval);
        scene = new Sandbox(sandboxHighScore);
        level = 0;
        createScoreDisplay();
    }
    

    if (level == 0){
        if (scene.highScore > sandboxHighScore){
            sandboxHighScore = scene.highScore;
        }
    }
    if (level == 1){
        if (scene.highScore > levelOneHighScore){
            levelOneHighScore = scene.highScore;
        }
    }
    if (level == 2){
        if (scene.highScore > levelTwoHighScore){
            levelTwoHighScore = scene.highScore;
        }
    }
    if (level == 3){
        if (scene.highScore > levelThreeHighScore){
            levelThreeHighScore = scene.highScore;
        }
    }
    if(event.code === "Digit0" || begin_event_0){ // begin_event_0 is only true once we exit start screen
        begin_event_0 = false; // this indicates to start in level 0 after start screen is removed
        if (level == 0){
            scene.state.gui.destroy();
        }
        scene = new Sandbox(sandboxHighScore);
        level = 0;
    }
    if(event.code === "Digit1"){
        if (level == 0){
            scene.state.gui.destroy();
        }
        scene = new LevelOne(levelOneHighScore);
        level = 1;
    }
    if(event.code === "Digit2"){
        if (level == 0){
            scene.state.gui.destroy();
        }
        scene = new LevelTwo(levelTwoHighScore);
        level = 2;
    }
    if(event.code === "Digit3"){
        if (level == 0){
            scene.state.gui.destroy();
        }
        scene = new LevelThree(levelThreeHighScore);
        level = 3;
    }

};
window.addEventListener('keydown', windowKeyHandler, false);

function createScoreDisplay() {
    // Create container for score and high score
    const scoreContainer = document.createElement('div');
    scoreContainer.id = 'score-container';
    scoreContainer.style.position = 'absolute';
    scoreContainer.style.top = '10px';
    scoreContainer.style.left = '10px';
    scoreContainer.style.color = 'white';
    scoreContainer.style.fontFamily = 'Arial, sans-serif';
    scoreContainer.style.zIndex = '1';

    // Create score element
    const scoreElement = document.createElement('div');
    scoreElement.id = 'score';
    scoreElement.innerText = 'Score: 0';
    scoreElement.style.fontSize = '2em';
    scoreContainer.appendChild(scoreElement);

    // Create high score element
    const highScoreElement = document.createElement('div');
    highScoreElement.id = 'high-score';
    highScoreElement.innerText = 'High Score: 0';
    highScoreElement.style.fontSize = '2em';
    scoreContainer.appendChild(highScoreElement);

    // Add the container to the body
    document.body.appendChild(scoreContainer);
}

// show the start screen, then call the updating function every second
function createOpeningScreen() {
   
    // show created canvas
   document.body.insertBefore(canvas1, document.body.childNodes[0]); 
    ctx.interval = setInterval(updateCanvas, 1000); 
   
  

}


// every time interval, do this for the start screen
function updateCanvas() {

    ctx.clearRect(0,0, canvas1.width, canvas1.height); 
    // set color to next index in our colors array
    ctx.fillStyle = 'black'; 
    ctx.fillRect(0,0, canvas1.width, canvas1.height); 
    ctx.font = "bold 64px Arial";
    ctx.textAlign = "start"; 
    ctx.textBaseline = "bottom"; 
    ctx.fillStyle = colors[index];
    index += 1; 
    if (index == colors.length) {
        index = 0; 
    }
    ctx.fillText("3D TETRIS",canvas1.width/2-canvas1.width/5.68,canvas1.height/2 - canvas1.width/17.04);
    ctx.font = "italic 32px Arial";
    ctx.fillText("Press Any Button To Begin",canvas1.width/2-canvas1.width/4.8,canvas1.height/2   ); 
    displayHint(); 
    document.body.insertBefore(canvas1, document.body.childNodes[0]); 


}

// display the controls at the bottom left of the screen
function displayHint() {
    ctx.font = "bold 24px Arial"; 
    ctx.textAlign = "start"; 
    ctx.textBaseline = "bottom"; 
    ctx.fillStyle =  "#33ff36";
    ctx.fillText("Controls",50,canvas1.height/2 + canvas1.width/4);
    
    ctx.font = "16px Arial"; 
    ctx.fillText("W/E = Rotate",50,canvas1.height/2 + canvas1.width/4 + 20);
    ctx.fillText("Arrow Keys = Shift",50,canvas1.height/2 + canvas1.width/4 + 40);
    ctx.fillText("P = Pause",50,canvas1.height/2 + canvas1.width/4 + 60);
    ctx.fillText("0/1/2/3 = Difficulty", 50,canvas1.height/2 + canvas1.width/4 + 80);
    ctx.fillText("Space Bar = Shift down", 50,canvas1.height/2 + canvas1.width/4 + 100);
    ctx.fillText("Mouse Click = Toggle Camera", 50,canvas1.height/2 + canvas1.width/4 + 120);

    document.body.insertBefore(canvas1, document.body.childNodes[0]); 


}