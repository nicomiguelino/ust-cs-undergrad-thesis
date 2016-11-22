//Decare variables for central Latitude and Longitude.
var centralLat = 14.5898;
var centralLng = 120.9816;
var defaultZoomLevel = 15;

var map = L.map('map').setView([centralLat, centralLng], defaultZoomLevel);
var osm = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png';

L.tileLayer(osm, {
	//minZoom: 18,
	//maxZoom: 18
}).addTo(map);

//Draw a circle with a 1-km (1000-m) radius from Manila City Hall
var circle = L.circle([centralLat, centralLng], 1000, {
	//Put options here.
}).addTo(map);



//TEST
var g = new Graph();
// g.addNode(new Node(0, 14.5809, 120.98185, "[0]: Maria Y. Orosa, United Nations Ave."));
// g.addNode(new Node(1, 14.58249, 120.98465, "[1]: United Nations Ave., Taft Ave., General Luna St."));
// g.addNode(new Node(2, 14.58196, 120.98127, "[2]:Kalaw Ave., Maria Y. Orosa"));
// g.addNode(new Node(3, 14.58154, 120.98054, "[3]:Kalaw Ave., Jorge Bocobo"));
// g.addNode(new Node(4, 14.58108, 120.97971, "[4]:Kalaw Ave., A. Mabini (Outside scope)"));

//Iterate thru NodesWithCoordinates.js' selectedCoordinates to create new nodes.
for(var i = 0; i < selectedCoordinates.length; i++)
{
	var tempLatitude = selectedCoordinates[i].latitude;
	var tempLongitude = selectedCoordinates[i].longitude;
	var tempDescription = selectedCoordinates[i].description;
	g.addNode(new Node(i, tempLatitude, tempLongitude, tempDescription));
}


g.newMatrix();
//var matrix = g.matrix;

//Temporarily create three matrix variables.
var speedMatrix = null; //To be initialized later
var distanceMatrix = null; //To be initialized later
//Speed matrix elements are to be computed later.

// matrix[0][1] = 0.338;
// matrix[0][2] = 0.118;

// matrix[1][0] = 0.338;
// matrix[1][179] = 0.024;

// matrix[2][6] = 0.272;
// matrix[2][180] = 0.023;

// matrix[3][69] = 0.026;

// matrix[4][183] = 0.014;

// matrix[5][3] = 0.044;

// matrix[6][178] = 0.136;
// matrix[6][7] = 0.072;
// matrix[6][180] = 0.265;

// matrix[7][6] = 0.072;
// matrix[7][178] = 0.112;
// matrix[7][8] = 0.028;


// matrix[8][11] = 0.271;
// matrix[8][81] = 0.330;

// matrix[9][179] = 0.258;
// matrix[9][10] = 0.122;

// matrix[10][9] = 0.122;
// matrix[10][80] = 0.534;

// matrix[11][9] = 0.170;

// matrix[12][11] = 0.411;

// matrix[13][12] = 0.090;
// matrix[13][17] = 0.077;

// matrix[14][13] = 0.041;
// matrix[14][16] = 0.041;

// matrix[15][14] = 0.057;
// matrix[15][18] = 0.077;

// matrix[16][80] = 0.054;
// matrix[16][14] = 0.041;

// matrix[17][82] = 0.088;
// matrix[17][13] = 0.077;
// matrix[17][18] = 0.104;
// matrix[17][20] = 0.045;

// matrix[18][17] = 0.104;
// matrix[18][19] = 0.047;

// matrix[19][20] = 0.107;
// matrix[19][22] = 0.080;

// matrix[20][17] = 0.045;
// matrix[20][19] = 0.107;
// matrix[20][21] = 0.024;

// matrix[21][82] = 0.108;
// matrix[21][20] = 0.024;
// matrix[21][22] = 0.089;

// matrix[22][21] = 0.089;
// matrix[22][171] = 0.143;
// matrix[22][23] = 0.210;

// matrix[23][82] = 0.206;
// matrix[23][24] = 0.198;

// matrix[24][25] = 0.127;
// matrix[24][83] = 0.337;
// matrix[24][53] = 0.471;

// matrix[25][26] = 0.024;
// matrix[25][24] = 0.127;
// matrix[25][197] = 0.142;
// matrix[25][196] = 0.208;

// matrix[26][37] = 0.211;
// matrix[26][191] = 0.154;
// matrix[26][25] = 0.024;

// matrix[27][36] = 0.041;
// matrix[27][37] = 0.089;

// matrix[28][27] = 0.207;
// matrix[28][29] = 0.072;

// matrix[29][30] = 0.087;
// matrix[29][28] = 0.072;
// matrix[29][176] = 0.043;

// matrix[30][120] = 0.058;
// matrix[30][29] = 0.087;
// matrix[30][32] = 0.138;

// matrix[31][32] = 0.079;
// matrix[31][176] = 0.093;
// matrix[31][33] = 0.080;
// matrix[31][93] = 0.124;

// matrix[32][90] = 0.163;
// matrix[32][30] = 0.138;
// matrix[32][31] = 0.079;
// matrix[32][92] = 0.120;

// matrix[33][31] = 0.080;
// matrix[33][177] = 0.093;
// matrix[33][35] = 0.050;
// matrix[33][94] = 0.127;

// matrix[34][42] = 0.115;
// matrix[34][200] = 0.213;

// matrix[35][33] = 0.050;
// matrix[35][36] = 0.091;
// matrix[35][55] = 0.029;

// matrix[36][177] = 0.046;
// matrix[36][27] = 0.041;
// matrix[36][35] = 0.091;


// matrix[37][39] = 0.025;
// matrix[37][38] = 0.028;
// matrix[37][26] = 0.211;

// matrix[38][39] = 0.036;
// matrix[38][40] = 0.195;

// matrix[39][55] = 0.060;
// matrix[39][37] = 0.025;
// matrix[39][38] = 0.036;

// matrix[40][96] = 0.100;
// matrix[40][41] = 0.105;

// matrix[41][97] = 0.046;
// matrix[41][42] = 0.137;

// matrix[42][43] = 0.083;
// matrix[42][34] = 0.115;
// matrix[42][123] = 0.125;

// matrix[43][44] = 0.078;
// matrix[43][97] = 0.130;
// matrix[43][42] = 0.083;

// matrix[44][110] = 0.081;
// matrix[44][98] = 0.130;
// matrix[44][43] = 0.078;
// matrix[44][45] = 0.091;

// matrix[45][46] = 0.081;
// matrix[45][44] = 0.091;

// matrix[46][111] = 0.079;
// matrix[46][110] = 0.092;
// matrix[46][47] = 0.054;

// matrix[47][122] = 0.078;
// matrix[47][46] = 0.054;
// matrix[47][48] = 0.025;

// matrix[48][121] = 0.078;
// matrix[48][47] = 0.025;
// matrix[48][119] = 0.033;

