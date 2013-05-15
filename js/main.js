///////////////////////////////////////////////////////////////////////////////
// Title:           LGBT Civil Rights History
// Source Files:    d3.v3.min.js (Data Driven Documents JavaScript library V3),
//					jquery.min.v1.9.1.js, topojson.js, queue.min.js, index.html, 
//                  style.css, map.js, timeline.js, trulia.js, & chart.js				
//
// Author:          Erin Hamilton
// Author:          Rashauna Mead
// Author:          Vanessa Knoppke-Wetzel
//
// Last Updated:    May 11, 2013
//
// Description:     Main JS code for LGBT rights map. Calls all other js files.
//                  Page visualizes the changing positive and negative legislation
//                  passed by states over the past 50 years
//                   
// Credits:         Many code examples helped build this visualization (thank you!):
//////////////////////////// 80 columns wide //////////////////////////////////

/** Global Variables */
var indexArray = ["Adoption", "Employment", "HateCrime", "Hospital", "Housing", "Marriage"];
var indexSelected = indexArray[1];
//var timer; //timer for animation
var Index;
var timestamp = 0;

/**Key values in Index JSON, which contain colors used to fill states*/
var indexTable = {
	/*Adoption*/ //8
	"YYY": "#bf9966", //Y, Y, Y
	"SPYSSCY": "#dfb377", //Y, Y, na (YY)
	"SPYSSPY": "#ffcc88", //Y, na, Y (YY)
	"SSCLR": "#ffcc88", //S<--SPY..limited recognition same sex couple adoption (LR) Y LR na
	"YSSPLR": "#ffcc88", //Ssamecolor Y na LR
	"YYSSPLR": "#ffe699", //Ssame color Y Y LR
	"SPY": "#ff6073", //Y, na, na/// basically, NYD
	"SPYSSCN": "#ee5566", //Y, N, na (YN)
	"SPYSSPN": "#d04a59", //Y, na, N (YN)
	"SPYNN": "#b3404d", //Y, N, N
	
	/*Employment*/ //2
	"SOP": "#ffcc88", //Same Sex Orientation Employment Protection
	"SOPGIP": "#bf9966" , //Gender Identity Employment Protection + Same Sex Protection
	
	/*Hate Crimes*/ //4
	"SO": "#c3a7a7", //Same Sex Orientation Hate Crime Law
	"GI": "#c3a7a7", //Gender Identity Hate Crime Law
	"SOGI": "#947e7e", //Same Sex Orientation & Gender Idenity Hate Crime Laws
	"NHCL": "#5f9e20", //No Hate Crime Laws At All For the State
	"NSG": "#7dd12a", //No Sexual Orientation or Gender Idenity Hate Crime Laws

	/*Hospital Visitation*/ //3
	"HLI": "#ffd38d", //Law Inclusive of same-sex couples for medical decisions
	"HLR": "#ddb176", //Limited recognition of same-sex couples for medical decisions
	"HLS": "#b38f5f", //Same-sex couples treated as legal strangers for medical decisions
	
	/*Housing*/ //3
	"BSO": "#ffd38d", //Bans ONLY sexual orientation housing discrimination
	"BID": "#ddb176", //Bans ONLY identity/expression housing discrimination
	"BB": "#b38f5f", //bans sex orientation disc AND bans ID/ex discrim
	
	/*Marriage*/ //14
	"ML": "#a48357", //Marriage Legal
	"CUL": "#b69261", //Civil Unions Legal
	"DPL": "#c8a06b", //Domestic Partnerships Legal
	"LBCUL": "#dbaf75", //Legislative Ban on Marriage, Civil Unions Legal
	"CBCUL": "#edbd7e", //Constitutional Ban on Marriage, Civil Unions Legal
	"LBDPL": "#ffcc88", //Legislative Ban on Marriage, Domestic Partnership Legal
	"CBDPL": "#ffdb92", //Constitutional Ban on Marriage, Domestic Partnership Legal
	"NL": "#ff5b6d", //No Law Banning or Approving Marriage
	"NEB": "#ee5566", //No Explicit Ban, but rights denied by court ruling
	"LBM": "#dd4f5f", //Legislative ban on marriage (statute)
	"LBO": "#cc4957", //Legislative ban on marriage and other relationship recognition (statute)
	"CBM": "#bb4350", //Constitutional ban on marriage
	"CBO": "#aa3d49", //Constitutional ban on marriage and other relationship recognition
	"LBCBO": "##993742" //Legislative and Constitutional Ban on All Relationship Recognition
};
	
var years = ['1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', 
	'1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', 
	'1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', 
	'1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', 
	'2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'];

//year to view on load	
var year = years[0];
	
