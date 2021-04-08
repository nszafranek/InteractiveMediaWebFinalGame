const ctx = document.querySelector("canvas").getContext("2d");

let canvasHeight = ctx.canvas.height = 400;
let canvasWidth = ctx.canvas.width = 1220;

let heroSprite = new Image();
heroSprite.src = "./img/mermovesheet.svg";
let bg = new Image();
bg.src = "./img/background.svg"
let sharkSprite =  new Image();
sharkSprite.src = "./img/sharkreg.svg"
let coinIcon = new Image();
coinIcon.src = "./img/coin.svg";
let gemIcon = new Image();
gemIcon.src = "./img/gem.svg";
let hpfullbar = new Image();
hpfullbar.src = "./img/4health.svg";
let hp3bar = new Image();
hp3bar.src = "./img/3health.svg";
let hp2bar = new Image();
hp2bar.src = "./img/2health.svg";
let hp1bar = new Image();
hp1bar.src = "./img/1health.svg";

window.requestAnimationFrame = function() {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		function(f) {
			window.setTimeout(f,1e3/60);
		}
}();

let bgVelocity = 0;

function renderBG() {
  window.requestAnimationFrame(renderGame);

ctx.clearRect(0, 0, W, H);

ctx.fillStyle = '#333';
ctx.fillRect(0, 0, 500, 400);

ctx.drawImage(bg, bgVelocity, 50);
ctx.drawImage(bg, bg.width-Math.abs(vx), 50);

if (Math.abs(bgVelocity) > bg.width) {
  vx = 0;
};

const scale = .25;
const width = 799;
const height = 300;
const scaledWidth = scale * width;
const scaledHeight = scale * height;

function drawFrame(frameX, frameY, canvasX, canvasY) {
  ctx.drawImage(heroSprite,
                frameX * width, frameY * height, width, height,
                canvasX, canvasY, scaledWidth, scaledHeight);
}

function init() {
  drawFrame(0, 0, 0, 0);
  drawFrame(1, 0, scaledWidth, 0);
  drawFrame(0, 0, scaledWidth * 2, 0);
  drawFrame(2, 0, scaledWidth * 3, 0);
}

window.requestAnimationFrame(swim);

function swim() {
  window.requestAnimFrame(swim);
}


const hero = {
  x : 0,
  xVelocity : 0,
  y : 0,
  yVelocity : 0,
};

const controller = {  left: false,
  right: false,
  up: false,  keyListener: function (event) {    let key_state = (event.type == "keydown") ? true : false;    switch (event.keyCode) {
      case 37: // left arrow
        controller.left = key_state;
        break;
      case 38: // up arrow
        controller.up = key_state;
        break;
      case 39: // right arrow
        controller.right = key_state;
        break;
      case 40: //down arrow key
        controller.down = key_state;
        break;
    }
  }
};
  const loop = function () {
    if (controller.up) {
      hero.yVelocity -= 0.5;
    }
    if (controller.down) {
      hero.yVelocity +=0.5;
    }
    if (controller.left) {
      hero.xVelocity -= 0.5;
    }
    if (controller.right) {
      hero.xVelocity += 0.5;
    }

    hero.yVelocity += 0;
  //friction
    hero.xVelocity *= 0.9;
    hero.yVelocity *= 0.9;

  // if the hero is falling below floor line, then:
    if (hero.y > 386 - 16 - 32) {
      hero.jumping = false;
      hero.y = 386 - 16 - 32;
      hero.yVelocity = 0;
    }
    if (hero.x < -20) {
      hero.x = 1220;  }
  // if the hero goes off the right
    else if (hero.x > 1220) {
      hero.x = -20;
    //render background
    renderBG();
    //render player
    }
  }
window.requestAnimationFrame(loop);
