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
R.Drawing = (function() {
  var canvas,
    context,
    //循环方法
    renderFn,
    //循环
    frame = function(callback) {
      window.setTimeout(callback, 1000 / 30);
    };

  /**
   * init 方法
   */

  function init(el) {
    canvas = document.querySelector(el);
    context = canvas.getContext('2d');
    this.adjustCanvas();

    window.addEventListener('resize', function() {
      R.Drawing.adjustCanvas();
    });
  }

  /**
   * 循环方法
   */

  function loop(fn) {
    renderFn = !renderFn ? fn : renderFn;
    this.clearFrame();
    renderFn();
    frame.call(window, this.loop.bind(this));
  }

  /**
   * 清屏
   */

  function clearFrame() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * 适应屏
   */

  function adjustCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  /**
   * 绘制圆点
   */

  function drawCircle(p, c) {
    context.fillStyle = c.render();
    context.beginPath();
    context.arc(p.x, p.y, p.r, 0, 2 * Math.PI, true);
    context.closePath();
    context.fill();
  }
  /**
   * 返回canvas大小
   */

  function getArea() {
    return {
      w: canvas.width,
      h: canvas.height
    };
  }


  return {
    init: init,
    loop: loop,
    clearFrame: clearFrame,
    adjustCanvas: adjustCanvas,
    drawCircle: drawCircle,
    getArea: getArea,
  };
}());
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
/**
 * 处理命令
 */
R.Action = (function() {
	function doActions(obj) {
		//切换图形方法及创建文字方法
		var switchShape = R.Shape.switchShape,
		    builderLetter = R.Builder.letter;
		//如果啥也没有输入
		if (!obj.length) {
			switchShape(builderLetter("啥也木有!"));
			return;
		}
		//循环需要处理的命令
		var time = setInterval(function() {
			//如果没有了
			if (!obj.length) {
				clearInterval(time);
				switchShape(builderLetter(""));
				return;
			}
			//取命令
			var shape = obj.shift(),
				cmd = shape.cmd,
				value = shape.value;
			//根据命令分支
			switch (cmd) {
				//文字，时间，倒计时，矩形，五角星
				case "word":
					switchShape(builderLetter(value));
					break;
				case "time":
					var date = new Date();
					switchShape(builderLetter(date.getHours() + ":" + date.getMinutes()));

					break;
				case "countdown":
					clearInterval(time);
					var t = setInterval(function() {
						if (0 === value) {
							switchShape(builderLetter("Time out!"));
							clearInterval(t);
							doActions(obj);
							return;
						}
						switchShape(builderLetter(value--));
					}, 1000);
					break;
				case "rect":
					switchShape(R.Builder.rect());
					break;
				case "star":
					switchShape(R.Builder.star());
					break;
				default:
					switchShape(builderLetter("啥?"));

			}
		}, 3000)

	}
	return {
		doActions: doActions
	}

})()
/**
 * 构造器，用来生成组成图形的元素点的集合
 */
