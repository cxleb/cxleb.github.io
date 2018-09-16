var controlsEnabled = false;
var moveForward = false;
var moveBackward = false;
var moveLeft = false;
var moveRight = false;
var canJump = false;
var prevTime = performance.now();
var velocity = new THREE.Vector3();
var direction = new THREE.Vector3();


function setupControls(){
    var pointerLock;
	pointerLock = 'pointerLockElement' in document || 'mozPointerLockElement' in document || 'webkitPointerLockElement' in document;
	if ( pointerLock ) {
		var element = document.body;
		var pointerlockchange = function ( event ) {
			if ( document.pointerLockElement === element || document.mozPointerLockElement === element || document.webkitPointerLockElement === element ) {
				controlsEnabled = true;
				controls.enabled = true;
				blocker.style.display = 'none';
			} else {
				controls.enabled = false;
				blocker.style.display = 'block';
				instructions.style.display = '';
			}
		};
		var pointerlockerror = function ( event ) {
			instructions.style.display = '';
		};
		// Hook pointer lock state change events
		document.addEventListener( 'pointerlockchange', pointerlockchange, false );
		document.addEventListener( 'mozpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'webkitpointerlockchange', pointerlockchange, false );
		document.addEventListener( 'pointerlockerror', pointerlockerror, false );
		document.addEventListener( 'mozpointerlockerror', pointerlockerror, false );
		document.addEventListener( 'webkitpointerlockerror', pointerlockerror, false );
		instructions.addEventListener( 'click', function ( event ) {
			instructions.style.display = 'none';
			// Ask the browser to lock the pointer
			element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
			element.requestPointerLock();
		}, false );
		document.exitPointerLock = document.exitPointerLock || document.mozExitPointerLock || webkitExitPointerLock;
	} else {
		instructions.innerHTML = 'Your browser doesn\'t seem to support Pointer Lock API';
	}
	
	document.addEventListener( 'keydown', onKeyDown, false );
	document.addEventListener( 'keyup', onKeyUp, false );
}

function updateControls(){
    if ( controlsEnabled === true ) {
		raycaster.ray.origin.copy( controls.getObject().position );
		//raycaster.ray.origin.y -= 10;
		var intersections = raycaster.intersectObjects( objects );
		var onObject = intersections.length > 0;
		var time = performance.now();
		var delta = ( time - prevTime ) / 1000;
		velocity.x -= velocity.x * 10.0 * delta;
		velocity.z -= velocity.z * 10.0 * delta;
		velocity.y -= 9.8 * 100.0 * delta; // 100.0 = mass
		direction.z = Number( moveForward ) - Number( moveBackward );
		direction.x = Number( moveLeft ) - Number( moveRight );
		direction.normalize(); // this ensures consistent movements in all directions
		if ( moveForward || moveBackward ) velocity.z -= direction.z * 400.0 * delta;
		if ( moveLeft || moveRight ) velocity.x -= direction.x * 400.0 * delta;
		if ( onObject === true ) {
			velocity.y = Math.max( 0, velocity.y );
			canJump = true;
		}
		controls.getObject().translateX( velocity.x * delta );
		controls.getObject().translateY( velocity.y * delta );
		controls.getObject().translateZ( velocity.z * delta );
		if ( controls.getObject().position.y < 10 ) {
			velocity.y = 0;
			controls.getObject().position.y = 10;
			canJump = true;
		}
		prevTime = time;
	}
}

var onKeyDown = function ( event ) {
	switch ( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = true;
			break;
		case 37: // left
		case 65: // a
			moveLeft = true; break;
		case 40: // down
		case 83: // s
			moveBackward = true;
			break;
		case 39: // right
		case 68: // d
			moveRight = true;
			break;
		case 32: // space
			if ( canJump === true ) velocity.y += 350;
			canJump = false;
			break;
		case 69:
		    document.exitPointerLock();
			break;    
	}
};
var onKeyUp = function ( event ) {
	switch( event.keyCode ) {
		case 38: // up
		case 87: // w
			moveForward = false;
			break;
		case 37: // left
		case 65: // a
			moveLeft = false;
			break;
		case 40: // down
		case 83: // s
			moveBackward = false;
			break;
		case 39: // right
		case 68: // d
			moveRight = false;
			break;
	}
};