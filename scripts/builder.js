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