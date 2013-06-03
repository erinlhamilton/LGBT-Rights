///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js, accordian.js
// File:              hex.js
//
// Author:           Vanessa Knoppke-Wetzel
//
// Description:      The color legend cells that display in the accordian menu
//                   
//////////////////////////// 80 columns wide //////////////////////////////////

var colorScale;

/**
 * 
 *
 * @hex: 
 * @lum: 
 */
function hexCreation(hex, hexTwo, number){
	var colors=[];
	var compPercent = .6/number; //,1
	var percent = compPercent;
	var lum = percent;

	
	
	
	//attempt at creating a new hex scale//
	if(number >3){
		// for(var z = 0; z< number; z++){
			// colorLuminance(hex,lum);
			// colors.push(colorLuminance(hex,lum));
			// lum = lum-compPercent;
		// }
		// colors.reverse();
		// DONT DELETE, LIGHT TO DARK! i want to go from dark::
		for(var z = 0; z< number; z++){
			//compPercent = .1/number;
			colorLuminance(hex,lum);
			colors.push(colorLuminance(hex,lum));
			lum = lum*2;
		}	
	}

	var compPercent = .8/number;
	var perc = compPercent;
	for(var w = 0; w< number; w++){
		var lim = perc;
		colorLuminance(hexTwo,lim);
		colors.push(colorLuminance(hexTwo,lim));
		perc = perc-compPercent;
	}

	if(number == 7){
		var width=215;
		var height=30;
		var hexColor = d3.select("#hex").append("svg")
			.attr("width",width)
			.attr("height",height)
			//.attr("left", "40px");
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData1").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
	}
	
	//what is this?? what has "6"????
	if(number ==6){
		var width=300;
		var height=30;
		colors.splice(0,5);
		var hexColor = d3.select("#hex6").append("svg")
			.attr("width",width)
			.attr("height",height);	
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData5").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
			
	}	
	//hatecrime hex
	if(number ==4 && indexSelected == indexArray[2]){
		var width=65;
		var height=30;
		colors.splice(0,4);
		var hexColor = d3.select("#hex5").append("svg")
			.attr("width",width)
			.attr("height",height);	
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData4").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
			
	}	
	
	// adoption hex
	if(number == 4 && indexSelected == indexArray[0]){
		var width=126;
		var height=30;
		var hexColor = d3.select("#hex2").append("svg")
			.attr("width",width)
			.attr("height",height);
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData2").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
			
	}
	
	
	if(number == 3){
		var width=51;
		var height=30;

		var hexColor = d3.select("#hex6").append("svg")
			.attr("width",width)
			.attr("height",height);	
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData5").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
			
	
	}
	
	
	// housing hex
	if(number == 2 && indexSelected == indexArray[4]){

		var width=37;
		var height=30;

		var hexColor = d3.select("#hex3").append("svg")
			.attr("width",width)
			.attr("height",height);
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData3").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
				
	}
	
	
	//employment hex
	if(number == 2 && indexSelected == indexArray[1]){
		var width=37;
		var height=30;
		var hexColor = d3.select("#hex4").append("svg")
			.attr("width",width)
			.attr("height",height);	
		var hexColorL = d3.select("#hexL").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
		var noDataL = d3.select("#noDataL").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		var noData = d3.select("#noData6").append("svg")
			.attr("width",30)
			.attr("height",30)
			.attr("left", "40px");
		
			
	}

	//colors.push('#F1F1F1');// adds the no data cell
	var leg = d3.range(colors.length);

	var rects = hexColor.selectAll("rect")
		.data(leg);
	var rectsL = hexColorL.selectAll("rect")
	.data(leg);
	var rectsNoData = noData.selectAll("rect")
	.data(leg);
	var rectsNoDataL = noDataL.selectAll("rect")
	.data(leg);
	colorScale = d3.scale.ordinal()
		.range(colors);

	rects.enter()
	  .append("rect")
	  .attr({
		width: 15,
		height: 15,
		y: 15,
		x: function(d,i) {
		  return i * 15;
		},
		fill: function(d,i) {
		  return colorScale(d);
		},
		'stroke': '#D4D4D4',
		'stroke-width': '1px'
	 }).on('mouseover', function(d) {
            getKey(colorScale(d))
        })
	.on('mouseout', function(d) {
           d3.select(".infolabel").remove(); //remove info label
        })
	.on("mousemove", moveLabel);
	
	rectsL.enter()
	  .append("rect")
	  .attr({
		width: 15,
		height: 15,
		y: 15,
		x: function(d,i) {
		  return i * 15;
		},
		fill: function(d,i) {
		  return colorScale(d);
		},
		'stroke': '#D4D4D4',
		'stroke-width': '1px'
	 }).on('mouseover', function(d) {
            getKey(colorScale(d))
        })
	.on('mouseout', function(d) {
           d3.select(".infolabel").remove(); //remove info label
        })
	.on("mousemove", moveLabel);
	
	var fillX = '#F1F1F1';
	
	rectsNoDataL.enter()
	  .append('rect')
	  .attr({
		width: 15,
		height: 15,
		y: 15,
		x: 15,
		fill: '#F1F1F1',
		'stroke': '#D4D4D4',
		'stroke-width': '1px'
	 }).on('mouseover', function(d) {
            getKey(fillX)
        })
	.on('mouseout', function(d) {
           d3.select(".infolabel").remove(); //remove info label
        })
	.on("mousemove", moveLabel);
	
	rectsNoData.enter()
	  .append('rect')
	  .attr({
		width: 15,
		height: 15,
		y: 15,
		x: 15,
		fill: '#F1F1F1',
		'stroke': '#D4D4D4',
		'stroke-width': '1px'
	 }).on('mouseover', function(d) {
            getKey(fillX)
        })
	.on('mouseout', function(d) {
           d3.select(".infolabel").remove(); //remove info label
        })
	.on("mousemove", moveLabel);
			
	
	
} 

/**
 * 
 *
 * @hex: 
 * @lum: 
 */
function colorLuminance(hex, lum){
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
	}
	return rgb;
}

/**
 * Gets a handle on the legend color and returns a description of the law.
 *
 * @handle: the currently selected hex color in the legend
 */ 
//the no data cell
function getKey(handle){
	console.log(handle);
	if(handle === '#F1F1F1'){
		var infolabel = d3.select("#accordion")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html("<p>There are currently no court ruling in regards to LGBT rights, or the laws are ambiguous.</p>"); //add text
		return
	};
	var ind = Index[indexSelected];
	for (var i = 2000; i < 2014; i++){
		for (var j = 0; j < state.length; j++){
			var code = ind[i][state[j]];
			var current = indexTable[code];
			if(current === handle){
				var infolabel = d3.select("#accordion")
					.append("div")
					.attr("class", "infolabel") //for styling label
					.html("<p>" + lawCodeLabel(code) + "</p>");
			return
			}
		}
	}
}
	
