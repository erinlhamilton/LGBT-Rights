///////////////////////////////////////////////////////////////////////////////
// Title:           LGBT Civil Rights History
// Source Files:    d3.v3.min.js (Data Driven Documents JavaScript library V3),
// 			topojson.js, index.html, style.css, map.js, 
//			timeline.js, & chart.js				
//
// Author:          Erin Hamilton
// Author:          Rashauna Mead
// Author:          Vanessa Knoppke-Wetzel
//
// Last Updated:    May 8, 2013
//
// Description:     Main JavaScript file of page. Loads major features.
//                   
// Credits:          (list anyone who helped you write your program)
//////////////////////////// 80 columns wide //////////////////////////////////

/** Global Variables */
var indexArray = ["Adoption", "Employment", "HateCrime", "Hospital", "Housing", "Marriage"];
var indexSelected = indexArray[5];

/**Key values in Index JSON, which contain colors used to fill states*/
var indexTable = {
	/*Adoption*/
	"SP": 0, //single parent SPN, SPY (no, yes)
	"SSC": 0, //same sex couple, SSCY, SSCN (yes, no)
	"NYD": 0, //not yet determined by court, aka NO EXPLICIT PROHIBITION 
	"SPY": 0, //single parent yes
	"SPYSSCN": 0, //single parent yes, same sex couple NO
	"SPYSCCY": 0, //single parent yes, same sex couple yes
	"SPYSSPY": 0, //spy, + ssp yes
	"SPYSSPN": 0, //sing par yes, SSP no
	"LR": 0, //limited recognition
	"SPYSSPY": 0, //single parent yes, same sex partner yes 
	"SSCLR": 0, //limited recognition same sex couple adoption
	"YSSPLR": 0, //sing parent yes, same sex partner limited recognition
	"YYSSPLR": 0, //sing parent yes, same sex couple yes, sspartner limited recog.
	"YYY": 0, //singe parent yes, same sex couple yes, same sex partner yes
	"SPYNN": 0, //single parent yes, same sex couple no, same sex partner no 
	"SSP": 0, //same sex partner SSPY, SSPN (yes, no)
	"SJ": 0, //in some jurisdictions 
	
	/*Employment*/
	"SOP": 0, //Same Sex Orientation Employment Protection
	"SOPGIP": 0, //Gender Identity Employment Protection + Same Sex Protection
	
	/*Hate Crimes*/
	"SO": 0, //Same Sex Orientation Hate Crime Law
	"GI": 0, //Gender Identity Hate Crime Law
	"SOGI": 0, //Same Sex Orientation & Gender Idenity Hate Crime Laws
	"NHCL": 0, //No Hate Crime Laws At All For the State
	"NSG": 0, //No Sexual Orientation or Gender Idenity Hate Crime Laws
	
	/*Hospital Visitation*/
	"HLI": 3.0, //Law Inclusive of same-sex couples for medical decisions
	"HLR": 1.5, //Limited recognition of same-sex couples for medical decisions
	"HLS": 0, //Same-sex couples treated as legal strangers for medical decisions
	
	/*Housing*/
	"BSO": 0, //Bans ONLY sexual orientation housing discrimination
	"BID": 0, //Bans ONLY identity/expression housing discrimination
	"BB": 0, //bans sex orientation disc AND bans ID/ex discrim
	
	/*Marriage*/
	"ML": '#A8594F', //Marriage Legal
	"CUL": '#A8585E', //Civil Unions Legal
	"DPL": '#A35A6D', //Domestic Partnerships Legal
	"LBCUL": '#995E7B', //Legislative Ban on Marriage, Civil Unions Legal
	"CBCUL": '#8B6486', //Constitutional Ban on Marriage, Civil Unions Legal
	"LBDPL": '#786A8E', //Legislative Ban on Marriage, Domestic Partnership Legal
	"CBDPL": '#627091', //Constitutional Ban on Marriage, Domestic Partnership Legal
	"NL": '#000', //No Law Banning or Approving Marriage
	"NEB": '#4C768F', //No Explicit Ban, but rights denied by court ruling
	"LBM": '#367A89', //Legislative ban on marriage (statute)
	"LBO": '#277C7E', //Legislative ban on marriage and other relationship recognition (statute)
	"CBM": '#267E71', //Constitutional ban on marriage
	"CBO": '#317E62', //Constitutional ban on marriage and other relationship recognition
	"LBCBO": '#427E52' //Legislative and Constitutional Ban on All Relationship Recognition
};

