/**
* Nicole Schneider
* Graphics Final Project
* CS 486 Computer Graphics
* Hierarchical Robot
*/

// update position of light as camera moves
function light_update()
{
    spotLight.position.copy( camera.position );
	spotLight.position.y+=5;
}

// create a shiny material
// https://medium.com/@soffritti.pierfrancesco/glossy-spheres-in-three-js-bfd2785d4857
function getShinyMaterial()
{
	return new THREE.MeshPhongMaterial( { 
    color: 0x996633,
    specular: 0x050505,
    shininess: 500
	} ) 
}

function makeRenderer(){
	var renderer = new THREE.WebGLRenderer();

	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowCameraBottom = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.shadowMap.enabled = true;

	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor('white');
	renderer.setPixelRatio(window.devicePixelRatio);
	document.body.appendChild(renderer.domElement);
	return renderer;
}

function makePointLight(){
	var light_point = new THREE.PointLight();
	light_point.intensity = 0.6;
	light_point.position.set(camera.position.x+5, camera.position.y+15, camera.position.z+5);
	light_point.castShadow = true;
	light_point.shadow.camera.near = 0.001;       
	light_point.shadow.camera.far = 120;      
	light_point.shadow.camera.left = -500;
	light_point.shadow.camera.bottom = -500;
	light_point.shadow.camera.right = 500;
	light_point.shadow.camera.top = 500;
	light_point.shadow.mapSize.width = 2048;
	light_point.shadow.mapSize.height = 2048;
	return light_point;
}

// directional light
//https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js
function makeDirLight(){
	var dirLight = new THREE.DirectionalLight( 0xffffff, 0.7 );
	dirLight.position.set( 1, 0.75, 1 );
	dirLight.position.multiplyScalar( 50);
	dirLight.shadowCameraVisible = true;
	dirLight.castShadow = true;
	dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

	dirLight.shadow.camera.near = 0.1;       
	dirLight.shadow.camera.far = 20;      
	dirLight.shadow.camera.left = 50;
	dirLight.shadow.camera.bottom = -50;
	dirLight.shadow.camera.right = 50;
	dirLight.shadow.camera.top = 50;
	dirLight.shadowDarkness = 0.65;
	return dirLight;
}

function makeSpotLight(){
	var spotLight = new THREE.SpotLight(0xffffff, 1);
	spotLight.castShadow = true;
	spotLight.position.copy( camera.position );
	spotLight.shadow.camera.near = 0.5;
	spotLight.shadow.camera.far = 50.0;
	return spotLight;
}

function makeHead(){
	var head_geometry = new THREE.SphereGeometry(1, 8, 8);
	var head_material = getShinyMaterial();
	head_material.castShadow = true;
	head_material.color = new THREE.Color("black");
	var head_mesh = new THREE.Mesh(head_geometry, head_material);
	head_mesh.position.x = -2;
	head_mesh.castShadow = true;
	return head_mesh;
}

// right upper leg
function makeRLeg(){
	var R_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
	var R_leg_material = new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
	R_leg_material.color = new THREE.Color("black");
	var R_leg_mesh = new THREE.Mesh(R_leg_geometry, R_leg_material);
	R_leg_mesh.castShadow = true;
	R_leg_mesh.position.y = -1.5;
	R_leg_mesh.position.x = 2;
	R_leg_mesh.rotation.z = -Math.PI/2;
	return R_leg_mesh;
}

// right lower leg
function makeRLleg(){
	var RL_leg_geometry = new THREE.BoxGeometry(2.5, 1, 1);
	var RL_leg_material = getShinyMaterial();
	RL_leg_material.color = new THREE.Color("black");
	var RL_leg_mesh = new THREE.Mesh(RL_leg_geometry, RL_leg_material);
	RL_leg_mesh.position.x = 1;
	RL_leg_mesh.rotation.y = Math.PI;;
	RL_leg_mesh.castShadow = true;
	return RL_leg_mesh;
}

