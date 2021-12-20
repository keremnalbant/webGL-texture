var canvas;
var gl;

var indices = []; // To keep the indices of triangle vertices



var modelViewMatrix, projectionMatrix;
var modelViewMatrixLoc, projectionMatrixLoc;



var lightPosition = vec4(1.0, 1.0, 1.0, 0.0 );
var lightAmbient = vec4(0.2, 0.2, 0.2, 1.0 );
var lightDiffuse = vec4( 1.0, 1.0, 1.0, 1.0 );
var lightSpecular = vec4( 1.0, 1.0, 1.0, 1.0 );

var materialAmbient = vec4( 1.0, 0.0, 1.0, 1.0 );
var materialDiffuse = vec4( 1.0, 0.8, 0.0, 1.0);
var materialSpecular = vec4( 1.0, 0.8, 0.0, 1.0 );
var materialShininess = 100.0;




var ambientColor, diffuseColor, specularColor;
var modelView, projection;


var theta =[0, 0, 0];
var xAxis = 0;
var yAxis = 1;
var zAxis = 2;
var axis = 0;
var thetaLoc;

var flag = true;

// TEAPOT DATA
var vertices = [ 
	
	-0.367044 , 0.020000 , 0.167197
	, -0.367044 , -1.580000 , 0.167197
	, -0.293636 , -3.380000 , 0.143311
	, -0.499180 , -4.480000 , 0.341081
	, -1.529351 , 0.470000 , 0.165870
	, -1.466259 , 0.520000 , 0.148653
	, -1.502930 , 0.020000 , 0.118442
	, -1.529351 , 0.070000 , 0.165870
	, -0.000000 , 0.520000 , 0.184300
	, -0.000000 , 3.420000 , 0.162184
	, -0.000000 , 8.420000 , 0.178402
	, -0.000000 , 10.720000 , 0.189106
	, -0.000000 , 13.320001 , 0.166414
	, -0.000000 , 16.120001 , 0.094856
	, -0.000000 , 17.620001 , 0.052170
	, -0.000000 , 0.020000 , 0.278661
	, 0.367044 , 0.020000 , 0.167197
	, -0.000000 , -1.580000 , 0.278661
	, 0.367044 , -1.580000 , 0.167197
	, -0.000000 , -3.380000 , 0.238853
	, 0.293636 , -3.380000 , 0.143311
	, -0.000000 , -4.480000 , 0.568470
	, 0.499180 , -4.480000 , 0.341081
	, -0.000000 , 0.520000 , 0.307681
	, -0.000000 , 0.470000 , 0.331740
	, 1.529351 , 0.470000 , 0.165870
	, 1.466259 , 0.520000 , 0.148653
	, -0.000000 , 0.070000 , 0.331740
	, -0.000000 , 0.020000 , 0.281447
	, 1.502930 , 0.020000 , 0.118442
	, 1.529351 , 0.070000 , 0.165870
	, -0.921500 , 0.520000 , -0.000000
	, -0.810920 , 3.420000 , -0.000000
	, -0.892012 , 8.420000 , -0.000000
	, -0.945533 , 10.720000 , -0.000000
	, -0.832069 , 13.320001 , -0.000000
	, -0.474280 , 16.120001 , -0.000000
	, -0.260854 , 17.620001 , -0.000000
	, -0.497610 , 0.020000 , -0.000000
	, -0.367044 , 0.020000 , -0.167197
	, -0.497610 , -1.580000 , 0.000000
	, -0.367044 , -1.580000 , -0.167197
	, -0.398088 , -3.380000 , 0.000000
	, -0.293636 , -3.380000 , -0.143311
	, -0.676750 , -4.480000 , 0.000000
	, -0.499180 , -4.480000 , -0.341081
	, -1.582184 , 0.520000 , -0.000000
	, -1.658701 , 0.470000 , -0.000000
	, -1.529351 , 0.470000 , -0.165870
	, -1.466259 , 0.520000 , -0.148653
	, -1.658701 , 0.070000 , -0.000000
	, -1.595294 , 0.020000 , -0.000000
	, -1.502930 , 0.020000 , -0.118442
	, -1.529351 , 0.070000 , -0.165870
	, 0.000000 , 0.520000 , -0.184300
	, 0.921500 , 0.520000 , -0.000000
	, 0.000000 , 3.420000 , -0.162184
	, 0.810920 , 3.420000 , -0.000000
	, 0.000000 , 8.420000 , -0.178402
	, 0.892012 , 8.420000 , -0.000000
	, 0.000000 , 10.720000 , -0.189106
	, 0.945533 , 10.720000 , -0.000000
	, 0.000000 , 13.320001 , -0.166414
	, 0.832069 , 13.320001 , -0.000000
	, 0.000000 , 16.120001 , -0.094856
	, 0.474280 , 16.120001 , -0.000000
	, 0.000000 , 17.620001 , -0.052170
	, 0.260854 , 17.620001 , -0.000000
	, 0.000000 , 18.670000 , -0.000000
	, 0.497610 , 0.020000 , 0.000000
	, 0.000000 , 0.020000 , -0.278661
	, 0.367044 , 0.020000 , -0.167197
	, 0.497610 , -1.580000 , 0.000000
	, 0.000000 , -1.580000 , -0.278661
	, 0.367044 , -1.580000 , -0.167197
	, 0.398088 , -3.380000 , 0.000000
	, 0.000000 , -3.380000 , -0.238853
	, 0.293636 , -3.380000 , -0.143311
	, 0.676750 , -4.480000 , 0.000000
	, 0.000000 , -4.480000 , -0.568470
	, 0.499180 , -4.480000 , -0.341081
	, -0.000000 , -4.680000 , 0.000000
	, 1.582184 , 0.520000 , -0.000000
	, 1.658701 , 0.470000 , -0.000000
	, 0.000000 , 0.520000 , -0.307681
	, 0.000000 , 0.470000 , -0.331740
	, 1.529351 , 0.470000 , -0.165870
	, 1.466259 , 0.520000 , -0.148653
	, 1.658701 , 0.070000 , 0.000000
	, 1.595294 , 0.020000 , 0.000000
	, 0.000000 , 0.070000 , -0.331740
	, 0.000000 , 0.020000 , -0.281447
	, 1.502930 , 0.020000 , -0.118442
	, 1.529351 , 0.070000 , -0.165870
]; 

