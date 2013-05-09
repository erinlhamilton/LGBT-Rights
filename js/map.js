///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              map.js
//
// Author:           (your name and email address)
//
// Description:     (Succint description of this file here)
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * setMap creates the map svg used to show changing laws by state over time
 * @param: usa is the usa.json object containing state geometry
 * @param: Index is the Index.json object containing index keys
 */
function setMap(usa, Index){

	var width = 500;
	var height = 300;
	
	var map = d3.select("#map-container").append("svg")
		.attr("width",width)
		.attr("height",height);
		
	var projection = d3.geo.albersUsa()
		.scale(500)
		.translate([width / 2, height / 2]);

	var path = d3.geo.path()
		.projection(projection);
	
		map.selectAll(".states")
			.data(topojson.feature(usa, usa.objects.USA).features)
			.enter().append("path")
			.attr("class", "states")
			.attr("id", function(d) { 
				return d.properties.ST })
			.attr("d", path)
			.style("fill", function(d) { 
				return colorMap(Index, d.properties.ST) });// color the states
}

/**
 * Accepts the Index.json and the current state selected from usa.json to add fill color
 * to the state based on the global variable indexTable located in main.js.
 * The .style function that calls this iterates over every state in usa.json.
 * @param: Index is the Index.json object containing index keys
 * @param: st are each state from the usa.json object
 * @return: returns the fill color for the given st
 */
function colorMap(Index, st){
	var index = Index[indexSelected];//currently selected index(global variable)
	return indexTable[index[1975][st]];
}

