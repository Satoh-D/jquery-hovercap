;(function($, window, document, undefined) {

	var pluginName = 'hovercap',
			defaults = {
				toggleElement: '',
				toggleAnimation: 'slide',
				toggleDirection: 'toTop',
				animationSpeed: 200,
				animationEasing: 'swing',
				onSetup: function() {},
				onShow: function() {},
				onHide: function() {}
			};

	function Plugin(element, options) {
		this.element = element;
		this.settings = $.extend({}, defaults, options);
		this._defualts = defaults;
		this._name = pluginName;

		this.init();
	}

	Plugin.prototype.init = function() {
		var self = this;

		self.$element = $(self.element);
		self.$toggleElement = self.$element.find(self.settings.toggleElement);
		self.elementWidth = self.$element.outerWidth();
		self.elementHeight = self.$element.outerHeight();
		self.toggleElementProps = {};

		self.initToggleElement();

		self.$element.on({
			mouseenter: function() {
				if(self.settings.toggleAnimation == 'fade') {
					self.fadeShowElement();
					return;
				}
				self.slideShowElement();
			},
			mouseleave: function() {
				if(self.settings.toggleAnimation == 'fade') {
					self.fadeHideElement();
					return;
				}
				self.slideHideElement();
			}
		});
	}

	Plugin.prototype.initToggleElement = function() {
		var self = this;

		if(self.settings.toggleAnimation == 'slide') {
			switch(self.settings.toggleDirection) {
				case 'toRight':
					self.toggleElementProps = {
						top: 0,
						left: -self.elementWidth
					}
					break;
				case 'toBottom':
					self.toggleElementProps = {
						top: -self.elementHeight,
						left: 0
					}
					break;
				case 'toLeft':
					self.toggleElementProps = {
						top: 0,
						left: self.elementWidth
					}
					break;
				default:
					// default == toTop
					self.toggleElementProps = {
						top: self.elementHeight,
						left: 0
					}
					break;
			}
		}

		if(self.settings.toggleAnimation == 'fade') {
			self.toggleElementProps = {
				top: 0,
				left: 0,
				display: 'none'
			}
		}

		self.$toggleElement.css(self.toggleElementProps);
		self.settings.onSetup();
	}

	Plugin.prototype.fadeToggleElement = function() {
		var self = this;

		self.$toggleElement
			.stop()
			.fadeToggle(self.settings.animationSpeed, function() {
				self.settings.callBack();
			});
	}

	Plugin.prototype.fadeShowElement = function() {
		var self = this;

		self.$toggleElement
			.stop()
			.fadeIn(
				self.settings.animationSpeed,
				self.settings.animationEasing,
				function() { self.settings.onShow(); });
	}

	Plugin.prototype.fadeHideElement = function() {
		var self = this;

		self.$toggleElement
			.stop()
			.fadeOut(
				self.settings.animationSpeed,
				self.settings.animationEasing,
				function() { self.settings.onShow(); });
	}

	Plugin.prototype.slideShowElement = function() {
		var self = this;

		switch(self.settings.toggleDirection) {
			case 'toRight':
			case 'toLeft':
				self.toggleElementProps.left = 0;
				break;
			default:
				self.toggleElementProps.top = 0;
				break;
		}

		self.$toggleElement
			.stop()
			.animate(
				self.toggleElementProps,
				self.settings.animationSpeed,
				self.settings.animationEasing,
				function() { self.settings.onShow(); });
	}

	Plugin.prototype.slideHideElement = function() {
		var self = this;

		switch(self.settings.toggleDirection) {
			case 'toRight':
				self.toggleElementProps.left = -self.elementWidth;
				break;
			case 'toBottom':
				self.toggleElementProps.top = -self.elementHeight;
				break;
			case 'toLeft':
				self.toggleElementProps.left = self.elementWidth;
				break;
			default:
				self.toggleElementProps.top = self.elementHeight;
				break;
		}

		self.$toggleElement
			.stop()
			.animate(
				self.toggleElementProps,
				self.settings.animationSpeed,
				self.settings.animationEasing,
				function() { self.settings.onHide(); });
	}

	$.fn[pluginName] = function(options) {
		this.each(function() {
			if(!$.data(this, 'plugin_' + pluginName)) {
				$.data(this, 'plugin_' + pluginName, new Plugin(this, options));
			}
		});

		return this;
	}

})($, window, document, undefined);
