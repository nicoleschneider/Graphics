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


// left arm
var L_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var L_arm_material = new THREE.MeshPhongMaterial();
L_arm_material.color = new THREE.Color("black");
var L_arm_mesh = new THREE.Mesh(L_arm_geometry, L_arm_material);
L_arm_mesh.position.y = 3;

// right arm
var R_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var R_arm_material = new THREE.MeshPhongMaterial();
R_arm_material.color = new THREE.Color("black");
var R_arm_mesh = new THREE.Mesh(R_arm_geometry, R_arm_material);
R_arm_mesh.position.y = -3;


var elevation = new THREE.Group();
elevation.add(R_arm_mesh);
elevation.add(L_arm_mesh);


// body
var torso_geometry = new THREE.CylinderGeometry(1, 1, 2);
var torso_material = new THREE.MeshPhongMaterial();
torso_material.color = new THREE.Color("silver");
var torso_mesh = new THREE.Mesh(torso_geometry, torso_material);

var body = new THREE.Group();
body.add(torso_mesh);
body.rotation.z = 1.5*Math.PI;
body.add(elevation);
body.position.y = 4;

// left leg
var L_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var L_leg_material = new THREE.MeshPhongMaterial();
L_leg_material.color = new THREE.Color("purple");
var L_leg_mesh = new THREE.Mesh(L_leg_geometry, L_leg_material);
L_leg_mesh.position.y = 1.5; // above ground
L_leg_mesh.position.x = 1;
var L_hip = new THREE.Group();
L_hip.add(L_leg_mesh);

// right leg
var R_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var R_leg_material = new THREE.MeshPhongMaterial();
R_leg_material.color = new THREE.Color("purple");
var R_leg_mesh = new THREE.Mesh(R_leg_geometry, R_leg_material);
R_leg_mesh.position.y = 1.5; // above ground
R_leg_mesh.position.x = -1;

var robot = new THREE.Group();
robot.add(L_hip);
robot.add(R_leg_mesh);
robot.add(body);


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
h.add(elevation.rotation, "z", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Elevation Angle");
h.add(body.rotation, "y", 0.0, Math.PI, 0.01).name("Torso Angle");

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
