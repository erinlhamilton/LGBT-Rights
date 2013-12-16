///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, jquery-timer.js
// File:              timeline.js
//
// Author:           Erin Hamilton
//
// Description:     Creates the x-axis for histogram bar chart also used to
//                  control the date displayed on the page and change the year
//                  shown on the map. Also creates the jquery timer object
//                  as well as the controls for the timer to update the currently
//                  displayed year.
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

var timeInterval = 1000; //intial animation speed in miliseconds
/**
 * Creates the x-axis for each chart view which also acts as the timeline
 *
 * @data: the years global array
 * @index: index.json main object
 */
 function createTimeline(index, data){
 
	var margin = {top: 10, right: 40, bottom: 30, left:40},
		height = 30,
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
				.attr("font-weight", "bold")
				.attr("font-size", "12pt")
				.attr("cursor", "hand")
				.attr("cursor", "pointer");
			})
			.on("mouseout", function(){ //click listener
				var selYr = d.getFullYear();
				if (selYr != year){
					d3.select(this)
						.attr("font-weight", "normal")
						.attr("font-size", "7.5pt")
						.attr("cursor", "hand")
						.attr("cursor", "pointer");
				}
			})
			.on("click", function(){ //click listener
				console.log(this);
				year = d.getFullYear();
				sequence(year)	
			});
		});	
 }

 /**
 * 	updates the year displayed on the map based on currently selected year.
 *  Also updates the year displayed above the map and changes the year
 * global variable to currently selected year.
 *
 * @yr: Currently selected year
 */
 function sequence(yr){
 
	d3.selectAll(".states") //select every province
			.style("fill", function(d) { //color enumeration units
				return colorMap(Index, d.properties.ST, yr); //->
			});
			
	var timelineText = d3.select("#timeline")
		.selectAll(".tick.major")
		.attr("font-weight", function(d) {
			if( yr == d.getFullYear()){
				return "bold";
			} else{
				return "normal";
			}
		})
		.attr("font-size", 	function(d) {
			if( yr == d.getFullYear()){
				return "12pt";
			} else{
				return "7.5pt";
			}
		});
			
	var yearTitle = d3.select("#timerControls") 
		.select("h1")
		.html(yr);
		
	year = yr;
 }
 
 /**
 * 	Called by the jquery timer. Gets ahold of the currently selected year
 *  and determines if it is less than 2014 or greater than 1964 and updates
 *  the timestamp accordingly. Then calls sequence to update the map.
 * 
 */
function animateMap(){
	if (timestamp < years.length-1) {
		timestamp++;
	}
	else{
		timestamp = 0;
	}
	sequence(years[timestamp], Index);
}
 
 /**
 * 	Below are the time control for the years and timer, located directly
 *  above the map. They update the timestamp which controls the currently
 *  selected year and call sequence to update the map.
 * 
 */
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
	$("#play").hide();
	$("#stop").show();
});

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

 /**
 * 	Create a timer object and set the function to be called on play to 
 *  animateMap. 
 * 
 */

timer = $.timer(function(Index) {
		animateMap()
	});

timer.set({ time : timeInterval, autostart : false });
 
 
