///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              timeline.js
//
// Author:           Erin Hamilton
//
// Description:     (Succint description of this file here)
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * Creates the x-axis for each chart view which also acts as the timeline
 *
 * @param: data is the years global array
 */
 function createTimeline(index, data){
 
	var margin = {top: 40, right: 40, bottom: 40, left:40},
		height = 100,
		width = 900;
	
	var x = d3.time.scale()
		.domain([new Date(data[0]), d3.time.year.offset(new Date(data[data.length - 1]), 1)])
		.rangeRound([0, width - margin.left - margin.right]);
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('top')
		.ticks(d3.time.years, 1)
		.tickFormat(d3.time.format('%y'))
		.tickSize(5)
		.tickPadding(8);
		
	var timeline = d3.select('#timeline').append('svg')
		.attr('class', 'chart')
		.attr('width', width)
		.attr('height', height)
		.append('g')
		.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');

	timeline.selectAll('.chart')
		.data(data);

	timeline.append('g')
		.attr('class', 'x axis')
		.attr('transform', 'translate(0, ' + (height - margin.top - margin.bottom) + ')')
		.call(xAxis);
		
	timeline.selectAll('g.major.tick')
		.each(function(d){ //invoke the function for each axis container element
			d3.select(this) //select the current axis container element;
			.on("mouseover", function(){ //click listener
				d3.select(this)
				.attr("fill", "#FFFF00");
			})
			.on("mouseout", function(){ //click listener
				d3.select(this)
					.attr("fill", "black");
			})
			.on("click", function(){ //click listener
				year = d.getFullYear();
				sequence(year, index)
			});
		});
		
 }
 
 function sequence(year, data){
	d3.selectAll(".states") //select every province
			.style("fill", function(d) { //color enumeration units
				return colorMap(data, d.properties.ST, year); //->
			});
 }
 
 