var normals = [ 
	-0.1961 , 0.0075 , 0.9806
	, -0.1961 , -0.0032 , 0.9806
	, -0.1961 , -0.0046 , 0.9806
	, -0.1961 , 0.0086 , 0.9805
	, -0.1961 , 0.0251 , 0.9803
	, -0.1960 , 0.0279 , 0.9802
	, -0.1959 , 0.0487 , 0.9794
	, 0.0000 , -1.0000 , -0.0000
	, 0.0000 , 1.0000 , -0.0000
	, -0.1078 , 0.0000 , 0.9942
	, -0.2906 , 0.0000 , 0.9569
	, -0.7882 , 0.0000 , 0.6155
	, -0.7966 , -0.0423 , 0.6030
	, -0.2989 , -0.0230 , 0.9540
	, -0.3653 , 0.2491 , 0.8969
	, -0.8412 , 0.2292 , 0.4898
	, -0.1495 , -0.9327 , 0.3282
	, -0.2804 , -0.9487 , 0.1460
	, -0.7886 , 0.0000 , 0.6149
	, -0.5032 , 0.7700 , 0.3924
	, -0.0973 , 0.4315 , 0.8968
	, -0.5576 , -0.7071 , 0.4348
	, -0.0762 , -0.7071 , 0.7030
	, 0.1961 , 0.0075 , 0.9806
	, 0.1961 , -0.0032 , 0.9806
	, 0.1961 , -0.0046 , 0.9806
	, 0.1961 , 0.0086 , 0.9805
	, 0.1961 , 0.0251 , 0.9803
	, 0.1960 , 0.0279 , 0.9802
	, 0.1959 , 0.0487 , 0.9794
	, 0.1078 , 0.0000 , 0.9942
	, 0.2906 , 0.0000 , 0.9569
	, 0.7882 , 0.0000 , 0.6155
	, 0.7966 , -0.0423 , 0.6030
	, 0.2989 , -0.0230 , 0.9540
	, 0.3653 , 0.2491 , 0.8969
	, 0.8412 , 0.2292 , 0.4898
	, 0.1495 , -0.9327 , 0.3282
	, 0.2804 , -0.9487 , 0.1460
	, 0.7886 , 0.0000 , 0.6149
	, 0.5032 , 0.7700 , 0.3924
	, 0.0973 , 0.4315 , 0.8968
	, 0.5576 , -0.7071 , 0.4348
	, 0.0762 , -0.7071 , 0.7030
	, -0.1961 , 0.0075 , -0.9806
	, -0.1961 , -0.0032 , -0.9806
	, -0.1961 , -0.0046 , -0.9806
	, -0.1961 , 0.0086 , -0.9805
	, -0.1961 , 0.0251 , -0.9803
	, -0.1960 , 0.0279 , -0.9802
	, -0.1959 , 0.0487 , -0.9794
	, -0.1078 , 0.0000 , -0.9942
	, -0.2906 , 0.0000 , -0.9569
	, -0.7882 , -0.0000 , -0.6155
	, -0.7966 , -0.0423 , -0.6030
	, -0.2989 , -0.0230 , -0.9540
	, -0.3653 , 0.2491 , -0.8969
	, -0.8412 , 0.2292 , -0.4898
	, -0.1495 , -0.9327 , -0.3282
	, -0.2804 , -0.9487 , -0.1460
	, -0.7886 , -0.0000 , -0.6149
	, -0.5032 , 0.7700 , -0.3924
	, -0.0973 , 0.4315 , -0.8968
	, -0.5576 , -0.7071 , -0.4348
	, -0.0762 , -0.7071 , -0.7030
	, 0.1961 , 0.0075 , -0.9806
	, 0.1961 , -0.0032 , -0.9806
	, 0.1961 , -0.0046 , -0.9806
	, 0.1961 , 0.0086 , -0.9805
	, 0.1961 , 0.0251 , -0.9803
	, 0.1960 , 0.0279 , -0.9802
	, 0.1959 , 0.0487 , -0.9794
	, 0.1078 , 0.0000 , -0.9942
	, 0.2906 , 0.0000 , -0.9569
	, 0.7882 , 0.0000 , -0.6155
	, 0.7966 , -0.0423 , -0.6030
	, 0.2989 , -0.0230 , -0.9540
	, 0.3653 , 0.2491 , -0.8969
	, 0.8412 , 0.2292 , -0.4898
	, 0.1495 , -0.9327 , -0.3282
	, 0.2804 , -0.9487 , -0.1460
	, 0.7886 , 0.0000 , -0.6149
	, 0.5032 , 0.7700 , -0.3924
	, 0.0973 , 0.4315 , -0.8968
	, 0.5576 , -0.7071 , -0.4348
	, 0.0762 , -0.7071 , -0.7030
]; 

