///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, jquery-timer.js
// File:              timeline.js
//
// Author:           Erin Hamilton
//
// Description:     (Succint description of this file here)
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

var timeInterval = 1000; //intial animation speed in miliseconds
/**
 * Creates the x-axis for each chart view which also acts as the timeline
 *
 * @param: data is the years global array
 */
 function createTimeline(index, data){
 
	var margin = {top: 0, right: 40, bottom: 40, left:40},
		height = 35,
		width = 950;
	
	var x = d3.time.scale()
		.domain([new Date(data[0]), d3.time.year.offset(new Date(data[data.length - 1]), 1)])
		.rangeRound([0, width - margin.left - margin.right]);
	
	var xAxis = d3.svg.axis()
		.scale(x)
		.orient('bottom')
		.ticks(d3.time.years, 1)
		.tickFormat(d3.time.format('%y'))
		.tickSize(0)
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

 function sequence(yr){
	d3.selectAll(".states") //select every province
			.style("fill", function(d) { //color enumeration units
				return colorMap(Index, d.properties.ST, yr); //->
			});
	var yearTitle = d3.select("#time") 
		.select("h1")
		.html(yr);
		
	year = yr;
 }
 
 /*The section is creating the jquery timer and animating the map.*/
	//function used to animate the proportional symbols
function animateMap(Index){
	if (timestamp < years.length-1) {
		timestamp++;
	}
	else{
		timestamp = 0;
	}
	sequence(years[timestamp], Index);
	// setSymbol();
	// $( "#slider" ).slider( "value", timestamp);//update what value the slider is on
	// tooltip.text(timestamp);//update the tooltip date
	// $("#retrieveYear").val(timestamp);
	// updateText();
}
 
$( "#back" ).click(function(Index){
		timer.stop();
		if(timestamp == 0){
			timestamp = 50;
		}else{
			timestamp --;
		}
		sequence(years[timestamp]);
		$("#stop").hide();
		$("#play").show();	
});

$("#play").click(function(){
	timer.play();
	//sequence(Index);
	$("#play").hide();
	$("#stop").show();
});
	
 // //stop button resets the timestamp and the markers
$( "#stop" ).click(function(){
	timer.stop();
	$("#stop").hide();
	$("#play").show();
});

$( "#forward" ).click(function(){
	timer.stop();
	if(timestamp == 50){
		timestamp = 0;
	}else{
		timestamp ++;
	}
	sequence(years[timestamp]);
	$("#stop").hide();
	$("#play").show();
});

	// //create a jquery timer using a jquery timer plugin. 
timer = $.timer(function(Index) {
	//call animate map function
		animateMap(Index)
	});

timer.set({ time : 1000, autostart : false });//initiate the timer
 
 