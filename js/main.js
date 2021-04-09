let time = 0;
let swimmingAnimation;
let blockAnimation;
let attackAnimation;
let gameBackground;
let gameFont;
let hpBar;
let coin;
let shark;
let heart;
let gem;
let hitPoints = 4;
let score = 0;
let gameOver = false;
let nextShark = 0;
let sharkMinWait = 500;
let sharkInterval = 500;
let nextGem = 300;
let gemMinWait = 200;
let gemInterval = 300;
let nextCoin = 200;
let coinMinWait = 200;
let coinInterval = 200;
let hero;
let sharkGroup;
let gemGroup;
let coinGroup;
let heartGroup;

function setup() {
  createCanvas(1750, 900);
  background(200, 200, 200);
  sharkGroup = new Group;
  gemGroup = new Group;
  coinGroup = new Group;
  heartGroup = new Group;
  hero = createSprite(0, height/2, 280, 93);
  hero.depth = 4;
  hero.setDefaultCollider();
  hero.addAnimation('swim', swimmingAnimation);
  hero.addAnimation('attack', attackAnimation);
  hero.addAnimation('block', blockAnimation);
}

function preload() {
 swimmingAnimation = loadAnimation(
   'https://nszafranek.github.io/project/img/mermove1.png',
   'https://nszafranek.github.io/project/img/mermove2.png',
 );
 blockAnimation = loadAnimation(
   'https://nszafranek.github.io/project/img/merblock1.png',
   'https://nszafranek.github.io/project/img/merblock2.png',
 );
 attackAnimation - loadAnimation(
   'https://nszafranek.github.io/project/img/merblock1.png',
   'https://nszafranek.github.io/project/img/merattack2.png',
 );
 gameBackground = loadImage('https://nszafranek.github.io/project/img/background.png');
 sharkSprite = loadImage('https://nszafranek.github.io/project/img/sharkreg.png')
 coinIcon = loadImage('https://nszafranek.github.io/project/img/coin.png')
 heartIcon = loadImage('https://nszafranek.github.io/project/img/heart.png')
 gemIcon = loadImage('https://nszafranek.github.io/project/img/gem.png')
}

function draw() {
  if (!gameOver) {
    background(200);
    hero.collide(sharkGroup, hpLoss);
    hero.collide(gemGroup, gemGet);
    hero.collide(coinGroup, coinGet);
    hero.collide(heartGroup, heartGet);
    heroMove();
    timing();
    drawSprites();
  }
  if(gameOver) {

  }
}

function scoreSeconds() {
  //1 pt per second
  score += 1
}

function hpLoss() {
    //lose 1 hp per hit
    hitPoints = hitPoints - 1;
    // If the Hero was at full health
    if (hitPoints == 3) {
      let hpChange = document.getElementById('hp');
      element.classList.remove("hpFull");
      element.classList.add("hp3")
    }
    //If hero had 3 health
    else if (hitPoints == 2) {
      let hpChange = document.getElementById('hp');
      element.classList.remove("hp3");
      element.classList.add("hp2")
    }
    //If hero had 2 health
    else if (hitPoints == 1) {
      let hpChange = document.getElementById('hp');
      element.classList.remove("hp2");
      element.classList.add("hp1")
    }
    //If hero had one health
    else {
      gameOver = true;
    }
}

function timing() {
  //Counter for item spawn
  //When next Shark will spawn
  if (time == nextShark) {
    createNewShark();
    nextShark = Math.ceil(Math.random() * sharkInterval + sharkMinWait) + nextShark;
  }
  //When next Gem will spawn
  if (time == nextGem) {
    createNewGem();
    nextGem = Math.ceil(Math.random() * gemInterval + gemMinWait) + nextGem;
  }
  //When next Coin will spawn
  if (time == nextCoin) {
    createNewCoin();
    nextGem = Math.ceil(Math.random() * coinInterval + coinMinWait) + nextCoin;
  }

  time++;

};

function heroMove() {
  if (keyWentDown(UP_ARROW)) {
    hero.velocity.y = -0.5;
  }
  else if (keyWentDown(DOWN_ARROW)) {
    hero.velocity.y = 0.5;
  }
}

function createNewShark() {
  // spawn a new shark
  shark = createSprite(width, random(0, height), 280, 93);
  shark.collide(hero);
  shark.velocity.y = 0;
  shark.velocity.x = -3;
  shark.addAnimation('default', sharkSprite);
  shark.depth =1;
  sharkGroup.add(shark);
}

function removeOldShark() {
    //despawn shark that has left the canvas
 for(var i = 0; i<sharkGroup; i++){
   if ((sharkGroup[i].position.x) < hero.position.x-width) {
     sharkGroup[i].remove();
   }
 }
}

function createNewGem() {
  // spawn a new gem
  gem = createSprite(width, random(0, height), 119, 109);
  gem.velocity.y = 0;
  gem.velocity.x = -3;
  gem.collide(hero);
  gem.addAnimation('default', gemIcon);
  gem.depth =1;
  gemGroup.add(gem);
}

function removeOldGem() {
  //despawn gem that has left the canvas
 for(var i = 0; i<gemGroup; i++){
   if ((gemGroup[i].position.x) < hero.position.x-width) {
     gemGroup[i].remove();
   }
 }
}

function createNewCoin() {
  // spawn a new coin
  coin = createSprite(width, random(0, height), 68, 69);
  coin.velocity.y = 0;
  coin.velocity.x = -3;
  coin.collide(hero);
  coin.addAnimation('default', coinIcon);
  coin.depth =1;
  coinGroup.add(coin);
}

function removeOldCoin() {
  //despawn coin that has left the canvas
 for(var i = 0; i<coinGroup; i++){
   if ((coinGroup[i].position.x) < hero.position.x-width) {
     coinGroup[i].remove();
   }
 }
}

function createNewHeart() {
  //spawn new heart
  heart = createSprite(width, random(0, height), 40, 40);
  heart.velocity.y = 0;
  heart.velocity.x = -3;
  heart.collide(hero);
  heart.addAnimation('default', heartIcon);
  heart.depth =1;
  heartGroup.add(heart);
}

function removeOldHeart() {
  //despawn heart that has left the canvas
 for(var i = 0; i<heartGroup; i++){
   if ((heartGroup[i].position.x) < hero.position.x-width) {
     heartGroup[i].remove();
   }
 }
}

function gemGet() {
  //Gem procured
  //add 50 points to score
  score = score + 50;
  //add 1 gem to count
  gemCount = gemCount + 1;
}

function coinGet() {
  //Coin procured
  //add 10 points to score
  score = score + 10;
  //add 1 coin to count
  coinCount = coinCount + 1;
}


function heartGet() {
  //Heart procured
  //Gain HP
  lifeGain();
}

function lifeGain() {
  if (hp == 4) {

  }
  else if (hitPoints <= 3) {
    hitPoints += 1
    if (hitPoints == 4) {

    }
    else if (hitPoints == 3) {

    }
    else if (hitPoints == 2) {

    }
  }

}
