// begining of three.js stuff
var scene, camera, renderer, raycaster, controls, mouseRaycaster;

var cube;

var floor;

var light;

var objects = [];

var game = 0;


function init(){ 
	// scene
	scene = new THREE.Scene();
	scene.background = new THREE.Color( 0xcce0ff );
	scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
	
	// camera
	camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
	
    // renderer
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.renderSingleSided = false;
    renderer.setPixelRatio( window.devicePixelRatio );
	
	document.body.appendChild( renderer.domElement );
    
    // controls
	controls = new THREE.PointerLockControls( camera );
	scene.add( controls.getObject() );
	
	// raycasting
	raycaster = new THREE.Raycaster( new THREE.Vector3(), new THREE.Vector3( 0, - 1, 0 ), 0, 10 );
	mouseRaycaster = new THREE.Raycaster ( new THREE.Vector3(), camera.position.rotation, 0, 100);
	
	// loaders
	var loader = new THREE.TextureLoader();
	
	// lights
	scene.add( new THREE.AmbientLight( 0x666666 ) );
	
	light = new THREE.DirectionalLight( 0xdfebff, 1 );
	light.position.set( 30, 200, 100 );
	//light.position.multiplyScalar( 1.3 );
	
	// light shadow
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	var d = 300;
	light.shadow.camera.left = - d;
	light.shadow.camera.right = d;
	light.shadow.camera.top = d;
	light.shadow.camera.bottom = - d;
	light.shadow.camera.far = 1000;
	scene.add( light );
	
	// floor
	var groundTexture = loader.load( 'img/grasslight-big.jpg' );
	groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
	groundTexture.repeat.set( 1000, 1000 );
	groundTexture.anisotropy = 16;
	var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
	var floor = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
	floor.position.y = 0;
	floor.rotation.x = - Math.PI / 2;
	floor.receiveShadow = true;
	
	scene.add( floor );
	
	// cube
	var geometry = new THREE.BoxGeometry( 100, 5, 100 );
	var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	cube = new THREE.Mesh( geometry, material );
	cube.castShadow = true;
	cube.position.y = 20;
	cube.position.z = -100;
	scene.add( cube );
	objects.push(cube);
	gameObjs.push(new object(0));
	
	// click
	document.body.addEventListener( "click", addObject);
}

function animate() {
	requestAnimationFrame( animate );

	updateControls();
	updateGameObjs();

	renderer.render(scene, camera);
	
	stats.update();
};

function test(){
	console.log("uhm");	
};