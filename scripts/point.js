/**
 * 点构造器
 */
R.Point = function(args) {
	this.x = args.x;
	this.y = args.y;
	this.r = args.r;
	//透明度，默认是 1
	this.a = args.a || 1;
	//点的速度,移动的比例 默认0.4
	this.v = args.v || 0.4;
};