var textureCoords = [
	0.104238 , 0.067420
, 0.104238 , 0.208720
, 0.064727 , 0.208720
, 0.059339 , 0.067420
, 0.104238 , 0.452340
, 0.060775 , 0.452340
, 0.104238 , 0.564405
, 0.058168 , 0.564405
, 0.104238 , 0.691087
, 0.063696 , 0.691087
, 0.104238 , 0.827514
, 0.081129 , 0.827514
, 0.104238 , 0.900600
, 0.091528 , 0.900600
, 0.104238 , 0.951760
, 0.161467 , 0.879113
, 0.149279 , 0.894743
, 0.294124 , 0.894743
, 0.311353 , 0.872680
, 0.238190 , 0.846147
, 0.166306 , 0.826531
, 0.359787 , 0.805547
, 0.359787 , 0.821827
, 0.359787 , 0.857604
, 0.359787 , 0.857972
, 0.955523 , 0.952676
, 0.636014 , 0.941605
, 0.634104 , 0.865346
, 0.955603 , 0.859861
, 0.259257 , 0.507519
, 0.223286 , 0.507519
, 0.223286 , 0.350714
, 0.259257 , 0.350714
, 0.210490 , 0.507519
, 0.210490 , 0.350714
, 0.220244 , 0.174309
, 0.230480 , 0.174309
, 0.259257 , 0.174309
, 0.210336 , 0.066506
, 0.259257 , 0.066506
, 0.192934 , 0.066506
, 0.293917 , 0.743287
, 0.359787 , 0.788295
, 0.359787 , 0.713282
, 0.270486 , 0.788295
, 0.591271 , 0.947945
, 0.591271 , 0.858403
, 0.151009 , 0.846147
, 0.646445 , 0.954122
, 0.606008 , 0.964598
, 0.954601 , 0.964239
, 0.602936 , 0.843747
, 0.635070 , 0.850735
, 0.954188 , 0.844955
, 0.059339 , 0.067420
, 0.064727 , 0.208720
, 0.060775 , 0.452340
, 0.058168 , 0.564405
, 0.063696 , 0.691087
, 0.081129 , 0.827514
, 0.091528 , 0.900600
, 0.161467 , 0.879113
, 0.311353 , 0.872680
, 0.294124 , 0.894743
, 0.149279 , 0.894743
, 0.238190 , 0.846147
, 0.166306 , 0.826531
, 0.634104 , 0.865346
, 0.636014 , 0.941605
, 0.223286 , 0.350714
, 0.223286 , 0.507519
, 0.210490 , 0.350714
, 0.210490 , 0.507519
, 0.230480 , 0.174309
, 0.220244 , 0.174309
, 0.210336 , 0.066506
, 0.192934 , 0.066506
, 0.293917 , 0.743287
, 0.270486 , 0.788295
, 0.591271 , 0.858403
, 0.591271 , 0.947945
, 0.151009 , 0.846147
, 0.646445 , 0.954122
, 0.606008 , 0.964598
, 0.635070 , 0.850735
, 0.602936 , 0.843747
, 0.104238 , 0.067420
, 0.104238 , 0.208720
, 0.104238 , 0.452340
, 0.104238 , 0.564405
, 0.104238 , 0.691087
, 0.104238 , 0.827514
, 0.104238 , 0.900600
, 0.161467 , 0.879113
, 0.311353 , 0.872680
, 0.359787 , 0.821827
, 0.359787 , 0.805547
, 0.166306 , 0.826531
, 0.359787 , 0.857604
, 0.359787 , 0.857972
, 0.955523 , 0.952676
, 0.955603 , 0.859861
, 0.634104 , 0.865346
, 0.636014 , 0.941605
, 0.259257 , 0.507519
, 0.259257 , 0.350714
, 0.223286 , 0.350714
, 0.223286 , 0.507519
, 0.230480 , 0.174309
, 0.259257 , 0.174309
, 0.259257 , 0.066506
, 0.210336 , 0.066506
, 0.293917 , 0.743287
, 0.359787 , 0.713282
, 0.646445 , 0.954122
, 0.954601 , 0.964239
, 0.635070 , 0.850735
, 0.954188 , 0.844955
, 0.161467 , 0.879113
, 0.311353 , 0.872680
, 0.166306 , 0.826531
, 0.636014 , 0.941605
, 0.634104 , 0.865346
, 0.223286 , 0.507519
, 0.223286 , 0.350714
, 0.230480 , 0.174309
, 0.210336 , 0.066506
, 0.293917 , 0.743287
, 0.646445 , 0.954122
, 0.635070 , 0.850735
];