// matrix[49][117] = 0.074;
// matrix[49][112] = 0.087;
// matrix[49][121] = 0.082;
// matrix[49][50] = 0.088;

// matrix[50][49] = 0.088;
// matrix[50][51] = 0.162;



// //mestart

// matrix[51][50] = 0.162;
// matrix[51][119] = 0.050;


// matrix[52][150] = 0.196;
// matrix[52][138] = 0.541;

// //53 here
// matrix[53][60] = 0.046;
// matrix[53][24] = 0.471;
// matrix[53][61] = 0.037;


// matrix[54][95] = 0.038;
// matrix[54][96] = 0.072;
// matrix[54][99] = 0.095;

// matrix[55][39] = 0.059;
// matrix[55][95] = 0.130;
// matrix[55][35] = 0.077;

// //matrix[56][67] = 0.049; //Yasiii, cinomment-out ko ulit to.
// matrix[56][195] = 0.405;

// matrix[57][56] = 0.013;

// matrix[58][60] = 0.081;

// matrix[59][160] = 0.342;

// matrix[60][53] = 0.043;
// matrix[60][61] = 0.033;

// matrix[61][53] = 0.033;
// matrix[61][137] = 0.465;

// matrix[62][64] = 0.109;

// matrix[63][66] = 0.233;
// matrix[63][62] = 0.015;

// matrix[64][200] = 0.296;

// matrix[65][66] = 0.036;
// matrix[65][62] = 0.218;

// matrix[66][165] = 0.196;

// matrix[67][201] = 0.036;

// matrix[68][73] = 0.139;
// matrix[68][72] = 0.137;
// matrix[68][120] = 0.093;

// matrix[69][2] = 0.062;

// matrix[70][184] = 0.018;
// matrix[70][188] = 0.258;

// matrix[71][181] = 0.418;
// matrix[71][84] = 0.073;

// matrix[72][73] = 0.032;
// matrix[72][71] = 0.035;

// matrix[73][74] = 0.116;

// matrix[74][76] = 0.229;

// matrix[75][71] = 0.176;
// matrix[75][74] = 0.014;

// matrix[76][77] = 0.017;

// matrix[77][76] = 0.017;
// matrix[77][75] = 0.228;

// matrix[78][92] = 0.066;
// matrix[78][79] = 0.077;

// matrix[79][78] = 0.077;
// matrix[79][93] = 0.069;
// matrix[79][101] = 0.063;

// matrix[80][16] = 0.054;
// matrix[80][15] = 0.040;

// matrix[81][187] = 0.021;
// matrix[81][82] = 0.345;
// matrix[81][83] = 0.157;

// matrix[82][81] = 0.345;
// matrix[82][12] = 0.081;
// matrix[82][21] = 0.108;

// matrix[83][24] = 0.337;
// matrix[83][190] = 0.220;

// matrix[84][85] = 0.039;
// matrix[84][87] = 0.018;

// matrix[85][185] = 0.127;
// matrix[85][70] = 0.084;

// matrix[86][127] = 0.113;
// matrix[86][88] = 0.049;
// matrix[86][126] = 0.137;

// matrix[87][72] = 0.100;
// matrix[87][68] = 0.149;

// matrix[88][124] = 0.140;
// matrix[88][125] = 0.134;
// matrix[88][86] = 0.049;

// matrix[89][120] = 0.179;
// matrix[89][90] = 0.160;

// matrix[90][89] = 0.160;
// matrix[90][32] = 0.163;
// matrix[90][91] = 0.084;

// matrix[91][90] = 0.084;
// matrix[91][92] = 0.165;
// matrix[91][104] = 0.152;

// matrix[92][91] = 0.165;
// matrix[92][32] = 0.120;
// matrix[92][93] = 0.083;
// matrix[92][78] = 0.066;

// matrix[93][92] = 0.083;
// matrix[93][31] = 0.124;
// matrix[93][94] = 0.084;
// matrix[93][79] = 0.069;

// matrix[94][93] = 0.084;
// matrix[94][33] = 0.127;
// matrix[94][95] = 0.080;
// matrix[94][100] = 0.132;

// matrix[95][94] = 0.080;
// matrix[95][55] = 0.125;
// matrix[95][54] = 0.038;

// matrix[96][54] = 0.072;
// matrix[96][40] = 0.100;
// matrix[96][98] = 0.100;

// matrix[97][98] = 0.073;
// matrix[97][41] = 0.046;
// matrix[97][43] = 0.130;

// matrix[98][99] = 0.080;
// matrix[98][96] = 0.100;
// matrix[98][97] = 0.073;

// matrix[99][100] = 0.086;
// matrix[99][54] = 0.097;
// matrix[99][98] = 0.080;
// matrix[99][110] = 0.127;


// matrix[100][94] = 0.130;
// matrix[100][99] = 0.082;
// matrix[100][101] = 0.081;
// matrix[100][109] = 0.127;


// matrix[101][79] = 0.059;
// matrix[101][100] = 0.081;
// matrix[101][102] = 0.077;
// matrix[101][108] = 0.123;


// matrix[102][78] = 0.057;
// matrix[102][101] = 0.077;
// matrix[102][103] = 0.076;
// matrix[102][107] = 0.125;


// matrix[103][102] = 0.076;
// matrix[103][104] = 0.083;
// matrix[103][106] = 0.122;


// matrix[104][91] = 0.0149;
// matrix[104][103] = 0.083;
// matrix[104][105] = 0.0124;


// matrix[105][104] = 0.0124;
// matrix[105][106] = 0.071;


// matrix[106][103] = 0.122;
// matrix[106][105] = 0.071;
// matrix[106][107] = 0.076;
// matrix[106][114] = 0.085;


// matrix[107][102] = 0.125;
// matrix[107][106] = 0.076;
// matrix[107][108] = 0.078;
// matrix[107][113] = 0.085;


// matrix[108][101] = 0.123;
// matrix[108][107] = 0.078;
// matrix[108][109] = 0.080;
// matrix[108][112] = 0.087;



// matrix[109][100] = 0.127;
// matrix[109][108] = 0.080;
// matrix[109][110] = 0.081;
// matrix[109][111] = 0.088;

// matrix[110][44] = 0.079;
// matrix[110][46] = 0.090;
// matrix[110][99] = 0.127;
// matrix[110][109] = 0.081;



// matrix[111][109] = 0.088;
// matrix[111][112] = 0.080;
// matrix[111][122] = 0.055;


// matrix[112][49] = 0.085;
// matrix[112][108] = 0.087;
// matrix[112][113] = 0.078;


// matrix[113][107] = 0.085;
// matrix[113][114] = 0.078;
// matrix[113][116] = 0.082;


// matrix[114][106] = 0.085;
// matrix[114][115] = 0.088;


