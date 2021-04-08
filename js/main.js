let swimmingAnimation;
let blockAnimation;
let attackAnimation;
let gameBackground;
let gameFont;
let hpBar;
let coin;
let shark;

function setup() {
  createCanvas(840, 390);
  background(200, 200, 200);
  hero = createSprite(50,100,25,40);
  hero.depth = 4;
  hero.setCollider('rectangle', 0, 0, 10, 41);
  hero.addAnimation('swim', swimmingAnimation);
  hero.addAnimation('attack', attackAnimation);
  hero.addAnimation('block', blockAnimation);
}
function preload() {
 swimmingAnimation = loadAnimation(
   'img/mermove1.png',
   'img/mermove2.png',
 );
 blockAnimation = loadAnimation(
   'img/merblock1.png',
   'img/merblock2.png',
 )
 attackAnimation - loadAnimation(
   'img/merattack1.png',
   'img/merattack2.png',
 )
}

function draw() {
  background(200);
  drawSprites();
}