var quads = [ 
// indices for vertex1, textureCoord of vertex1, normal of vertex1, vertex2, ...
// each index starts from 1, we will probably need to subtract 1 from each
  9,1,1 , 10,2,1 , 33,3,1 , 32,4,1
, 10,2,2 , 11,5,2 , 34,6,2 , 33,3,2
, 11,5,3 , 12,7,3 , 35,8,3 , 34,6,3
, 12,7,4 , 13,9,4 , 36,10,4 , 35,8,4
, 13,9,5 , 14,11,5 , 37,12,5 , 36,10,5
, 14,11,6 , 15,13,6 , 38,14,6 , 37,12,6
, 7,16,8 , 52,17,8 , 39,18,8 , 1,19,8
, 32,20,9 , 6,21,9 , 24,22,9 , 9,23,9
, 29,24,8 , 7,16,8 , 1,19,8 , 16,25,8
, 25,26,10 , 5,27,10 , 8,28,10 , 28,29,10
, 16,30,11 , 1,31,11 , 2,32,11 , 18,33,11
, 1,31,12 , 39,34,12 , 41,35,12 , 2,32,12
, 2,32,13 , 41,35,13 , 43,36,13 , 3,37,13
, 18,33,14 , 2,32,14 , 3,37,14 , 20,38,14
, 20,38,15 , 3,37,15 , 4,39,15 , 22,40,15
, 3,37,16 , 43,36,16 , 45,41,16 , 4,39,16
, 5,27,19 , 48,46,19 , 51,47,19 , 8,28,19
, 6,49,20 , 47,50,20 , 48,46,20 , 5,27,20
, 24,51,21 , 6,49,21 , 5,27,21 , 25,26,21
, 8,28,22 , 51,47,22 , 52,52,22 , 7,53,22
, 28,29,23 , 8,28,23 , 7,53,23 , 29,54,23
, 9,1,24 , 56,55,24 , 58,56,24 , 10,2,24
, 10,2,25 , 58,56,25 , 60,57,25 , 11,5,25
, 11,5,26 , 60,57,26 , 62,58,26 , 12,7,26
, 12,7,27 , 62,58,27 , 64,59,27 , 13,9,27
, 13,9,28 , 64,59,28 , 66,60,28 , 14,11,28
, 14,11,29 , 66,60,29 , 68,61,29 , 15,13,29
, 30,62,8 , 17,63,8 , 70,64,8 , 90,65,8
, 56,66,9 , 9,23,9 , 24,22,9 , 27,67,9
, 29,24,8 , 16,25,8 , 17,63,8 , 30,62,8
, 25,26,31 , 28,29,31 , 31,68,31 , 26,69,31
, 16,30,32 , 18,33,32 , 19,70,32 , 17,71,32
, 17,71,33 , 19,70,33 , 73,72,33 , 70,73,33
, 19,70,34 , 21,74,34 , 76,75,34 , 73,72,34
, 18,33,35 , 20,38,35 , 21,74,35 , 19,70,35
, 20,38,36 , 22,40,36 , 23,76,36 , 21,74,36
, 21,74,37 , 23,76,37 , 79,77,37 , 76,75,37
, 26,69,40 , 31,68,40 , 89,80,40 , 84,81,40
, 27,83,41 , 26,69,41 , 84,81,41 , 83,84,41
, 24,51,42 , 25,26,42 , 26,69,42 , 27,83,42
, 31,68,43 , 30,85,43 , 90,86,43 , 89,80,43
, 28,29,44 , 29,54,44 , 30,85,44 , 31,68,44
, 55,87,45 , 32,4,45 , 33,3,45 , 57,88,45
, 57,88,46 , 33,3,46 , 34,6,46 , 59,89,46
, 59,89,47 , 34,6,47 , 35,8,47 , 61,90,47
, 61,90,48 , 35,8,48 , 36,10,48 , 63,91,48
, 63,91,49 , 36,10,49 , 37,12,49 , 65,92,49
, 65,92,50 , 37,12,50 , 38,14,50 , 67,93,50
, 53,94,8 , 40,95,8 , 39,18,8 , 52,17,8
, 32,20,9 , 55,96,9 , 85,97,9 , 50,98,9
, 92,99,8 , 71,100,8 , 40,95,8 , 53,94,8
, 86,101,52 , 91,102,52 , 54,103,52 , 49,104,52
, 71,105,53 , 74,106,53 , 42,107,53 , 40,108,53
, 40,108,54 , 42,107,54 , 41,35,54 , 39,34,54
, 42,107,55 , 44,109,55 , 43,36,55 , 41,35,55
, 74,106,56 , 77,110,56 , 44,109,56 , 42,107,56
, 77,110,57 , 80,111,57 , 46,112,57 , 44,109,57
, 44,109,58 , 46,112,58 , 45,41,58 , 43,36,58
, 49,104,61 , 54,103,61 , 51,47,61 , 48,46,61
, 50,115,62 , 49,104,62 , 48,46,62 , 47,50,62
, 85,116,63 , 86,101,63 , 49,104,63 , 50,115,63
, 54,103,64 , 53,117,64 , 52,52,64 , 51,47,64
, 91,102,65 , 92,118,65 , 53,117,65 , 54,103,65
, 55,87,66 , 57,88,66 , 58,56,66 , 56,55,66
, 57,88,67 , 59,89,67 , 60,57,67 , 58,56,67
, 59,89,68 , 61,90,68 , 62,58,68 , 60,57,68
, 61,90,69 , 63,91,69 , 64,59,69 , 62,58,69
, 63,91,70 , 65,92,70 , 66,60,70 , 64,59,70
, 65,92,71 , 67,93,71 , 68,61,71 , 66,60,71
, 93,119,8 , 90,65,8 , 70,64,8 , 72,120,8
, 56,66,9 , 88,121,9 , 85,97,9 , 55,96,9
, 92,99,8 , 93,119,8 , 72,120,8 , 71,100,8
, 86,101,73 , 87,122,73 , 94,123,73 , 91,102,73
, 71,105,74 , 72,124,74 , 75,125,74 , 74,106,74
, 72,124,75 , 70,73,75 , 73,72,75 , 75,125,75
, 75,125,76 , 73,72,76 , 76,75,76 , 78,126,76
, 74,106,77 , 75,125,77 , 78,126,77 , 77,110,77
, 77,110,78 , 78,126,78 , 81,127,78 , 80,111,78
, 78,126,79 , 76,75,79 , 79,77,79 , 81,127,79
, 87,122,82 , 84,81,82 , 89,80,82 , 94,123,82
, 88,129,83 , 83,84,83 , 84,81,83 , 87,122,83
, 85,116,84 , 88,129,84 , 87,122,84 , 86,101,84
, 94,123,85 , 89,80,85 , 90,86,85 , 93,130,85
, 91,102,86 , 94,123,86 , 93,130,86 , 92,118,86

];

