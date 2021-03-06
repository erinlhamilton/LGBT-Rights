///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, topojson.js
// File:              map.js
//
// Author:          Vanessa Knoppke-Wetzel
// Author:          Erin Hamilton
//
// Description:     Creates the map displayed at the top of the page. As well as
//                  Interaction and coloring that goes along with the map.
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * setMap creates the map svg used to show changing laws by state over time
 * @usa:  the usa.json object containing state geometry
 *
 */
function setMap(usa){
	var width = 600;
	var height = 300;
	
	var map = d3.select("#map-container").append("svg")
		.attr("width",width)
		.attr("height",height)
		.attr("class", "map");
		
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
			.on(onHover, function(d) {
				d3.select(this)
					.style('stroke', '#979697')
					.style('stroke-width', '4px');
				if(!isIE){//if not IE, move hovered element to front.
					moveToFront.call(this.parentNode);
					moveToFront.call(this);
				}
				hoverOnState(d.properties);
			 })
			.on(outHover, function(d) {
				d3.select(this)
					.style('stroke', '#D4D4D4')
					.style('stroke-width', '1px');
				hoverOutState(d.properties);
			 })
			 .on("mousemove", moveMapLabel)
			.style("fill", function(d) { 
				return colorMap(Index, d.properties.ST, year) });// color the states
}

/**
 * Accepts the Index.json and the current state selected from usa.json to add fill color
 * to the state based on the global variable indexTable located in main.js.
 * The .style function that calls this iterates over every state in usa.json.
 *
 * @Index: the Index.json object containing index keys
 * @st: each state from the usa.json object
 * @return: the fill color for the given st
 */
function colorMap(Index, st, year){
	var index = Index[indexSelected];//currently selected index(global variable)
	var colorVal = indexTable[index[year][st]];
	return colorVal;
}

 /**
 * Checks for currently selected index and creates a label for a infolabel on hover.
 *
 * @handle: the currently selected cell
 */
function hoverOnState(handle){
	var index = Index[indexSelected];
	var code = index[year][handle.ST]
	var lawDescrip = lawCodeLabel(code);

	var labelText = "<h1><i>" + handle.State + "</i></h1><b><span style=float:right>" + year + "</span></b><p>" + lawDescrip + "</p>";




	var infolabel = d3.select("#map-container")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html(labelText);
			//.moveToFront(); //add text
}

 /**
 * Destroys infolabel on mouseout
 */
function hoverOutState(){
	d3.select(".infolabel").remove(); //remove info label
}

/**
 * This makes the infolabel move along with the mouse.
 */
function moveMapLabel() {

	var x = d3.event.clientX; 
	var y = d3.event.clientY - 10; 

	//at center coordinates of div, switch side of mouse on which infolabel appears
	var switchIt = 0;
	if (x < 930){
		switchIt = 40;
	}else{
		switchIt = -250;
	}
	
	var mug = d3.select(".infolabel") 
		.style("left", (x+switchIt) +"px")
		.style("top", y + "px");
}
