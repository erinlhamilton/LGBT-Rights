///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              trulia.js
//
// Author:           Erin Hamilton
//
// Description:     (Succint description of this file here)
//                   
// Credits:          
//////////////////////////// 80 columns wide //////////////////////////////////

/**
 * Creates the x-axis for each chart view which also acts as the timeline
 *
 * @param: data is the years global array
 */
 function createTrulia(){
 
	var color = d3.scale.ordinal()
		.range(colorTrulia(Index, st));
 }
 
 function colorTrulia(Index, st, year){
	var index = Index[indexSelected];//currently selected index(global variable)
	for(i = 0; i < year.length; i++){
		return indexTable[index[i][st]];
	}
 }
 
 