var triangles = [
	// indices for vertex1, textureCoord of vertex1, normal of vertex1, vertex2, ...
	// each index starts from 1, we will probably need to subtract 1 from each
	 15,13,7 , 69,15,7 , 38,14,7
	, 4,42,17 , 82,43,17 , 22,44,17
	, 45,45,18 , 82,43,18 , 4,42,18
	, 6,21,9 , 32,20,9 , 47,48,9
	, 15,13,30 , 68,61,30 , 69,15,30
	, 23,78,38 , 22,44,38 , 82,43,38
	, 79,79,39 , 23,78,39 , 82,43,39
	, 27,67,9 , 83,82,9 , 56,66,9
	, 67,93,51 , 38,14,51 , 69,15,51
	, 46,113,59 , 80,114,59 , 82,43,59
	, 45,45,60 , 46,113,60 , 82,43,60
	, 50,98,9 , 47,48,9 , 32,20,9
	, 67,93,72 , 69,15,72 , 68,61,72
	, 81,128,80 , 82,43,80 , 80,114,80
	, 79,79,81 , 82,43,81 , 81,128,81
	, 88,121,9 , 56,66,9 , 83,82,9
	];

	
	


window.onload = function init() {
    canvas = document.getElementById( "gl-canvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    gl.clearColor( 1.0, 1.0, 1.0, 1.0 );
	
	var program = initShaders( gl, "vertex-shader", "fragment-shader" );
    gl.useProgram( program );
	
	gl.enable(gl.DEPTH_TEST);

	prepareTeapot();

	var nBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, nBuffer);
	gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
	
	var vNormal = gl.getAttribLocation( program, "vNormal");
    gl.vertexAttribPointer( vNormal, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vNormal);
	
	var vBuffer = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, vBuffer);
    gl.bufferData( gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    var vPosition = gl.getAttribLocation( program, "vPosition");
    gl.vertexAttribPointer( vPosition, 3, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray( vPosition);
	
	var iBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuffer);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint8Array(indices), gl.STATIC_DRAW);

	
	thetaLoc = gl.getUniformLocation(program, "theta");
	
	
	modelViewMatrix = rotateX(0);
	projectionMatrix =ortho(-20.0, 20.0, -20.0, 20.0, -20.0, 20.0); // verticesler 20 ye kadar ise ..
	
	
	
	modelViewMatrixLoc = gl.getUniformLocation( program, "modelViewMatrix" );
    projectionMatrixLoc = gl.getUniformLocation( program, "projectionMatrix" );

    gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix));
	gl.uniformMatrix4fv( projectionMatrixLoc, false, flatten(projectionMatrix));
	
	document.getElementById("ButtonX").onclick = function(){axis = xAxis;};
    document.getElementById("ButtonY").onclick = function(){axis = yAxis;};
    document.getElementById("ButtonZ").onclick = function(){axis = zAxis;};
    document.getElementById("ButtonT").onclick = function(){flag = !flag;};


    document.getElementById("XButton").onclick = function(){
		modelViewMatrix = mult(rotateX(5), modelViewMatrix);
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix));
		render();
	};
    document.getElementById("YButton").onclick = function(){
		modelViewMatrix = mult(rotateY(5), modelViewMatrix);
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix));
		render();
	};
    document.getElementById("ZButton").onclick = function(){
		modelViewMatrix = mult(rotateZ(5), modelViewMatrix);
		gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelViewMatrix));
		render();
	};

	var ambientProduct = mult(lightAmbient, materialAmbient);
    var diffuseProduct = mult(lightDiffuse, materialDiffuse);
    var specularProduct = mult(lightSpecular, materialSpecular);

	gl.uniform4fv(gl.getUniformLocation(program, "ambientProduct"),
       flatten(ambientProduct));
    gl.uniform4fv(gl.getUniformLocation(program, "diffuseProduct"),
       flatten(diffuseProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "specularProduct"),
       flatten(specularProduct) );
    gl.uniform4fv(gl.getUniformLocation(program, "lightPosition"),
       flatten(lightPosition) );

 gl.uniform1f(gl.getUniformLocation(program,
	"shininess"),materialShininess);


	render();
};

