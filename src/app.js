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
import { SeedScene, LevelOne, LevelTwo, LevelThree } from 'scenes';

// Initialize core ThreeJS components
let scene = new SeedScene(0);
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
createScoreDisplay();

// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.object.position.set(0, 20, 5);
controls.target = new Vector3(0, 0, -6);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 50;
controls.update();

let seedHighScore = 0;
let levelOneHighScore = 0;
let levelTwoHighScore = 0;
let levelThreeHighScore = 0;
let level = 0;

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    console.log(camera.position);
    controls.update();
    renderer.render(scene, camera);
    scene.update && scene.update(timeStamp);

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
    if (level == 0){
        if (scene.highScore > seedHighScore){
            seedHighScore = scene.highScore;
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
    if(event.code === "Digit0"){
        if (level == 0){
            scene.state.gui.destroy();
        }
        scene = new SeedScene(seedHighScore);
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
