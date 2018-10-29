/*!
 * io.lightslider v1.2.2 (http://semilicon.com)
 * Copyright (c) 2011-2018 Semilicon Ltd.
 * Licensed under MIT license
 */
if(typeof io=='undefined'){window.io={};}
io.lightslider = function (){
	return {
		init: function(domElement){// id or class of DOM element or jquery element
			// > checks domElement
			if(typeof domElement=='object'){
				if(domElement.length==0){
					console.error('Error: uncorrect DOM element');
					return !1;
				}
			}else if(typeof domElement=='string'){
				domElement=$.trim(domElement);
				if(domElement[0]=='.' || domElement[0]=='#'){
					domElement=$(domElement);
				}else{
					domElement=$('#'+domElement);
				}
				if(domElement.length==0){
					console.error('Error: DOM element not found');
					return !1;
				}
			}else{
				console.error('Error: uncorrect DOM element type: '+typeof domElement)
				return !1;
			}
			// <
			// > set main vars
			var	slider = domElement, // slider
				items = slider.find(".io-ls-slide"), // all slides
				count = items.length, // count of slides
				height = slider.attr("data-slider-height")||false,
				ww = $(window).width(),//might: domElement.parent().width()
				wrapper = slider.find(".io-ls-wrapper"), // box for slides
				userAgent = window.navigator.userAgent,
				MSIE = userAgent.indexOf("MSIE"),
				isOldIE = !1,
				IEversion = 0,
				pos = 1;
			// <
			if(height!=false)slider.find(".io-ls-field").height(height);
			setTimeout(function() {slider.addClass('io-ls');},250);
			if(slider.attr("data-slider-initialized") == "true"){
				console.log('Alert: abort repeat slider initialization');
				return !1;
			}
			items.attr("data-slide-index","").each(function(i,slide){
				$(slide).attr("data-slide-index",i+1);
			});
			// > Detecting of old IE Browser
			if(MSIE>0){
				IEversion = parseInt(userAgent.substring(MSIE + 5, userAgent.indexOf(".", MSIE)));
				if(IEversion==8 || IEversion==9) isOldIE = !0;
				else if (IEversion<8){
					console.error('Error: Browser is too old');
					return !1;
				}
			}
			// <
			// > 
			if(isOldIE==!0)slider.removeClass("io-ls-animated-fast").removeClass("io-ls-animated-slow").addClass("io-ls-animated-none io-ls-ie");
			if(window.$isMobile && slider.hasClass("io-ls-animated-none"))slider.removeClass("io-ls-animated-none").addClass("io-ls-animated-slow");
			slider.attr("data-slider-initialized", "true");
			slider.attr("data-slider-totalslides", count);
			slider.attr("data-slider-pos", pos);
			slider.attr("data-slider-animated", "");
			// <
			// > add elements
			io.lightslider.addDoubles(slider,items);//add doubles of first and last slide
			io.lightslider.addArrows(slider);//add arrows
			io.lightslider.addBullet(slider);//add bullets
			// <
			// > apply functionality
			io.lightslider.sliderWidth(slider);
			if(slider.attr("data-slider-window-height")=="true" || slider.attr("data-slider-first-turn-height")=="true")io.lightslider.sliderHeight(slider);
			io.lightslider.sliderArrowsHeight(slider);
			io.lightslider.activeBullet(slider, pos, count);
			io.lightslider.activeSlide(slider, pos, count);
			io.lightslider.initSliderControls(slider);
			if(slider.attr("data-slider-timeout") > 0)io.lightslider.initAutoPlay(slider, pos, count);
			if(!isOldIE)io.lightslider.initSliderSwipe(slider, ww);
			// <
			slider.css("visibility", "");
			$(window).bind("resize", io.lightslider.executeOnceAtTheMoment(function() {
				io.lightslider.sliderWidth(slider);
				io.lightslider.slideMove(slider);
				io.lightslider.sliderArrowsHeight(slider);
				if(!window.$isMobile&&(slider.attr("data-slider-window-height")=="true"||slider.attr("data-slider-first-turn-height")=="true"))io.lightslider.sliderHeight(slider);
			}, 200));
			$(window).load(function() {
				if(!window.$isMobile&&(slider.attr("data-slider-window-height")=="true"||slider.attr("data-slider-first-turn-height")=="true"))io.lightslider.sliderHeight(slider);
				io.lightslider.sliderArrowsHeight(slider)
			})
		},
		addDoubles: function(slider,items){// slider jquery element
			var	firstItem = items.filter(":first"),
				lastItem = items.filter(":last"),
				count = parseFloat(slider.attr("data-slider-totalslides"));
			if(slider.find(".io-ls-slide[data-slide-index=0]").length == 0){// put copy of last slide to start
				firstItem.before(lastItem.clone(true).attr("data-slide-index", "0"));
			};
			if(slider.find(".io-ls-slide[data-slide-index=" + (count + 1) + "]").length == 0){// put copy of first slide to end
				lastItem.after(firstItem.clone(true).attr("data-slide-index", count + 1).removeClass("io-ls-active"))//.addClass("io-ls-loaded");
			};
		},
		addArrows: function(slider){// slider jquery element
			if(slider.find(".io-ls-controls>.io-ls-arrows_container").length == 1){
				if(slider.find(".io-ls-arrow_left").length == 0) slider.find(".io-ls-controls>.io-ls-arrows_container").append('<div class="io-ls-arrow_wrapper io-ls-arrow_left_wrapper"><div class="io-ls-arrow io-ls-arrow_left"><div class="io-ls-arrow_wrapper_left_body"><svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Left</desc> <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 8.5,8.5 0.5,16.5" /> </svg></div></div>');
				if(slider.find(".io-ls-arrow_right").length == 0) slider.find(".io-ls-controls>.io-ls-arrows_container").append('<div class="io-ls-arrow_wrapper io-ls-arrow_right_wrapper"><div class="io-ls-arrow io-ls-arrow_right"><div class="io-ls-arrow_wrapper_right_body"><svg style="display: block" viewBox="0 0 9.3 17" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <desc>Right</desc> <polyline fill="none" stroke="#000000" stroke-linejoin="butt" stroke-linecap="butt" stroke-width="1" points="0.5,0.5 8.5,8.5 0.5,16.5" /> </svg></div></div>');
			}
		},
		addBullet: function(slider){// slider jquery element
			if(slider.find(".io-ls-controls>.io-ls-bullet_container").length == 1){
				var count = parseFloat(slider.attr("data-slider-totalslides"));
				for(i = 1; i <= count; i++) {
					if(slider.find(".io-ls-bullet[data-slide-bullet-for="+i+"]").length == 0)slider.find(".io-ls-controls>.io-ls-bullet_container").append('<div class="io-ls-bullet" data-slide-bullet-for="'+i+'"> <div class="io-ls-bullet_body"></div> </div>');
				}
			}
		},
		sliderWidth: function(slider){// slider jquery element
			var width = slider.find(".io-ls-container").width(),
				items = slider.find(".io-ls-slide"), // all slides
				count = items.length;
			slider.find(".io-ls-wrapper").width(width * count);
			slider.find(".io-ls-slide").width(width);
		},
		sliderHeight: function(slider){// slider jquery element
			if(slider.attr("data-slider-first-turn-height")=="true"){
				var clientHeight=document.documentElement.clientHeight,
					top = slider.offset().top;
				if(clientHeight>top&&top/clientHeight<0.75){
					slider.find(".io-ls-field").height(document.documentElement.clientHeight-top);
					slider.find(".io-ls-arrow_wrapper").height(document.documentElement.clientHeight-top);
				}else{
					slider.find(".io-ls-field").height(document.documentElement.clientHeight);
					slider.find(".io-ls-arrow_wrapper").height(document.documentElement.clientHeight);
				}
			}else{
				slider.find(".io-ls-field").height(document.documentElement.clientHeight);
				slider.find(".io-ls-arrow_wrapper").height(document.documentElement.clientHeight);
			}
		},
		sliderArrowsHeight: function(slider){// slider jquery element
			slider.find(".io-ls-arrow_wrapper").height(slider.find(".io-ls-field").height());
		},
		activeBullet: function(slider, pos, count){
			var bullets = slider.find(".io-ls-bullet"),
				current = slider.find('.io-ls-bullet[data-slide-bullet-for="' + pos + '"]');
			bullets.removeClass("io-ls-bullet_active");
			if(pos==0){
				current = slider.find('.io-ls-bullet[data-slide-bullet-for="' + count + '"]');
			}else if(pos == count+1){
				current = slider.find('.io-ls-bullet[data-slide-bullet-for="1"]');
			}
			current.addClass("io-ls-bullet_active")
		},
		activeSlide: function(slider, pos, count){// slider jquery element, current position, count of slides
			var items = slider.find(".io-ls-slide"),
				current = slider.find('.io-ls-slide[data-slide-index="' + pos + '"]'),
				isAnimated = slider.hasClass("io-ls-animated-none");
			items.removeClass("io-ls-active");
			if(pos == 0 && isAnimated == !1){
				slider.find('.io-ls-slide[data-slide-index="' + count + '"]').addClass("io-ls-active")
			}else if(pos == 0 && isAnimated == !0){
				current = slider.find('.io-ls-slide[data-slide-index="' + count + '"]')
			}else if(pos == count+1 && isAnimated == !1){
				slider.find('.io-ls-slide[data-slide-index="1"]').addClass("io-ls-active")
			}else if(pos == count+1 && isAnimated == !0){
				current = slider.find('.io-ls-slide[data-slide-index="1"]')
			}
			current.addClass("io-ls-active")
		},
		initSliderControls: function(slider){// slider jquery element
			var wrapper = slider.find(".io-ls-wrapper"),
				width = slider.find(".io-ls-container").width();
			wrapper.css({
				transform: "translate3d(-" + width + "px, 0, 0)"
			})
			if(slider.find(".io-ls-controls>.io-ls-arrows_container").length == 1){
				slider.find(".io-ls-controls>.io-ls-arrows_container>.io-ls-arrow_wrapper").click(function() {
					var isAnimated = slider.attr("data-slider-animated"),
						pos =  parseFloat(slider.attr("data-slider-pos")),
						count = parseFloat(slider.attr("data-slider-totalslides"));
					if(isAnimated==""){
						slider.attr("data-slider-animated", "true");
						if($(this).hasClass("io-ls-arrow_left_wrapper")){
							if(slider.attr("data-slider-with-cycle") == "false" && pos == 1){
								pos = 1
							}else{
								pos--
							}
						}else{
							if(slider.attr("data-slider-with-cycle") == "false" && pos == count){
								pos = count
							}else{
								pos++
							}
						}
						slider.attr("data-slider-pos", pos);
						io.lightslider.slideMove(slider);
					}
				});
				
			}
			if(slider.find(".io-ls-controls>.io-ls-bullet_container").length == 1){
				slider.find(".io-ls-bullet").click(function() {
					var pos = parseFloat($(this).attr("data-slide-bullet-for"));
					slider.attr("data-slider-pos", pos);
					io.lightslider.slideMove(slider);
				});
			}
		},
		slideMove: function(slider){// slider jquery element
			var wrapper = slider.find(".io-ls-wrapper"),
				width = slider.find(".io-ls-container").width(),
				transition = 500,
				pos = (slider.attr("data-slider-animated"),parseFloat(slider.attr("data-slider-pos"))),
				count = parseFloat(slider.attr("data-slider-totalslides")),
				cycle = slider.attr("data-slider-with-cycle"),
				isAnimatedNone = slider.hasClass("io-ls-animated-none");
			if(cycle=="false" && pos == count){
				slider.find(".io-ls-arrow_right_wrapper").fadeOut(300);
			}else if(cycle=="false"){
				slider.find(".io-ls-arrow_right_wrapper").fadeIn(300);
			}
			if(cycle=="false" && pos == 1){
				slider.find(".io-ls-arrow_left_wrapper").fadeOut(300);
			}else if(cycle=="false"){
				slider.find(".io-ls-arrow_left_wrapper").fadeIn(300);
			}
			wrapper.addClass("io-ls-animated");
			wrapper.css({
				transform: "translate3d(-" + width * pos + "px, 0, 0)"
			})
			setTimeout(function() {
				wrapper.removeClass("io-ls-animated");
				slider.attr("data-slider-animated", "");
				if(cycle != "false"){
					if(pos == count+1) pos = 1;
					if(pos == 0) pos = count;
					wrapper.css({
						transform: "translate3d(-" + width * pos + "px, 0, 0)"
					});
					if(isAnimatedNone !== !0)io.lightslider.activeSlide(slider, pos, count);
					slider.attr("data-slider-pos", pos);
				}
			}, transition);
			io.lightslider.activeBullet(slider, pos, count);
			io.lightslider.activeSlide(slider, pos, count);
			io.lightslider.sliderArrowsHeight(slider);
		},
		initAutoPlay: function(slider, pos, count){// slider jquery element
			var wrapper = slider.find(".io-ls-wrapper"),
				timeout = parseFloat(slider.attr("data-slider-timeout"));
			slider.hover(function(t) {
				slider.attr("data-slider-hovered", "yes")
			  }, function(t) {
				slider.attr("data-slider-hovered", "")
			}),
			setInterval(function() {
				var w_top = $(window).scrollTop(),
					w_height = $(window).height(),
					s_top = slider.offset().top,
					s_height = slider.innerHeight(),
					isHovered = slider.attr("data-slider-hovered"),
					isIgnoreHover = slider.attr("data-slider-autoplay-ignore-hover");
				if(w_top+w_height/2>s_top && s_top+s_height>w_top && isHovered!="yes" && isIgnoreHover!="true"){
					pos = parseFloat(slider.attr("data-slider-pos"));
					if(slider.attr("data-slider-with-cycle") == "false" && pos == count){pos = count}else{pos++}
					slider.attr("data-slider-pos", pos);
					pos != count + 1 && pos != 0 || (l = "yes");
					io.lightslider.slideMove(slider);
					if(slider.attr("data-slider-with-cycle") != "false"){
						if(pos == count + 1)pos = 1;
						if(pos == 0)pos = count;
						slider.attr("data-slider-pos", pos)
					}
				}
			}, timeout);
		},
		initSliderSwipe: function(slider,width){// slider jquery element
			var e, a = !1;
			delete Hammer.defaults.cssProps.userSelect,
			hammer = new Hammer(slider.find(".io-ls-wrapper")[0],{
				domEvents: !0,
				threshold: 0,
				inputClass: Hammer.TouchInput,
				recognizers: [[Hammer.Pan, {
					direction: Hammer.DIRECTION_HORIZONTAL
				}]]
			});
			$(window).bind("scroll", function() {
				a = !0,
				clearTimeout(e),
				e = setTimeout(function() {
					a = !1
				}, 250)
			});
			hammer.on("pan", function(s) {
				if(a) return !1;
				var width = slider.width(),
					wrapper = slider.find(".io-ls-wrapper"),
					pos = parseFloat(slider.attr("data-slider-pos")),
					count = parseFloat(slider.attr("data-slider-totalslides")),
					cycle = slider.attr("data-slider-with-cycle"),
					deltaX=s.deltaX,
					move = 100 / count * s.deltaX / $(window).innerWidth();
				io.lightslider.scrollImages(slider, width * pos - deltaX);
				if(s.isFinal){
					if(s.velocityX > 1){
						if(cycle == "false" && pos==1){pos=1}else{pos--}
						slider.attr("data-slider-pos", pos);
						io.lightslider.slideMove(slider);
					}else if(s.velocityX < -1){
						if(cycle == "false" && pos==count){pos=count}else{pos++}
						slider.attr("data-slider-pos", pos);
						io.lightslider.slideMove(slider);
					}else if(move <= -20 / count){
						if(cycle == "false" && pos==count){pos=count}else{pos++}
						slider.attr("data-slider-pos", pos);
						io.lightslider.slideMove(slider);
					}else if(move >= 20 / count){
						if(cycle == "false" && pos==1){pos=1}else{pos--}
						slider.attr("data-slider-pos", pos);
						io.lightslider.slideMove(slider);
					}else{
						io.lightslider.slideMove(slider);
					}
				}
			})
		},
		scrollImages: function(slider, pixels){
			var move = (pixels < 0 ? "" : "-") + Math.abs(pixels).toString();
			slider.find(".io-ls-wrapper").css("transform", "translate3d(" + move + "px, 0, 0)")
		},
		executeOnceAtTheMoment: function(script, duration, environment){
			var point, execute;
			return duration || (duration = 250),
			function() {
				var s_environment = environment || this,
					datetime = +new Date,
					s_arguments = arguments;
				if(point && datetime < (point + duration)){
					clearTimeout(execute);
					execute = setTimeout(function() {
						point = datetime;
						script.apply(s_environment, s_arguments);
					}, duration);
				}else{
					point = datetime;
					script.apply(s_environment, s_arguments);
				}
			}
		},
	};
}();