// matrix[115][114] = 0.088;
// matrix[115][116] = 0.078;


// matrix[116][113] = 0.082;
// matrix[116][115] = 0.078;
// matrix[116][117] = 0.011;


// matrix[117][49] = 0.078;
// matrix[117][116] = 0.011;


// //

// matrix[118][51] = 0.068;
// matrix[118][194] = 0.020;


// matrix[119][48] = 0.032;
// matrix[119][118] = 0.055;


// matrix[120][28] = 0.087;
// matrix[120][30] = 0.056;
// matrix[120][68] = 0.098;


// matrix[121][48] = 0.077;
// matrix[121][49] = 0.083;
// matrix[121][122] = 0.025;


// matrix[122][121] = 0.025;
// matrix[122][111] = 0.055;
// matrix[122][47] = 0.079;


// matrix[123][45] = 0.117;
// matrix[123][118] = 0.190;


// matrix[124][22] = 0.298;
// matrix[124][127] = 0.049;


// matrix[125][88] = 0.132;
// matrix[125][126] = 0.047;


// matrix[126][125] = 0.047;
// matrix[126][86] = 0.133;


// matrix[127][86] = 0.110;


// matrix[128][129] = 0.081;


// matrix[129][128] = 0.081;
// matrix[129][130] = 0.109;
// matrix[129][131] = 0.052;


// matrix[130][129] = 0.109;
// matrix[130][132] = 0.045;

// //

// matrix[131][129] = 0.052;
// matrix[131][132] = 0.135;


// matrix[132][130] = 0.045;
// matrix[132][131] = 0.135;
// matrix[132][133] = 0.042;

// //

// matrix[133][132] = 0.042;
// matrix[133][134] = 0.115;


// matrix[134][133] = 0.115;
// matrix[134][135] = 0.032;
// matrix[134][140] = 0.071;
// //

// matrix[135][134] = 0.032;
// matrix[135][136] = 0.047;
// matrix[135][143] = 0.068;


// matrix[136][135] = 0.047;
// matrix[136][145] = 0.067;
// matrix[136][173] = 0.037;


// matrix[137][149] = 0.068;


// matrix[138][64] = 0.105;
// matrix[138][57] = 0.517;


// matrix[139][140] = 0.033;
// matrix[139][141] = 0.040;


// matrix[140][134] = 0.072;
// matrix[140][139] = 0.033;
// matrix[140][143] = 0.036;


// matrix[141][139] = 0.040;
// matrix[141][142] = 0.051;
// matrix[141][143] = 0.036;
// matrix[141][144] = 0.044;


// matrix[142][141] = 0.053;
// matrix[142][151] = 0.075;

// matrix[143][135] = 0.070;
// matrix[143][140] = 0.038;
// matrix[143][141] = 0.038;
// matrix[143][145] = 0.044;


// matrix[144][141] = 0.047;
// matrix[144][145] = 0.039;
// matrix[144][146] = 0.056;


// matrix[145][143] = 0.044;
// matrix[145][174] = 0.039;  //norzagay, quezon blvd
// matrix[145][144] = 0.037;


// matrix[146][174] = 0.042; //norzagay, quezon blvd
// matrix[146][144] = 0.056;

// matrix[147][135] = 0.067;
// matrix[147][148] = 0.037;

// matrix[148][136] = 0.066;
// matrix[148][147] = 0.039;
// matrix[148][149] = 0.043;

// matrix[149][148] = 0.043;


// matrix[150][175] = 0.037; //carlos palanca, sr after quezon bridge
// matrix[150][153] = 0.047;


// matrix[151][142] = 0.075;
// matrix[151][152] = 0.083;
// matrix[151][124] = 0.475;


// matrix[152][175] = 0.020; //carlos palanca, sr after quezon bridge
// matrix[152][151] = 0.083;

// matrix[153][150] = 0.047;
// matrix[153][154] = 0.044;
// matrix[153][159] = 0.167;

// matrix[154][153] = 0.043;
// matrix[154][155] = 0.063;

// matrix[155][154] = 0.063;
// matrix[155][156] = 0.042;

// matrix[156][155] = 0.041;

// matrix[157][58] = 0.153;
// matrix[157][164] = 0.180;

// matrix[158][160] = 0.090;
// matrix[158][159] = 0.053;

// matrix[159][153] = 0.167;
// matrix[159][158] = 0.053;

// matrix[160][158] = 0.090;
// matrix[160][161] = 0.011;

// matrix[161][160] = 0.011;

// matrix[162][170] = 0.082;
// matrix[162][172] = 0.046; //muelle before sta cruz

// matrix[163][162] = 0.067;
// matrix[163][169] = 0.085;

// matrix[164][168] = 0.040;
// matrix[164][163] = 0.217;

// matrix[165][167] = 0.053;

// matrix[166][67] = 0.181; 

// matrix[167][166] = 0.038;
// matrix[167][168] = 0.069;
// matrix[167][58] = 0.053;

// matrix[168][164] = 0.040;
// matrix[168][169] = 0.206;

// matrix[169][163] = 0.083;
// matrix[169][170] = 0.054;

// matrix[170][162] = 0.081;


// matrix[171][88] = 0.160;
// matrix[171][124] = 0.273;


// matrix[172][161] = 0.058;


// matrix[173][136] = 0.037;
// matrix[173][149] = 0.067;


// matrix[174][145] = 0.038;
// matrix[174][173] = 0.067;


// matrix[175][152] = 0.020;
// matrix[175][146] = 0.040;
// matrix[175][150] = 0.035;

// matrix[176][29] = 0.042;
// matrix[176][31] = 0.093;
// matrix[176][177] = 0.076;

// matrix[177][176] = 0.076;
// matrix[177][33] = 0.088;
// matrix[177][36] = 0.043;

// matrix[178][1] = 0.031;
// matrix[178][6] = 0.127;

// matrix[179][1] = 0.014;
// matrix[179][8] = 0.130;

// matrix[180][181] = 0.011;
// matrix[180][84] = 0.388;
// matrix[180][85] = 0.402;

// matrix[181][182] = 0.079;
// matrix[181][2] = 0.019;

// matrix[182][3] = 0.014;
// matrix[182][4] = 0.103;

// matrix[183][5] = 0.064;
// matrix[183][4] = 0.015;

// matrix[184][87] = 0.109;

// matrix[185][70] = 0.061;

// matrix[186][7] = 0.311;

// matrix[187][186] = 0.008;
// matrix[187][185] = 0.195;

// matrix[188][189] = 0.192;
// matrix[188][190] = 0.116;

// matrix[189][187] = 0.109;

// matrix[190][25] = 0.146;

// matrix[191][189] = 0.260;
// matrix[191][184] = 0.362;

// matrix[192][193] = 0.042;
// matrix[192][67] = 0.275;
// matrix[192][201] = 0.299;

