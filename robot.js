/**
* Nicole Schneider
* Graphics Final Project
*/

// update position of light as camera moves
function light_update()
{
    spotLight.position.copy( camera.position );
	spotLight.position.y+=5;
}

function getShinyMaterial()
{
	return new THREE.MeshPhongMaterial( { 
    color: 0x996633,
    specular: 0x050505,
    shininess: 500
	} ) 
}

// renderer
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

// create a scene
var scene = new THREE.Scene();

// show axes
var axesHelper = new THREE.AxesHelper(30);
scene.add(axesHelper);

// camera
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
camera.position.set(20.0, 5.0, 15.0);


// lights

// ambient light
var light_ambient = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(light_ambient);

// point light
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
scene.add(light_point);

// directional light
//https://stackoverflow.com/questions/15478093/realistic-lighting-sunlight-with-three-js
var dirLight = new THREE.DirectionalLight( 0xffffff, 1 );
dirLight.position.set( 1, 0.75, 1 );
dirLight.position.multiplyScalar( 50);
dirLight.name = "dirlight";
dirLight.shadowCameraVisible = true;
dirLight.castShadow = true;
dirLight.shadowMapWidth = dirLight.shadowMapHeight = 1024*2;

dirLight.shadow.camera.near = 0.1;       
dirLight.shadow.camera.far = 20;      
dirLight.shadow.camera.left = -50;
dirLight.shadow.camera.bottom = -50;
dirLight.shadow.camera.right = 50;
dirLight.shadow.camera.top = 50;

dirLight.shadowDarkness = 0.65;
/////////scene.add(dirLight);/////////////////////////////////////////////////////

// hemisphere light
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2 );
hemiLight.position.set( 10, 500, 10 );
scene.add( hemiLight );

// spotlight
var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.castShadow = true;
spotLight.position.copy( camera.position );
spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 50.0;
scene.add(spotLight);



// left arm
var L_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var L_arm_material = getShinyMaterial();
L_arm_material.color = new THREE.Color("black");
var L_arm_mesh = new THREE.Mesh(L_arm_geometry, L_arm_material);
L_arm_mesh.position.y = 3;
L_arm_mesh.castShadow = true;

// right arm
var R_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var R_arm_material = getShinyMaterial();
R_arm_material.color = new THREE.Color("black");
var R_arm_mesh = new THREE.Mesh(R_arm_geometry, R_arm_material);
R_arm_mesh.position.y = -3;
R_arm_mesh.castShadow = true;


var R_shoulder = new THREE.Group();
R_shoulder.add(R_arm_mesh);
var L_shoulder = new THREE.Group();
L_shoulder.add(L_arm_mesh);


// body
var torso_geometry = new THREE.CylinderGeometry(1, 1, 2);
//var torso_material = new THREE.MeshLambertMaterial();
//var torso_material = new THREE.MeshStandardMaterial({roughness: 0});
// https://medium.com/@soffritti.pierfrancesco/glossy-spheres-in-three-js-bfd2785d4857
var torso_material = new THREE.MeshPhongMaterial( { 
    color: 0x996633,
    specular: 0x050505,
    shininess: 500
} ) 
torso_material.castShadow = true;
torso_material.color = new THREE.Color("gray");
var torso_mesh = new THREE.Mesh(torso_geometry, torso_material);
torso_mesh.castShadow = true;

var torso = new THREE.Group();
torso.add(torso_mesh);

var body = new THREE.Group();
body.rotation.z = 1.5*Math.PI;
torso.add(L_shoulder);
torso.add(R_shoulder);
body.position.y = 4;
body.add(torso);

// left leg
var L_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var L_leg_material =  new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
L_leg_material.color = new THREE.Color("black");
var L_leg_mesh = new THREE.Mesh(L_leg_geometry, L_leg_material);
L_leg_mesh.position.y = 1.5; 
L_leg_mesh.position.x = 2;
//L_leg_mesh.position.z = 1;
L_leg_mesh.castShadow = true;
L_leg_mesh.rotation.z = -Math.PI/2;
var L_hip = new THREE.Group();
L_hip.add(L_leg_mesh);

// right leg
var R_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var R_leg_material = new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
R_leg_material.color = new THREE.Color("black");
var R_leg_mesh = new THREE.Mesh(R_leg_geometry, R_leg_material);
R_leg_mesh.castShadow = true;
R_leg_mesh.position.y = -1.5;
R_leg_mesh.position.x = 2;
R_leg_mesh.rotation.z = -Math.PI/2;
var R_hip = new THREE.Group();
R_hip.add(R_leg_mesh);

var robot = new THREE.Group();
body.add(L_hip);
body.add(R_hip);
robot.add(body);


scene.add(robot);




// ground plane grid
// https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene
var gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);

var planeGeometry = new THREE.PlaneBufferGeometry( 40, 40, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xadd8e6 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );

plane.rotation.x -= Math.PI/2;
plane.receiveShadow = true;

scene.add( plane );


// stats
var stats = new Stats();
document.body.appendChild(stats.dom);

// gui
var gui = new dat.GUI();
var h = gui.addFolder("Pose Parameters");
h.open();
h.add(R_shoulder.rotation, "z", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Right Shoulder Angle");
h.add(L_shoulder.rotation, "z", -0.25*Math.PI, 0.25*Math.PI, 0.01).name("Left Shoulder Angle");
h.add(torso.rotation, "x", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Torso Angle");
h.add(R_hip.rotation, "y", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Right Hip Rotation");
h.add(L_hip.rotation, "y", -0.5*Math.PI, 0.5*Math.PI, 0.01).name("Left Hip Rotation");

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
