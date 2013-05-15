///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              map.js
//
// Author:          Vanessa Knoppke-Wetzel
// Author:          Erin Hamilton
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
function setMap(usa){
	var width = 600;
	var height = 500;
	
	var map = d3.select("#map-container").append("svg")
		.attr("width",width)
		.attr("height",height);
		
	var projection = d3.geo.albersUsa()
		.scale(600)
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
			.on('mouseover', function(d) {
                    d3.select(this)
                        .style('fill', '#FFFF00');
					hoverOnState(Index, d.properties);
                 })
			 .on('mouseout', function(d) {
				d3.select(this)
					.style('fill', function(d) {
						return colorMap(Index, d.properties.ST, year)
						});
				hoverOutState(d.properties);
			 })
			 .on("mousemove", moveLabel)
			 .on('click', function(d) {
			 })
			.style("fill", function(d) { 
				return colorMap(Index, d.properties.ST, year) });// color the states
}

/**
 * Accepts the Index.json and the current state selected from usa.json to add fill color
 * to the state based on the global variable indexTable located in main.js.
 * The .style function that calls this iterates over every state in usa.json.
 * @param: Index is the Index.json object containing index keys
 * @param: st are each state from the usa.json object
 * @return: returns the fill color for the given st
 */
function colorMap(Index, st, year){
	var index = Index[indexSelected];//currently selected index(global variable)
	return indexTable[index[year][st]];
}

 /**
 * Creates an infolabel on mouseover.
 *
 * @param: handle is the currently selected cell
 */
function hoverOnState(Index, handle){
	var index = Index[indexSelected];
	var code = index[year][handle.ST]
	var lawDescrip = lawCodeLabel(code);

	var labelText = "<h1><i>" + handle.State + "</i></h1><br><b>" + year + "</b><br><h2>" + indexSelected + ":<br>" + lawDescrip + "</h2>";
	var infolabel = d3.select("#map-container")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html(labelText); //add text
}

 /**
 * Destroys infolabel on mouseout
 */
function hoverOutState(){
	d3.select(".infolabel").remove(); //remove info label
}