// matrix[193][192] = 0.042;
// matrix[193][195] = 0.083;

// matrix[194][192] = 0.062;
// matrix[194][193] = 0.051;

// matrix[195][51] = 0.066;

// matrix[196][65] = 0.399;

// matrix[197][198] = 0.083;
// matrix[197][199] = 0.083;

// matrix[198][60] = 0.253;

// matrix[199][59] = 0.326;

// matrix[200][26] = 0.231;

// matrix[201][34] = 0.084;

// matrix[202][58] = 0.082;
// matrix[202][168] = 0.080;

//Dropdowns, Buttons, Fields, Date, and Time
var sourceDD = document.getElementById('sourceDropDown');
var destinationDD = document.getElementById('destinationDropDown');
var submitButton = document.getElementById('submitButton');
var totalDistanceOutput = document.getElementById('totalDistanceOutput');
var totalTravelTimeOutput = document.getElementById('totalTravelTimeOutput');
var dateInput = document.getElementById('dateInput');
var timeInput = document.getElementById('timeInput');

//Set the default value of the date.
dateInput.value = "2016-04-21";

//Polyline
var polyline = null;

//Populate the source dropdown with options.
for(var i = 0; i < g.nodeList.length; i++)
{
	var tempNewElement = document.createElement('option');
	tempNewElement.setAttribute('value', g.nodeList[i].description);
	tempNewElement.innerHTML = g.nodeList[i].description;
	sourceDD.appendChild(tempNewElement);
}

//Populate the destination dropdown with options.
for(var i = 0; i < g.nodeList.length; i++)
{
	var tempNewElement = document.createElement('option');
	tempNewElement.setAttribute('value', g.nodeList[i].description);
	tempNewElement.innerHTML = g.nodeList[i].description;
	destinationDD.appendChild(tempNewElement);
}

//Create a new marker that represents the selected source.
var sourceMarkerLat = g.nodeList[0].latitude;
var sourceMarkerLng = g.nodeList[0].longitude;
var sourceMarker = L.marker([sourceMarkerLat, sourceMarkerLng], {
	draggable: false
});
var sourceMarkerAdded = false;
var sourceMarkerRemoved = false;
var sourceNode = null; //To be used for pathfinding.

//Add a 'change' event listener for source dropdown.
sourceDD.addEventListener('change', function(){
	if(polyline)
	{
		map.removeLayer(polyline);
	}

	for(var i = 0; i < sourceDD.options.length; i++)
	{
		if(i != 0)
		{
			//If A is selected as a source, you cannot select is as a destination.
			if(sourceDD.selectedIndex == i)
			{
				destinationDD.options[i].disabled = true;

				if(sourceMarkerRemoved)
				{
					sourceMarker = L.marker([g.nodeList[i-1].latitude, g.nodeList[i-1].longitude], {
						draggable: false
					}).addTo(map);

					sourceMarkerRemoved = false;
				}

				if(!sourceMarkerAdded)
				{
					sourceMarker.addTo(map);
					sourceMarkerAdded = true;
				}

				sourceMarker.setLatLng([g.nodeList[i-1].latitude, g.nodeList[i-1].longitude]);
				sourceMarker.bindPopup('Source: ' + sourceMarker.getLatLng().toString() + '<br>' + g.nodeList[i-1].description).openPopup();

				sourceNode = g.getNodeAtIndex(i-1);
			}
			else
			{
				destinationDD.options[i].disabled = false;
			}
		}
		else
		{
			map.removeLayer(sourceMarker);
			sourceMarkerRemoved = true;
			sourceNode = null;
			totalDistanceOutput.value = "";
			totalTravelTimeOutput.value = "";
		}
	}
});

//Create a new marker that represents the selected source.
var destinationMarkerLat = g.nodeList[0].latitude;
var destinationMarkerLng = g.nodeList[0].longitude;
var destinationMarker = L.marker([destinationMarkerLat, destinationMarkerLng], {
	draggable: false
});
var destinationMarkerAdded = false;
var destinationMarkerRemoved = false;
destinationNode = null; //To be used for pathfinding.

//Add a 'change' event listener for destination dropdown.
destinationDD.addEventListener('change', function(){
	if(polyline)
	{
		map.removeLayer(polyline);
	}

	for(var i = 0; i < destinationDD.options.length; i++)
	{
		if(i != 0)
		{
			//If A is selected as a destination, you cannot select is as a source.
			if(destinationDD.selectedIndex == i)
			{
				sourceDD.options[i].disabled = true;

				if(destinationMarkerRemoved)
				{
					destinationMarker = L.marker([g.nodeList[i-1].latitude, g.nodeList[i-1].longitude], {
						draggable: false
					}).addTo(map);

					destinationMarkerRemoved = false;
				}

				if(!destinationMarkerAdded)
				{
					destinationMarker.addTo(map);
					destinationMarkerAdded = true;
				}

				destinationMarker.setLatLng([g.nodeList[i-1].latitude, g.nodeList[i-1].longitude]);
				destinationMarker.bindPopup('Destination: ' + destinationMarker.getLatLng().toString() + '<br>' + g.nodeList[i-1].description).openPopup();

				destinationNode = g.getNodeAtIndex(i-1);
			}
			else
			{
				sourceDD.options[i].disabled = false;
			}
		}
		else
		{
			map.removeLayer(destinationMarker);
			destinationMarkerRemoved = true;
			destinationNode = null;
			totalDistanceOutput.value = "";
			totalTravelTimeOutput.value = "";
		}
	}
});

//Add a 'click' event listener to the submit button.
submitButton.addEventListener('click', function(){

	//Get the date from the HTML input. (Pattern: yyyy-mm-dd)
	var strFullDate = dateInput.value;
	//Get the time from the HTML input. (Pattern): HH:MM[AM|PM]
	var strTime = timeInput.value;
	//Create a Date object to determine the day of week in integer form.
	var dateObj = new Date(strFullDate); //Take the input date string as the parameter.

	initializeTimeMatrix(dateObj.getDay(), militaryToStandardNoSpaces(strTime));
	// console.log(distanceMatrix);
	// console.log(speedMatrix);

	if(sourceNode != null && destinationNode != null)
	{	
		//Remove the polyline from the map if 'polyline' is not null.
		if(polyline)
		{
			map.removeLayer(polyline);
		}

		//Pathfinding algorithm.
		//Create a pathfinding object.
		var a = new DStar();
		var initialPath = a.search(g, sourceNode, destinationNode);


		//Let the dynamic pathfinding begins.


		initialPath.unshift(sourceNode); //Don't forget to add the source node at the beginning.

		//Find the total distance of the generated path from start to finish.
		var totalTravelTime = 0;
		var totalDistance = 0;
		for(var i = 1; i < initialPath.length; i++)
		{
			var fromIndex = initialPath[i-1].nodeNumber;
			var toIndex = initialPath[i].nodeNumber;

			totalTravelTime += g.matrix[fromIndex][toIndex];
			totalDistance += distanceMatrix[fromIndex][toIndex];
		}

		totalDistanceOutput.value = (totalDistance * 1000) + " m";
		//totalTravelTimeOutput.value = totalTravelTime + " hr";
		totalTravelTimeOutput.value = (totalTravelTime*60) + " min";

		//List the series of node numbers to represent the path.
		var pathBuffer = "";
		for(var i = 0; i < initialPath.length; i++)
		{
			//pathBuffer += initialPath[i].nodeNumber + "\n";
			pathBuffer += initialPath[i].description + "\n";
		}

		console.log(pathBuffer);

		//Create an array for polyline.
		var polylineCoordinates = [];
		polylineCoordinates.push([sourceNode.latitude, sourceNode.longitude]);

		//Iterate thru the path to get their latitude and longitude.
		for(var i = 0; i < initialPath.length; i++)
		{
			polylineCoordinates.push([initialPath[i].latitude, initialPath[i].longitude]);
		}

		//Now draw the polyline.
		polyline = new L.Polyline(polylineCoordinates, {
			color: 'green',
			weight: 7,
			opacity: 0.7,
			smoothFactor: 1
		}).addTo(map);
	}
});

