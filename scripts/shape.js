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