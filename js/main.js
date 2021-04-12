let time = 0;
let swimming;
let blocking;
let attacking;
let gameBackground;
let gameFont;
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
let nextHeart;
let heartMinWait = 900;
let heartInterval = 900;
let nextCoin = 200;
let coinMinWait = 200;
let coinInterval = 200;
let gemCount = 0;
let coinCount = 0;
let hero;
let sharkGroup;
let sharkIdent
let gemGroup;
let coinGroup;
let coinIdent;
let heartGroup;
let heartIdent;
let x1 = 0;
let x2;
let scrollSpeed = 2;
let hpBar;
let hpBarFull;
let hpBar3;
let hpBar2;
let hpBar1;
let scoreElem;
let currentShark;
let lastShark;
let penShark;
let currentGem;
let lastGem;
let penGem;
let currentCoin;
let lastCoin;
let penCoin;
let currentHeart;
let lastHeart;
let penHeart;

function setup() {
  createCanvas(1750, 900);
  background(200, 200, 200);
  x2 = width;
  scoreOutput();
  sharkGroup = new Group;
  gemGroup = new Group;
  coinGroup = new Group;
  heartGroup = new Group;
  bgTiles = new Group;
  currentBGPos = new Group;
  hero = createSprite(150, height/2, 280, 93);
  hero.depth = 4;
  hero.friction = 0.001;
  hero.maxSpeed = 4;
  hero.setDefaultCollider();
  hero.addAnimation('swim', swimming);
  hero.addAnimation('attack', attacking);
  hero.addAnimation('block', blocking);
  hpBar = createSprite((width - 150), (height - 850), 638, 158);
  hpBar.addAnimation('full', hpbarFull);
  hpBar.addAnimation('3health', hpBar3);
  hpBar.addAnimation('2health', hpBar2);
  hpBar.addAnimation('1health', hpBar1);
}

function preload() {
  swimming = loadAnimation(
    'https://nszafranek.github.io/project/img/mermove1.png',
    'https://nszafranek.github.io/project/img/mermove2.png',
  );
  blocking = loadAnimation(
    'https://nszafranek.github.io/project/img/merblock1.png',
    'https://nszafranek.github.io/project/img/merblock2.png',
  );
  attacking - loadAnimation(
    'https://nszafranek.github.io/project/img/merblock1.png',
    'https://nszafranek.github.io/project/img/merattack2.png',
  );
 gameBackground = loadImage('https://nszafranek.github.io/project/img/background.png');
 sharkSprite = loadAnimation('https://nszafranek.github.io/project/img/sharkreg.png');
 coinIcon = loadAnimation('https://nszafranek.github.io/project/img/coin.png');
 heartIcon = loadAnimation('https://nszafranek.github.io/project/img/heart.png');
 gemIcon = loadAnimation('https://nszafranek.github.io/project/img/gem.png');
 hpbarFull = loadAnimation('https://nszafranek.github.io/project/img/4health.png');
 hpbar3 = loadAnimation('https://nszafranek.github.io/project/img/3health.png');
 hpbar2 = loadAnimation('https://nszafranek.github.io/project/img/2health.png');
 hpbar1 = loadAnimation('https://nszafranek.github.io/project/img/1health.png');
 gameFont = loadFont('https://nszafranek.github.io/project/img/SourceSansPro-Bold.ttf');
}

function draw() {
  if (!gameOver) {
    background(200);
    bgTiling();
    heroMove();
    timing();
    hero.overlap(sharkGroup);
    hero.overlap(gemGroup);
    hero.overlap(coinGroup);
    hero.overlap(heartGroup);
    collisionChecks();
    scoreUpdate();
    drawSprites();
  }
  if (gameOver) {
    gameOverText();
    updateSprites(false);
  }
}

// scrolling background from https://editor.p5js.org/chjno/sketches/ByZlypKWM
function bgTiling() {
  image(gameBackground, x1, 0, width, height);
  image(gameBackground, x2, 0, width, height);
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  if (x1 < -width){
    x1 = (width - 2);
  }
  if (x2 < -width){
   x2 = (width - 2);
  }
}

//seconds added to score

function scoreOutput() {
  scoreElem = createDiv('SCORE = 0');
  scoreElem.position(20, 20);
  scoreElem.id = 'score';
  scoreElem.style('color', 'white');
  scoreUpdate();
}

