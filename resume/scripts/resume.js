'use strict';
var R = {
	/**
	 * init方法
	 */
	init: function() {
		R.Drawing.init('.canvas');
		R.Builder.init();
		//传递一个数组
		R.Shape.switchShape(R.Builder.letter("开始吧!"));
		R.Action.doActions([{
			cmd: "word",
			value: "倒数计时"
		}, {
			cmd: "countdown",
			value: "5"
		}, {
			cmd: "word",
			value: "then?"
		}, {
			cmd: "word",
			value: "nothing!"
		}, {
			cmd: "word",
			value: "FAQ:"
		}, {
			cmd: "word",
			value: "name?"
		}, {
			cmd: "word",
			value: "刘乾"
		}, {
			cmd: "word",
			value: "blog?"
		}, {
			cmd: "word",
			value: "www.cnblogs.com"
		}, {
			cmd: "word",
			value: "/ximuncu/"
		}, {
			cmd: "word",
			value: "现在时间?"
		}, {
			cmd: "time",
			value: ""
		}, {
			cmd: "word",
			value: "矩形?"
		}, {
			cmd: "rect",
			value: ""
		}, {
			cmd: "word",
			value: "五角星?"
		}, {
			cmd: "star",
			value: ""
		}, {
			cmd: "word",
			value: "more?"
		}, {
			cmd: "word",
			value: "@me"
		}, {
			cmd: "word",
			value: "Thank you!"
		}]);
		R.Drawing.loop(function() {
			R.Shape.render();
		});
	}
};

/**
 * 添加事件监听
 */
window.addEventListener('load', function() {
	R.init();
});