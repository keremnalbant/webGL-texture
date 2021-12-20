var canvas;
var gl;
var deger = 1;
var flag = true;

var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;

var lightPosition = vec4(1.0, 1.0, 1.0, 0.0);
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0);
var lightDiffuse = vec4(1.0, 1.0, 1.0, 1.0);
var lightSpecular = vec4(1.0, 1.0, 1.0, 1.0);

var materialAmbient = vec4(1.0, 0.0, 1.0, 1.0);
var materialDiffuse = vec4(1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4(1.0, 0.8, 0.0, 1.0);
var materialShininess = 100.0;

var meshVertices = [];
var meshNormals = [];
var meshTexCoords = [];

var ambientColor, diffuseColor, specularColor;
var modelView, projection;

var theta = [0, 0, 0];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var thetaLoc;

var vertices = [-0.562270, 0.541022, 1.000000
    , -0.562270, 0.541022, -1.000000
    , 0.562270, 0.541022, -1.000000
    , 0.562270, 0.541022, 1.000000
    , -0.562270, 0.599815, 1.000000
    , -0.562270, 0.599815, -1.000001
    , 0.562270, 0.599815, -1.000000
    , 0.562270, 0.599815, 1.000000
    , -0.497893, 0.550058, -0.835204
    , -0.497893, 0.550058, -0.926503
    , -0.445167, 0.550058, -0.926503
    , -0.445167, 0.550058, -0.835204
    , -0.497893, -0.215794, -0.835204
    , -0.497893, -0.215794, -0.926503
    , -0.445167, -0.215794, -0.835204
    , -0.445167, -0.215794, -0.926503
    , 0.443770, 0.550058, -0.835204
    , 0.443770, 0.550058, -0.926503
    , 0.496496, 0.550058, -0.926503
    , 0.496496, 0.550058, -0.835204
    , 0.443770, -0.215794, -0.835204
    , 0.443770, -0.215794, -0.926503
    , 0.496496, -0.215794, -0.835204
    , 0.496496, -0.215794, -0.926503
    , -0.497893, 0.550058, 0.902016
    , -0.497893, 0.550058, 0.810718
    , -0.445166, 0.550058, 0.810718
    , -0.445166, 0.550058, 0.902016
    , -0.497893, -0.215794, 0.902016
    , -0.497893, -0.215794, 0.810718
    , -0.445166, -0.215794, 0.902016
    , -0.445166, -0.215794, 0.810718
    , 0.443770, 0.550058, 0.902016
    , 0.443770, 0.550058, 0.810718
    , 0.496496, 0.550058, 0.810718
    , 0.496496, 0.550058, 0.902016
    , 0.443770, -0.215794, 0.902016
    , 0.443770, -0.215794, 0.810718
    , 0.496496, -0.215794, 0.902016
    , 0.496496, -0.215794, 0.810718
    , -0.498763, 0.482229, 0.903381
    , -0.498763, 0.482229, -0.926543
    , -0.498763, 0.541022, 0.903380
    , -0.498763, 0.541022, -0.926544
    , -0.516019, 0.482229, 0.903381
    , -0.516019, 0.482229, -0.926543
    , -0.516019, 0.541022, 0.903380
    , -0.516019, 0.541022, -0.926544
    , 0.514173, 0.482229, 0.903380
    , 0.514173, 0.482229, -0.926543
    , 0.514173, 0.541022, 0.903380
    , 0.514173, 0.541022, -0.926544
    , 0.496917, 0.482229, 0.903380
    , 0.496917, 0.482229, -0.926543
    , 0.496917, 0.541022, 0.903380
    , 0.496918, 0.541022, -0.926544
    , 0.514173, 0.482229, 0.903380
    , -0.516019, 0.482229, 0.903381
    , 0.514173, 0.541022, 0.903381
    , -0.516019, 0.541022, 0.903380
    , 0.514173, 0.482229, 0.920636
    , -0.516019, 0.482229, 0.920636
    , 0.514173, 0.541022, 0.920636
    , -0.516019, 0.541022, 0.920636
    , 0.514173, 0.482229, -0.943799
    , -0.516019, 0.482229, -0.943799
    , 0.514173, 0.541022, -0.943799
    , -0.516019, 0.541022, -0.943799
    , 0.514173, 0.482229, -0.926543
    , -0.516019, 0.482229, -0.926543
    , 0.514173, 0.541022, -0.926543
    , -0.516019, 0.541022, -0.926544];

var normals = [0.0000, -1.0000, 0.0000
    , 0.0000, 1.0000, -0.0000
    , -1.0000, 0.0000, -0.0000
    , 0.0000, -0.0000, -1.0000
    , 1.0000, -0.0000, 0.0000
    , -0.0000, 0.0000, 1.0000];

var textureCoords = [0.006860, 0.216846
    , 0.679669, 0.216846
    , 0.679669, 0.595146
    , 0.006860, 0.595146
    , 0.006860, 0.993225
    , 0.006860, 0.614925
    , 0.679669, 0.614925
    , 0.679669, 0.993225
    , 0.970557, 0.263494
    , 0.995582, 0.263494
    , 0.995586, 0.734032
    , 0.970559, 0.734032
    , 0.995586, 0.998611
    , 0.970559, 0.998611
    , 0.970557, -0.001075
    , 0.995583, -0.001075
    , 0.540767, 0.185684
    , 0.540767, 0.216397
    , 0.523030, 0.216397
    , 0.523030, 0.185684
    , 0.957984, 0.310775
    , 0.700348, 0.310775
    , 0.700348, 0.293038
    , 0.957984, 0.293038
    , 0.957984, 0.262324
    , 0.700348, 0.262325
    , 0.700348, 0.244587
    , 0.957984, 0.244587
    , 0.700348, 0.213874
    , 0.957984, 0.213874
    , 0.558953, 0.185684
    , 0.558953, 0.216397
    , 0.541216, 0.216397
    , 0.541216, 0.185684
    , 0.957984, 0.408126
    , 0.700348, 0.408126
    , 0.700348, 0.390388
    , 0.957984, 0.390388
    , 0.957984, 0.359675
    , 0.700348, 0.359675
    , 0.700348, 0.341938
    , 0.957984, 0.341937
    , 0.700348, 0.311224
    , 0.957984, 0.311224
    , 0.577140, 0.185684
    , 0.577140, 0.216397
    , 0.559402, 0.216397
    , 0.559402, 0.185684
    , 0.522581, 0.216397
    , 0.264945, 0.216397
    , 0.264945, 0.198659
    , 0.522581, 0.198659
    , 0.522581, 0.167946
    , 0.264945, 0.167946
    , 0.264945, 0.150208
    , 0.522581, 0.150208
    , 0.264945, 0.119495
    , 0.522581, 0.119495
    , 0.595326, 0.185684
    , 0.595326, 0.216397
    , 0.577589, 0.216397
    , 0.577589, 0.185684
    , 0.264496, 0.216397
    , 0.006860, 0.216397
    , 0.006860, 0.198659
    , 0.264496, 0.198659
    , 0.264496, 0.167946
    , 0.006860, 0.167946
    , 0.006860, 0.150208
    , 0.264496, 0.150208
    , 0.006860, 0.119495
    , 0.264496, 0.119495
    , 0.767347, 0.408638
    , 0.767346, 0.993225
    , 0.748564, 0.993225
    , 0.748564, 0.408638
    , 0.777550, 0.408575
    , 0.796332, 0.408575
    , 0.796332, 0.993162
    , 0.777549, 0.993162
    , 0.719130, 0.408638
    , 0.719130, 0.993225
    , 0.700348, 0.993225
    , 0.700348, 0.408638
    , 0.729333, 0.408575
    , 0.748115, 0.408575
    , 0.748115, 0.993162
    , 0.729333, 0.993162
    , 0.868525, 0.993221
    , 0.868526, 0.647589
    , 0.888252, 0.647589
    , 0.888250, 0.993221
    , 0.862492, 0.993225
    , 0.842766, 0.993225
    , 0.842768, 0.647593
    , 0.862494, 0.647593
    , 0.656008, 0.216397
    , 0.636229, 0.216397
    , 0.636229, 0.210592
    , 0.656008, 0.210592
    , 0.595775, 0.210592
    , 0.615553, 0.210592
    , 0.615553, 0.216397
    , 0.595775, 0.216397
    , 0.822592, 0.993217
    , 0.822539, 0.647585
    , 0.842264, 0.647582
    , 0.842317, 0.993214
    , 0.816559, 0.993222
    , 0.796834, 0.993225
    , 0.796781, 0.647593
    , 0.816506, 0.647590
    , 0.676235, 0.216397
    , 0.656457, 0.216397
    , 0.656457, 0.210592
    , 0.676235, 0.210592
    , 0.616002, 0.210592
    , 0.635780, 0.210592
    , 0.635780, 0.216397
    , 0.616002, 0.216397];

var quads = [1, 1, 1, 2, 2, 1, 3, 3, 1, 4, 4, 1
    , 5, 5, 2, 8, 6, 2, 7, 7, 2, 6, 8, 2
    , 1, 9, 3, 5, 10, 3, 6, 11, 3, 2, 12, 3
    , 2, 12, 4, 6, 11, 4, 7, 13, 4, 3, 14, 4
    , 3, 3, 5, 7, 7, 5, 8, 6, 5, 4, 4, 5
    , 5, 10, 6, 1, 9, 6, 4, 15, 6, 8, 16, 6
    , 13, 17, 1, 14, 18, 1, 16, 19, 1, 15, 20, 1
    , 9, 21, 6, 13, 22, 6, 15, 23, 6, 12, 24, 6
    , 11, 25, 4, 16, 26, 4, 14, 27, 4, 10, 28, 4
    , 10, 28, 3, 14, 27, 3, 13, 29, 3, 9, 30, 3
    , 12, 24, 5, 15, 23, 5, 16, 26, 5, 11, 25, 5
    , 21, 31, 1, 22, 32, 1, 24, 33, 1, 23, 34, 1
    , 17, 35, 6, 21, 36, 6, 23, 37, 6, 20, 38, 6
    , 19, 39, 4, 24, 40, 4, 22, 41, 4, 18, 42, 4
    , 18, 42, 3, 22, 41, 3, 21, 43, 3, 17, 44, 3
    , 20, 38, 5, 23, 37, 5, 24, 40, 5, 19, 39, 5
    , 29, 45, 1, 30, 46, 1, 32, 47, 1, 31, 48, 1
    , 25, 49, 6, 29, 50, 6, 31, 51, 6, 28, 52, 6
    , 27, 53, 4, 32, 54, 4, 30, 55, 4, 26, 56, 4
    , 26, 56, 3, 30, 55, 3, 29, 57, 3, 25, 58, 3
    , 28, 52, 5, 31, 51, 5, 32, 54, 5, 27, 53, 5
    , 37, 59, 1, 38, 60, 1, 40, 61, 1, 39, 62, 1
    , 33, 63, 6, 37, 64, 6, 39, 65, 6, 36, 66, 6
    , 35, 67, 4, 40, 68, 4, 38, 69, 4, 34, 70, 4
    , 34, 70, 3, 38, 69, 3, 37, 71, 3, 33, 72, 3
    , 36, 66, 5, 39, 65, 5, 40, 68, 5, 35, 67, 5
    , 41, 73, 5, 42, 74, 5, 44, 75, 5, 43, 76, 5
    , 45, 77, 3, 47, 78, 3, 48, 79, 3, 46, 80, 3
    , 42, 74, 1, 41, 73, 1, 45, 77, 1, 46, 80, 1
    , 49, 81, 5, 50, 82, 5, 52, 83, 5, 51, 84, 5
    , 53, 85, 3, 55, 86, 3, 56, 87, 3, 54, 88, 3
    , 50, 82, 1, 49, 81, 1, 53, 85, 1, 54, 88, 1
    , 57, 89, 4, 58, 90, 4, 60, 91, 4, 59, 92, 4
    , 61, 93, 6, 63, 94, 6, 64, 95, 6, 62, 96, 6
    , 60, 97, 3, 58, 98, 3, 62, 99, 3, 64, 100, 3
    , 58, 90, 1, 57, 89, 1, 61, 93, 1, 62, 96, 1
    , 57, 101, 5, 59, 102, 5, 63, 103, 5, 61, 104, 5
    , 65, 105, 4, 66, 106, 4, 68, 107, 4, 67, 108, 4
    , 69, 109, 6, 71, 110, 6, 72, 111, 6, 70, 112, 6
    , 68, 113, 3, 66, 114, 3, 70, 115, 3, 72, 116, 3
    , 66, 106, 1, 65, 105, 1, 69, 109, 1, 70, 112, 1
    , 65, 117, 5, 67, 118, 5, 71, 119, 5, 69, 120, 5];

window.onload = function init() {
    canvas = document.getElementById("gl-canvas");

    gl = WebGLUtils.setupWebGL(canvas);
    if (!gl) { alert("WebGL isn't available"); }

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    var program = initShaders(gl, "vertex-shader", "fragment-shader");
    gl.useProgram(program);

    prepareTable();

    var vBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshVertices), gl.STATIC_DRAW);
    var vPosition = gl.getAttribLocation(program, "vPosition");
    gl.vertexAttribPointer(vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vPosition);

    var nBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, nBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshNormals), gl.STATIC_DRAW);
    var vNormal = gl.getAttribLocation(program, "vNormal");
    gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vNormal);

    var tBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, tBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(meshTexCoords), gl.STATIC_DRAW);
    var vTexCoords = gl.getAttribLocation(program, "vTexCoords");
    gl.vertexAttribPointer(vTexCoords, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(vTexCoords);

    var texSize = 64;
    var numRows = 8;
    var numCols = 8;

    var myTexels = new Uint8Array(4 * texSize * texSize);

    for (var i = 0; i < texSize; ++i) {
        for (var j = 0; j < texSize; ++j) {
            var patchx = Math.floor(i / (texSize / numRows));
            var patchy = Math.floor(j / (texSize / numCols));
            var c = (patchx % 2 !== patchy % 2 ? 255 : 0);
            myTexels[4 * i * texSize + 4 * j] = c;
            myTexels[4 * i * texSize + 4 * j + 1] = c;
            myTexels[4 * i * texSize + 4 * j + 2] = c;
            myTexels[4 * i * texSize + 4 * j + 3] = 255;
        }
    }

    var texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, texSize, texSize, 0, gl.RGBA, gl.UNSIGNED_BYTE, myTexels);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.uniform1i(gl.getUniformLocation(program, "texMap"), 0);

    thetaLoc = gl.getUniformLocation(program, "theta");

    modelViewMatrix = rotateX(0);
    projectionMatrix = ortho(-1.0, 1.0, -1.0, 1.0, -20.0, 20.0);

    modelViewMatrixLoc = gl.getUniformLocation(program, "modelViewMatrix");
    projectionMatrixLoc = gl.getUniformLocation(program, "projectionMatrix");

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelViewMatrix));
    gl.uniformMatrix4fv(projectionMatrixLoc, false, flatten(projectionMatrix));

    document.getElementById("ButtonX").onclick = function () { axis = xAxis; };
    document.getElementById("ButtonY").onclick = function () { axis = yAxis; };
    document.getElementById("ButtonZ").onclick = function () { axis = zAxis; };
    document.getElementById("ButtonT").onclick = function () { flag = !flag; };
    document.getElementById("Button1").onclick = function () { deger = 1; };
    document.getElementById("Button2").onclick = function () { deger = 2; };

    var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

    gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
        flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
        flatten(diffuseProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
        flatten(specularProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
        flatten(lightPosition));

    gl.uniform1f(gl.getUniformLocation(program,
        "shininess"), materialShininess);


    render();
};

