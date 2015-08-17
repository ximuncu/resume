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