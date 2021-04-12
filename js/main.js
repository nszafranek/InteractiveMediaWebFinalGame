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
let heartMinWait = 600;
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
let currentBar = 4;

function setup() {
  createCanvas(1200, 520);
  background(200, 200, 200);
  x2 = width;
  scoreOutput();
  sharkGroup = new Group;
  gemGroup = new Group;
  coinGroup = new Group;
  heartGroup = new Group;
  hero = createSprite(150, height/2, 280, 93);
  hero.depth = 4;
  hero.friction = 0;
  hero.maxSpeed = 9;
  hero.setDefaultCollider();
  hero.addAnimation('swim', swimming);
  hero.addAnimation('attack', attacking);
  hero.addAnimation('block', blocking);
}

function preload() {
  swimming = loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove2.png',
  );
  blocking = loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock2.png',
  );
  attacking - loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merattack2.png',
  );
 gameBackground = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/background.png');
 sharkSprite = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/sharkreg.png');
 coinIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/coin.png');
 heartIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/heart.png');
 gemIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/gem.png');
 hpBar4 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health4.png');
 hpBar3 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health3.png');
 hpBar2 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health2.png');
 hpBar1 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health1.png');
 gameFont = loadFont('https://raw.githubusercontent.com/nszafranek/project/main/img/SourceSansPro-Bold.ttf');
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
    //scoreUpdate();
    scoreOutput();
    collisionChecks();
    containHero();
    lifeBar();
    gameEnd();
    drawSprites();
    if (!hpBar4) {
      console.log('hp bar 4 not loaded');
    }
    if (!hpBar3) {
      console.log('hp bar 3 not loaded');
    }
    if (!hpBar2) {
      console.log('hp bar 2 not loaded');
    }
    if (!hpBar1) {
      console.log('hp bar 1 not loaded');
    }
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
  fill('white');
  stroke('DodgerBlue')
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(1);
  textSize(25);
  strokeWeight(10);
  text("Score: " + score, width - 1130, 40)
}

