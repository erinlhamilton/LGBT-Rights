///////////////////////////////////////////////////////////////////////////////
// Title:           LGBT Civil Rights History
// Source Files:    d3.v3.min.js (Data Driven Documents JavaScript library V3),
// 			topojson.js, queue.js, index.html, style.css, map.js, 
//			timeline.js, & chart.js				
//
// Author:          Erin Hamilton
// Email:           erin@erinhamilton.me
// Author:          Rashauna Mead
// Email:           rashauna.mead@gmail.com
// Author:          Vanessa Knoppke-Wetzel
// Email:           run.for.funner@gmail.com
//
// Last Updated:    May 1, 2013
//
// Description:     Main JavaScript file of page. Loads major features on load.
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

/* Global Variables */
var marriage, employment, hateCrime;

/**
 * (Write a succinct description of this method here.  If necessary,
 * additional paragraphs should be preceded by <p>, the html tag for
 * a new paragraph.)
 *
 * @param (parameter name) (Describe the first parameter here)
 * @param (parameter name) (Do the same for each additional parameter)
 * @return (description of the return value)
 */


/**
 * Called by window onload at bottom of script. Loads major code.
 */
function initialize(){
	fetchData();
}


/**
 * Fetches the JSON object and loads it asynchronously for use.
 */
function fetchData(){
	d3.json("data/Index.json", function(error, Index){
		
		//create object for each index
		marriage = Index.Marriage;
		employment = Index.Employment;
		hateCrime = Index.HateCrime;
		
		console.log(marriage[2009].AK);
		console.log(employment[2009].AK);
		console.log(hateCrime[2009].AK);
	});
}


/**
 * Load the JS code after page has loaded. Calls initialize function at top.
 */
window.onload = initialize();