// This function goes over the given teapot data and 
// does the necessary index organization tasks.
// The main task is to convert the given polygons (quads and triangles)
// into a single indices array correctly
function prepareTeapot() {
	for (var i = 0; i < quads.length; i+=12) {
		indices.push(quads[i]-1, quads[i+3]-1, quads[i+6]-1); 
		indices.push(quads[i]-1, quads[i+6]-1, quads[i+9]-1); 
	}
	for (var i = 0; i < triangles.length; i+=9) {
		indices.push(triangles[i]-1, triangles[i+3]-1, triangles[i+6]-1); 
	}
	
}

function render() {

	gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    if(flag) theta[axis] += 2.0;

    modelView = mat4();
    modelView = mult(modelView, rotate(theta[xAxis], [1, 0, 0] ));
    modelView = mult(modelView, rotate(theta[yAxis], [0, 1, 0] ));
    modelView = mult(modelView, rotate(theta[zAxis], [0, 0, 1] ));

    

	gl.uniformMatrix4fv( modelViewMatrixLoc, false, flatten(modelView));

   
	
   // for( var i=0; i<indices.length; i+=3)
	//  gl.drawElements( gl.LINE_LOOP, 3, gl.UNSIGNED_BYTE, i );
	
	gl.drawElements(gl.TRIANGLES,indices.length , gl.UNSIGNED_BYTE, 0);

	requestAnimFrame(render);
}