/**
* Nicole Schneider
*/

// renderer
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor('white');
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);

// create a scene
var scene = new THREE.Scene();

// show axes
var axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// ground plane grid
var gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

// camera
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.set(15.0, 15.0, 15.0);


// arm
var telescope_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var telescope_material = new THREE.MeshPhongMaterial();
telescope_material.color = new THREE.Color("green");
var telescope_mesh = new THREE.Mesh(telescope_geometry, telescope_material);
telescope_mesh.position.y = 1.5;

var elevation = new THREE.Group();
elevation.add(telescope_mesh);

// body
var dome_geometry = new THREE.CylinderGeometry(1, 1, 3);
var dome_material = new THREE.MeshPhongMaterial();
dome_material.color = new THREE.Color("silver");
var dome_mesh = new THREE.Mesh(dome_geometry, dome_material);

var torso = new THREE.Group();
torso.add(dome_mesh);
torso.rotation.z = 1.5*Math.PI;
torso.add(elevation);
torso.position.y = 4;

// base
var base_geometry = new THREE.CylinderGeometry(2, 2, 4);
var base_material = new THREE.MeshPhongMaterial();
base_material.color = new THREE.Color("purple");
var base_mesh = new THREE.Mesh(base_geometry, base_material);
base_mesh.position.y = 2;

var robot = new THREE.Group();
robot.add(base_mesh);
robot.add(torso);


scene.add(robot);

// lights
var light_ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light_ambient);
var light_point = new THREE.PointLight();
light_point.intensity = 0.6;
light_point.position.set(camera.position.x, camera.position.y, camera.position.z);
scene.add(light_point);

// stats
var stats = new Stats();
document.body.appendChild(stats.dom);

// gui
var gui = new dat.GUI();
var h = gui.addFolder("Pose Parameters");
h.open();
h.add(elevation.rotation, "z", 0*Math.PI, 0.5*Math.PI, 0.01).name("Elevation Angle");
h.add(torso.rotation, "y", 0.0, 2*Math.PI, 0.01).name("Torso Angle");

// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);

// start off animation
animate();

// -----------------------------------------------------------------------------
function animate() {

    // put this function in queue for another frame after this one
    requestAnimationFrame(animate);

    // update
    light_point.position.set(camera.position.x, camera.position.y, camera.position.z);
    controls.update();
    stats.update();

    // render
    renderer.render(scene, camera);

}
// -----------------------------------------------------------------------------
