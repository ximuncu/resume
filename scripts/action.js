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