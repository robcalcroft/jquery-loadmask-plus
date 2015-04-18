/*!
 * Copyright (c) 2009 Sergiy Kovalchuk (serg472@gmail.com)
 *
 * Copyright (c) 2015 Rob Calcroft - For jquery-loadmask-plus
 * 
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php)
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *  
 * Following code is based on Element.mask() implementation from ExtJS framework (http://extjs.com/)
 *
 */
;(function($){
	
	/**
	 * Displays loading mask over selected element(s). Accepts both single and multiple selectors.
	 *
	 * @param options.label - Text message that will be displayed on top of the mask besides a spinner (optional). 
	 * 				If not provided only mask will be displayed without a label or a spinner.  	
	 * @param options.delay - Delay in milliseconds before element is masked (optional). If unmask() is called 
	 *              before the delay times out, no mask is displayed. This can be used to prevent unnecessary 
	 *              mask display for quick processes. 
	 * @param options.iconColour - The colour of the loading animation   	
	 */
	$.fn.mask = function(options){
		options = options || {};

		var delay = options.delay, 
			label = options.label, 
			iconColour = options.iconColour,
			element;
		$(this).each(function() {
			if(delay !== undefined && delay > 0) {
		        element = $(this);
		        element.data("_mask_timeout", window.setTimeout(function() { 
		        	$.maskElement($(this), {
						label: !iconColour ? label : false,
						iconColour: !label ? iconColour : false,
						bgColour: options.bgColour ? options.bgColour : undefined
					});
		        }, delay));
			} else {
				$.maskElement($(this), {
					label: !iconColour ? label : false,
					iconColour: !label ? iconColour : false,
					bgColour: options.bgColour ? options.bgColour : undefined
				});
			}
		});
	};
	
	/**
	 * Removes mask from the element(s). Accepts both single and multiple selectors.
	 */
	$.fn.unmask = function(){
		$(this).each(function() {
			$.unmaskElement($(this));
		});
	};
	
	/**
	 * Checks if a single element is masked. Returns false if mask is delayed or not displayed. 
	 */
	$.fn.isMasked = function(){
		return this.hasClass("masked");
	};

	$.maskElement = function(element, options){
	
		var label = options.label, 
			iconColour = options.iconColour, 
			bgColour = options.bgColour,
			maskMsgDiv, 
			maskDiv,
			msgContent;

		if(label && iconColour) {
			throw new Error('Label and icon colour are specified; they are mutually exclusive');
		}

		//if this element has delayed mask scheduled then remove it and display the new one
		if (element.data("_mask_timeout") !== undefined) {
			window.clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}

		if(element.isMasked()) {
			$.unmaskElement(element);
		}
		
		if(String(element.css("position")) === "static") {
			element.addClass("masked-relative");
		}
		
		element.addClass("masked");
		
		maskDiv = $('<div class="loadmask"></div>');
		
		//auto height fix for IE
		if(window.navigator.userAgent.toLowerCase().indexOf("msie") > -1){
			maskDiv.height(element.height() + parseInt(element.css("padding-top")) + parseInt(element.css("padding-bottom")));
			maskDiv.width(element.width() + parseInt(element.css("padding-left")) + parseInt(element.css("padding-right")));
		}
		
		//fix for z-index bug with selects in IE6
		if(window.navigator.userAgent.toLowerCase().indexOf("msie 6") > -1){
			element.find("select").addClass("masked-hidden");
		}
		
		element.append(maskDiv);
		
		maskMsgDiv = $('<div class="loadmask-msg" style="display:none;"></div>');

		// SVG Loader -> http://codepen.io/aurer/pen/jEGbA
		msgContent = label ? label : '<div class="loader" title="1"> <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"> <path fill="#000" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"> <animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"/> </path> </svg> </div>';

		maskMsgDiv.append('<div>' + msgContent + '</div>');
		element.append(maskMsgDiv);
		
		//calculate center position
		maskMsgDiv.css("top", Math.round(element.height() / 2 - (maskMsgDiv.height() - parseInt(maskMsgDiv.css("padding-top")) - parseInt(maskMsgDiv.css("padding-bottom"))) / 2)+"px");
		maskMsgDiv.css("left", Math.round(element.width() / 2 - (maskMsgDiv.width() - parseInt(maskMsgDiv.css("padding-left")) - parseInt(maskMsgDiv.css("padding-right"))) / 2)+"px");
		
		if(iconColour !== undefined) {
			$('svg rect').css('fill', iconColour);
		}

		if(bgColour !== undefined) {
			$(maskDiv).css('background-color', bgColour);
		}

		maskMsgDiv.show();
		
	};
	
	$.unmaskElement = function(element){
		//if this element has delayed mask scheduled then remove it
		if (element.data("_mask_timeout") !== undefined) {
			window.clearTimeout(element.data("_mask_timeout"));
			element.removeData("_mask_timeout");
		}
		
		element.find(".loadmask-msg,.loadmask").remove();
		element.removeClass("masked");
		element.removeClass("masked-relative");
		element.find("select").removeClass("masked-hidden");
	};
 
})(jQuery);
