/**
 * 颜色构造方法
 */
R.Color = function(r, g, b, a) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.a = a;
};

/**
 * 返回一种颜色
 */
R.Color.prototype = {
	render: function() {
		return 'rgba(' + this.r + ',' + this.g + ',' + this.b + ',' + this.a + ')';
	}
};