function lifeBar() {
  if (hitPoints == 4) {
    if (currentBar == 3) {
      hpBar3.remove();
      currentBar = 4;
    }
    else if (currentBar == 2) {
      hpBar2.remove();
      currentBar = 4;
    }
    else if (currentBar == 1) {
      hpBar1.remove();
      currentBar = 4;
    }
    else {}
    hpBar4 = createSprite((width - 150), (height - 470), 255, 63);
  }
  else if (hitPoints == 3) {
    if (currentBar == 4) {
      hpBar4.remove();
      currentBar = 3;
    }
    else if (currentBar == 2) {
      hpBar2.remove();
      currentBar = 3;
    }
    else if (currentBar == 1) {
      hpBar1.remove();
      currentBar = 3;
    }
    else {}
    hpBar3 = createSprite((width - 150), (height - 470), 255, 63);
  }
  else if (hitPoints == 2) {
    if (currentBar == 4) {
      hpBar4.remove();
      currentBar = 2;
    }
    else if (currentBar == 3) {
      hpBar3.remove();
      currentBar = 2;
    }
    else if (currentBar == 1) {
      hpBar1.remove();
      currentBar = 2;
    }
    else {}
    hpBar2 = createSprite((width - 150), (height - 470), 255, 63);
  }
  else if (hitPoints == 1) {
    if (currentBar == 4) {
      hpBar4.remove();
      currentBar = 1;
    }
    else if (currentBar == 3) {
      hpBar3.remove();
      currentBar = 1;
    }
    else if (currentBar == 2) {
      hpBar2.remove();
      currentBar = 1;
    }
    else {}
    hpBar1 = createSprite((width - 150), (height - 470), 255, 63);
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
  //When next heart will spawn
  if (time == nextHeart) {
    createNewHeart();
    nextHeart = Math.ceil(Math.random() * heartInterval + heartMinWait) + nextGem;
  }

  time++;

};

function heroMove() {
  //hero movement
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
function gameEnd() {
  if (keyWentDown(27)) {
    gameOver = true;
  }
}

function containHero() {
  if ((hero.position.x) < 0) {
    hero.velocity.x = 1;
  }
  if ((hero.position.x) > width) {
    hero.velocity.x = -1;
  }
  if ((hero.position.y) < 0) {
    hero.velocity.y = 1;
  }
  if ((hero.position.y) > height) {
    hero.velocity.y = -1;
  }
}

function createNewShark() {
  //Check if currentShark is defined. If so, define lastShark/PenShark and add 1 to currentShark
  if (lastShark) {
    penShark = sharkGroup.length - 4;
  }
  if (currentShark) {
    lastShark = sharkGroup.length - 3;
  }
  // spawn a new shark
  shark = createSprite(width, random(0, height), 280, 93);
  shark.velocity.y = 0;
  shark.velocity.x = -3;
  shark.addAnimation('default', sharkSprite);
  shark.depth = 1;
  shark.setDefaultCollider;
  sharkGroup.add(shark);
  //Define currentShark if undefined
  currentShark = sharkGroup.length - 1;
  console.log('Shark' + currentShark);
}

function removeOldShark() {
    //despawn shark that has left the canvas
 for (let i = 0; i<sharkGroup; i++) {
   if ((sharkGroup[i].position.x) < 0) {
     sharkGroup[i].remove();
   }
 }
}

function createNewGem() {
  //check if currentGem is defined. If so define lastGem/penGem and add 1 currentGem.
  if (lastGem) {
    penGem = gemGroup.length - 4;
  }
  if (currentGem) {
    lastGem = gemGroup.length -3;
    currentGem++;
  }
  // spawn a new gem
  gem = createSprite(width, random(0, height), 119, 109);
  gem.velocity.y = 0;
  gem.velocity.x = -3;
  gem.addAnimation('default', gemIcon);
  gem.depth = 1;
  gem.setDefaultCollider;
  gemGroup.add(gem);
  //if currentGem is still undefined define
  currentGem = gemGroup.length - 1;
  console.log('Gem' + currentGem);
}

function removeOldGem() {
  //despawn gem that has left the canvas
 for (let i = 0; i < gemGroup; i++) {
   if ((gemGroup[i].position.x) < 0) {
     gemGroup[i].remove();
   }
 }
}

function createNewCoin() {
  //Check if  currentCoin is defined. If so define lastCoin/penCoin and add 1 to currentCoin
  if (lastCoin) {
    penCoin = coinGroup.length - 4;
  }
  if (currentCoin) {
    lastCoin = coinGroup.length - 3;
  }
  // spawn a new coin
  coin = createSprite(width, random(0, height), 68, 69);
  coin.velocity.y = 0;
  coin.velocity.x = -3;
  coin.addAnimation('default', coinIcon);
  coin.depth =1;
  coin.setDefaultCollider;
  coinGroup.add(coin);
  //Define currentCoin, if undefined
  if (!currentCoin) {
    currentCoin = coinGroup.length - 1;
  }
    console.log('Coin' + currentCoin);
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
  //Check if currentHeart is defined. If so define lastHeart/penHeart
  if (lastHeart) {
    penHeart = heartGroup.length - 4;
  }
  if (currentHeart) {
    lastHeart = heartGroup.length - 3;
  }
  //spawn new heart
  heart = createSprite(width, random(0, height), 40, 40);
  heart.velocity.y = 0;
  heart.velocity.x = -3;
  heart.addAnimation('default', heartIcon);
  heart.depth = 1;
  heart.setDefaultCollider;
  heartGroup.add(heart);
  currentHeart = heartGroup.length - 1;
  //Define currentCoin, if still undefined
  console.log('Heart' + currentHeart);
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
  //deswpan sprites
 gemGroup[currentGem].remove();
  if (lastGem) {
    gemGroup[lastGem].remove();
  }
  if (penGem) {
    gemGroup[penGem].remove();
  }
  //Update score
  //scoreUpdate();
}

function coinGet() {
  //Coin procured
  //add 10 points to score
  score += 10;
  //add 1 coin to count
  coinCount = coinCount + 1;
  //despawn sprites
  coinGroup[currentCoin].remove();
  if (lastCoin) {
    coinGroup[lastCoin].remove();
  }
  if (penCoin) {
    coinGroup[penCoin].remove();
  }
  //Update Score
  //scoreUpdate();
}


function heartGet() {
  //Heart procured
  //Gain HP
  lifeGain();
  heartGroup[currentHeart].remove();
  if (lastHeart) {
    heartGroup[lastHeart].remove();
  }
  if (penHeart) {
    heartGroup[penHeart].remove();
  }
}

function lifeGain() {
  if (hitPoints == 4) {
  }
  else {
    //if (hitPoints == 3) {
      hitPoints += 1;
  }
}

function hpLoss() {
  //lose 1 hp per hit
  hitPoints -= 1;
  /*If the Hero was at full health
  if (hitPoints == 3) {
    hpBar.changeAnimation('3health');
  }
  //If hero had 3 health
  else if (hitPoints == 2) {
    hpBar.changeAnimation('2health');
  }
  //If hero had 2 health
  else if (hitPoints == 1) {
      hpBar.changeAnimation('1health');
  }
  //If hero had one health
  else if (hitPoints == 0) {
   gameOver = true;
  }*/
  if (hitPoints == 0) {
    gameOver = true;
  }
  //despawn sprites
  sharkGroup[currentShark].remove();
  if (lastShark) {
    sharkGroup[lastShark].remove();
  }
  if (penShark) {
    sharkGroup[penShark].remove();
  }
}

function collisionChecks() {
  //check for collisions and trigger events
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
//Game over text
function gameOverText() {
  background(0,0,0,10);
  fill('white');
  stroke('black')
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(2);
  textSize(90);
  strokeWeight(10);
  text("GAME OVER", width / 2, height / 2);
  textSize(15);
  text("Coins: " + coinCount, width / 2, (height / 2) + 50);
  text("Gems: " + gemCount, width / 2, (height / 2) + 80);
  text("Press Enter to try again", width / 2, (height / 2) + 110);
  if (keyWentDown(13)) {
    location.reload();
  }
}
