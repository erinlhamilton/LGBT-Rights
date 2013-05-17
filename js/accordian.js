///////////////////////////////////////////////////////////////////////////////
// Main Class File:   main.js
// File:              accordian.js
//
// Author:           Vanessa Knoppke-Wetzel
//
// Description:     An accordian-type menu
//                   
// Credits:         code adapted and simplified from Chris Coyier's CSS 
//                  Tricks Tutorial. Thank you!!!
//                  http://css-tricks.com/grid-accordion-with-jquery
//////////////////////////// 80 columns wide //////////////////////////////////

$(function() {

    // Set up variables
    var $el, $parentWrap, $otherWrap, 
        $allTitles = $("dt").css({
            padding: 5, // setting the padding here prevents a weird situation, where it would start animating at 0 padding instead of 5
            "cursor": "pointer" // make it seem clickable
        }),
        $allCells = $("dd").css({
           position: "relative",
           top: -1,
            left: -40,
            display: "none" // info cells are just kicked off the page with CSS (for accessibility)
        });
    
    // clicking image of inactive column just opens column, doesn't go to link   
    $("#accordion").delegate("a.image","click", function(e) { 
        
        if ( !$(this).parent().hasClass("curCol") ) {         
            e.preventDefault(); 
            $(this).next().find('dt:first').click(); 
        } 
        
    });
    
    // clicking on titles does stuff
    $("#accordion").delegate("dt", "click", function() {
        
        // cache this, as always, is good form
        $el = $(this);
        
        // if this is already the active cell, don't do anything
        if (!$el.hasClass("current")) {
        
            $parentWrap = $el.parent().parent();
            $otherWraps = $(".info-col").not($parentWrap);
            
            // remove current cell from selection of all cells
            $allTitles = $("dt").not(this);
            
            // close all info cells
            $allCells.slideUp();
            
            // return all titles (except current one) to normal size
            $allTitles.animate({
                fontSize: "14px",
                paddingTop: 5,
                paddingRight: 0, //40
                paddingBottom: 10,
                paddingLeft: 16
            });
            
            // animate current title to larger size            
            $el.animate({
                "font-size": "20px",
                paddingTop: 5,
                paddingRight: 0,
                paddingBottom: 5,
                paddingLeft: 15
            }).next().slideDown();
            
            // make the current column the large size
            $parentWrap.animate({
                //width: 320
				//width: 400
            }).addClass("curCol");
            
            // make other columns the small size
            $otherWraps.animate({
                //width: 140
				//width: 400
				//width: 380
            }).removeClass("curCol");
            
            // make sure the correct column is current
            $allTitles.removeClass("current");
            $el.addClass("current");  
        
        }
        
    });
    
    $("#starter").trigger("click");
    

});

function onClickMenu(Index, usa){
	//clicking
	
	var hex = "add"; 
	var hexTwo = "20f";
	//"fe5";//"e56";
	//"add"; blueish grays
	//"8ee"; slightly darker lightish blues 
	//"8de"; //lightish blues 
	//"fe6"; darkish yellowish yellows 
	//"3ca"; grenish
	//"fbf"; purples
	//"fe7"; yellows
	//"fe5"; uglier dark yellows
	
	//var hex= ; //"081";//"FC8";
	var chosen = document.getElementById("marriage");
	(chosen).onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()
		$('#hex6').empty()
		console.log("clicking");
		indexSelected = indexArray[5];
		index = Index[indexSelected];
		//setMap(usa, index);
		var number = 7;
		hexCreation(hex, hexTwo, number);
		
		updateIndex();
	};
	
	var chosen = document.getElementById("housing");
	(chosen).onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()
		$('#hex6').empty()
	console.log("clicking housing");
	indexSelected = indexArray[4];
	index = Index[indexSelected];
		
		var number = 3;
		hexCreation(hex, hexTwo, number);
		
		updateIndex();
	};
	
	var chosen = document.getElementById("adoption");
	(chosen).onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()	
		$('#hex6').empty()
		
	console.log("clicking adoption");
	indexSelected = indexArray[0];
	index = Index[indexSelected];
		var number = 4;
		hexCreation(hex, hexTwo, number);
		
		//setMap(usa, index);
		updateIndex();
	};
	
	var chosen = document.getElementById("hate_crimes");
	(chosen).onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()
		$('#hex6').empty()
	console.log("clicking hate");
	indexSelected = indexArray[2];
	index = Index[indexSelected];
		//setMap(usa, index);
		
		var number = 5;
		hexCreation(hex, hexTwo, number);
		updateIndex();
	};
	
	var chosen = document.getElementById("hospital");
	chosen.onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()
		$('#hex6').empty()
		
	console.log("clicking hospital");
	indexSelected = indexArray[3];
	index = Index[indexSelected];
		//setMap(usa, index);
		var number = 3;
		hexCreation(hex, hexTwo, number);
		
		updateIndex();
	};
	
	var chosen = document.getElementById("employment");
	(chosen).onclick=function(){
		$('#hex').empty()
		$('#hex2').empty()
		$('#hex3').empty()
		$('#hex4').empty()
		$('#hex5').empty()
		$('#hex6').empty()
	console.log("employment");
	indexSelected = indexArray[1];
	index = Index[indexSelected];
		//setMap(usa, index);
		var number = 2;
		hexCreation(hex, hexTwo, number);
		updateIndex();
	};
}

function updateIndex(){
	d3.selectAll(".states")
			.style("fill", function(d) { 
				return colorMap(Index, d.properties.ST, year) 
		});
		
	d3.select(".chart").remove();
	d3.select(".xMatrix").remove();
	d3.select(".matrix").remove();
	createGrid(Index);
	createChart(Index);
}

function updateIndex(){
	d3.selectAll(".states")
			.style("fill", function(d) { 
				return colorMap(Index, d.properties.ST, year) 
		});
		
	d3.select(".chart").remove();
	d3.select(".xMatrix").remove();
	d3.select(".matrix").remove();
	createGrid(Index);
	createChart(Index);
}