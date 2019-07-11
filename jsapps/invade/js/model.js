var mainVert = 
[
'precision mediump float;',
'attribute vec3 position;',
'attribute vec3 normal;',
'varying vec3 v_normal;',
'uniform mat4 model;',
'uniform mat4 view;',
'uniform mat4 proj;',
'',
'void main()',
'{',
'	v_normal = mat3(model) * normal;',
'	gl_Position = proj * view * model * vec4(position, 1.0);',
'}'
].join('\n');

var mainFrag2 =
[
'precision mediump float;',
'uniform vec3 color;',
'uniform vec3 directLight;',
'uniform float lightIntensity;',
'varying vec3 v_normal;',
'void main()',
'{',
'	vec3 normal = normalize(v_normal);',
'	float light = dot(normal, directLight);',
'	light *= lightIntensity;',
'	gl_FragColor = vec4(color, 1);',
'	gl_FragColor.rgb *= light;',
'}'
].join('\n'); 

var waterModel = '{"verts":[1,-1,1,-1,-1,-1,1,-1,-1,-0.5,0.99086,0.5,-1,1,1,-0.5,1.05,1,1,0.9,0.500001,0.999999,1,1.000001,1,-1,1,-0.5,1.05,1,-1,1,1,-1,-1,1,-1,0.9,0.5,-1,0.95,-0.5,-1,-1,-1,0,0.89,-1,-1,-1,-1,-0.5,1.05,-1,0.5,0.970655,0.5,0.999999,1,1.000001,1,0.9,0.500001,0.5,0.970655,0.5,-0.000001,0.89,1,0.499999,1.1,1,0,1,0.5,-0.5,1.05,1,-0.000001,0.89,1,1,1,-0.999999,0.5,0.953742,-0.5,1,0.95,-0.499999,1,0.95,-0.499999,0.5,1.011808,0,1,1.05,0.000001,1,1.05,0.000001,0.5,0.970655,0.5,1,0.9,0.500001,0,0.89,-1,0.5,0.953742,-0.5,0.5,1.1,-1,0,1,-0.5,0.5,1.011808,0,0.5,0.953742,-0.5,0.5,1.011808,0,0,1,0.5,0.5,0.970655,0.5,-0.5,1.05,-1,0,1,-0.5,0,0.89,-1,0,1,-0.5,-0.5,1,0,0,1.078249,0,-0.5,1,0,0,1,0.5,0,1.078249,0,-1,1,-1,-0.5,0.959612,-0.5,-0.5,1.05,-1,-1,0.95,-0.5,-0.5,1,0,-0.5,0.959612,-0.5,-1,1.05,0,-0.5,0.99086,0.5,-0.5,1,0,1,-1,1,-1,-1,1,-1,-1,-1,-0.5,0.99086,0.5,-1,0.9,0.5,-1,1,1,1,-1,1,1,-1,-1,1,0.9,0.500001,1,-1,-1,1,1,-0.999999,1,0.95,-0.499999,1,0.95,-0.499999,1,1.05,0.000001,1,0.9,0.500001,1,-1,-1,1,0.95,-0.499999,1,0.9,0.500001,-1,-1,1,1,-1,1,-0.000001,0.89,1,1,-1,1,0.999999,1,1.000001,-0.000001,0.89,1,0.999999,1,1.000001,0.499999,1.1,1,-0.000001,0.89,1,-0.000001,0.89,1,-0.5,1.05,1,-1,-1,1,-1,-1,-1,-1,-1,1,-1,0.9,0.5,-1,-1,1,-1,1,1,-1,0.9,0.5,-1,0.9,0.5,-1,1.05,0,-1,0.95,-0.5,-1,0.95,-0.5,-1,1,-1,-1,-1,-1,0.5,1.1,-1,1,1,-0.999999,0,0.89,-1,1,1,-0.999999,1,-1,-1,0,0.89,-1,1,-1,-1,-1,-1,-1,0,0.89,-1,-1,-1,-1,-1,1,-1,-0.5,1.05,-1,0.5,0.970655,0.5,0.499999,1.1,1,0.999999,1,1.000001,0.5,0.970655,0.5,0,1,0.5,-0.000001,0.89,1,0,1,0.5,-0.5,0.99086,0.5,-0.5,1.05,1,1,1,-0.999999,0.5,1.1,-1,0.5,0.953742,-0.5,1,0.95,-0.499999,0.5,0.953742,-0.5,0.5,1.011808,0,1,1.05,0.000001,0.5,1.011808,0,0.5,0.970655,0.5,0,0.89,-1,0,1,-0.5,0.5,0.953742,-0.5,0,1,-0.5,0,1.078249,0,0.5,1.011808,0,0.5,1.011808,0,0,1.078249,0,0,1,0.5,-0.5,1.05,-1,-0.5,0.959612,-0.5,0,1,-0.5,0,1,-0.5,-0.5,0.959612,-0.5,-0.5,1,0,-0.5,1,0,-0.5,0.99086,0.5,0,1,0.5,-1,1,-1,-1,0.95,-0.5,-0.5,0.959612,-0.5,-1,0.95,-0.5,-1,1.05,0,-0.5,1,0,-1,1.05,0,-1,0.9,0.5,-0.5,0.99086,0.5],"uv":[],"indices":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161"],"normals":[0,-1,0,0,-1,0,0,-1,0,-0.0988,0.9882,-0.1169,-0.0988,0.9882,-0.1169,-0.0988,0.9882,-0.1169,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0.1373,0.9713,-0.1943,0.1373,0.9713,-0.1943,0.1373,0.9713,-0.1943,-0.3767,0.8968,-0.232,-0.3767,0.8968,-0.232,-0.3767,0.8968,-0.232,0.2983,0.9322,0.2051,0.2983,0.9322,0.2051,0.2983,0.9322,0.2051,0.0074,0.995,0.0995,0.0074,0.995,0.0995,0.0074,0.995,0.0995,-0.0747,0.9778,-0.1956,-0.0747,0.9778,-0.1956,-0.0747,0.9778,-0.1956,0.1341,0.9492,0.2848,0.1341,0.9492,0.2848,0.1341,0.9492,0.2848,-0.3739,0.8902,0.2604,-0.3739,0.8902,0.2604,-0.3739,0.8902,0.2604,0.0915,0.9892,-0.1149,0.0915,0.9892,-0.1149,0.0915,0.9892,-0.1149,0.0584,0.9949,0.0819,0.0584,0.9949,0.0819,0.0584,0.9949,0.0819,0.2983,0.9322,-0.2051,0.2983,0.9322,-0.2051,0.2983,0.9322,-0.2051,-0.1528,0.9764,-0.1528,-0.1528,0.9764,-0.1528,-0.1528,0.9764,-0.1528,-0.1528,0.9764,0.1528,-0.1528,0.9764,0.1528,-0.1528,0.9764,0.1528,-0.0979,0.9793,0.177,-0.0979,0.9793,0.177,-0.0979,0.9793,0.177,-0.0192,0.9966,-0.0805,-0.0192,0.9966,-0.0805,-0.0192,0.9966,-0.0805,0.0995,0.9949,0.0182,0.0995,0.9949,0.0182,0.0995,0.9949,0.0182,0,-1,0,0,-1,0,0,-1,0,-0.1754,0.9654,-0.1931,-0.1754,0.9654,-0.1931,-0.1754,0.9654,-0.1931,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0.1901,0.9505,-0.2459,0.1901,0.9505,-0.2459,0.1901,0.9505,-0.2459,0.0572,0.975,0.2145,0.0572,0.975,0.2145,0.0572,0.975,0.2145,-0.0182,0.9929,-0.1174,-0.0182,0.9929,-0.1174,-0.0182,0.9929,-0.1174,0.1885,0.9426,0.2757,0.1885,0.9426,0.2757,0.1885,0.9426,0.2757,0.0074,0.9933,-0.1154,0.0074,0.9933,-0.1154,0.0074,0.9933,-0.1154,-0.0759,0.9938,0.0818,-0.0759,0.9938,0.0818,-0.0759,0.9938,0.0818,0.09,0.9727,-0.214,0.09,0.9727,-0.214,0.09,0.9727,-0.214,0.1302,0.9796,-0.1533,0.1302,0.9796,-0.1533,0.1302,0.9796,-0.1533,0.1302,0.9796,0.1533,0.1302,0.9796,0.1533,0.1302,0.9796,0.1533,-0.0792,0.981,0.1773,-0.0792,0.981,0.1773,-0.0792,0.981,0.1773,-0.0803,0.9935,-0.0803,-0.0803,0.9935,-0.0803,-0.0803,0.9935,-0.0803,-0.0183,0.9997,0.0183,-0.0183,0.9997,0.0183,-0.0183,0.9997,0.0183,-0.0191,0.9949,0.0995,-0.0191,0.9949,0.0995,-0.0191,0.9949,0.0995,0.0976,0.9759,-0.1952,0.0976,0.9759,-0.1952,0.0976,0.9759,-0.1952,-0.1715,0.9436,0.2831,-0.1715,0.9436,0.2831,-0.1715,0.9436,0.2831]}';
var farmHouseModel = '{"verts":[1.244048,0.976853,-1.706475,1.244048,0.976853,1.706475,0,2.476853,1.706475,0,2.476853,-1.706475,0,2.476853,1.706475,-1.244048,0.976854,1.706475,-1.244048,0.976853,-1.706475,-1.244048,0.976854,1.706475,1.244048,0.976853,1.706475,1.244048,0.976853,1.706475,-1.244048,0.976854,1.706475,0,2.476853,1.706475,0,2.476853,-1.706475,-1.244048,0.976853,-1.706475,1.244048,0.976853,-1.706475,0,2.476853,1.706475,1.244048,0.976853,1.706475,1.244048,0.976853,-1.706475,-1.244048,0.976854,1.706475,0,2.476853,1.706475,0,2.476853,-1.706475,1.244048,0.976853,1.706475,-1.244048,0.976854,1.706475,-1.244048,0.976853,-1.706475,1.244048,0.976853,1.706475,0,2.476853,1.706475,-1.244048,0.976854,1.706475,0,2.476853,-1.706475,1.244048,0.976853,-1.706475,-1.244048,0.976853,-1.706475,1,-1,1.688602,-1,-1,1.688602,-1,-1,-1.688603,1,1,-1.688601,-1,1,-1.688602,-1,1,1.688601,1,1,-1.688601,0.999999,1,1.688603,1,-1,1.688602,0.999999,1,1.688603,-1,1,1.688601,-1,-1,1.688602,-1,1,1.688601,-1,1,-1.688602,-1,-1,-1.688603,1,-1,-1.688602,-1,-1,-1.688603,-1,1,-1.688602,0,2.476853,-1.706475,1.244048,0.976853,-1.706475,0,2.476853,1.706475,-1.244048,0.976853,-1.706475,0,2.476853,-1.706475,-1.244048,0.976854,1.706475,1.244048,0.976853,-1.706475,-1.244048,0.976853,-1.706475,1.244048,0.976853,1.706475,0,2.476853,-1.706475,0,2.476853,1.706475,1.244048,0.976853,-1.706475,-1.244048,0.976853,-1.706475,-1.244048,0.976854,1.706475,0,2.476853,-1.706475,1.244048,0.976853,-1.706475,1.244048,0.976853,1.706475,-1.244048,0.976853,-1.706475,1,-1,-1.688602,1,-1,1.688602,-1,-1,-1.688603,0.999999,1,1.688603,1,1,-1.688601,-1,1,1.688601,1,-1,-1.688602,1,1,-1.688601,1,-1,1.688602,1,-1,1.688602,0.999999,1,1.688603,-1,-1,1.688602,-1,-1,1.688602,-1,1,1.688601,-1,-1,-1.688603,1,1,-1.688601,1,-1,-1.688602,-1,1,-1.688602],"uv":[],"indices":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83"],"normals":[-0.7697,-0.6384,0,-0.7697,-0.6384,0,-0.7697,-0.6384,0,0.7697,-0.6384,0,0.7697,-0.6384,0,0.7697,-0.6384,0,0,1,0,0,1,0,0,1,0,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0.7697,0.6384,0,0.7697,0.6384,0,0.7697,0.6384,0,-0.7697,0.6384,0,-0.7697,0.6384,0,-0.7697,0.6384,0,0,-1,0,0,-1,0,0,-1,0,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,-0.7697,-0.6384,0,-0.7697,-0.6384,0,-0.7697,-0.6384,0,0.7697,-0.6384,0,0.7697,-0.6384,0,0.7697,-0.6384,0,0,1,0,0,1,0,0,1,0,0.7697,0.6384,0,0.7697,0.6384,0,0.7697,0.6384,0,-0.7697,0.6384,0,-0.7697,0.6384,0,-0.7697,0.6384,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1]}';
var fenceModel = '{"verts":[0.116065,0.45944,5.838351,0.116065,1.000567,5.838351,0.116065,1.000567,-5.863319,-0.116065,0.45944,5.838351,-0.116065,1.000567,5.838351,0.116065,1.000567,5.838351,-0.116065,0.45944,-5.863319,-0.116065,1.000567,-5.863319,-0.116065,1.000567,5.838351,0.116065,0.45944,-5.863319,0.116065,1.000567,-5.863319,-0.116065,1.000567,-5.863319,0.116065,1.000567,5.838351,-0.116065,1.000567,5.838351,-0.116065,1.000567,-5.863319,-0.116065,0.45944,5.838351,0.116065,0.45944,5.838351,0.116065,0.45944,-5.863319,0.116065,1.369301,5.838351,0.116065,1.910427,5.838351,0.116065,1.910427,-5.863319,-0.116065,1.369301,5.838351,-0.116065,1.910427,5.838351,0.116065,1.910427,5.838351,-0.116065,1.369301,-5.863319,-0.116065,1.910427,-5.863319,-0.116065,1.910427,5.838351,0.116065,1.369301,-5.863319,0.116065,1.910427,-5.863319,-0.116065,1.910427,-5.863319,0.116065,1.910427,5.838351,-0.116065,1.910427,5.838351,-0.116065,1.910427,-5.863319,-0.116065,1.369301,5.838351,0.116065,1.369301,5.838351,0.116065,1.369301,-5.863319,0.116065,2.247581,5.838351,0.116065,2.788707,5.838351,0.116065,2.788707,-5.863319,-0.116065,2.247581,5.838351,-0.116065,2.788707,5.838351,0.116065,2.788707,5.838351,-0.116065,2.247581,-5.863319,-0.116065,2.788707,-5.863319,-0.116065,2.788707,5.838351,0.116065,2.247581,-5.863319,0.116065,2.788707,-5.863319,-0.116065,2.788707,-5.863319,0.116065,2.788707,5.838351,-0.116065,2.788707,5.838351,-0.116065,2.788707,-5.863319,-0.116065,2.247581,5.838351,0.116065,2.247581,5.838351,0.116065,2.247581,-5.863319,0.227729,0.008174,6.235197,-0.227729,0.008174,6.235197,-0.227729,0.008174,5.779739,-0.227729,3.330817,5.779739,-0.227729,3.330817,6.235197,0.227729,3.330817,6.235197,0.227729,3.330817,5.779739,0.227729,3.330817,6.235197,0.227729,0.008174,6.235197,0.227729,3.330817,6.235197,-0.227729,3.330817,6.235197,-0.227729,0.008174,6.235197,-0.227729,3.330817,6.235197,-0.227729,3.330817,5.779739,-0.227729,0.008174,5.779739,0.227729,0.008174,5.779739,-0.227729,0.008174,5.779739,-0.227729,3.330817,5.779739,0.227729,0.008174,-5.80732,-0.227729,0.008174,-5.80732,-0.227729,0.008174,-6.262777,-0.227729,3.330817,-6.262777,-0.227729,3.330817,-5.80732,0.227729,3.330817,-5.80732,0.227729,3.330817,-6.262777,0.227729,3.330817,-5.80732,0.227729,0.008174,-5.80732,0.227729,3.330817,-5.80732,-0.227729,3.330817,-5.80732,-0.227729,0.008174,-5.80732,-0.227729,3.330817,-5.80732,-0.227729,3.330817,-6.262777,-0.227729,0.008174,-6.262777,0.227729,0.008174,-6.262777,-0.227729,0.008174,-6.262777,-0.227729,3.330817,-6.262777,0.227729,0.008174,3.203483,-0.227729,0.008174,3.203483,-0.227729,0.008174,2.748025,-0.227729,3.330817,2.748025,-0.227729,3.330817,3.203483,0.227729,3.330817,3.203483,0.227729,3.330817,2.748026,0.227729,3.330817,3.203483,0.227729,0.008174,3.203483,0.227729,3.330817,3.203483,-0.227729,3.330817,3.203483,-0.227729,0.008174,3.203483,-0.227729,3.330817,3.203483,-0.227729,3.330817,2.748025,-0.227729,0.008174,2.748025,0.227729,0.008174,2.748025,-0.227729,0.008174,2.748025,-0.227729,3.330817,2.748025,0.227729,0.008174,-2.793796,-0.227729,0.008174,-2.793796,-0.227729,0.008174,-3.249253,-0.227729,3.330817,-3.249253,-0.227729,3.330817,-2.793796,0.227729,3.330817,-2.793796,0.227729,3.330817,-3.249253,0.227729,3.330817,-2.793796,0.227729,0.008174,-2.793796,0.227729,3.330817,-2.793796,-0.227729,3.330817,-2.793796,-0.227729,0.008174,-2.793796,-0.227729,3.330817,-2.793796,-0.227729,3.330817,-3.249253,-0.227729,0.008174,-3.249253,0.227729,0.008174,-3.249253,-0.227729,0.008174,-3.249253,-0.227729,3.330817,-3.249253,0.227729,0.008174,0.227729,-0.227729,0.008174,0.227729,-0.227729,0.008174,-0.227729,-0.227729,3.330817,-0.227729,-0.227729,3.330817,0.227729,0.227729,3.330817,0.227729,0.227729,3.330817,-0.227729,0.227729,3.330817,0.227729,0.227729,0.008174,0.227729,0.227729,3.330817,0.227729,-0.227729,3.330817,0.227729,-0.227729,0.008174,0.227729,-0.227729,3.330817,0.227729,-0.227729,3.330817,-0.227729,-0.227729,0.008174,-0.227729,0.227729,0.008174,-0.227729,-0.227729,0.008174,-0.227729,-0.227729,3.330817,-0.227729,0.116065,0.45944,-5.863319,0.116065,0.45944,5.838351,0.116065,1.000567,-5.863319,0.116065,0.45944,5.838351,-0.116065,0.45944,5.838351,0.116065,1.000567,5.838351,-0.116065,0.45944,5.838351,-0.116065,0.45944,-5.863319,-0.116065,1.000567,5.838351,-0.116065,0.45944,-5.863319,0.116065,0.45944,-5.863319,-0.116065,1.000567,-5.863319,0.116065,1.000567,-5.863319,0.116065,1.000567,5.838351,-0.116065,1.000567,-5.863319,-0.116065,0.45944,-5.863319,-0.116065,0.45944,5.838351,0.116065,0.45944,-5.863319,0.116065,1.369301,-5.863319,0.116065,1.369301,5.838351,0.116065,1.910427,-5.863319,0.116065,1.369301,5.838351,-0.116065,1.369301,5.838351,0.116065,1.910427,5.838351,-0.116065,1.369301,5.838351,-0.116065,1.369301,-5.863319,-0.116065,1.910427,5.838351,-0.116065,1.369301,-5.863319,0.116065,1.369301,-5.863319,-0.116065,1.910427,-5.863319,0.116065,1.910427,-5.863319,0.116065,1.910427,5.838351,-0.116065,1.910427,-5.863319,-0.116065,1.369301,-5.863319,-0.116065,1.369301,5.838351,0.116065,1.369301,-5.863319,0.116065,2.247581,-5.863319,0.116065,2.247581,5.838351,0.116065,2.788707,-5.863319,0.116065,2.247581,5.838351,-0.116065,2.247581,5.838351,0.116065,2.788707,5.838351,-0.116065,2.247581,5.838351,-0.116065,2.247581,-5.863319,-0.116065,2.788707,5.838351,-0.116065,2.247581,-5.863319,0.116065,2.247581,-5.863319,-0.116065,2.788707,-5.863319,0.116065,2.788707,-5.863319,0.116065,2.788707,5.838351,-0.116065,2.788707,-5.863319,-0.116065,2.247581,-5.863319,-0.116065,2.247581,5.838351,0.116065,2.247581,-5.863319,0.227729,0.008174,5.779739,0.227729,0.008174,6.235197,-0.227729,0.008174,5.779739,0.227729,3.330817,5.779739,-0.227729,3.330817,5.779739,0.227729,3.330817,6.235197,0.227729,0.008174,5.779739,0.227729,3.330817,5.779739,0.227729,0.008174,6.235197,0.227729,0.008174,6.235197,0.227729,3.330817,6.235197,-0.227729,0.008174,6.235197,-0.227729,0.008174,6.235197,-0.227729,3.330817,6.235197,-0.227729,0.008174,5.779739,0.227729,3.330817,5.779739,0.227729,0.008174,5.779739,-0.227729,3.330817,5.779739,0.227729,0.008174,-6.262777,0.227729,0.008174,-5.80732,-0.227729,0.008174,-6.262777,0.227729,3.330817,-6.262777,-0.227729,3.330817,-6.262777,0.227729,3.330817,-5.80732,0.227729,0.008174,-6.262777,0.227729,3.330817,-6.262777,0.227729,0.008174,-5.80732,0.227729,0.008174,-5.80732,0.227729,3.330817,-5.80732,-0.227729,0.008174,-5.80732,-0.227729,0.008174,-5.80732,-0.227729,3.330817,-5.80732,-0.227729,0.008174,-6.262777,0.227729,3.330817,-6.262777,0.227729,0.008174,-6.262777,-0.227729,3.330817,-6.262777,0.227729,0.008174,2.748025,0.227729,0.008174,3.203483,-0.227729,0.008174,2.748025,0.227729,3.330817,2.748026,-0.227729,3.330817,2.748025,0.227729,3.330817,3.203483,0.227729,0.008174,2.748025,0.227729,3.330817,2.748026,0.227729,0.008174,3.203483,0.227729,0.008174,3.203483,0.227729,3.330817,3.203483,-0.227729,0.008174,3.203483,-0.227729,0.008174,3.203483,-0.227729,3.330817,3.203483,-0.227729,0.008174,2.748025,0.227729,3.330817,2.748026,0.227729,0.008174,2.748025,-0.227729,3.330817,2.748025,0.227729,0.008174,-3.249253,0.227729,0.008174,-2.793796,-0.227729,0.008174,-3.249253,0.227729,3.330817,-3.249253,-0.227729,3.330817,-3.249253,0.227729,3.330817,-2.793796,0.227729,0.008174,-3.249253,0.227729,3.330817,-3.249253,0.227729,0.008174,-2.793796,0.227729,0.008174,-2.793796,0.227729,3.330817,-2.793796,-0.227729,0.008174,-2.793796,-0.227729,0.008174,-2.793796,-0.227729,3.330817,-2.793796,-0.227729,0.008174,-3.249253,0.227729,3.330817,-3.249253,0.227729,0.008174,-3.249253,-0.227729,3.330817,-3.249253,0.227729,0.008174,-0.227729,0.227729,0.008174,0.227729,-0.227729,0.008174,-0.227729,0.227729,3.330817,-0.227729,-0.227729,3.330817,-0.227729,0.227729,3.330817,0.227729,0.227729,0.008174,-0.227729,0.227729,3.330817,-0.227729,0.227729,0.008174,0.227729,0.227729,0.008174,0.227729,0.227729,3.330817,0.227729,-0.227729,0.008174,0.227729,-0.227729,0.008174,0.227729,-0.227729,3.330817,0.227729,-0.227729,0.008174,-0.227729,0.227729,3.330817,-0.227729,0.227729,0.008174,-0.227729,-0.227729,3.330817,-0.227729],"uv":[],"indices":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209","210","211","212","213","214","215","216","217","218","219","220","221","222","223","224","225","226","227","228","229","230","231","232","233","234","235","236","237","238","239","240","241","242","243","244","245","246","247","248","249","250","251","252","253","254","255","256","257","258","259","260","261","262","263","264","265","266","267","268","269","270","271","272","273","274","275","276","277","278","279","280","281","282","283","284","285","286","287"],"normals":[-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1]}';
var cubeModel = '{"verts":[1,-1,1,-1,-1,-1,1,-1,-1,-1,1,-1,0.999999,1,1.000001,1,1,-0.999999,1,1,-0.999999,1,-1,1,1,-1,-1,0.999999,1,1.000001,-1,-1,1,1,-1,1,-1,-1,1,-1,1,-1,-1,-1,-1,1,-1,-1,-1,1,-1,1,1,-0.999999,1,-1,1,-1,-1,1,-1,-1,-1,-1,1,-1,-1,1,1,0.999999,1,1.000001,1,1,-0.999999,0.999999,1,1.000001,1,-1,1,0.999999,1,1.000001,-1,1,1,-1,-1,1,-1,-1,1,-1,1,1,-1,1,-1,1,-1,-1,-1,-1,-1,-1,1,-1],"uv":[],"indices":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35"],"normals":[0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1,0,-1,0,0,-1,0,0,-1,0,0,1,0,0,1,0,0,1,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,1,0,0,1,-1,0,0,-1,0,0,-1,0,0,0,0,-1,0,0,-1,0,0,-1]}';
var planeModel = '{"verts":[1,0,1,-1,0,1,-1,0,-1,1,0,-1],"uv":[],"indices":[2,1,0,3,2,0],"normals":[0,1,0,0,1,0,0,1,0,0,1,0]}';
var treeModel = '{"verts":[0,1,-0.63039,0.445753,-1,-0.445753,0,-1,-0.63039,0.445753,1,-0.445753,0.63039,-1,0,0.445753,-1,-0.445753,0.63039,1,0,0.445753,-1,0.445753,0.63039,-1,0,0.445753,1,0.445753,0,-1,0.63039,0.445753,-1,0.445753,0,1,0.63039,-0.445753,-1,0.445753,0,-1,0.63039,-0.445753,1,0.445753,-0.63039,-1,0,-0.445753,-1,0.445753,0,1,0.63039,0.445753,1,0.445753,0.63039,1,0,-0.445753,1,-0.445753,0,-1,-0.63039,-0.445753,-1,-0.445753,-0.63039,1,0,-0.445753,-1,-0.445753,-0.63039,-1,0,0.445753,-1,0.445753,-0.445753,-1,0.445753,-0.445753,-1,-0.445753,0,1,-0.63039,0.445753,1,-0.445753,0.445753,-1,-0.445753,0.445753,1,-0.445753,0.63039,1,0,0.63039,-1,0,0.63039,1,0,0.445753,1,0.445753,0.445753,-1,0.445753,0.445753,1,0.445753,0,1,0.63039,0,-1,0.63039,0,1,0.63039,-0.445753,1,0.445753,-0.445753,-1,0.445753,-0.445753,1,0.445753,-0.63039,1,0,-0.63039,-1,0,0.63039,1,0,0.445753,1,-0.445753,-0.63039,1,0,0.445753,1,-0.445753,0,1,-0.63039,-0.63039,1,0,0,1,-0.63039,-0.445753,1,-0.445753,-0.63039,1,0,-0.63039,1,0,-0.445753,1,0.445753,0.63039,1,0,-0.445753,1,0.445753,0,1,0.63039,0.63039,1,0,-0.445753,1,-0.445753,0,1,-0.63039,0,-1,-0.63039,-0.63039,1,0,-0.445753,1,-0.445753,-0.445753,-1,-0.445753,-0.445753,-1,-0.445753,0,-1,-0.63039,0.445753,-1,-0.445753,0.445753,-1,-0.445753,0.63039,-1,0,0.445753,-1,0.445753,0.445753,-1,0.445753,0,-1,0.63039,-0.445753,-1,0.445753,-0.445753,-1,0.445753,-0.63039,-1,0,-0.445753,-1,-0.445753,-0.445753,-1,-0.445753,0.445753,-1,-0.445753,0.445753,-1,0.445753,-2.086378,0.656203,0,0,4.828959,0.000001,-1.475292,0.656203,-1.475292,0,0.656203,-2.086378,0,4.828959,0.000001,1.475292,0.656203,-1.475292,-1.475292,0.656203,1.475292,0,4.828959,0.000001,-2.086378,0.656203,0,0,0.656203,2.086378,0,4.828959,0.000001,-1.475292,0.656203,1.475292,1.475292,0.656203,1.475292,0,4.828959,0.000001,0,0.656203,2.086378,2.086378,0.656203,0,0,4.828959,0.000001,1.475292,0.656203,1.475292,-1.475292,0.656203,-1.475292,0,4.828959,0.000001,0,0.656203,-2.086378,1.475292,0.656203,-1.475292,0,4.828959,0.000001,2.086378,0.656203,0,1.475292,0.656203,1.475292,-1.475292,0.656203,1.475292,-1.475292,0.656203,-1.475292,-1.525971,2.547373,0,0,5.599314,0.000001,-1.079024,2.547373,-1.079024,0,2.547373,-1.525971,0,5.599314,0.000001,1.079024,2.547373,-1.079024,-1.079024,2.547373,1.079024,0,5.599314,0.000001,-1.525971,2.547373,0,0,2.547373,1.525971,0,5.599314,0.000001,-1.079024,2.547373,1.079024,1.079024,2.547373,1.079024,0,5.599314,0.000001,0,2.547373,1.525971,1.525971,2.547373,0,0,5.599314,0.000001,1.079024,2.547373,1.079024,-1.079024,2.547373,-1.079024,0,5.599314,0.000001,0,2.547373,-1.525971,1.079024,2.547373,-1.079024,0,5.599314,0.000001,1.525971,2.547373,0,1.079024,2.547373,1.079024,-1.079024,2.547373,1.079024,-1.079024,2.547373,-1.079024,-0.969458,4.327174,0.000001,0,6.26609,0.000001,-0.68551,4.327174,-0.685509,0,4.327174,-0.969457,0,6.26609,0.000001,0.68551,4.327174,-0.685509,-0.68551,4.327174,0.685511,0,6.26609,0.000001,-0.969458,4.327174,0.000001,0,4.327174,0.969459,0,6.26609,0.000001,-0.68551,4.327174,0.685511,0.68551,4.327174,0.685511,0,6.26609,0.000001,0,4.327174,0.969459,0.969458,4.327174,0.000001,0,6.26609,0.000001,0.68551,4.327174,0.685511,-0.68551,4.327174,-0.685509,0,6.26609,0.000001,0,4.327174,-0.969457,0.68551,4.327174,-0.685509,0,6.26609,0.000001,0.969458,4.327174,0.000001,0.68551,4.327174,0.685511,-0.68551,4.327174,0.685511,-0.68551,4.327174,-0.685509,-1.475292,0.656203,-1.475292,0,0.656203,-2.086378,1.475292,0.656203,-1.475292,1.475292,0.656203,-1.475292,2.086378,0.656203,0,1.475292,0.656203,1.475292,1.475292,0.656203,1.475292,0,0.656203,2.086378,-1.475292,0.656203,1.475292,-1.475292,0.656203,1.475292,-2.086378,0.656203,0,-1.475292,0.656203,-1.475292,-1.475292,0.656203,-1.475292,1.475292,0.656203,-1.475292,1.475292,0.656203,1.475292,-1.079024,2.547373,-1.079024,0,2.547373,-1.525971,1.079024,2.547373,-1.079024,1.079024,2.547373,-1.079024,1.525971,2.547373,0,1.079024,2.547373,1.079024,1.079024,2.547373,1.079024,0,2.547373,1.525971,-1.079024,2.547373,1.079024,-1.079024,2.547373,1.079024,-1.525971,2.547373,0,-1.079024,2.547373,-1.079024,-1.079024,2.547373,-1.079024,1.079024,2.547373,-1.079024,1.079024,2.547373,1.079024,-0.68551,4.327174,-0.685509,0,4.327174,-0.969457,0.68551,4.327174,-0.685509,0.68551,4.327174,-0.685509,0.969458,4.327174,0.000001,0.68551,4.327174,0.685511,0.68551,4.327174,0.685511,0,4.327174,0.969459,-0.68551,4.327174,0.685511,-0.68551,4.327174,0.685511,-0.969458,4.327174,0.000001,-0.68551,4.327174,-0.685509,-0.68551,4.327174,-0.685509,0.68551,4.327174,-0.685509,0.68551,4.327174,0.685511],"uv":[],"indices":["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31","32","33","34","35","36","37","38","39","40","41","42","43","44","45","46","47","48","49","50","51","52","53","54","55","56","57","58","59","60","61","62","63","64","65","66","67","68","69","70","71","72","73","74","75","76","77","78","79","80","81","82","83","84","85","86","87","88","89","90","91","92","93","94","95","96","97","98","99","100","101","102","103","104","105","106","107","108","109","110","111","112","113","114","115","116","117","118","119","120","121","122","123","124","125","126","127","128","129","130","131","132","133","134","135","136","137","138","139","140","141","142","143","144","145","146","147","148","149","150","151","152","153","154","155","156","157","158","159","160","161","162","163","164","165","166","167","168","169","170","171","172","173","174","175","176","177","178","179","180","181","182","183","184","185","186","187","188","189","190","191","192","193","194","195","196","197","198","199","200","201","202","203","204","205","206","207","208","209"],"normals":[0.3827,0,-0.9239,0.3827,0,-0.9239,0.3827,0,-0.9239,0.9239,0,-0.3827,0.9239,0,-0.3827,0.9239,0,-0.3827,0.9239,0,0.3827,0.9239,0,0.3827,0.9239,0,0.3827,0.3827,0,0.9239,0.3827,0,0.9239,0.3827,0,0.9239,-0.3827,0,0.9239,-0.3827,0,0.9239,-0.3827,0,0.9239,-0.9239,0,0.3827,-0.9239,0,0.3827,-0.9239,0,0.3827,0,1,0,0,1,0,0,1,0,-0.3827,0,-0.9239,-0.3827,0,-0.9239,-0.3827,0,-0.9239,-0.9239,0,-0.3827,-0.9239,0,-0.3827,-0.9239,0,-0.3827,0,-1,0,0,-1,0,0,-1,0,0.3827,0,-0.9239,0.3827,0,-0.9239,0.3827,0,-0.9239,0.9239,0,-0.3827,0.9239,0,-0.3827,0.9239,0,-0.3827,0.9239,0,0.3827,0.9239,0,0.3827,0.9239,0,0.3827,0.3827,0,0.9239,0.3827,0,0.9239,0.3827,0,0.9239,-0.3827,0,0.9239,-0.3827,0,0.9239,-0.3827,0,0.9239,-0.9239,0,0.3827,-0.9239,0,0.3827,-0.9239,0,0.3827,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,-0.3827,0,-0.9239,-0.3827,0,-0.9239,-0.3827,0,-0.9239,-0.9239,0,-0.3827,-0.9239,0,-0.3827,-0.9239,0,-0.3827,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0,-1,0,0,-1,0,0,-1,0,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0,-1,0,0,-1,0,0,-1,0,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,-0.8387,0.4194,-0.3474,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,0.3474,0.4194,-0.8387,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.8387,0.4194,0.3474,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,-0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.3474,0.4194,0.8387,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,0.8387,0.4194,0.3474,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,-0.3474,0.4194,-0.8387,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0.8387,0.4194,-0.3474,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0,0,-1,0]}';