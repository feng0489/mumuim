/**
	* 水波特效	wcRipple
	* @Create	andy
	* @Timer	2018/11/27 11:30:45 GMT+0800 (中国标准时间)
*/
!function(win){
	var _doc = win.document, _docEle = _doc.documentElement,
	util = {
		touch: function(o, fn){
			o.addEventListener("click", function(e){
				fn.call(this, e);
			}, !1);
		},
		// object扩展
		extend: function(target, source){
			for(var i in source){
				if(!(i in target)){
					target[i] = source[i];
				}
			}
			return target;
		},
		getPosition: function(e){
			var o = this.getBoundingClientRect(), _oMax = Math.max(o.width, o.height);
			return {
				range : _oMax,
				x: e.clientX - o.left - _oMax/2,
				y: e.clientY - o.top - _oMax/2
			}
		},
		addNewStyle: function(style){
			var styleEle = _doc.querySelector("#rippleStyle");
			if(!styleEle){
				styleEle = _doc.createElement("style");
				styleEle.type = "text/css";
				styleEle.id = "rippleStyle";
				_doc.getElementsByTagName("head")[0].appendChild(styleEle);
				
				styleEle.appendChild(_doc.createTextNode(style));
			}
		}
	},
	wcRipple = function(options){
		var _this = this,
			config = {
				elem: '.wc__ripple-effect',
				opacity : .5,
				speed : .6,
				bgColor : "#ffffff"
			};
		_this.opts = util.extend(options, config);
		_this.elements = _doc.querySelectorAll(_this.opts.elem);
		_this.init();
	};
	wcRipple.prototype = {
		init: function(){
			var _this = this, opt = _this.opts;
			
			//导入样式
			util.addNewStyle(".wc_ripple {border:1px solid red;position:absolute;background:rgba(0,0,0,.15);border-radius:100%; z-index:1001; transform:scale(0); -webkit-user-select:none;animation:ripple .6s ease-out;}@keyframes ripple {100% {transform:scale(2);opacity:0;}}");
			
			_this.elements.forEach(function(el, i){
				console.log(el);
				
				util.touch(el, function(e){
					e.stopPropagation();
					var j = util.getPosition.call(this, e);
					
					var o = this.querySelector(".wc_ripple");
					if(o){
						o.remove();
					}
					o = _doc.createElement("i");
					o.className = 'wc_ripple';
					o.style.left = j.x + "px";
					o.style.top = j.y + "px";
					o.style.width = o.style.height = j.range + "px";
					o.style.animationDuration = opt.speed + "s";
					o.style.background = opt.bgColor;
					o.style.opacity = opt.opacity;
					
					o.addEventListener("animationend", function () {
						this.parentNode.removeChild(this)
					}, !1);
					
					this.appendChild(o)
				});
			});
		}
	};
	
	var exports = (function(){
		//实例化函数
		fn = function(args){
			new wcRipple(args);
		}
		return fn;
	}());
	
	win.wcRipple = exports;
}(window);