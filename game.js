// Setup the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a basic cube for the player to interact with
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const playerCube = new THREE.Mesh(geometry, material);
scene.add(playerCube);

// Set player starting position
camera.position.z = 5;

// Controls for movement
const keyboard = {};
document.addEventListener('keydown', (event) => {
    keyboard[event.key] = true;
});
document.addEventListener('keyup', (event) => {
    keyboard[event.key] = false;
});

// Update movement
function update() {
    if (keyboard['w']) camera.position.z -= 0.1;
    if (keyboard['s']) camera.position.z += 0.1;
    if (keyboard['a']) camera.position.x -= 0.1;
    if (keyboard['d']) camera.position.x += 0.1;

    // Update camera view
    camera.lookAt(playerCube.position);

    // Move the playerCube as an example
    playerCube.rotation.x += 0.01;
    playerCube.rotation.y += 0.01;
}

// Render loop
function animate() {
    requestAnimationFrame(animate);
    update();
    renderer.render(scene, camera);
}
animate();

const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.screenSpacePanning = false;
controls.maxPolarAngle = Math.PI / 2;

const bullets = [];
function shoot() {
    const bulletGeometry = new THREE.SphereGeometry(0.1);
    const bulletMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);
    bullet.position.set(camera.position.x, camera.position.y, camera.position.z);
    bullets.push(bullet);
    scene.add(bullet);

    const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
    bullet.velocity = direction.multiplyScalar(0.5);
}

document.addEventListener('click', shoot);

function updateBullets() {
    bullets.forEach((bullet, index) => {
        bullet.position.add(bullet.velocity);
        // Detect collisions or boundaries and remove the bullet
        if (bullet.position.z < -10) {
            scene.remove(bullet);
            bullets.splice(index, 1);
        }
    });
}