var state = ['AL', 'AK', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 
	'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 
	'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 
	'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

/**
 * Called by window onload at bottom of script.
 */
function initialize(){
	$("#stop").hide();
	fetchData();
}

/**
 * Fetches the JSON object and loads it asynchronously for use.
 * Queue waits until the json files are completely loaded and then calls 
 * the function in await to start everything else
 */
function fetchData(){
	queue()
		.defer(d3.json, "data/Index.json")
		.defer(d3.json, "data/usa.json")
		.await(ready);
}

/**
*Once JSON data is loaded, use this function to call other functions
*/
function ready(error, _Index, usa){
	Index = _Index;
	console.log(Index.Employment);
	setMap(usa, Index);// create the map (function located in map.js)
	onClickMenu(Index, usa);
	createTimeline(Index, years);
	createGrid(Index);
	createChart(Index);
	$('#marriage').trigger('click');
}

//to get an svg object to move to front, call this function
// d3.selection.prototype.moveToFront = function() {
  // return this.each(function(){
    // this.parentNode.appendChild(this);
  // });
// };

function lawCodeLabel(code){

	switch(code){
		case "SP": 
			return "Single parent SPN, SPY (no, yes)"
		break;
		case "SSC": 
			return "Same sex couple, SSCY, SSCN (yes, no)"
		break;
		case "NYD": 
			return "Not yet determined by court, no explicit ban."
		case "SPY": 
			return "Single parent."
		break;
		case "SPYSSCN": 
			return "single parent yes, same sex couple NO."
		break;
		case "SPYSCCY": 
			return "single parent yes, same sex couple yes"
		break;
		case "SPYSSPY": 
			return "spy, + ssp yes"
		break;
		case "SPYSSPN": 
			return" sing par yes, SSP no"
		break;
		case "LR":
			return "limited recognition"
		break;
		case "SPYSSPY":
			return "single parent yes, same sex partner yes"
		break;
		case "SSCLR": 
			return "limited recognition same sex couple adoption"
		break;
		case "YSSPLR": 
			return "sing parent yes, same sex partner limited recognition"
		break;
		case "YYSSPLR": 
			return "sing parent yes, same sex couple yes, sspartner limited recog."
		break;
		case "YYY": 
			return "singe parent yes, same sex couple yes, same sex partner yes"
		break;
		case "SPYNN": 
			return "single parent yes, same sex couple no, same sex partner no"
		break;
		case "SSP": 
			return "same sex partner SSPY, SSPN (yes, no)"
		break;
		case "SJ": 
			return "in some jurisdictions"
		break;
		/*Employment*/
		case "SOP": 
			return "Same Sex Orientation Employment Protection"
		break;
		case "SOPGIP": 
			return "Gender Identity Employment Protection + Same Sex Protection"
		break;
		/*Hate Crimes*/
		case"SO": 	
			return "Same Sex Orientation Hate Crime Law"
		break;
		case"GI": 
			return "Gender Identity Hate Crime Law"
		break;
		case"SOGI": 
			return "Same Sex Orientation & Gender Idenity Hate Crime Laws"
		break;
		case"NHCL": 
			return "No Hate Crime Laws At All For the State"
		break;
		case"NSG": 
			return "No Sexual Orientation or Gender Idenity Hate Crime Laws"
		break;
		/*Hospital Visitation*/
		case"HLI": 
			return "Law inclusive of same-sex couples for medical decisions and hospital visitation."
		break;
		case "HLR": 
			return "Limited recognition of same-sex couples for medical decisions and hospital visitation."
		break;
		case "HLS": 
			return "Same-sex couples treated as legal strangers for medical decisions and hospital visiation."
		break;
		/*Housing*/
		case "BSO": 
			return "Bans only sexual orientation housing discrimination."
		break;
		case "BID": 
			return "Bans only identity/expression housing discrimination."
		break;
		case "BB": 
			return "bans sex orientation disc AND bans ID/ex discrim."
		break;
		/*Marriage*/
		case "ML": 
			return "Marriage legal"
		break;
		case "CUL": 
			return "Civil unions legal"
		break;
		case "DPL": 
			return "Domestic partnerships legal"
		break;
		case"LBCUL": 
			return "Legislative ban on marriage, but civil unions legal"
		break;
		case "CBCUL": 
			return "Constitutional ban on marriage, but civil unions legal"
		break;
		case "LBDPL": 
			return "Legislative ban on marriage, but domestic partnership legal"
		break;
		case "CBDPL": 
			return "Constitutional ban on marriage, but domestic partnership legal"
		break;
		case "NL": 
			return "No court ruling, law ambiguous"
		break;
		case "NEB": 
			return "No explicit ban, but rights denied by court ruling"
		break;
		case "LBM":
			return "Legislative ban on marriage"
		break;
		case"LBO": 
			return "Legislative ban on marriage and other relationship recognition"
		break;
		case"CBM": 
			return "Constitutional ban on marriage"
		break;
		case"CBO": 
			return "Constitutional ban on marriage and other relationship recognition"
		break;
		case"LBCBO": 
			return "Legislative and constitutional ban on all relationship recognition"
		break;
		default: return "No court ruling, law ambiguous";
	};
}

function moveLabel() {

	var x = d3.event.clientX+10; //horizontal label coordinate
	var y = d3.event.clientY-75; //vertical label coordinate
	
	var mug = d3.select(".infolabel") //select the label div for moving
		.style("left", x+"px") //reposition label horizontal
		.style("top", y+"px"); //reposition label vertical
		
};


/**
 * Load the JS code after page has loaded. Calls initialize function at top.
 */
 
 //window.onload = initialize();
$(document).ready(initialize());