// left upper leg
function makeLleg(){
	var L_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
	var L_leg_material =  new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
	L_leg_material.color = new THREE.Color("black");
	var L_leg_mesh = new THREE.Mesh(L_leg_geometry, L_leg_material);
	L_leg_mesh.position.y = 1.5; 
	L_leg_mesh.position.x = 2;
	//L_leg_mesh.position.z = 1;
	L_leg_mesh.castShadow = true;
	L_leg_mesh.rotation.z = -Math.PI/2;
	return L_leg_mesh;
}

// left lower leg
function makeLLleg(){
	var LL_leg_geometry = new THREE.BoxGeometry(2.5, 1, 1);
	var LL_leg_material = getShinyMaterial();
	LL_leg_material.color = new THREE.Color("black");
	var LL_leg_mesh = new THREE.Mesh(LL_leg_geometry, LL_leg_material);
	LL_leg_mesh.position.x = 1;
	LL_leg_mesh.rotation.y = Math.PI;;
	LL_leg_mesh.castShadow = true;
	return LL_leg_mesh;
}

// left upper arm
function makeLArm(){
	var L_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 2);
	var L_arm_material = getShinyMaterial();
	L_arm_material.color = new THREE.Color("black");
	var L_arm_mesh = new THREE.Mesh(L_arm_geometry, L_arm_material);
	L_arm_mesh.position.y = 2;
	L_arm_mesh.castShadow = true;
	return L_arm_mesh;
}

// left forearm
function makeLLArm(){
	var LF_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 2);
	var LF_arm_material = getShinyMaterial();
	LF_arm_material.color = new THREE.Color("black");
	var LF_arm_mesh = new THREE.Mesh(LF_arm_geometry, LF_arm_material);
	LF_arm_mesh.position.y = 1;
	LF_arm_mesh.castShadow = true;
	return LF_arm_mesh;
}

// right upper arm
function makeRArm(){
	var R_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 2);
	var R_arm_material = getShinyMaterial();
	R_arm_material.color = new THREE.Color("black");
	var R_arm_mesh = new THREE.Mesh(R_arm_geometry, R_arm_material);
	R_arm_mesh.position.y = -2;
	R_arm_mesh.castShadow = true;
	return R_arm_mesh;
}

// right lower arm
function makeRLArm(){
	var RF_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 2);
	var RF_arm_material = getShinyMaterial();
	RF_arm_material.color = new THREE.Color("black");
	var RF_arm_mesh = new THREE.Mesh(RF_arm_geometry, RF_arm_material);
	RF_arm_mesh.position.y = -1;
	RF_arm_mesh.castShadow = true;
	return RF_arm_mesh;
}

// torso
function makeTorso(){
	var torso_geometry = new THREE.CylinderGeometry(1, 1, 2);
	var torso_material = getShinyMaterial();
	torso_material.castShadow = true;
	torso_material.color = new THREE.Color("gray");
	var torso_mesh = new THREE.Mesh(torso_geometry, torso_material);
	torso_mesh.castShadow = true;
	return torso_mesh;
}

// floor
// https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene
function makePlane(){
	var planeGeometry = new THREE.PlaneBufferGeometry( 40, 40, 32, 32 );
	var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xadd8e6 } )
	var plane = new THREE.Mesh( planeGeometry, planeMaterial );

	plane.rotation.x -= Math.PI/2;
	plane.receiveShadow = true;
	return plane;
}

// renderer
var renderer = makeRenderer();

// create a scene
var scene = new THREE.Scene();

// camera
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.set(20.0, 5.0, 15.0);


// lights

// ambient light
var light_ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(light_ambient);

// point light
var light_point = makePointLight();
scene.add(light_point);

// directional light
dirLight = makeDirLight();
scene.add(dirLight);

// hemisphere light
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2 );
hemiLight.position.set( 10, 500, 10 );
scene.add( hemiLight );

