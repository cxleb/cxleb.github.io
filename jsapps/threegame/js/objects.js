var gameObjs = [];

function addObject() {
    
    var geometry = new THREE.BoxGeometry( 10, 10, 10 );
	var material = new THREE.MeshLambertMaterial( { color: 0x00ff00 } );
	var cube = new THREE.Mesh( geometry, material );
	var objID = 1;
	cube.castShadow = true;
	cube.receiveShadow = true;
	
	mouseRaycaster.setFromCamera(new THREE.Vector2(), camera);
	var intersections = mouseRaycaster.intersectObjects( scene.children );
	
	if (intersections.length > 0){
	    cube.position.copy(intersections[0].point);
	    cube.position.y += 20;
	    scene.add( cube );
	    var len = objects.push(cube);
	    objID = len - 1;
	    //console.log(objID);
	    console.log(objects[objID]);
	}
    
    
    
    gameObjs.push(new object(objID));
	
	
};


var object = function(id) {
    
	var objID = id;
	var caster = new THREE.Raycaster(objects[id].position, new THREE.Vector3(0,-1,0), 0, 2.5);
	console.log(objects[id].position); 
	this.update = function(){
	    var intersections = caster.intersectObjects( scene.children );
	    //console.log(intersections)
	    if( intersections.length == 0 ){
	        //if (objects[objID].position.y > 0){
	        objects[objID].position.y -= 0.1;
	        //}
	        console.log(intersections);
	    }
		
	}
};


function updateGameObjs(){
    for(var i = 0; i < gameObjs.length; i++){
        gameObjs[0].update();
    }
}