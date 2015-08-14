/**
 * This file contains A jQuery Plugin for image slider with pagination and navigation arrow.
 * @uses jQuery
 */

var debug = false;
/**
 * @method initMySlider
 * @param sliderObj {Object}, It contains the configuration to initialize image slider.
 */
function initMySlider(sliderObj)
{
	var initMySlider_that = this,
		global_dom_id = "",
		speed_mq = 10,
		timeout = '',
		go = 0,
		user_plugin_timer = 2000,
		wrapper_div= document.getElementById(sliderObj.dom_id),
		div_items = '',
		numOfImg = 0;

	/**
	 * @method runSlider, it checks for the DOM ID and initalize Image slider
	 * @param none
	 */	
	this.runSlider = function(){
		if (debug) {
			// START TIME -- CONSOLE
			var start_time = new Date();
		}
		global_dom_id = sliderObj['dom_id'] || $.trim(sliderObj['dom_id']) ? sliderObj['dom_id'] : '';

		if(global_dom_id){
			div_items = wrapper_div.children;
			numOfImg = div_items.length;
			if(numOfImg > 0){
				sliderObj['enable_pagination'] ? initMySlider_that.activate_pagination() : console.log("Pagination is deactivated")
				sliderObj['enable_arrows'] ? initMySlider_that.activate_arrows() : console.log("Arrows are deactivated")
				sliderObj['timer'] ? user_plugin_timer = sliderObj.timer : user_plugin_timer = user_plugin_timer;
				sliderObj['marquee'] ? initMySlider_that.activate_marquee(sliderObj) : console.log("Marquee is deactivated");
				initMySlider_that.create_new_list();
				initMySlider_that.changeImage(0);
			}
		}
		else{
			alert("Plugin Needs a DOM Id to work :(")
		}

		if (debug) {
			var end_time = new Date();
			// TIME DIFF -- CONSOLE
		}
	}

	/**
	 * @method create_ul, it creates a <ul></ul> tag and append it to specified Dom Id Element 
	 * @param none
	 */	
	this.create_ul = function(){
		// var create_ul_that = this;
		$('#' + sliderObj.dom_id).append('<ul id="imgSlider"></ul>');

	}

	/**
	 * @method create_new_list, it took the image sources from user HTML file and creates a new list in script created <ul</ul> tags. 
	 * @param none
	 */
	this.create_new_list = function(){
		initMySlider_that.create_ul();
		for(i=0; i<numOfImg; i++) {
			var img_url = wrapper_div.children[i].src ;
			$('#imgSlider').append('<li><img src="' + img_url + '" /></li>');
			$(wrapper_div.children[i]).hide();
		}
	}

	/**
	 * @method changeImage, it initalizes the auto slider 
	 * @param slide_number{Integer}, it contains the current index of image to be displayed 
	 */
	this.changeImage = function(slide_number){
		var changeImage_that = this;
		li_items = $("#" + global_dom_id+ " ul:last-child li");
		initMySlider_that.hideAllImages(li_items);

		if (slide_number >= numOfImg) {
			slide_number = 0;
		}

		li_items[slide_number].style.display = 'block';
		$(pagi_ulist_items[slide_number]).addClass("pagination_higlight_box");

		auto_timer = setTimeout(function() {
			$(pagi_ulist_items[slide_number]).removeClass("pagination_higlight_box");
			slide_number++;
			initMySlider_that.changeImage(slide_number);
		}, user_plugin_timer);
	}

	/**
	 * @method hideAllImages, it hide all images in slider 
	 * @param image_list{Collection}, it contains list of images in slider 
	 */
	this.hideAllImages = function(image_list){
		for(i=0; i<image_list.length; i++) {
			$(image_list[i]).hide();
		}	
	}

	/**
	 * @method activate_arrows, it activates the navigation arrows if user wants to activate it 
	 * @param none 
	 */

	this.activate_arrows = function(){

		$("<div id='nav_arrow'></div>").insertAfter("#container_sl");

		if(!sliderObj['leftArrowUrl']){
		sliderObj.leftArrowUrl = "arrowLeftGrey.png";
		}
		if(!sliderObj['rightArrowUrl']){
			sliderObj.rightArrowUrl = "arrowRightGrey.png";
		}
		$('#nav_arrow').append('<span id="prev"><img src="' + sliderObj.leftArrowUrl + '" /></span>');
		$('#nav_arrow').append('<span id="next"><img src="' + sliderObj.rightArrowUrl + '" /></span>');
	}

	$('.container').on("click",'#nav_arrow #next', function(e){
		var current_display_index = $('#imgSlider li[style*="block"]').index();
		var	next_img_index = current_display_index + 1;

		if (next_img_index >= numOfImg){
			next_img_index = 0;	}
		
		clearTimeout(auto_timer);
		$(pagi_ulist_items[current_display_index]).removeClass("pagination_higlight_box");
		initMySlider_that.changeImage(next_img_index);
	});

	$('.container').on("click",'#nav_arrow #prev', function(e){
		clearTimeout(auto_timer);
		var current_display_index = $('#imgSlider li[style*="block"]').index(),
			prev_img_index = current_display_index - 1;

		if (prev_img_index < 0){
			prev_img_index = numOfImg-1;}

		clearTimeout(auto_timer);
		$(pagi_ulist_items[current_display_index]).removeClass("pagination_higlight_box");
		initMySlider_that.changeImage(prev_img_index);
	});


	/**
	 * @method activate_pagination, it activates the pagination if user wants to activate it 
	 * @param none 
	 */
	this.activate_pagination = function(){
		$("<div id='pagination'></div>").insertAfter("#container_sl");
		$('#pagination').append('<ul id="pagination_ul"></ul>');

		pagi_ulist = $('#pagination_ul');
		
		for (var i = 1; i <= numOfImg; i++) {
			$(pagi_ulist).append('<li><a href="#">' + i + '</a></li>');
		};
		pagi_ulist_items = $(pagi_ulist).children();
	}

	$('.container').on("click",'#pagination #pagination_ul li', function(e){
		console.log("I m Running");
		current_click_index = $(this).index();
		current_class_index = $("#pagination_ul li.pagination_higlight_box").index();
		clearTimeout(auto_timer);
		$(pagi_ulist_items[current_class_index]).removeClass("pagination_higlight_box");
		current_click_index = $(this).index();
		initMySlider_that.changeImage(current_click_index);
	});

	$(window).scroll(function(){
		if ($(this).scrollTop() > 20) {
			$('.scrollToTop').fadeIn();
		} else {
			$('.scrollToTop').fadeOut();
		}
	});

	$('.scrollToTop').click(function(){
		$('html, body').animate({scrollTop : 0},1000);
		return false;
	});

	/**
	 * @method activate_marquee, it calls another function for activating the Marquee 
	 * @param none 
	 */
	this.activate_marquee = function(){
		var el = document.getElementById("marquee");
  		scrollFromBottom();
	}

	/**
	 * @method scrollFromBottom, is activates Marquee if user wants to activate it 
	 * @param none 
	 */
	scrollFromBottom = function(){
  		clearTimeout(timeout);
	  var el = document.getElementById("marquee");
	  if(el.scrollTop >= el.scrollHeight-200){
	    el.scrollTop = 0;
	  	};
	  el.scrollTop = el.scrollTop + speed_mq;
	  if(!go){
	    timeout = setTimeout("scrollFromBottom()",200);
  		};
	}
}

// EVENTS



// $.ajax({
// 	url : "",
// 	type : "",
// 	success : function(response) {
// 		var result = "";

// 		if (typeof response == 'string') {
// 			result = JSON.parse(response);
// 		} else {
// 			result = response;
// 		}
// 	}
// });