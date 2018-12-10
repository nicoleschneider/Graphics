/**
* Nicole Schneider
*/

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
camera.position.set(20.0, 15.0, 15.0);





var path = "C:/Users/Nicole/Desktop/Graphics/FINAL/background/";
var format = '.png';

//var loader = new THREE.ImageLoader();


var urls = [
path + 'px' + format, path + 'nx' + format,
path + 'py' + format, path + 'ny' + format,
path + 'pz' + format, path + 'nz' + format];
//urls = "C:/Users/Nicole/Desktop/Graphics/FINAL/threejs/background.png";

//var textureCube = new THREE.CubeTextureLoader().load( urls );

//scene = new THREE.Scene();
//scene.background = textureCube;

var geometry = new THREE.SphereBufferGeometry( 0.1, 32, 16 );
//var material = new THREE.MeshBasicMaterial( { color: 0xffffff, envMap: textureCube } );

//fogColor = new THREE.Color(0xffffff);
 
//scene.background = fogColor;
//scene.fog = new THREE.Fog(fogColor, 0.0025, 20);

// lights
var light_ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(light_ambient);
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

// add directional light
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

var d = 300;

//dirLight.shadowCameraLeft = -d;
//dirLight.shadowCameraRight = d;
//dirLight.shadowCameraTop = d;
//dirLight.shadowCameraBottom = -d;

//dirLight.shadowCameraFar = 350;
//dirLight.shadowBias = -0.50001;
dirLight.shadowDarkness = 0.65;
/////////scene.add(dirLight);

// add hemisphere light
var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.2 );
hemiLight.position.set( 10, 500, 10 );
scene.add( hemiLight );

var spotLight = new THREE.SpotLight(0xffffff, 1);
spotLight.castShadow = true;

spotLight.position.x = 6;
spotLight.position.y = 18;
spotLight.position.z = 20;

spotLight.position.copy( camera.position );


spotLight.shadow.camera.near = 0.5;
spotLight.shadow.camera.far = 50.0;

function light_update()
{
    spotLight.position.copy( camera.position );
	spotLight.position.y+=5;
}
scene.add(spotLight);

// left arm
var L_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var L_arm_material = new THREE.MeshPhongMaterial();
L_arm_material.color = new THREE.Color("black");
var L_arm_mesh = new THREE.Mesh(L_arm_geometry, L_arm_material);
L_arm_mesh.position.y = 3;
L_arm_mesh.castShadow = true;

// right arm
var R_arm_geometry = new THREE.CylinderGeometry(0.25, 0.25, 3);
var R_arm_material = new THREE.MeshPhongMaterial( { 
    color: 0x996633,
    specular: 0x050505,
    shininess: 500
} ) 
R_arm_material.color = new THREE.Color("black");
var R_arm_mesh = new THREE.Mesh(R_arm_geometry, R_arm_material);
R_arm_mesh.position.y = -3;
R_arm_mesh.castShadow = true;


var elevation = new THREE.Group();
elevation.add(R_arm_mesh);
elevation.add(L_arm_mesh);


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

var body = new THREE.Group();
body.add(torso_mesh);
body.rotation.z = 1.5*Math.PI;
body.add(elevation);
body.position.y = 4;

// left leg
var L_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var L_leg_material =  new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
L_leg_material.color = new THREE.Color("black");
var L_leg_mesh = new THREE.Mesh(L_leg_geometry, L_leg_material);
L_leg_mesh.position.y = 1.5; // above ground
L_leg_mesh.position.x = 1;
L_leg_mesh.castShadow = true;
var L_hip = new THREE.Group();
L_hip.add(L_leg_mesh);

// right leg
var R_leg_geometry = new THREE.BoxGeometry(1, 2.5, 1);
var R_leg_material = new THREE.MeshStandardMaterial({roughness: 0.2, metalness: 0.5});
R_leg_material.color = new THREE.Color("black");
var R_leg_mesh = new THREE.Mesh(R_leg_geometry, R_leg_material);
R_leg_mesh.castShadow = true;
R_leg_mesh.position.y = 1.5; // above ground
R_leg_mesh.position.x = -1;

var robot = new THREE.Group();
robot.add(L_hip);
robot.add(R_leg_mesh);
robot.add(body);


scene.add(robot);




// ground plane grid
var gridHelper = new THREE.GridHelper(20, 20);
scene.add(gridHelper);
var planeGeometry = new THREE.PlaneBufferGeometry( 40, 40, 32, 32 );
var planeMaterial = new THREE.MeshStandardMaterial( { color: 0xadd8e6 } )
var plane = new THREE.Mesh( planeGeometry, planeMaterial );
//var geometry = new THREE.PlaneGeometry( 10, 10, 10 );
//var material = new THREE.MeshBasicMaterial( {color: 0x000f000, side: THREE.DoubleSide} );
//var plane = new THREE.Mesh( geometry, material );
//plane.rotateX( - Math.PI / 2);
plane.rotation.x -= Math.PI/2;
plane.receiveShadow = true;
scene.add( plane );
// https://stackoverflow.com/questions/29916886/three-js-add-plane-to-the-scene

var helper2 = new THREE.CameraHelper( dirLight.shadow.camera );
scene.add( helper2 );

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