//Function: Calculate the timeMatrix based on speedMatrix and DistanceMatrix.
function initializeTimeMatrix(dayOfWeek, time)
{
	//Initialize the matrix for distance.
	distanceMatrix = new Array(g.nodeList.length);

	for(var i = 0; i < g.nodeList.length; i++)
	{
		distanceMatrix[i] = new Array(g.nodeList.length);

		for(var j = 0; j < g.nodeList.length; j++)
		{
			if(i == j)
			{
				distanceMatrix[i][j] = 0;
			}
			else
			{
				distanceMatrix[i][j] = Number.POSITIVE_INFINITY;
			}
		}
	}

	//Populate the distance matrix with default values.
	populateDistanceMatrix();

	//Populate the speed matrix with the values from the spreadsheet file.
	//Hint: Make an XMLHttpRequest.
	var req = new XMLHttpRequest();
	var rawResponseString = "";
	var responseMatrix = null; //To be initialized later.

	//tempo test
	console.log("Time is: " + time);

	req.onreadystatechange = function()
	{
		if(req.readyState == req.DONE && req.status == 200)
		{
			rawResponseString = req.responseText;
		}
	};

	req.open("GET", "http://127.0.0.1/thesis_program/ControlBreakWithExcelv2.php?day=" + dayOfWeek + "&time=" + time, false);

	req.send();

	//It's time to parse the rawResponseString.
	responseMatrix = JSON.parse(rawResponseString);
	for(var i = 0; i < responseMatrix.length; i++)
	{
		for(var j = 0; j < responseMatrix[i].length; j++)
		{
			responseMatrix[i][j] = Number(responseMatrix[i][j]);
		}
	}

	//Assign the fetched SPEED matrix into the speedMatrix global variable.
	//Initialize the speedMatrix
	speedMatrix = responseMatrix;

	//Reinitialize the matrix for the travel time values.
	g.newMatrix();

	for(var i = 0; i < g.matrix.length; i++)
	{
		for(var j = 0; j < g.matrix.length; j++)
		{
			//Boolean conditions stored in a variable.
			var validDistanceEdge = (distanceMatrix[i][j] != 0 && distanceMatrix[i][j] != Number.POSITIVE_INFINITY);
			var validSpeedEdge = (speedMatrix[i][j] != 0 && speedMatrix[i][j] != Number.POSITIVE_INFINITY);

			if(validDistanceEdge && validSpeedEdge)
			{
				g.matrix[i][j] = (distanceMatrix[i][j])/speedMatrix[i][j];
			}
		}
	}
}

