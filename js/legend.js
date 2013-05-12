///////////////////////////////////////////////////////////////////////////////
// Main Class File:   Legend.js
// File:              map.js
//
// Author:          Vanessa Knoppke-Wetzel
//
// Description:     (Succint description of this file here)
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

function setLegend(Index){
	
	//internal variable of current selected indice
	var index = Index[indexSelected];

	//create "key" table for future use
	var keyTable = []
	
	//create "hex" array for future use
	var hexArray = [];
	
	//looping through all 50 years, and all 50 states, to find
	//all the different "keys" for indice selected(index)
	for(var i=0; i<years.length; i++){	//for.1
		for(var j=0; j< state.length;  j++){//for.2
			var key = index[years[i]][state[j]];
			if(key != ""){//if.1 (empty strings don't get added)
				keyTable.push(key); //adding keys to keyTable
			} //end if.1
			if(keyTable.length>1){ //only allow comparison with more than 1 element
				for(var n = 0;n<(keyTable.length-1); n++){//for.3
					if(key == keyTable[n]){//if.3
						keyTable.splice(n,1);
					} //end if.3
				} //end for.3
			}//end if.2
		}//end for.2
	}//end for.1
	
	//creating Array of accessed hex #'s that relate to
	//current "indexSelected" indice color scheme
	for(var q = 0; q<keyTable.length;q++){
		hexArray.push(indexTable[keyTable[q]]);
	}
	
	//color stuff:
	var svg = d3.select("svg");

	var leg = d3.range(hexArray.length);

	var rects = svg.selectAll("rect")
		.data(leg);

	var colorScale = d3.scale.ordinal()
		.domain([d3.min(leg), d3.max(leg)])
		//.interpolate(d3.interpolateHcl)
		.range(hexArray);

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
	 
	 //add text labels?
	rects.append("text")
      .attr("dy", ".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.name; });
	  		
}	




  