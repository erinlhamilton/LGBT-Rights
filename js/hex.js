
function hexCreation(hex, hexTwo, number){
	var colors=[];
	var compPercent = .5/number; //,1
	var percent = compPercent;
	var lum = percent;
	var perc = compPercent;
	
	//attempt at creating a new hex scale//
	if(number >3){
		for(var z = 0; z< number; z++){
			colorLuminance(hex,lum);
			colors.push(colorLuminance(hex,lum));
			lum = lum-compPercent;
		}
	}
	
	// for(var z = 0; z< number; z++){
		// colorLuminance(hex,lum);
		// colors.push(colorLuminance(hex,lum));
		// lum = lum*2;
	// }
	//console.log(colors)
	colors.reverse();
	var compPercent = .5/number;
	for(var w = 0; w< number; w++){
		//count divided by two is 7
		var lim = perc;
		colorLuminance(hexTwo,lim);
		colors.push(colorLuminance(hexTwo,lim));
		perc = perc-compPercent;
	}
	console.log(colors);

function colorLuminance(hex, lum){
	hex = String(hex).replace(/[^0-9a-f]/gi, '');
	//console.log(hex);
	if (hex.length < 6) {
		hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
	}
	lum = lum || 0;
	// convert to decimal and change luminosity
	var rgb = "#", c, i;
	//console.log(rgb);
	for (i = 0; i < 3; i++) {
		c = parseInt(hex.substr(i*2,2), 16);
		//console.log(c);
		c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
		rgb += ("00"+c).substr(c.length);
		//console.log(rgb);
	}
	
	//console.log(rgb);
	return rgb;
}


	if(number == 7){
		var width=400;
		var height=30;
		var hexColor = d3.select("#hex").append("svg")
			.attr("width",width)
			.attr("height",height);
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
	if(number ==3){
		var width=300;
		var height=30;
		var hexColor = d3.select("#hex3").append("svg")
			.attr("width",width)
			.attr("height",height);	
	}
	
	if(number ==2){
		var width=300;
		var height=30;
		var hexColor = d3.select("#hex4").append("svg")
			.attr("width",width)
			.attr("height",height);	
	}

	var leg = d3.range(colors.length);

	var rects = hexColor.selectAll("rect")
		.data(leg);

	var colorScale = d3.scale.ordinal()
		//.domain([d3.min(leg), d3.max(leg)])
		//.interpolate(d3.interpolateHcl)
		.range(colors);

	rects.enter()
	  .append("rect")
	  .attr({
		width: 12,
		height: 12,
		y: 5,
		x: function(d,i) {
		  return i * 13 + 115;
		},
		fill: function(d,i) {
		  return colorScale(d);
		}
	 });
} 
	