//Function: Populate the distance matrix with default values.
function populateDistanceMatrix()
{
	//Note that the distance matrix will be permanent.
	var matrix = distanceMatrix;

	matrix[0][1] = 0.338;
	matrix[0][2] = 0.118;

	matrix[1][0] = 0.338;
	matrix[1][179] = 0.024;

	matrix[2][6] = 0.272;
	matrix[2][180] = 0.023;

	matrix[3][69] = 0.026;

	matrix[4][183] = 0.014;

	matrix[5][3] = 0.044;

	matrix[6][178] = 0.136;
	matrix[6][7] = 0.072;
	matrix[6][180] = 0.265;

	matrix[7][6] = 0.072;
	matrix[7][178] = 0.112;
	matrix[7][8] = 0.028;


	matrix[8][11] = 0.271;
	matrix[8][81] = 0.330;

	matrix[9][179] = 0.258;
	matrix[9][10] = 0.122;

	matrix[10][9] = 0.122;
	matrix[10][80] = 0.534;

	matrix[11][9] = 0.170;

	matrix[12][11] = 0.411;

	matrix[13][12] = 0.090;
	matrix[13][17] = 0.077;

	matrix[14][13] = 0.041;
	matrix[14][16] = 0.041;

	matrix[15][14] = 0.057;
	matrix[15][18] = 0.077;

	matrix[16][80] = 0.054;
	matrix[16][14] = 0.041;

	matrix[17][82] = 0.088;
	matrix[17][13] = 0.077;
	matrix[17][18] = 0.104;
	matrix[17][20] = 0.045;

	matrix[18][17] = 0.104;
	matrix[18][19] = 0.047;

	matrix[19][20] = 0.107;
	matrix[19][22] = 0.080;

	matrix[20][17] = 0.045;
	matrix[20][19] = 0.107;
	matrix[20][21] = 0.024;

	matrix[21][82] = 0.108;
	matrix[21][20] = 0.024;
	matrix[21][22] = 0.089;

	matrix[22][21] = 0.089;
	matrix[22][171] = 0.143;
	matrix[22][23] = 0.210;

	matrix[23][82] = 0.206;
	matrix[23][24] = 0.198;

	matrix[24][25] = 0.127;
	matrix[24][83] = 0.337;
	matrix[24][53] = 0.471;

	matrix[25][26] = 0.024;
	matrix[25][24] = 0.127;
	matrix[25][197] = 0.142;
	matrix[25][196] = 0.208;

	matrix[26][37] = 0.211;
	matrix[26][191] = 0.154;
	matrix[26][25] = 0.024;

	matrix[27][36] = 0.041;
	matrix[27][37] = 0.089;

	matrix[28][27] = 0.207;
	matrix[28][29] = 0.072;

	matrix[29][30] = 0.087;
	matrix[29][28] = 0.072;
	matrix[29][176] = 0.043;

	matrix[30][120] = 0.058;
	matrix[30][29] = 0.087;
	matrix[30][32] = 0.138;

	matrix[31][32] = 0.079;
	matrix[31][176] = 0.093;
	matrix[31][33] = 0.080;
	matrix[31][93] = 0.124;

	matrix[32][90] = 0.163;
	matrix[32][30] = 0.138;
	matrix[32][31] = 0.079;
	matrix[32][92] = 0.120;

	matrix[33][31] = 0.080;
	matrix[33][177] = 0.093;
	matrix[33][35] = 0.050;
	matrix[33][94] = 0.127;

	matrix[34][42] = 0.115;
	matrix[34][200] = 0.213;

	matrix[35][33] = 0.050;
	matrix[35][36] = 0.091;
	matrix[35][55] = 0.029;

	matrix[36][177] = 0.046;
	matrix[36][27] = 0.041;
	matrix[36][35] = 0.091;


	matrix[37][39] = 0.025;
	matrix[37][38] = 0.028;
	matrix[37][26] = 0.211;

	matrix[38][39] = 0.036;
	matrix[38][40] = 0.195;

	matrix[39][55] = 0.060;
	matrix[39][37] = 0.025;
	matrix[39][38] = 0.036;

	matrix[40][96] = 0.100;
	matrix[40][41] = 0.105;

	matrix[41][97] = 0.046;
	matrix[41][42] = 0.137;

	matrix[42][43] = 0.083;
	matrix[42][34] = 0.115;
	matrix[42][123] = 0.125;

	matrix[43][44] = 0.078;
	matrix[43][97] = 0.130;
	matrix[43][42] = 0.083;

	matrix[44][110] = 0.081;
	matrix[44][98] = 0.130;
	matrix[44][43] = 0.078;
	matrix[44][45] = 0.091;

	matrix[45][46] = 0.081;
	matrix[45][44] = 0.091;

	matrix[46][111] = 0.079;
	matrix[46][110] = 0.092;
	matrix[46][47] = 0.054;

	matrix[47][122] = 0.078;
	matrix[47][46] = 0.054;
	matrix[47][48] = 0.025;

	matrix[48][121] = 0.078;
	matrix[48][47] = 0.025;
	matrix[48][119] = 0.033;

	matrix[49][117] = 0.074;
	matrix[49][112] = 0.087;
	matrix[49][121] = 0.082;
	matrix[49][50] = 0.088;

	matrix[50][49] = 0.088;
	matrix[50][51] = 0.162;



	//mestart

	matrix[51][50] = 0.162;
	matrix[51][119] = 0.050;


	matrix[52][150] = 0.196;
	matrix[52][138] = 0.541;

	//53 here
	matrix[53][60] = 0.046;
	matrix[53][24] = 0.471;
	matrix[53][61] = 0.037;


	matrix[54][95] = 0.038;
	matrix[54][96] = 0.072;
	matrix[54][99] = 0.095;

	matrix[55][39] = 0.059;
	matrix[55][95] = 0.130;
	matrix[55][35] = 0.077;

	matrix[56][195] = 0.405;

	matrix[57][56] = 0.013;

	matrix[58][60] = 0.081;

	matrix[59][160] = 0.342;

	matrix[60][53] = 0.043;
	matrix[60][61] = 0.033;

	matrix[61][53] = 0.033;
	matrix[61][137] = 0.465;

	matrix[62][64] = 0.109;

	matrix[63][66] = 0.233;
	matrix[63][62] = 0.015;

	matrix[64][200] = 0.296;

	matrix[65][66] = 0.036;
	matrix[65][62] = 0.218;

	matrix[66][165] = 0.196;

	matrix[67][201] = 0.036;

	matrix[68][73] = 0.139;
	matrix[68][72] = 0.137;
	matrix[68][120] = 0.093;

	matrix[69][2] = 0.062;

	matrix[70][184] = 0.018;
	matrix[70][188] = 0.258;

	matrix[71][181] = 0.418;
	matrix[71][84] = 0.073;

	matrix[72][73] = 0.032;
	matrix[72][71] = 0.035;

	matrix[73][74] = 0.116;

	matrix[74][76] = 0.229;

	matrix[75][71] = 0.176;
	matrix[75][74] = 0.014;

	matrix[76][77] = 0.017;

	matrix[77][76] = 0.017;
	matrix[77][75] = 0.228;

	matrix[78][92] = 0.066;
	matrix[78][79] = 0.077;

	matrix[79][78] = 0.077;
	matrix[79][93] = 0.069;
	matrix[79][101] = 0.063;

	matrix[80][16] = 0.054;
	matrix[80][15] = 0.040;

	matrix[81][187] = 0.021;
	matrix[81][82] = 0.345;
	matrix[81][83] = 0.157;

	matrix[82][81] = 0.345;
	matrix[82][12] = 0.081;
	matrix[82][21] = 0.108;

	matrix[83][24] = 0.337;
	matrix[83][190] = 0.220;

	matrix[84][85] = 0.039;
	matrix[84][87] = 0.018;

	matrix[85][185] = 0.127;
	matrix[85][70] = 0.084;

	matrix[86][127] = 0.113;
	matrix[86][88] = 0.049;
	matrix[86][126] = 0.137;

	matrix[87][72] = 0.100;
	matrix[87][68] = 0.149;

	matrix[88][124] = 0.140;
	matrix[88][125] = 0.134;
	matrix[88][86] = 0.049;

	matrix[89][120] = 0.179;
	matrix[89][90] = 0.160;

	matrix[90][89] = 0.160;
	matrix[90][32] = 0.163;
	matrix[90][91] = 0.084;

	matrix[91][90] = 0.084;
	matrix[91][92] = 0.165;
	matrix[91][104] = 0.152;

	matrix[92][91] = 0.165;
	matrix[92][32] = 0.120;
	matrix[92][93] = 0.083;
	matrix[92][78] = 0.066;

	matrix[93][92] = 0.083;
	matrix[93][31] = 0.124;
	matrix[93][94] = 0.084;
	matrix[93][79] = 0.069;

	matrix[94][93] = 0.084;
	matrix[94][33] = 0.127;
	matrix[94][95] = 0.080;
	matrix[94][100] = 0.132;

	matrix[95][94] = 0.080;
	matrix[95][55] = 0.125;
	matrix[95][54] = 0.038;

	matrix[96][54] = 0.072;
	matrix[96][40] = 0.100;
	matrix[96][98] = 0.100;

	matrix[97][98] = 0.073;
	matrix[97][41] = 0.046;
	matrix[97][43] = 0.130;

	matrix[98][99] = 0.080;
	matrix[98][96] = 0.100;
	matrix[98][97] = 0.073;

	matrix[99][100] = 0.086;
	matrix[99][54] = 0.097;
	matrix[99][98] = 0.080;
	matrix[99][110] = 0.127;


	matrix[100][94] = 0.130;
	matrix[100][99] = 0.082;
	matrix[100][101] = 0.081;
	matrix[100][109] = 0.127;


	matrix[101][79] = 0.059;
	matrix[101][100] = 0.081;
	matrix[101][102] = 0.077;
	matrix[101][108] = 0.123;


	matrix[102][78] = 0.057;
	matrix[102][101] = 0.077;
	matrix[102][103] = 0.076;
	matrix[102][107] = 0.125;


	matrix[103][102] = 0.076;
	matrix[103][104] = 0.083;
	matrix[103][106] = 0.122;


	matrix[104][91] = 0.0149;
	matrix[104][103] = 0.083;
	matrix[104][105] = 0.0124;


	matrix[105][104] = 0.0124;
	matrix[105][106] = 0.071;


	matrix[106][103] = 0.122;
	matrix[106][105] = 0.071;
	matrix[106][107] = 0.076;
	matrix[106][114] = 0.085;


	matrix[107][102] = 0.125;
	matrix[107][106] = 0.076;
	matrix[107][108] = 0.078;
	matrix[107][113] = 0.085;


	matrix[108][101] = 0.123;
	matrix[108][107] = 0.078;
	matrix[108][109] = 0.080;
	matrix[108][112] = 0.087;



	matrix[109][100] = 0.127;
	matrix[109][108] = 0.080;
	matrix[109][110] = 0.081;
	matrix[109][111] = 0.088;

	matrix[110][44] = 0.079;
	matrix[110][46] = 0.090;
	matrix[110][99] = 0.127;
	matrix[110][109] = 0.081;



	matrix[111][109] = 0.088;
	matrix[111][112] = 0.080;
	matrix[111][122] = 0.055;


	matrix[112][49] = 0.085;
	matrix[112][108] = 0.087;
	matrix[112][113] = 0.078;


	matrix[113][107] = 0.085;
	matrix[113][114] = 0.078;
	matrix[113][116] = 0.082;


	matrix[114][106] = 0.085;
	matrix[114][115] = 0.088;


	matrix[115][114] = 0.088;
	matrix[115][116] = 0.078;


	matrix[116][113] = 0.082;
	matrix[116][115] = 0.078;
	matrix[116][117] = 0.011;


	matrix[117][49] = 0.078;
	matrix[117][116] = 0.011;


	//

	matrix[118][51] = 0.068;
	matrix[118][194] = 0.020;


	matrix[119][48] = 0.032;
	matrix[119][118] = 0.055;


	matrix[120][28] = 0.087;
	matrix[120][30] = 0.056;
	matrix[120][68] = 0.098;


	matrix[121][48] = 0.077;
	matrix[121][49] = 0.083;
	matrix[121][122] = 0.025;


	matrix[122][121] = 0.025;
	matrix[122][111] = 0.055;
	matrix[122][47] = 0.079;


	matrix[123][45] = 0.117;
	matrix[123][118] = 0.190;


	matrix[124][22] = 0.298;
	matrix[124][127] = 0.049;
	matrix[124][151] = 0.479;


	matrix[125][88] = 0.132;
	matrix[125][126] = 0.047;


	matrix[126][125] = 0.047;
	matrix[126][86] = 0.133;


	matrix[127][86] = 0.110;


	matrix[128][129] = 0.081;


	matrix[129][128] = 0.081;
	matrix[129][130] = 0.109;
	matrix[129][131] = 0.052;


	matrix[130][129] = 0.109;
	matrix[130][132] = 0.045;

	//

	matrix[131][129] = 0.052;
	matrix[131][132] = 0.135;


	matrix[132][130] = 0.045;
	matrix[132][131] = 0.135;
	matrix[132][133] = 0.042;

	//

	matrix[133][132] = 0.042;
	matrix[133][134] = 0.115;


	matrix[134][133] = 0.115;
	matrix[134][135] = 0.032;
	matrix[134][140] = 0.071;
	//

	matrix[135][134] = 0.032;
	matrix[135][136] = 0.047;
	matrix[135][143] = 0.068;


	matrix[136][135] = 0.047;
	matrix[136][145] = 0.067;
	matrix[136][173] = 0.037;


	matrix[137][149] = 0.068;


	matrix[138][64] = 0.105;
	matrix[138][57] = 0.517;


	matrix[139][140] = 0.033;
	matrix[139][141] = 0.040;


	matrix[140][134] = 0.072;
	matrix[140][139] = 0.033;
	matrix[140][143] = 0.036;


	matrix[141][139] = 0.040;
	matrix[141][142] = 0.051;
	matrix[141][143] = 0.036;
	matrix[141][144] = 0.044;


	matrix[142][141] = 0.053;
	matrix[142][151] = 0.075;

	matrix[143][135] = 0.070;
	matrix[143][140] = 0.038;
	matrix[143][141] = 0.038;
	matrix[143][145] = 0.044;


	matrix[144][141] = 0.047;
	matrix[144][145] = 0.039;
	matrix[144][146] = 0.056;


	matrix[145][143] = 0.044;
	matrix[145][174] = 0.039;  //norzagay, quezon blvd
	matrix[145][144] = 0.037;


	matrix[146][174] = 0.042; //norzagay, quezon blvd
	matrix[146][144] = 0.056;

	matrix[147][135] = 0.067;
	matrix[147][148] = 0.037;

	matrix[148][136] = 0.066;
	matrix[148][147] = 0.039;
	matrix[148][149] = 0.043;

	matrix[149][148] = 0.043;


	matrix[150][175] = 0.037; //carlos palanca, sr after quezon bridge
	matrix[150][153] = 0.047;


	matrix[151][142] = 0.075;
	matrix[151][152] = 0.083;
	matrix[151][124] = 0.475;


	matrix[152][175] = 0.020; //carlos palanca, sr after quezon bridge
	matrix[152][151] = 0.083;

	matrix[153][150] = 0.047;
	matrix[153][154] = 0.044;
	matrix[153][159] = 0.167;

	matrix[154][153] = 0.043;
	matrix[154][155] = 0.063;

	matrix[155][154] = 0.063;
	matrix[155][156] = 0.042;

	matrix[156][155] = 0.041;

	matrix[157][58] = 0.153;
	matrix[157][164] = 0.180;

	matrix[158][160] = 0.090;
	matrix[158][159] = 0.053;

	matrix[159][153] = 0.167;
	matrix[159][158] = 0.053;

	matrix[160][158] = 0.090;
	matrix[160][161] = 0.011;

	matrix[161][160] = 0.011;

	matrix[162][170] = 0.082;
	matrix[162][172] = 0.046; //muelle before sta cruz

	matrix[163][162] = 0.067;
	matrix[163][169] = 0.085;

	matrix[164][168] = 0.040;
	matrix[164][163] = 0.217;

	matrix[165][167] = 0.053;

	matrix[166][67] = 0.181; 

	matrix[167][166] = 0.038;
	matrix[167][168] = 0.069;
	matrix[167][58] = 0.053;

	matrix[168][164] = 0.040;
	matrix[168][169] = 0.206;
	matrix[168][202] = 0.080;

	matrix[169][163] = 0.083;
	matrix[169][170] = 0.054;

	matrix[170][162] = 0.081;


	matrix[171][88] = 0.160;
	matrix[171][124] = 0.273;


	matrix[172][161] = 0.058;


	matrix[173][136] = 0.037;
	matrix[173][149] = 0.067;


	matrix[174][145] = 0.038;
	matrix[174][173] = 0.067;


	matrix[175][152] = 0.020;
	matrix[175][146] = 0.040;
	matrix[175][150] = 0.035;

	matrix[176][29] = 0.042;
	matrix[176][31] = 0.093;
	matrix[176][177] = 0.076;

	matrix[177][176] = 0.076;
	matrix[177][33] = 0.088;
	matrix[177][36] = 0.043;

	matrix[178][1] = 0.031;
	matrix[178][6] = 0.127;

	matrix[179][1] = 0.014;
	matrix[179][8] = 0.130;
	matrix[179][9] = 0.257;

	matrix[180][181] = 0.011;
	matrix[180][84] = 0.388;
	matrix[180][85] = 0.402;

	matrix[181][182] = 0.079;
	matrix[181][2] = 0.019;

	matrix[182][3] = 0.014;
	matrix[182][4] = 0.103;

	matrix[183][5] = 0.064;
	matrix[183][4] = 0.015;

	matrix[184][87] = 0.109;

	matrix[185][70] = 0.061;
	matrix[185][186] = 0.061; //dagdag ni Keren

	matrix[186][7] = 0.311;

	matrix[187][186] = 0.008;
	matrix[187][185] = 0.195;

	matrix[188][189] = 0.192;
	matrix[188][190] = 0.116;

	matrix[189][187] = 0.109;

	matrix[190][25] = 0.146;

	matrix[191][189] = 0.260;
	matrix[191][184] = 0.362;

	matrix[192][193] = 0.042;
	matrix[192][67] = 0.275;
	matrix[192][201] = 0.299;

	matrix[193][192] = 0.042;
	matrix[193][195] = 0.083;

	matrix[194][192] = 0.062;
	matrix[194][193] = 0.051;

	matrix[195][51] = 0.066;

	matrix[196][65] = 0.399;

	matrix[197][198] = 0.083;
	matrix[197][199] = 0.083;

	matrix[198][60] = 0.253;

	matrix[199][59] = 0.326;

	matrix[200][26] = 0.231;

	matrix[201][34] = 0.084;

	matrix[202][58] = 0.082;
	matrix[202][168] = 0.080;

	//Count the number of adjacencies:
	var adjacencyCount = 0;
	for(var i = 0; i < matrix.length; i++)
		for(var j = 0; j < matrix[i].length; j++)
		{
			if(matrix[i][j] != 0 && matrix[i][j] != Number.POSITIVE_INFINITY)
			{
				adjacencyCount++;
			}
		}

	console.log("Speed matrix adj count: " + adjacencyCount);
}