function prepareTable() {
    for (var i = 0; i < quads.length; i += 12) {

        addTriangleVertexForIndices(quads[i] - 1, quads[i + 1] - 1, quads[i + 2] - 1);
        addTriangleVertexForIndices(quads[i + 3] - 1, quads[i + 4] - 1, quads[i + 5] - 1);
        addTriangleVertexForIndices(quads[i + 6] - 1, quads[i + 7] - 1, quads[i + 8] - 1);

        addTriangleVertexForIndices(quads[i] - 1, quads[i + 1] - 1, quads[i + 2] - 1);
        addTriangleVertexForIndices(quads[i + 6] - 1, quads[i + 7] - 1, quads[i + 8] - 1);
        addTriangleVertexForIndices(quads[i + 9] - 1, quads[i + 10] - 1, quads[i + 11] - 1);
    }
}

function addTriangleVertexForIndices(vIndex, tIndex, nIndex) {
    meshVertices.push(vertices[3 * vIndex], vertices[3 * vIndex + 1], vertices[3 * vIndex + 2]);
    meshTexCoords.push(textureCoords[2 * tIndex], textureCoords[2 * tIndex + 1]);
    meshNormals.push(normals[3 * nIndex], normals[3 * nIndex + 1], normals[3 * nIndex + 2]);
}

function render() {

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag)theta[axis] += 0.5;

    modelView = mat4();
    modelView = mult(modelView, rotate(theta[xAxis], [1, 0, 0]));
    modelView = mult(modelView, rotate(theta[yAxis], [0, 1, 0]));
    modelView = mult(modelView, rotate(theta[zAxis], [0, 0, 1]));

    gl.uniformMatrix4fv(modelViewMatrixLoc, false, flatten(modelView));

    if (deger == 1) {
        gl.drawArrays(gl.LINE_LOOP, 0, (meshVertices.length) / 3);
    }

    else if (deger == 2) {
        gl.drawArrays(gl.TRIANGLES, 0, (meshVertices.length) / 3);
    }

    requestAnimFrame(render);
}