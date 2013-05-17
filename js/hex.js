
var colorScale;
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
		var width=300;
		var height=30;
		var hexColor = d3.select("#hex").append("svg")
			.attr("width",width)
			.attr("height",height)
			.attr("left", "40px");
	}
	if(number ==5){
		var width=300;
		var height=30;
		console.log(colors);
		colors.splice(0,5);
		console.log(colors);
		var hexColor = d3.select("#hex5").append("svg")
			.attr("width",width)
			.attr("height",height);	
	}	
	
	
	if(number == 4){
		var width=300;
		var height=30;
		var hexColor = d3.select("#hex2").append("svg")
			.attr("width",width)
			.attr("height",height);
	}
	
	if(number == 3 && indexSelected == indexArray[4]){
		var width=255;
		var height=30;

		var hexColor = d3.select("#hex3").append("svg")
			.attr("width",width)
			.attr("height",height);	
	}
	
	if(number == 3 && indexSelected == indexArray[3]){
		var width=255;
		var height=30;

		var hexColor = d3.select("#hex6").append("svg")
			.attr("width",width)
			.attr("height",height);	
	
	}
	
	if(number ==2){
		var width=245;
		var height=30;
		var hexColor = d3.select("#hex4").append("svg")
			.attr("width",width)
			.attr("height",height);	
	}

	colors.push('#F1F1F1');
	var leg = d3.range(colors.length);

	var rects = hexColor.selectAll("rect")
		.data(leg);

	colorScale = d3.scale.ordinal()
		.range(colors);

	rects.enter()
	  .append("rect")
	  .attr({
		width: 12,
		height: 12,
		y: 5,
		x: function(d,i) {
		  return i * 13+10;
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
} 


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

function getKey(handle){
	if(handle === '#F1F1F1' ){
		var infolabel = d3.select("#container")
			.append("div")
			.attr("class", "infolabel") //for styling label
			.html("There are currently no court ruling in regards to LGBT rights, so the laws are ambiguous."); //add text
		return
	};
	var ind = Index[indexSelected];
	for (var i = 2000; i < 2014; i++){
		for (var j = 0; j < state.length; j++){
			var code = ind[i][state[j]];
			var current = indexTable[code];
			if(current === handle){
				var infolabel = d3.select("#container")
					.append("div")
					.attr("class", "infolabel") //for styling label
					.html(lawCodeLabel(code))
					.moveToFront(); //add text
			return
			}
		}
	}
}
	