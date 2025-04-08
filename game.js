// Setting up the scene and basic FPS controls
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('gameCanvas') });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

let controls, player, clock;
let characters = [];
let currentCharacter = 0;

// Load character models (using simple geometries for now)
const loadCharacter = (index) => {
    const geometry = new THREE.BoxGeometry(1, 2, 1); // Simple box geometry for player
    const material = new THREE.MeshBasicMaterial({ color: index === 0 ? 0x00ff00 : 0xff0000 }); // Different colors for each character
    const character = new THREE.Mesh(geometry, material);
    character.position.set(0, 1, 0);
    scene.add(character);
    characters.push(character);
};

const switchCharacter = () => {
    characters[currentCharacter].visible = false;
    currentCharacter = (currentCharacter + 1) % characters.length;
    characters[currentCharacter].visible = true;
};

// FPS Controls (simplified version)
const movePlayer = () => {
    const moveSpeed = 0.1;
    const rotateSpeed = 0.02;

    if (keyState['w']) player.position.z -= moveSpeed;
    if (keyState['s']) player.position.z += moveSpeed;
    if (keyState['a']) player.position.x -= moveSpeed;
    if (keyState['d']) player.position.x += moveSpeed;

    if (keyState['arrowleft']) camera.rotation.y -= rotateSpeed;
    if (keyState['arrowright']) camera.rotation.y += rotateSpeed;
};

let keyState = {};

const setupControls = () => {
    document.addEventListener('keydown', (event) => {
        keyState[event.key.toLowerCase()] = true;
        if (event.key.toLowerCase() === 'c') switchCharacter(); // 'C' for character switch
    });
    document.addEventListener('keyup', (event) => {
        keyState[event.key.toLowerCase()] = false;
    });
};

// Lighting and environment
const addLighting = () => {
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(10, 10, 10);
    scene.add(light);
};

// Game Loop
const animate = () => {
    requestAnimationFrame(animate);
    movePlayer();
    renderer.render(scene, camera);
};

const init = () => {
    camera.position.z = 5;
    clock = new THREE.Clock();
    setupControls();
    addLighting();
    loadCharacter(0); // Load the first character
    loadCharacter(1); // Load the second character
    characters[currentCharacter].visible = true; // Initially show the first character
    animate();
};

// Start the game
init();
