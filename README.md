# [io.lightslider][io.lightslider-link]
> A light jQuery library for slideshow. 


## Usage
For using io.lightslider you need connect jQuery and Hammer.js library in your code.
```html
<script src="//code.jquery.com/jquery-1.12.3.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/hammer.js/2.0.8/hammer.min.js"></script>	
</script>
```
Connect io.lightslider:
```html
<script src="./dist/io.lightslider.min.js"></script>
<link rel="stylesheet" href="./dist/io.lightslider.min.css" />
```
Then put in your code this template:
```html
<div id="myslider" class="io-lightslider io-ls-animated-slow">
	<div class="io-ls-field">
		<div class="io-ls-container">
			<div class="io-ls-wrapper">
				<div class="io-ls-slide">
					<!--slide1 contain-->
				</div><div class="io-ls-slide">
					<!--slide2 contain-->
				</div><div class="io-ls-slide">
					<!--slide3 contain-->
				</div>
			</div>
		</div>
	</div>
	<div class="io-ls-controls">
		<div class="io-ls-arrows_container"></div>
		<div class="io-ls-bullet_container"></div>
	</div>
</div>
<script>$(function(){io.lightslider.init('#myslider');});</script>

```
In this template you can change next parts:
* id="myslider" - 'myslider' - identificator of your slider;
* 'io-ls-animated-slow' - type of animation, can be 'io-ls-animated-slow'/'io-ls-animated-fast'/'io-ls-animated-none', more in Configuration;
* you can add configuration options in slider main tag, more in Configurations;
* &lt;!--slide{1,2,3} contain--&gt; - put here contant of your slides, it can be anything;
* &lt;div class="io-ls-arrows_container"&gt;&lt;/div&gt; - you can delete this tag if you don't want show navigative arrows on your slider;
* &lt;div class="io-ls-arrows_container"&gt;&lt;/div&gt; - you can add class 'io-ls-arrow-withbg' to this tag, more in Configurations;
* &lt;div class="io-ls-bullet_container"&gt;&lt;/div&gt; - you can delete this tag if you don't want show navigative bullet on your slider;
* &lt;div class="io-ls-bullet_container"&gt;&lt;/div&gt; - you can add class 'io-ls-static' to this tag, more in Configurations;

> Attention: Slider have default fixed height (600px), it not adaptive to slides contant. You need mark height or use some height option, more in Configurations;

Example of '&lt;!--slide1 contain--&gt;':
```html
<div class="io-ls-bgimg" style="background-image: url('https://github.com/semilicon/io.lightslider/demo/img/img1.jpg');"></div>
```


## Configurations
Slider have several important options that are often in demand.

This option adds to main slider tag like attributes:

* data-slider-height="400" - set slider height in 'px', dafault: 600;
* data-slider-window-height="true" - set slider height to window height (ignor option data-slider-height), dafault: false;
* data-slider-first-turn-height="true" - set slider height to put it in one (first) turn of page (ignor option data-slider-height and data-slider-window-height), dafault: false;
* data-slider-with-cycle="false" - cycle slider, dafault: true;
* data-slider-timeout="5000" - set autoPlay and autoPlay duration timeout in miliseconds, dafault: off;
* data-slider-autoplay-ignore-hover="true" - ignore hover for autoPlay hover pause, dafault: false;

Slider display can be changed with the following built-in classes.

For tag with class 'io-lightslider' you can use:

* 'io-ls-animated-slow' - slide slow speed scrolling;
* 'io-ls-animated-fast' - slide fast speed scrolling;
* 'io-ls-animated-none' - slide no scrolling, animated by fade in/out;

For tag with class 'io-ls-arrows_container' you can use:

* 'io-ls-arrow-withbg' - it create wrapper with bg around arrow;

For tag with class 'io-ls-bullet_container' you can use:

* 'io-ls-static' - put bullets under the slider (dafault: bullets on slider);


## Contributions
Feel encouraged to report issues or submit pull requests. When you're ready to do either, read our [contribution guidelines][contribution-guidelines].


## License
[MIT][license]


<!-- Contributions -->
[io.lightslider-link]: https://github.com/semilicon/io.lightslider/

[contribution-guidelines]: ./CONTRIBUTING.md

[license]: https://github.com/semilicon/io.lightslider/LICENSE.md
