R.Dot = function(x, y, r) {
	//构造一个新的Dot对象，p存储该当前点的信息
	this.p = new R.Point({
		x: x,
		y: y,
		r: r
	});
	//颜色,默认白色
	this.c = new R.Color(255, 255, 255, 1);
	//路径关键点
	this.r = [];
	//自由点
	this.f = false;
};

R.Dot.prototype = {
	/**
	 * 绘制
	 */
	_draw: function() {
		R.Drawing.drawCircle(this.p, this.c);
	},

	/**
	 * 返回两个点之间的差值
	 */
	_distance: function(p) {
		var now = this.p;
		return {
			dx: p.x - now.x,
			dy: p.y - now.y,
			dr: p.r - now.r
		}
	},

	/**
	 * 更新点信息
	 */
	_update: function() {
		var now = this.p,
			r = this.r;
		//取 数组 r 中的 元素
		if (r.length) {
			var p = r[0],
				d = this._distance(p),
				//前进比例
				v = p.v;
			//如果相差值比1大 继续前进，其他情况表示此次动画完成将其从 r数组中清除
			if (Math.max.call(null, Math.abs(d.dx), Math.abs(d.dy), Math.abs(d.dr)) > 1) {
				now.x += d.dx * v;
				now.y += d.dy * v;
				now.r += d.dr * v;
				this.c = new R.Color(255, 255, 255, p.a);
			} else {
				r.shift();
			}
		} else {
			if (this.f) {
				//自由点让其随机到一个地方
				r.push(new R.Point({
					x: now.x + (Math.random() - 0.5) * 80,
					y: now.y + (Math.random() - 0.5) * 80,
					r: now.r,
					a: 0.35,
					v: 0.12
				}));
				r.push(new R.Point({
					x: now.x + (Math.random() - 0.5) * 20,
					y: now.y + (Math.random() - 0.5) * 20,
					r: now.r,
					a: 0.35,
					v: 0.12
				}))
			}
		}


	},

	/**
	 * 当前点移动到某个点，需要经过两个关键点，点放大，终点
	 * flag true 表示是自由点
	 */
	move: function(p, flag) {
		// 如果本身是自由点设置到自由不做处理
		if (flag && this.f) {
			return;
		} else {
			this.f = flag;
		}
		//点放大
		this.r.push(new R.Point({
			x: this.p.x,
			y: this.p.y,
			r: 10 + 10 * Math.random(),
			a: p.a || a
		}));

		//目的地点
		this.r.push(p);
	},

	/**
	 * 渲染该点
	 */
	render: function() {
		//更新后，绘制
		this._update();
		this._draw();
	}

};