// spotlight
var spotLight = makeSpotLight();
scene.add(spotLight);


// make robot

// left forearm
LF_arm_mesh = makeLLArm();

// left upper arm
L_arm_mesh = makeLArm();

// left elbow
var left_elbow = new THREE.Group();
left_elbow.add(LF_arm_mesh);
left_elbow.position.y = 3;
var left_arm = new THREE.Group();
left_arm.add(left_elbow);
left_arm.add(L_arm_mesh);


// right forearm
RF_arm_mesh = makeRLArm();

// right upper arm
R_arm_mesh = makeRArm();

// right elbow
var right_elbow = new THREE.Group();
right_elbow.add(RF_arm_mesh);
right_elbow.position.y = -3;
var right_arm = new THREE.Group();
right_arm.add(right_elbow);
right_arm.add(R_arm_mesh);


// shoulders
var R_shoulder = new THREE.Group();
R_shoulder.add(right_arm);

var L_shoulder = new THREE.Group();
L_shoulder.add(left_arm);

// head
head_mesh = makeHead();

var neck = new THREE.Group();
neck.add(head_mesh);

// body
torso_mesh = makeTorso();

var torso = new THREE.Group();
torso.add(torso_mesh);
torso.add(neck);

var body = new THREE.Group();
body.rotation.z = 1.5*Math.PI;
torso.add(L_shoulder);
torso.add(R_shoulder);
body.position.y = 4;
body.add(torso);

// left lower leg
LL_leg_mesh = makeLLleg();

// left leg
L_leg_mesh = makeLleg();

// left knee
var left_knee = new THREE.Group();
left_knee.add(LL_leg_mesh);
left_knee.position.y = 1.5;
left_knee.position.x = 3.5;
var left_leg = new THREE.Group();
left_leg.add(left_knee);
left_leg.add(L_leg_mesh);

var L_hip = new THREE.Group();
L_hip.add(left_leg);
L_hip.position.y = -0.75;


// right lower leg
RL_leg_mesh = makeRLleg();

// right leg
R_leg_mesh = makeRLeg();

// right knee
var right_knee = new THREE.Group();
right_knee.add(RL_leg_mesh);
right_knee.position.y = -1.5;
right_knee.position.x = 3.5;
var right_leg = new THREE.Group();
right_leg.add(right_knee);
right_leg.add(R_leg_mesh);

var R_hip = new THREE.Group();
R_hip.add(right_leg);
R_hip.position.y = 0.75;

var robot = new THREE.Group();
body.add(L_hip);
body.add(R_hip);
robot.add(body);

robot.position.y = 1.75;
scene.add(robot);


// ground plane grid
var gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

// ground plane
plane = makePlane();
scene.add(plane);


// stats
var stats = new Stats();
document.body.appendChild(stats.dom);

// gui
var gui = new dat.GUI();
var h = gui.addFolder("Pose Parameters");
h.open();
h.add(neck.rotation, "x", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Neck Rotation");
h.add(torso.rotation, "x", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Torso Angle");
h.add(R_shoulder.rotation, "z", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Right Shoulder Angle");
h.add(right_elbow.rotation, "x", -0.25*Math.PI, 0, 0.01).name("Right Elbow Angle");
h.add(L_shoulder.rotation, "z", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Left Shoulder Angle");
h.add(left_elbow.rotation, "x", 0, 0.25*Math.PI, 0.01).name("Left Elbow Angle");
h.add(R_hip.rotation, "y", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Right Hip Rotation");
h.add(right_knee.rotation, "y", 0, 0.75*Math.PI, 0.01).name("Right Knee Angle");
h.add(L_hip.rotation, "y", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Left Hip Rotation");
h.add(left_knee.rotation, "y", 0, 0.75*Math.PI, 0.01).name("Left Knee Angle");


// controls
var controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.addEventListener( 'change', light_update );

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
