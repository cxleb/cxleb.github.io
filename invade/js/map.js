// tile format [mesh id, colour, position, rotation, scale]
var tiles = [
	[ // 0 grass
	[0, [0.6,1,0.6], [0,-1,0], [0,0,0], [1,1,1]]
	],

	[ // 1 water
	[4, [0.1,0.6,1], [0,-1.1,0], [0,0,0], [1,0.9,1]]
	],

	[ // 2 tree arrangement 1
	[0, [0.6,1,0.6], [0,-1,0], [0,0,0], [1,1,1]],
	[1, [0.2,1,0.2], [0,0,0], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [0.75,0,0.75], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [0.4,0,-0.5], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [-0.4,0,0.6], [0,0,0], [0.15,0.15,0.15]],
	],

	[ // 3 tree arrangement 2
	[0, [0.6,1,0.6], [0,-1,0], [0,0,0], [1,1,1]],
	[1, [0.2,1,0.2], [0.5,0,0.5], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [-0.5,0,-0.5], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [0.2,0,-0.2], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [-0.4,0,0.6], [0,0,0], [0.15,0.15,0.15]],
	],

	[ // 4 tree arrangement 3
	[0, [0.6,1,0.6], [0,-1,0], [0,0,0], [1,1,1]],
	[1, [0.2,1,0.2], [0.75,0,0.3], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [-0.2,0,-0.7], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [0.2,0,0.6], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.2,1,0.2], [-0.6,0,0.2], [0,0,0], [0.15,0.15,0.15]],
	],

	[ // 5 autumn tree arrangement 1
	[0, [0.6,1,0.6], [0,-1,0], [0,0,0], [1,1,1]],
	[1, [0.8,0.4,0.2], [0,0,0], [0,0,0], [0.15,0.15,0.15]],
	[1, [1,0.6,0.3], [0.75,0,0.75], [0,0,0], [0.15,0.15,0.15]],
	[1, [1,0.2,0.2], [0.4,0,-0.5], [0,0,0], [0.15,0.15,0.15]],
	[1, [0.8,0.3,0.2], [-0.4,0,0.6], [0,0,0], [0.15,0.15,0.15]],
	],
 
	[ // 6 farm
	[0, [0.55,0.40,0.05], [0,-1,0], [0,0,0], [1,1,1]],
	[2, [0.55,0.40,0.05], [0.9,0,0], [0,0,0], [0.15,0.15,0.15]],
	[2, [0.55,0.40,0.05], [-0.9,0,0], [0,0,0], [0.15,0.15,0.15]],
	[2, [0.55,0.40,0.05], [0,0,0.9], [0,1.5708,0], [0.15,0.15,0.15]],
	[2, [0.55,0.40,0.05], [0,0,-0.9], [0,1.5708,0], [0.15,0.15,0.15]],
	[3, [0.62,0.19,0.13], [0,0.4,0], [0,0.5,0], [0.25,0.25,0.25]],
	],

];

var tileInfo = [
	
];

function genMap(){
	seed = noiseSeed;
	var autumnness = getRandomFloat() / 4;
	var treeAmount = (1 - autumnness) / 3;
	var seedSave = seed;

	for(var y = 0; y < mapSize; y++){
		for(var x = 0; x < mapSize; x++){
			var noise = getPerlin(x/8, y/8);
			var tile = 0;
			if(noise < 0.35){
				tile = 1;
			}else if(noise > 0.4 && noise < 0.5){
				var tree = Math.random();
				if(tree < treeAmount)
					tile = 2;
				else if(tree > treeAmount && tree < treeAmount*2)
					tile = 3;
				else if(tree > treeAmount*2 && tree < treeAmount*3)
					tile = 4;
				else 
					tile = 5;
			}else{
				tile = 0;
			}
			map[y * mapSize + x] = tile;
		}
	}

	seed = seedSave;
	var farms = Math.floor((mapSize / 4) * getRandomFloat());
	for(var f = 0; f < farms; f++){
		var notPlaced = true;
		while(notPlaced){
			var x = Math.floor(mapSize * getRandomFloat());
			var y = Math.floor(mapSize * getRandomFloat());
			if (map[y * mapSize + x] != 1){
				map[y * mapSize + x] = 6;
				notPlaced = false;
			}
		}
	}
}

// noise stuff
var noiseSeed = 1536998865303;
var seed = 1;
var shift = 786587699;
function getRandom(){
	var n0 = seed * shift;
	var n1 = n0 * seed / shift;
	var n2 = n0 * n1 / shift;
	var n3 = n0/n2 * seed/shift * n1;
	var lerp = n0 * n1 / n2 * n3 * n1 / n0 * n2 / n3 * (n0 + n1) / (n2 + n3) * (n0 + n1) * (n2 + n3);
	seed = lerp % shift;
	return seed;
}
function getRandomFloat(){
	return getRandom() / shift;
}
function getNoise(x, z){
	seed = (x + 7865) * (z + 9869) * noiseSeed;
	return getRandomFloat();
}
function getSmoothNoise(x, z){
	var corners = (getNoise(x+1, z+1)+getNoise(x-1, z-1)+getNoise(x-1, z+1)+getNoise(x+1, z-1))/16;
	var sides = (getNoise(x+1, z)+getNoise(x-1, z)+getNoise(x, z+1)+getNoise(x, z-1))/8;
	var center = getNoise(x, z) / 4;
	return corners + sides + center;
}
function fade(f) {
return f*f*f*(f*(f*6-15)+10);
}
function blend(a, b, l) {
	return (1-l)*a + l*b;
}
function getPerlin(x, z){
	var ix = Math.floor(x);
	var iz = Math.floor(z);
	var cx = x - ix;
	var cz = z - iz;
	var p1 = getSmoothNoise(ix, iz);
	var p2 = getSmoothNoise(ix + 1, iz);
	var p3 = getSmoothNoise(ix, iz + 1);
	var p4 = getSmoothNoise(ix + 1, iz + 1);
	var blendX = fade(cx);
	var blendZ = fade(cz);
	var i1 = blend(p1, p2, blendX);
	var i2 = blend(p3, p4, blendX);
	return blend(i1, i2, blendZ);	
}
