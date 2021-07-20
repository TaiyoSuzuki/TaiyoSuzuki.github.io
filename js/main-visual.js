(function() {
    'use strict';
  
    let canvas = document.getElementById('mycanvas');
    let ctx = canvas.getContext('2d');
    let canvasWrap = document.getElementById('canvas_wrap');

    let Ball;
    let balls = [];
  
    if (!canvas || !canvas.getContext) return false;
  
    function rand(min, max) {
      return min + Math.floor(Math.random() * (max - min + 1));
    }
  
    window.addEventListener('load', function() {
      for(let i = 0; i < 20; i++) {
        let x, y, r;
        // x = rand(100, 1000);
        // y = rand(100, 600);
        x = rand(0, 1000);
        y = rand(0, 500);
        r = rand(0, 100) < 30 ? rand(60, 100) : rand(50, 60);
        // r = rand(0, 100) < 30 ? rand(30, 40) : rand(20, 25);
  
        if (x - r < 0) x = r;
        if (y - r < 0) y = r;
        if (x + r > canvas.width) x = canvas.width - r;
        if (y + r > canvas.height) y = canvas.height - r;
  
        balls.push(new Ball(x, y, r));
      }
    });
  
    Ball = function(x, y, r) {
      this.x = x;
      this.y = y;
      this.r = r;
      // this.vx = rand(-5, 5);
      // this.vy = rand(-5, 5);
      this.vx = rand(-3, 3);
      this.vy = rand(-3, 3);
      while(this.vx === 0) {
        this.vx = rand(-5, 5);
      }
      this.color = `hsla(${rand(0, 100) < 20  ? rand(0, 30) : rand(180, 240)}, ${rand(40, 80)}%, ${rand(50, 60)}%, ${Math.random()})`;
      this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
        ctx.fillStyle = this.color;
        ctx.closePath();
        ctx.fill();
      };
      this.move = function() {
        if (this.x + this.r > canvas.width || this.x - this.r < 0) {
          this.vx *= -1;
        }
        if (this.y + this.r > canvas.height || this.y - this.r < 0) {
          this.vy *= -1;
        }
        this.x += this.vx;
        this.y += this.vy;
      }
    };
  
    let ball = new Ball(rand(100, 200), rand(100, 200), rand(10, 50));
    ball.draw();
  
    function update() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < balls.length; i++) {
        balls[i].draw();
        balls[i].move();
      }
      setTimeout(function() {
        update();
      }, 30);
    }
  
    update();
})();