R.Builder = (function() {
	//定义元素点的大小
	var gap = 13,
		//创建一个canvas绘制图形
		shapeCanvas = document.createElement('canvas'),
		shapeContext = shapeCanvas.getContext('2d'),
		fontSize = 500,
		fontFamily = 'Microsoft YaHei';

	/**
	 * 适应宽度，计算组成图形的元素点时方便计算
	 */

	function fit() {
		shapeCanvas.width = Math.floor(window.innerWidth / gap) * gap;
		shapeCanvas.height = Math.floor(window.innerHeight / gap) * gap;
		shapeContext.fillStyle = 'red';
		shapeContext.textBaseline = 'middle';
		shapeContext.textAlign = 'center';
	}
	/**
	 * 设置字体
	 */

	function setFontSize(s) {
		shapeContext.font = s + 'px ' + fontFamily;
	}
	/**
	 * 判断数字
	 */

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	/**
	 * 返回点集合
	 */

	function builderPoints() {
		//像素点
		var pixels = shapeContext.getImageData(0, 0, shapeCanvas.width, shapeCanvas.height).data,
			points = [],
			x = 0,
			y = 0;
		//每割gap个像素点查看一下是否是红色，是则记录其位置
		for (var p = 0; p < pixels.length; p += (4 * gap)) {
			if (pixels[p + 3] > 0) {
				points.push(new R.Point({
					x: x,
					y: y,
					r: 5
				}));
			}

			x += gap;

			if (x >= shapeCanvas.width) {
				x = 0;
				y += gap;
				p += gap * 4 * shapeCanvas.width;
			}
		}
		//返回组成该图形的点集合
		return {
			points: points
		};
	}

	/**
	 * 文字的处理方法
	 */

	function letter(word) {
		var s = 0;

		//设置文字大小
		setFontSize(fontSize);
		s = Math.min(fontSize, (shapeCanvas.width / shapeContext.measureText(word).width) * 1 * fontSize, (shapeCanvas.height / fontSize) * (isNumber(word) ? 0.8 : 0.3) * fontSize);
		setFontSize(s);

		shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
		shapeContext.fillText(word, shapeCanvas.width / 2, shapeCanvas.height / 2);

		return builderPoints();
	}
	/**
	 * 矩形处理方法
	 */

	function rect() {

		shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
		shapeContext.fillRect(shapeCanvas.width / 2 - 150, shapeCanvas.height / 2 - 100, 300, 200);

		return builderPoints();
	}
	/**
	 * 画个五角星
	 */
	function star() {
		shapeContext.clearRect(0, 0, shapeCanvas.width, shapeCanvas.height);
		var x = shapeCanvas.width / 2,
			y = shapeCanvas.height / 2 - 140;
		shapeContext.beginPath();
		//x1、h2为五角星的底部点坐标偏差值，x2、h2为五角星上部点偏差值  
		var x1 = 400 * Math.sin(Math.PI / 10);
		var h1 = 400 * Math.cos(Math.PI / 10);
		var x2 = 200;
		var h2 = 200 * Math.tan(Math.PI / 5);
		shapeContext.lineTo(x + x1, y + h1);
		shapeContext.lineTo(x - 200, y + h2);
		shapeContext.lineTo(x + 200, y + h2);
		shapeContext.lineTo(x - x1, y + h1);
		shapeContext.lineTo(x - x1, y + h1);
		shapeContext.lineTo(x, y);
		shapeContext.closePath();
		shapeContext.fill();

		return builderPoints();
	}
	return {
		init: fit,
		letter: letter,
		rect: rect,
		star: star
	}
})()
/**
 * 形状对象,含有切换形状的方法及渲染方法
 */
R.Shape = (function() {
  //存储所有绘制的圆点信息
  var dots = [];

  /**
   * 切换图形,points为需要切换到的点集合
   */

  function switchShape(n) {

    var pLength = n.points.length,
      dLength = dots.length,
      length = pLength - dLength,
      can = R.Drawing.getArea(),
      i = 0;


    //dot不够时需要新增点
    if (length > 0) {
      for (i = 0; i < length; i++) {
        dots.push(new R.Dot(can.w / 2, can.h / 2, 5));
      }
    }

    // //打乱一下顺序
    // dots.sort(function() {
    //   return 0.5 - Math.random()
    // })

    //让dot移动到某个点
    for (i = pLength - 1; i >= 0; i--) {
      dots[i].move(n.points[i], false);
    }

    //自由点让其到随意一个位置
    if (length < 0) {
      for (i = pLength; i < dLength; i++) {
        dots[i].move(new R.Point({
          x: can.w * Math.random(),
          y: can.h * Math.random(),
          r: 1 +  Math.random() * 3,
          a: 0.35
        }), true);
      }
    }

  }

  /**
   * 点渲染
   */

  function render() {
    var i;
    for (i = dots.length - 1; i >= 0; i--) {
      dots[i].render();
    }
  }
  return {
    switchShape: switchShape,
    render: render
  }
}());