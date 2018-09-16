var mainShader;
var meshes = [];
var pitch = 0.7071; // sin(45)
var speed = 0.5;
var cam = [10,10,0];
var light = [0.7, 0.7, -1];
var lightIntensity = 1;
var dx = 0;
var dy = 0;
var sx = 0;
var sy = 0;
var dragging = false;

var map = [];
var mapSize = 20;

function load(){
	initGraphics();
	noiseSeed = Date.now();
	genMap();

	mainShader = genShader(mainVert, mainFrag2);
	if (!mainShader){
		return;
	}

	meshes[0] = genMeshFromJSON(cubeModel, mainShader);//genSquareMesh(2, mainShader);
	meshes[1] = genMeshFromJSON(treeModel, mainShader);
	meshes[2] = genMeshFromJSON(fenceModel, mainShader);
	meshes[3] = genMeshFromJSON(farmHouseModel, mainShader);
	meshes[4] = genMeshFromJSON(waterModel, mainShader);
	

	attachEvents();

	update();

	render();
}

function attachEvents(){
	$( window ).resize(function() {
  		resizeScreen();
  	});
  	$( "body" ).keydown(function(event) {
  		if (event.which == 38 || event.which == 87){
  			cam[2] += speed * cam[1] * 0.10;
  		}
  		if (event.which == 40 || event.which == 83){
  			cam[2] -= speed * cam[1] * 0.10;
  		}
  		if (event.which == 37 || event.which == 65){
  			cam[0] += speed * cam[1] * 0.10;
  		}
  		if (event.which == 39 || event.which == 68){
  			cam[0] -= speed * cam[1] * 0.10;
  		}
  		if (event.which == 188){
  			if(cam[1] > 1.2){
  				cam[2] += speed;
  				cam[1] += -pitch * speed;
  			}
  		}
  		if (event.which == 190){
  			if(cam[1] < 18){
  				cam[2] -= speed;
  				cam[1] -= -pitch * speed;
  			}
  		}
  		if (event.which == 78){
  			lightIntensity -= 0.01;
  		}
  		if (event.which == 77){
  			lightIntensity += 0.01;
  		}
  		update();
  	});
  	$("body").mousemove(function(event){
		//dx = sx - event.pageX;
		//dy = sy - event.pageY;
		//sx = event.pageX;
		//sy = event.pageY;
		//if(dragging){
		//	update();
		//}
	});
	$("body").mousedown(function(event){
		dragging = true;
	});
	$("body").mouseup(function(event){
		dragging = false;
	});
}

function update(){
	updateLookAt([cam[0], -pitch + cam[1], cam[2] + 1], cam);
}

function render(){
	primeScreen();
	primeShader(mainShader);

	var worldMatrix = translateMatrix(ident, [0,0,0], [0,0,0], [1,1,1]);
	updateUniformV3f(mainShader, 'directLight', light);
	updateUniformF(mainShader, 'lightIntensity', lightIntensity);

	//drawTile(6, mainShader, worldMatrix);

	drawMap(mainShader, worldMatrix);

	requestAnimationFrame(render);
}

function drawMap(shader, world){
	for (var y = 0; y < mapSize; y++){
		for (var x = 0; x < mapSize; x++) {
			var tileMatrix = translateMatrix(world, [x*2, 0, y*2], [0,0,0], [1,1,1]);
			drawTile(map[y * mapSize + x], shader, tileMatrix);
		}
	}
}

function drawTile(tileID, shader, translation){
	for(var i in tiles[tileID]){
		var matrix = translateMatrix(translation, tiles[tileID][i][2], tiles[tileID][i][3], tiles[tileID][i][4]);
		updateUniformV3f(mainShader, 'color', tiles[tileID][i][1]);
		drawTranslatedMesh(meshes[tiles[tileID][i][0]], shader, matrix);
	}
}

function drawTranslatedMesh(mesh, shader, translation){
	updateUniformM4f(shader, 'model', translation);
	drawMesh(mesh);
}