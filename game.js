// Create basic scene setup
let scene, camera, renderer, controls;
let clock = new THREE.Clock();
let raycaster, mouse = new THREE.Vector2();

// Initialize scene
function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Add a simple cube to represent the player
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // Set up Pointer Lock Controls (for FPS-style movement)
  controls = new THREE.PointerLockControls(camera, document.body);
  
  // Raycaster for shooting
  raycaster = new THREE.Raycaster();
  
  // Set up basic lighting
  let light = new THREE.AmbientLight(0x404040); // Ambient light
  scene.add(light);

  // Listen to mouse and keyboard events
  window.addEventListener('resize', onWindowResize, false);
  document.addEventListener('click', onPointerLock, false);
  document.addEventListener('keydown', onKeyDown, false);
  document.addEventListener('mousemove', onMouseMove, false);
}

// Update window size
function onWindowResize() {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// Activate Pointer Lock
function onPointerLock() {
  controls.lock();
}

// Move player with WASD keys
function onKeyDown(event) {
  const movementSpeed = 0.1;
  if (event.key === 'w') {
    controls.moveForward(movementSpeed);
  } else if (event.key === 's') {
    controls.moveForward(-movementSpeed);
  } else if (event.key === 'a') {
    controls.moveRight(-movementSpeed);
  } else if (event.key === 'd') {
    controls.moveRight(movementSpeed);
  }
}

// Handle mouse movement
function onMouseMove(event) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

// Handle shooting with mouse click
function shoot() {
  raycaster.update(camera.position, camera.getWorldDirection(new THREE.Vector3()));
  let intersects = raycaster.intersectObjects(scene.children);
  if (intersects.length > 0) {
    console.log('Hit:', intersects[0]);
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  let delta = clock.getDelta();
  controls.update(delta);  // Update controls
  
  // Check for shooting every frame (basic)
  if (mouseIsPressed) {
    shoot();
  }

  renderer.render(scene, camera);
}

// Start game
init();
animate();
