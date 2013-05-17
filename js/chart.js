///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              chart.js
//
// Author:           (your name and email address)
//
// Description:     (Succint description of this file here)
//                   
// Credits:         Code adapted from Bunkat's basic grid code:
//					http://bl.ocks.org/bunkat/2605010
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * This function creates a bar chart, based on the matrix grid
 *
 * @param Index.json is passed to this function, only to be passed
 * to the chartData to be used for data creation
 */
 function createChart(Index){
	 var index =Index;
		var width = 950,
		height = 275;		
	var calData = chartData(Index);//call data
	
    var grid = d3.select("#chart").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "chart");

    var row = grid.selectAll(".row")
                  .data(calData)
                .enter().append("svg:g")
                  .attr("class", "row");

	//notice how this code uses d.blah for the positioning and sizing. This is all created in the object below
    var col = row.selectAll(".cell")
                 .data(function (d) { return d; })
                .enter().append("svg:rect")
                 .attr("class", "cell")
                 .attr("x", function(d) { return d.x; })
                 .attr("y", function(d) { return d.y; })
                 .attr("width", function(d) { return d.width; })
                 .attr("height", function(d) { return d.height; })
                 .on('mouseover', function(d) {
                    d3.select(this)
                         .style('stroke', '#979697')
						.style('stroke-width', '4px')
						.moveToFront();
					hoverOnChart(d);
						
                 })
                 .on('mouseout', function(d) {
                    d3.select(this)
						.style('stroke', '#fff')
						.style('stroke-width', '1px');
					hoverOutChart(d);
                 })
                 .on("mousemove", moveLabel)
				 .on("click", function(d){
					console.log(d);
				 })
				 .transition()
                 .style("fill", function(d) {
                    return d.color; 
                 })
                 .style("stroke", '#fff');

}

/**
 * This function creates an array of array of objects. The first layer of arrays are years,
 * the second array are of states that have passed a law from the previous year
 *
 * @param Index.json passed is used to create array
 */
 function chartData(Index){
 
	var square = true;// true/false on whether to create square or not
    var gridWidth = 850;//used for calculating the cell widths
	var gridHeight = 850;//used for calculating the cell heights
	var index = Index[indexSelected];//currently selected marriage
	var data = new Array();
	var lawCode;//the current year law code
	var preYear;//previous year code
	var color;
	// the below variables are used for sizing and positioning of cells
	var gridItemWidth = gridWidth / 49.8;
    var gridItemHeight = gridItemWidth ;
    var startY = gridItemWidth / 2 + 225;
    var startX = gridItemHeight / 2;
    var stepY = gridItemWidth;
    var stepX = gridItemHeight;
    var xpos = startX+24;
    var ypos = startY ;
	
    for (var i = 0; i < years.length; i++)
    {
        data.push(new Array());//create an array for every year
        for (var j = 0; j < state.length; j++)
        {
			//little if statement is used for the previous year code
			if ( i == 0) {
				var t = i;
			}else{
				var t = i-1;
			}
			preYear = index[years[t]][state[j]];
			lawCode = index[years[i]][state[j]];
            if (lawCode !== preYear){// if previous year lawcode is not equal to current year law code, add to array of objects
				color = colorChart(Index, state[j], years[i]);
				data[i].push({ 
									time: years[i], 
									state: state[j],
									value: lawCode,
									color: color,
									width: gridItemWidth,
									height: gridItemHeight,
									x: xpos, //position x of cell
									y: ypos //position y of cell
								});
				ypos -= stepY; //If the If statement is true, move the position of the y location one step
			}
		}
		ypos = startY + gridItemHeight +4*2 ;//reset the Y position back to beginning
		xpos += stepX ;//add one step the X position to move the square
	}
	return data;
}

 /**
 * Creates an infolabel on mouseover.
 *
 * @param: handle is the currently selected cell
 */
function hoverOnChart(handle){
	var map = d3.select("#" + handle.state)
		.style('stroke', '#979697')
		.style('stroke-width', '4px')
		.moveToFront();

	var lawDescrip = lawCodeLabel(handle.value);

	var labelText = "<h1><i>" + handle.state + "</i></h1><br><b>" + handle.time + "</b><br><h2>" + indexSelected + ":<br>" + lawDescrip + "</h2>";
	var infolabel = d3.select("#container")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html(labelText); //add text
}

 /**
 * Destroys infolabel on mouseout
 */
function hoverOutChart(handle){
	var map = d3.select("#" + handle.state)
		.style('stroke', '#D4D4D4')
		.style('stroke-width', '1px');
	d3.select(".infolabel").remove(); //remove info label
}
/**
 * Returns hex colors for a given state and year based on the Index.json. Used to provide fill color for
 * an element
 *
 * @param Index.json is the global object
 * @param st is the current state selected
 * @param year is the current year selected
 * @return returns the hex code for a given lawcode based on indexTable
 */
function colorChart(Index, st, year){
	var index = Index[indexSelected];//currently selected index(global variable)
	return indexTable[index[year][st]];
 }
