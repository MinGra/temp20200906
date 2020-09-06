// Initial Setup
var config = {
    windowWidth : 800,
    windowHeight : 600,
    heartColor : '#ff0000',
    radius : 0,
    baseTime : '2020-02-22',
    title : '亲爱的阿见，此刻是我们在一起的第 '
}

var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = config.windowWidth;
canvas.height = config.windowHeight;


function Particle(radius, color) {
    var _this = this;
	var distance = 120;
   
    this.radius = radius;
    this.color = color;
    this.radians = 1.5 * Math.PI;
    this.velocity = 0.05;
    this.distanceFromCenter = {
        x: distance + Math.sin(_this.radians) * distance,
        y: distance + Math.sin(_this.radians) * distance
    };
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.update = function() {
        var lastPoint = {
            x: _this.x,
            y: _this.y
        };
        // Move points over time
        _this.radians += _this.velocity;

        // Circular Motion
        _this.distanceFromCenter.x = distance + Math.sin(_this.radians) * distance;
        _this.distanceFromCenter.y = distance + Math.sin(_this.radians) * distance;
        _this.x = canvas.width / 2 + Math.cos(_this.radians) * _this.distanceFromCenter.x;
        _this.y = canvas.height / 2 + Math.sin(_this.radians) * _this.distanceFromCenter.y;

        _this.draw(lastPoint);
    };

    this.draw = function(lastPoint) {
        // 设置绘制颜色
        c.fillStyle = "#0000FF";
        // 画心脏线原点
        c.fillRect(canvas.width / 2 -2, canvas.height / 2 -2, 4, 4);
    
        // 设置字体样式
        c.font = "16px bold 宋体";
        // 绘制文字
        c.fillText(new Date().getMilliseconds() - new Date(config.baseTime).getTime(), 100, 200);
        // 画爱心
        c.beginPath();
        c.strokeStyle = _this.color;
        c.lineWidth = _this.radius;
        c.moveTo(lastPoint.x, lastPoint.y);
        c.lineTo(_this.x, _this.y);
        c.stroke();
        c.closePath();
    };
}

// Implementation
var particle = undefined;

function init() {
    particle = new Particle(config.radius, config.heartColor);
}

// Animation Loop
function animate() {
    requestAnimationFrame(animate);
    c.fillStyle = 'rgba(255, 255, 255, 0.05)';
    c.fillRect(0, 0, canvas.width, canvas.height);
    particle.update();
}

init();
animate();