function scoreUpdate() {
  scoreElem.html('SCORE : ' + score);
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

  if (time == nextHeart) {
    createNewHeart();
    nextHeart = Math.ceil(Math.random() * heartInterval + heartMinWait) + nextGem;
  }

  time++;

};

function heroMove() {
  if (keyWentDown(UP_ARROW)) {
    hero.velocity.y = -1;
  }
  else if (keyWentDown(DOWN_ARROW)) {
    hero.velocity.y = 1;
  }
  else if (keyWentDown(LEFT_ARROW)) {
    hero.velocity.x = -1;
  }
  else if (keyWentDown(RIGHT_ARROW)) {
    hero.velocity.x = 1;
  }
}

function createNewShark() {
  // spawn a new shark
  if ((currentShark) && (lastShark)) {
    penShark = lastShark;
    lastShark = currentShark;
  }
  else if (currentShark){
    lastShark = currentShark;
  }
  shark = createSprite(width, random(0, height), 280, 93);
  shark.velocity.y = 0;
  shark.velocity.x = -3;
  shark.addAnimation('default', sharkSprite);
  shark.depth = 1;
  shark.setDefaultCollider;
  sharkGroup.add(shark);
  for (currentShark = 0; currentShark < sharkGroup.length; currentShark++) {
    console.log(currentShark);
  }
}

function removeOldShark() {
    //despawn shark that has left the canvas
 for (let i = 0; i<sharkGroup; i++) {
   if ((sharkGroup[i].position.x) < hero.position.x-width) {
     sharkGroup[i].remove();
   }
 }
}

function createNewGem() {
  //check if currentGem and lastGem are defined
  if ((currentGem) && (lastGem)) {
    penGem = lastGem;
    lastGem = currentGem;
  }
  else if (currentGem) {
    lastGem = currentGem;
  }
  // spawn a new gem
  gem = createSprite(width, random(0, height), 119, 109);
  gem.velocity.y = 0;
  gem.velocity.x = -3;
  gem.addAnimation('default', gemIcon);
  gem.depth = 1;
  gem.setDefaultCollider;
  gemGroup.add(gem);
  for (currentGem = 0; currentGem < gemGroup.length; currentGem++) {
    console.log(currentGem);
  }
}

function removeOldGem() {
  //despawn gem that has left the canvas
 for (let i = 0; i<gemGroup; i++) {
   if ((gemGroup[i].position.x) < 0) {
     gemGroup[i].remove();
   }
 }
}

function createNewCoin() {
  //Check if  currentCoin and lastCoin are defined
  if ((currentCoin) && (lastCoin)) {
    //if defined, save lastCoin as penCoin
    penCoin = lastCoin;
    lastCoin = currentCoin;
  }
  else if (currentCoin) {
    //save currentCoin as lastCoin
    lastCoin = currentCoin;
  }
  // spawn a new coin
  coin = createSprite(width, random(0, height), 68, 69);
  coin.velocity.y = 0;
  coin.velocity.x = 0;
  coin.addAnimation('default', coinIcon);
  coin.depth =1;
  coin.setDefaultCollider;
  coinGroup.add(coin);
  //(re)define currentCoin
  for (currentCoin = 0; currentCoin < coinGroup.length; currentCoin++) {
    console.log(currentCoin);
  }
}
function removeOldCoin() {
  //despawn coin that has left the canvas
 for (let i = 0; i < coinGroup; i++) {
   if ((coinGroup[i].position.x) < 0) {
     coinGroup[i].remove();
   }
 }
}

function createNewHeart() {
  if ((currentHeart) && (lastHeart)) {
    penHeart = lastHeart;
    lastHeart = currentHeart;
  }
  else if (currentHeart) {
    lastHeart = currentHeart;
  }
  //spawn new heart
  heart = createSprite(width, random(0, height), 40, 40);
  heart.velocity.y = 0;
  heart.velocity.x = 0;
  heart.addAnimation('default', heartIcon);
  heart.depth = 1;
  heart.setDefaultCollider;
  heartGroup.add(heart);
  //(re)define currentCoin
  for (currentHeart = 0; currentHeart < heartGroup.length; currentHeart++) {
    console.log(currentHeart);
  }
}

