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
import { SeedScene } from 'scenes';

// Initialize core ThreeJS components
const scene = new SeedScene();
const camera = new PerspectiveCamera();
const renderer = new WebGLRenderer({ antialias: true });
createScoreDisplay();

// Set up camera
camera.position.set(0, 10, 25);
camera.lookAt(new Vector3(0, 0, 0));



// Set up renderer, canvas, and minor CSS adjustments
renderer.setPixelRatio(window.devicePixelRatio);
const canvas = renderer.domElement;
canvas.style.display = 'block'; // Removes padding below canvas
document.body.style.margin = 0; // Removes margin around page
document.body.style.overflow = 'hidden'; // Fix scrolling
document.body.appendChild(canvas);

// Set up controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 4;
controls.maxDistance = 50;
controls.update();

// Render loop
const onAnimationFrameHandler = (timeStamp) => {
    
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
