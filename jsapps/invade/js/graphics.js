var gl;
var canvas;

var view;
var proj;
var ident;

var aspectRatio = 0;

function initGraphics(){
	canvas = document.getElementById('game');
	gl = canvas.getContext('webgl2');

	resizeScreen();

	if (!gl) {
		alert('Your browser does not support WebGL 2, Please update or install a browser that does');
	}

	console.log("Using: " + gl.getParameter(gl.VERSION));
	
	view = mat4.create();
	proj= mat4.create();
	ident = mat4.create();
	
	mat4.identity(ident);
	
	mat4.lookAt(view, [0, 0, 0], [0, 0, 0], [0, 1, 0]);
	
	primeScreen();
}

function resizeScreen(){
	canvas.height = 0;
	canvas.width = 0;
	canvas.height = $(document).height();
	canvas.width = $(document).width();
	gl.viewport(0, 0, canvas.width, canvas.height);
	aspectRatio = canvas.width / canvas.height;
}

// MATRIXES //////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateLookAt(lookat, cam){
	mat4.lookAt(view, cam, lookat, [0, 1, 0]);
}

// MESHING ///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function genSquareMesh(size, shader){
	size = size/2;
	var vert = [size,0,size, -size,0,size, -size,0,-size, size,0,-size];
	var uv = [1,0, 0,0, 0,1, 1,1];
	var normals = [0,1,0, 0,1,0, 0,1,0, 0,1,0];
	var indices = [2,1,0,3,2,0];
	return genMesh(vert, uv, normals, indices, shader);
}

function genMeshFromJSON(str, shader){
	var mesh = JSON.parse(str);
	return genMesh(mesh.verts, mesh.uv, mesh.normals, mesh.indices, shader);
}

function genMesh(verts, uv, normals, indicies, shader){
	// gen and bind verts
	var vbo = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verts), gl.STATIC_DRAW);

	// gen and bind uv
	//var vbo2 = gl.createBuffer();
	//gl.bindBuffer(gl.ARRAY_BUFFER, vbo2);
	//gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.STATIC_DRAW);

	// gen and bind normal
	var vbo3 = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo3);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW); 
	
	// gen and bind indicies
	var ibo = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indicies), gl.STATIC_DRAW);
	
	// gen and bind array
	var vao = gl.createVertexArray();
	gl.bindVertexArray(vao);
	
	// attach verts
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
	var positionAttribLocation = gl.getAttribLocation(shader, 'position');
	gl.enableVertexAttribArray(positionAttribLocation);
	gl.vertexAttribPointer(positionAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

	// attach and bind uv
	//gl.bindBuffer(gl.ARRAY_BUFFER, vbo2);
	//var uvAttribLocation = gl.getAttribLocation(shader, 'uvPosition');
	//gl.enableVertexAttribArray(uvAttribLocation);
	//gl.vertexAttribPointer(uvAttribLocation, 2, gl.FLOAT, gl.FALSE, 2 * Float32Array.BYTES_PER_ELEMENT, 0);

	// attach and bind normals
	gl.bindBuffer(gl.ARRAY_BUFFER, vbo3);
	var normalAttribLocation = gl.getAttribLocation(shader, 'normal');
	gl.enableVertexAttribArray(normalAttribLocation);
	gl.vertexAttribPointer(normalAttribLocation, 3, gl.FLOAT, gl.FALSE, 3 * Float32Array.BYTES_PER_ELEMENT, 0);

	// attach indicies
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
	
	// remove array
	gl.bindVertexArray(null);
	
	return new Mesh(vao, indicies.length);
}

function primeScreen(){
	// clear screen
	gl.clearColor(0.7, 0.8, 1.0, 1.0);
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	gl.enable(gl.CULL_FACE);
	gl.enable(gl.DEPTH_TEST);

	mat4.perspective(proj, 45, aspectRatio, 0.1, 1000);
}

function Mesh(vao, indexCount){
	this.vao = vao;
	this.indexCount = indexCount;
}

function drawMesh(mesh){
	gl.bindVertexArray(mesh.vao);
	gl.drawElements(gl.TRIANGLES, mesh.indexCount, gl.UNSIGNED_SHORT, 0);
	gl.bindVertexArray(null);

}

// TEXTURES //////////////////////////////////////////////////////////////////////////////////////////////////////////////

function loadTexture(image){

	// Create a texture.
	var texture = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, texture);

	// Set the parameters so we can render any size image.
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

	// Upload the image into the texture.
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

	return texture;
}

// SHADERS ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function genShader(vert, frag){
	var vertexShader = gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vert);
	gl.shaderSource(fragmentShader, frag);

	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
		return;
	}

	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
		console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
		return;
	}

	var program = gl.createProgram();
	gl.attachShader(program, vertexShader);
	gl.attachShader(program, fragmentShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		console.error('ERROR linking program!', gl.getProgramInfoLog(program));
		return;
	}
	gl.validateProgram(program);
	if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
		console.error('ERROR validating program!', gl.getProgramInfoLog(program));
		return;
	}
	
	return program;
}

function primeShader(shader){
	gl.useProgram(shader);
	updateUniformM4f(shader, "view", view);
	updateUniformM4f(shader, "proj", proj);
}

function translateMatrix(mat, translation, rotate, scale){
	var matrix = mat4.create();
	mat4.translate(matrix, mat, translation);
	mat4.rotate(matrix, matrix, rotate[0], [1, 0, 0]);
	mat4.rotate(matrix, matrix, rotate[1], [0, 1, 0]);
	mat4.rotate(matrix, matrix, rotate[2], [0, 0, 1]);
	mat4.scale(matrix, matrix, scale);
	return matrix;
}

function translateShader(shader, translation, rotate, scale){
	gl.useProgram(shader);
	var model = mat4.create();
	mat4.translate(model, ident, translation);
	mat4.rotate(model, model, rotate[0], [1, 0, 0]);
	mat4.rotate(model, model, rotate[1], [0, 1, 0]);
	mat4.rotate(model, model, rotate[2], [0, 0, 1]);
	mat4.scale(model, model, scale);
	updateUniformM4f(shader, "model", model);
}

function updateUniformM4f(shader, name, matrix){
	var loc = gl.getUniformLocation(shader, name);
	gl.uniformMatrix4fv(loc, gl.FALSE, matrix);
}

function updateUniformV3f(shader, name, vector){
	var loc = gl.getUniformLocation(shader, name);
	gl.uniform3fv(loc, vector);
}

function updateUniformF(shader, name, float){
	var loc = gl.getUniformLocation(shader, name);
	gl.uniform1f(loc, float);
}

// MATHS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
function clamp(r, min, max){
	if (r => max){
		return max;
	}
	if (r <= min){
		return min;
	}
	return r;
}