function removeOldHeart() {
  //despawn heart that has left the canvas
 for (let i = 0; i<heartGroup; i++) {
   if ((heartGroup[i].position.x) < 0) {
     heartGroup[i].remove();
   }
 }
}

function gemGet() {
  //Gem procured
  //add 50 points to score
  score += 50;
  //add 1 gem to count
  gemCount = gemCount + 1;
  let i = gemGroup.length;
  if (hero.overlap(gemGroup)) {
    gemGroup.remove();
  }
  /*
  else if (hero.overlap(gemGroup[lastGem])) {
    gemGroup[lastGem].remove();
  }
  else if (hero.overlap(gemGet[penGem])) {
    gemGroup[penGem].remove();
  }
  */
  scoreUpdate();
}

function coinGet() {
  //Coin procured
  //add 10 points to score
  score += 10;
  //add 1 coin to count
  coinCount = coinCount + 1;
  let i = coinGroup.length;
  if (hero.overlap(coinGroup)) {
    coinGroup[currentGem].remove();
  }
  /*
  else if (hero.overlap(coinGroup[lastCoin])) {
    coinGroup[lastGem].remove();
  }
  else if (hero.overlap(coinGroup[penCoin])) {
    coinGroup[penCoin].remove();
  }
  */
  scoreUpdate();
}


function heartGet() {
  //Heart procured
  //Gain HP
  lifeGain();
  let i = heartGroup.length;
    if (hero.overlap(heartGroup)) {
      heartGroup.remove();
    }
    /*
    else if (hero.overlap(heartGroup[lastHeart])) {
      heartGroup[lastHeart].remove();
    }
    else if (hero.overlap(hearGroup[penHeart])) {
      heartGroup[penHeart].remove();
    }
    */
}

function lifeGain() {
  if (hitPoints == 4) {
  }
  else {
    if (hitPoints == 3) {
      hitPoints += 1
      hpBar.changeAnimation("full")
      heartGroup.remove();
    }
    else if (hitPoints == 2) {
      hitPoints += 1
      hpBar.changeAnimation("3health")
      heartGroup.remove();
    }
    else if (hitPoints == 1) {
      hitPoints += 1
      hpBar.changeAnimation("2health")
      heartGroup.remove();
    }
  }
}

function hpLoss() {
    //lose 1 hp per hit
    hitPoints -= 1;
    // If the Hero was at full health
    if (hitPoints == 3) {
      hpBar.changeAnimation("3health")
      if (hero.overlap(sharkGroup)) {
        sharkGroup.remove();
      }
      /*
      else if (hero.overlap(sharkGroup[i-1])) {
        sharkGroup[i].remove();
      }
      else {}
      */
    }
    //If hero had 3 health
    else if (hitPoints == 2) {
      hpBar.changeAnimation("2health")
      if (hero.overlap.sharkGroup) {
        sharkGroup.remove();
      }
      /*else if (hero.overlap.sharkGroup[lastShark]) {
        sharkGroup[lastShark].remove();
      }
      else if (hero.overlap.sharkGroup[penShark]) {
        sharkGroup[penShark].remove();
      }*/
    }
    //If hero had 2 health
    else if (hitPoints == 1) {
      hpBar.changeAnimation("1health")
      if (hero.overlap(sharkGroup)) {
        sharkGroup.remove();
      }
      /*
      else if (hero.overlap(sharkGroup[i-1])) {
        sharkGroup[i].remove();
      }
      else {}
      */
    }
    //If hero had one health
   else if (hitPoints == 0) {
     gameOver = true;
    }
}

function collisionChecks() {
  if (hero.overlap(sharkGroup)) {
    hpLoss();
  }
  else {
  }
  if (hero.overlap(gemGroup)) {
    gemGet();
  }
  else {
  }
  if (hero.overlap(coinGroup)) {
    coinGet();
  }
  else {
  }
  if (hero.overlap(heartGroup)) {
    heartGet();
  }
  else {
  }
}

function gameOverText() {
  background(0,0,0,10);
  fill('white');
  stroke('black')
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(2);
  textSize(90);
  strokeWeight(10);
  text("GAME OVER", 15, 30);
  textSize(15);
  text("press any key to try again");
}