//console.log(indexTable.keys(0));

 var years = [{'yr':'63', 'year':'1963'}, {'yr':'64', 'year':'1964'}, {'yr':'65', 'year':'1965'}, {'yr':'66', 'year':'1966'}, 
	{'yr':'67', 'year':'1967'}, {'yr':'68', 'year':'1968'}, {'yr':'69', 'year':'1969'}, {'yr':'70', 'year':'1970'}, 
	{'yr':'71', 'year':'1971'}, {'yr':'72', 'year':'1972'}, {'yr':'73', 'year':'1973'}, {'yr':'74', 'year':'1974'}, 
	{'yr':'75', 'year':'1975'}, {'yr':'76', 'year':'1976'}, {'yr':'77', 'year':'1977'}, {'yr':'78', 'year':'1978'}, 
	{'yr':'79', 'year':'1979'}, {'yr':'80', 'year':'1980'}, {'yr':'81', 'year':'1981'}, {'yr':'82', 'year':'1982'}, 
	{'yr':'83', 'year':'1983'}, {'yr':'84', 'year':'1984'}, {'yr':'85', 'year':'1985'}, {'yr':'86', 'year':'1986'}, 
	{'yr':'87', 'year':'1987'}, {'yr':'88', 'year':'1988'}, {'yr':'89', 'year':'1989'}, {'yr':'90', 'year':'1990'}, 
	{'yr':'91', 'year':'1991'}, {'yr':'92', 'year':'1992'}, {'yr':'93', 'year':'1993'}, {'yr':'94', 'year':'1994'}, 
	{'yr':'95', 'year':'1995'}, {'yr':'96', 'year':'1996'}, {'yr':'97', 'year':'1997'}, {'yr':'98', 'year':'1998'}, 
	{'yr':'99', 'year':'1999'}, {'yr':'00', 'year':'2000'}, {'yr':'01', 'year':'2001'}, {'yr':'02', 'year':'2002'}, 
	{'yr':'03', 'year':'2003'}, {'yr':'04', 'year':'2004'}, {'yr':'05', 'year':'2005'}, {'yr':'06', 'year':'2006'}, 
	{'yr':'07', 'year':'2007'}, {'yr':'08', 'year':'2008'}, {'yr':'09', 'year':'2009'}, {'yr':'10', 'year':'2010'}, 
	{'yr':'11', 'year':'2011'}, {'yr':'12', 'year':'2012'}, {'yr': '13', 'year':'2013'}];
	
	console.log(years);
	
var year = ['1963', '1964', '1965', '1966', '1967', '1968', '1969', '1970', 
	'1971', '1972', '1973', '1974', '1975', '1976', '1977', '1978', '1979', '1980', '1981', 
	'1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', 
	'1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', 
	'2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013'];
	
//var state = ['AK', 'AL', 'AR', 'AZ', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'IA', 'ID', 
	//'IL', 'IN', 'KS', 'KY', 'LA', 'MA', 'MD', 'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 
	//'NE', 'NH', 'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 
	//'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'];

/**
 * Called by window onload at bottom of script.
 */
function initialize(){
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
function ready(error, Index, usa){
	setMap(usa, Index);// create the map (function located in map.js)
	createTimeline(years);
}


/**
 * Load the JS code after page has loaded. Calls initialize function at top.
 */
window.onload = initialize();