//Function: Return the day of the week in string form given the day number as parameter.
function getDayOfWeek(dayNumber)
{
	switch(dayNumber)
	{
		case 0: return "Sunday"; break;
		case 1: return "Monday"; break;
		case 2: return "Tuesday"; break;
		case 3: return "Wednesday"; break;
		case 4: return "Thursday"; break;
		case 5: return "Friday"; break;
		case 6: return "Saturday"; break;
		default: return null; break;
	}
}

//Function: Is the day weekday or weekend?
function getDayType(day)
{
	switch(day)
	{
		//Weekdays
		case 1: //Monday
		case 2: //Tuesday
		case 3: //Wednesday
		case 4: //Thursday
		case 5: return "Weekday"; break; //Friday

		//Weekends
		case 6: //Saturday
		case 0: return "Weekend"; break; //Sunday

		//Otherwise
		default: return null; break; //Invalid date
	}
}

//Function: Check if a certain parameter is in the array
function isInArray(array, value)
{
	var found = false;

	for(var i = 0; i < array.length; i++)
	{
		if(value === array[i])
		{
			found = true;
			break;
		}
	}

	return found;
}

//Function: Convert military time to time appended with AM/PM (no spaces).
function militaryToStandardNoSpaces(militaryTime)
{
	var splitMilitaryTime = militaryTime.split(":");
	var stringMilitaryHH = splitMilitaryTime[0];
	var stringMilitaryMM = splitMilitaryTime[1];
	var retString = "";

	switch(stringMilitaryHH)
	{
		case "00": {
			retString = "12:" + stringMilitaryMM + "AM";
			break;
		}

		case "01": {
			retString = "01:" + stringMilitaryMM + "AM";
			break;
		}

		case "02": {
			retString = "02:" + stringMilitaryMM + "AM";
			break;
		}

		case "03": {
			retString = "03:" + stringMilitaryMM + "AM";
			break;
		}

		case "04": {
			retString = "04:" + stringMilitaryMM + "AM";
			break;
		}

		case "05": {
			retString = "05:" + stringMilitaryMM + "AM";
			break;
		}

		case "06": {
			retString = "06:" + stringMilitaryMM + "AM";
			break;
		}

		case "07": {
			retString = "07:" + stringMilitaryMM + "AM";
			break;
		}

		case "08": {
			retString = "08:" + stringMilitaryMM + "AM";
			break;
		}

		case "09": {
			retString = "09:" + stringMilitaryMM + "AM";
			break;
		}

		case "10": {
			retString = "10:" + stringMilitaryMM + "AM";
			break;
		}

		case "11": {
			retString = "11:" + stringMilitaryMM + "AM";
			break;
		}

		case "12": {
			retString = "12:" + stringMilitaryMM + "PM";
			break;
		}

		case "13": {
			retString = "01:" + stringMilitaryMM + "PM";
			break;
		}

		case "14": {
			retString = "02:" + stringMilitaryMM + "PM";
			break;
		}

		case "15": {
			retString = "03:" + stringMilitaryMM + "PM";
			break;
		}

		case "16": {
			retString = "04:" + stringMilitaryMM + "PM";
			break;
		}

		case "17": {
			retString = "05:" + stringMilitaryMM + "PM";
			break;
		}

		case "18": {
			retString = "06:" + stringMilitaryMM + "PM";
			break;
		}

		case "19": {
			retString = "07:" + stringMilitaryMM + "PM";
			break;
		}

		case "20": {
			retString = "08:" + stringMilitaryMM + "PM";
			break;
		}

		case "21": {
			retString = "09:" + stringMilitaryMM + "PM";
			break;
		}

		case "22": {
			retString = "10:" + stringMilitaryMM + "PM";
			break;
		}

		case "23": {
			retString = "11:" + stringMilitaryMM + "PM";
			break;
		}
	}

	return retString;
}