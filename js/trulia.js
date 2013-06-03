///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              trulia.js
//
// Author:           Erin Hamilton
//
// Description:     Creates a calendar view matrix, with the 50 US States
//                  on the y-axis and years 1963 through 2013 on the
//                  x-axis, showing the positive and negative change
//                  in LGBT rights legislation over those 50 years.
//                   
// Credits:         Inspired by the Trulia Trends d3 example:
//                  http://trends.truliablog.com/vis/tru247/
//                  Code adapted from Bunkat's basic grid code (thank you!):
//					http://bl.ocks.org/bunkat/2605010
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * Draws the svg for the grid of lgbt rights legislation over time by state.
 *
 * @Index: LGBT rights index.json
 */
 function createGrid(Index){

	var margin = {top: 40, right: 40, bottom: 0, left:40};
 
	var width = 950,
		height = 950,
		gridWidth = 850,
		gridHeight = 850; //whether cell is square or not
		
	var calData = gridData(gridWidth, gridHeight, Index);//call data
	var div = "#matrix";
	
    var grid = d3.select("#matrix").append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .attr("class", "matrix");

    var row = grid.selectAll(".row")
                  .data(calData)
                .enter().append("svg:g")
                  .attr("class", "row");
		
		 

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
						.style('stroke-width', '2.5px')
					if(!isIE){//if not IE, move hovered element to front.
						moveToFront.call(this.parentNode);
						moveToFront.call(this);
					}
					hoverOnCell(d);
                 })
                 .on('mouseout', function(d) {
						d3.select(this)
							.style('stroke', '#fff')
							.style('stroke-width', '1px');
						hoverOutCell(d);
                 })
                 .on("mousemove", moveTruliaLabel)
                 .style("fill", function(d) {
                    return d.color; 
                 })
                 .style("stroke", '#fff');
				 
				 
		row.append("text")
		  .attr("x", 910)
		  .attr("y", function(d, i) { return (i * 17) + 30; })
		  .attr("dy", ".10em")
		  .attr("text-anchor", "start")
		  .attr("cursor", "default")
		  .style("font-size", "7pt")
		  .text(function(d, i) { return state[i]; });
				 
	var x = d3.time.scale()
		.domain([new Date(years[0]), d3.time.year.offset(new Date(years[years.length - 1]), 1)])
		.rangeRound([0, width - margin.left - margin.right]);
		
	
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('top')
		.ticks(d3.time.years, 1)
		.tickFormat(d3.time.format('%y'))
		.tickSize(0);
	
		
	  // Add the x-axis.
	grid.append("grid:g")
      .attr("class", "xMatrix")
      .attr("transform", "translate(45," + 17 + ")")
      .call(xAxis);
}

/**
 * Populate the matrix with LGBT index data. Besides the var mentioned
 * below, also uses global arrays state and year.
 *
 * @gridWidth: width of svg to use as calculation for size of cell
 * @gridHeight: height of svg to use as calculation for size of cell
 * @Index: LGBT rights index.json
 * @return: returns an array of LGBT data to populate matrix
 */
 function gridData(gridWidth, gridHeight, Index){
	var index = Index[indexSelected];
    var data = new Array();
    var gridItemWidth = gridWidth / 50;
    var gridItemHeight = gridItemWidth;
    var startX = (gridItemWidth / 2)+30;
    var startY = (gridItemHeight / 2)+10;
    var stepX = gridItemWidth;
    var stepY = gridItemHeight;
    var xpos = startX;
    var ypos = startY;
    var newValue = 0;
    var count = 0;
	var color;
	
    for (var j = 0; j < state.length; j++)
    {
        data.push(new Array());
        for (var i = 0; i < years.length; i++)
        {
            newValue = index[years[i]][state[j]];
			color = colorTrulia(Index, state[j], years[i]);
            data[j].push({ 
                                time: years[i], 
								state: state[j],
                                value: newValue,
                                width: gridItemWidth,
                                height: gridItemHeight,
								color: color,
                                x: xpos,
                                y: ypos,
                                count: count
                            });
            xpos += stepX;
            count += 1;
        }
        xpos = startX;
        ypos += stepY;
    }
    return data;
}

 /**
 * Creates an infolabel on mouseover.
 *
 * @handle: the currently selected cell
 */
function hoverOnCell(handle){

	var lawDescrip = lawCodeLabel(handle.value);


	var labelText = "<h1><i>" + states[handle.state].name + "</i></h1><b><span style=float:right>" + handle.time + "</span></b><h3></h3><p>" + lawDescrip + "</p>";
	
	var infolabel = d3.select("#matrix")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html(labelText); //add text
}

 /**
 * Destroys infolabel on mouseout
 */
function hoverOutCell(){
	d3.select(".infolabel").remove(); //remove info label
}
 
 /**
 * Returns hex value to color matrix cell based on the index law value
 * which iterates over every value in the Index.json
 *
 * @Index:Index.json object of LGBT right legislation
 * @st: the currently selected state
 * @year: the currently selected year
 * @return: returns a hex value of color based on indexTable global var
 */
 function colorTrulia(Index, st, year){
	var index = Index[indexSelected];//currently selected index(global variable)
	return indexTable[index[year][st]];
 }
 
 /**
 * This makes the infolabel move along with the mouse.
 */
 function moveTruliaLabel() {
 
	var x = d3.event.clientX; 
	var y = d3.event.clientY - 10; 

	//at center coordinates of div, switch side of mouse on which infolabel appears
	var switchIt = 0;
	if (x < 770){
		switchIt = 40;
	}else{
		switchIt = -245;
	}
	
	var mug = d3.select(".infolabel") 
		.style("left", (x+switchIt) +"px")
		.style("top", y + "px");
}
 
 
