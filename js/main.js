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
let startGame = false;
let gameOver = false;
let nextShark = 0;
let sharkMinWait = 500;
let sharkInterval = 500;
let nextGem = 300;
let gemMinWait = 200;
let gemInterval = 300;
let nextHeart;
let heartMinWait = 600;
let heartInterval = 600;
let nextCoin = 200;
let coinMinWait = 200;
let coinInterval = 200;
let gemCount = 0;
let coinCount = 0;
let hero;
let sharkGroup;
let sharkIdent;
let gemGroup;
let coinGroup;
let coinIdent;
let heartGroup;
let heartIdent;
let x1 = 0;
let x2;
let scrollSpeed = 2;
let hpBar;
let hpBar4;
let hpBar3;
let hpBar2;
let hpBar1;
let scoreElem;
let currentShark = 0;
let lastShark;
let penShark;
let finalShark;
let currentGem = 0;
let lastGem;
let penGem;
let finalGem;
let currentCoin = 0;
let lastCoin;
let penCoin;
let finalCoin;
let currentHeart = 0;
let lastHeart;
let penHeart;
let finalHeart;
let currentBar = 4;
let gameCanvas;
let ctx;
let cnv;
let touchActive = 0;
let doubtouchActive = 0;
let moveActive = 0;
let dualClick = 0;

/*
Created using p5.js and p5 play
Created using the following reference materials/tutorials:
  https://creative-coding.decontextualize.com/making-games-with-p5-play/
  https://la-wit.github.io/build-an-infinite-runner/build/docs/it-girls-instructional-booklet.pdf
  https://molleindustria.github.io/p5.play/docs/
  https://p5js.org/reference/
  https://www.geeksforgeeks.org/p5-js-touch-touchmoved/

What's broken
  using numerical hp as graphic hpbars did not work
  collisions stop being checked after you miss a few objects
  touch movement is clunky but I did my best
*/

function setup() {
  //if mobile
  if (screen.width <= 800) {
    screen.orientation.lock("landscape");
    cnv = createCanvas(screen.width * 0.55, screen.height * 0.55);
    cnv.id('gameCanvas');
    cnv.parent('gameContainer');
  }
  //otherwise
  if (screen.width > 800) {
    cnv = createCanvas(screen.width * 0.75, screen.height * 0.75);
    cnv.id('gameCanvas');
    cnv.parent('gameContainer');
  }
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
  text.depth = 10;
}

function preload() {
  // load images and animations
  // Game background
  gameBackground = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/background.png');
  // HP Bars that don't work
  /*hpBar4 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health4.png');
  hpBar3 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health3.png');
  hpBar2 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health2.png');
  hpBar1 = loadImage('https://raw.githubusercontent.com/nszafranek/project/main/img/health1.png');*/
  // If mobile
  if (screen.width <= 800) {
    // Hero Swimming Animation
    swimming = loadAnimation(
      'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove1m.png',
      'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove2m.png',
    );
    // Hero Blocking Animation (Unused)
    blocking = loadAnimation(
      'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1m.png',
      'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock2m.png',
    );
    // Hero Attacking Animation (Unused)
    attacking - loadAnimation(
      'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1m.png',
      'https://raw.githubusercontent.com/nszafranek/project/main/img/merattack2m.png',
    );
    // Shark
    sharkSprite = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/sharkregm.png');
    // Coin
    coinIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/coinm.png');
    // Heart
    heartIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/heartm.png');
    //Gem
    gemIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/gemm.png');
  }
  //otherwise
  else {
    // Hero Swimming Animation
  swimming = loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/mermove2.png',
  );
  // Hero Blocking Animation (Unused)
  blocking = loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock2.png',
  );
  // Hero Attacking Animation (Unused)
  attacking = loadAnimation(
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merblock1.png',
    'https://raw.githubusercontent.com/nszafranek/project/main/img/merattack2.png',
  );
  // Shark
  sharkSprite = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/sharkreg.png');
  // Coin
  coinIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/coin.png');
  // Heart
  heartIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/heart.png');
  // Gem
  gemIcon = loadAnimation('https://raw.githubusercontent.com/nszafranek/project/main/img/gem.png');
  }
  // Game Font
  gameFont = loadFont('https://raw.githubusercontent.com/nszafranek/project/main/img/SourceSansPro-Bold.ttf');
 // Deprecated debug calls
 /*if (!hpBar4) {
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
 }*/

}

function draw() {
  // Start Screen
  if ((!gameOver) && (!startGame)) {
    background('DodgerBlue');
    bgTiling();
    fill('white');
    stroke('DodgerBlue');
    textAlign(CENTER);
    textFont(gameFont);
    // Check if screen is mobile/landscape
    if ((screen.width <= 800) || (screen.width <= 800 && screen.orientation === "landscape")) {
      strokeWeight(1);
      textSize(45);
      strokeWeight(10);
      text("Infinite Swimmer", (width / 2), ((height / 2) - 40));
      textSize(10);
      strokeWeight(1);
      text("Use the Arrow Keys or swipe in one direction to move the hero!", (width / 2), ((height / 2) + 3));
      text("Press Esc to end", (width / 2), ((height / 2) + 22));
      text("Avoid the Sharks and collect Gems and Coins!", (width / 2), ((height / 2) + 41));
      textSize(20);
      strokeWeight(8);
      text("Press Enter or tap the screen to start!", (width / 2), ((height / 2) + 85));
      // Press Enter or tap to start game
      if (keyWentDown(13)) {
        clear();
        startGame = true;
      }
      if ((!gameOver) && (!startGame) && (touchActive === 1)) {
        clear();
        startGame = true;
      }
    }
    // Check if screen is portrait
    if (screen.width <= 800 && screen.orientation === "portrait") {
      strokeWeight(1);
      textSize(50);
      strokeWeight(10);
      text("Please turn screen to landscape and reload", (width / 2), (height / 2));
      if ((!gameOver) && (!startGame) && (touchActive === 1)) {
        location.reload()
      }
    }
    if (screen.width > 800) {
      strokeWeight(2);
      textSize(110);
      strokeWeight(10);
      text("Infinite Swimmer", (width / 2), ((height / 2) - 50));
      textSize(15);
      strokeWeight(5);
      text("Use the Arrow Keys or swipe in one direction to move the hero", (width / 2), ((height / 2) + 9));
      text("Press Esc to end", (width / 2), ((height / 2) + 29));
      text("Avoid the Sharks and collect Gems and Coins!", (width / 2), ((height / 2) + 49));
      textSize(30);
      strokeWeight(3);
      text("Press Enter or tap the screen to start!", width / 2, ((height / 2) + 125));
      // Press Enter or tap to start game
      if (keyWentDown(13)) {
        clear();
        startGame = true;
      }
      if ((!gameOver) && (!startGame) && (touchActive === 1)) {
        clear();
        startGame = true;
      }
    }

  }
  // Game over
  if (gameOver) {
    gameOverText();
    updateSprites(false);
    if (touchActive === 1) {
      location.reload();
    }
  }
  // start game
  if (startGame) {
    gameStart();
  }
}

function gameStart() {
  gameCanvas = document.getElementById('gameCanvas');
  ctx = gameCanvas.getContext('2d');
  background('DodgerBlue');
  //Tiling background call
  bgTiling();
  // Movement call
  heroMove();
  // Time call
  timing();
  // Overlap Calls
  hero.overlap(sharkGroup);
  hero.overlap(gemGroup);
  hero.overlap(coinGroup);
  hero.overlap(heartGroup);
  // Initialize Life bar and score output
  lifeBar();
  scoreOutput();
  // Check for collisions
  collisionChecks();
  // Keep hero in bounds
  containHero();
  // Option to end game on desktop
  gameEnd();
  // Draw sprites
  drawSprites();

  // Disable scrolling on mobile (Not enabled)
  if (screen.width <= 800) {
    //disableScroll();
  }
  // code to turn canvas that doesn't work
  /*if ((screen.width <= 800) && (screen.orientation === 'portrait-secondary')) {
    ctx.rotate(90);
  }*/
}

// scrolling background from https://editor.p5js.org/chjno/sketches/ByZlypKWM
function bgTiling() {
  //  initialize image
  image(gameBackground, x1, 0, width, height);
  image(gameBackground, x2, 0, width, height);
  // scroll speed
  x1 -= scrollSpeed;
  x2 -= scrollSpeed;
  // check if background has scrolled all the way
  if (x1 < -width){
    x1 = (width - 2);
  }
  if (x2 < -width){
   x2 = (width - 2);
  }
}

// Checks for touches
function touchStarted() {
    if (touchActive === 0) {
      touchActive = 1;
    }
    else {
      touchActive = 0;
    }
}

// Checks for clicks
function mousePressed() {
    if (touchActive === 0) {
      touchActive = 1;
    }
    else {
      touchActive = 0;
    }
}

// Checks for swipes
function touchMoved() {
  if (moveActive === 0) {
    moveActive = 1;
  }
  else {
    moveActive = 0;
  }
}

//Checks if mouse dragged
function mouseMoved() {
  if (moveActive === 0) {
    moveActive = 1;
  }
  else {
    moveActive = 0;
  }
}

// Checks double click
function doubleClicked() {
  if (dualClick === 0) {
    dualClick = 1;
  }
  else {
    dualClick = 0;
  }
}

// Disable Scrolling
// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
//let keys = {37: 1, 38: 1, 39: 1, 40: 1};

/*function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
var supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch(e) {}

var wheelOpt = supportsPassive ? { passive: false } : false;
var wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}*/

//Score Display
function scoreOutput() {
  fill('white');
  stroke('DodgerBlue');
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(1);
  if (screen.size <= 800){
    textSize(15);
    strokeWeight(2);
    text("Score: " + score, 40, 10);
  }
  else {
    textSize(25);
    strokeWeight(10);
    text("Score: " + score, 70, 40);
  }
}

// HP Bar Attempt 1
/*function lifeBar() {
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
}*/

//HP Bar Attempt 2
/*function lifeBar() {
  if(hitPoints == 4) {
    if(circle) {
      clear(circle);
    }
    fill('green');
    strokeWeight(0);
    circle((width - 50), (height - 470), 60);
    circle((width - 120), (height - 470), 60);
    circle((width - 190), (height - 470), 60);
    circle((width - 260), (height - 470), 60);
  }
  if(hitPoints == 3) {
    fill('yellow');
    strokeWeight(0);
    circle((width - 50), (height - 470), 60);
    circle((width - 120), (height - 470), 60);
    circle((width - 190), (height - 470), 60);
  }
  if(hitPoints == 2) {
    fill('orange');
    strokeWeight(0);
    circle((width - 50), (height - 470), 60);
    circle((width - 120), (height - 470), 60);
  }
  if(hitPoints == 1) {
    fill('red');
    strokeWeight(0);
    circle((width - 50), (height - 470), 60);
    }
}*/

//HP Display
function lifeBar() {
  fill('red');
  stroke('black');
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(1);
  if (screen.size <= 800){
    textSize(15);
    strokeWeight(2);
    text("HP : " + hitPoints, width - 10, 30);
  }
  else {
    textSize(20);
    strokeWeight(10);
    text("HP : " + hitPoints, width - 60, 40);
  }
}

// Counter for item spawn
function timing() {
  // When next Shark will spawn
  if (time === nextShark) {
    createNewShark();
    nextShark = Math.ceil(Math.random() * sharkInterval + sharkMinWait) + nextShark;
  }
  // When next Gem will spawn
  if (time === nextGem) {
    createNewGem();
    nextGem = Math.ceil(Math.random() * gemInterval + gemMinWait) + nextGem;
  }
  // When next Coin will spawn
  if (time === nextCoin) {
    createNewCoin();
    nextGem = Math.ceil(Math.random() * coinInterval + coinMinWait) + nextCoin;
  }
  // When next heart will spawn
  if (time === nextHeart) {
    createNewHeart();
    nextHeart = Math.ceil(Math.random() * heartInterval + heartMinWait) + nextGem;
  }
  time++;
}

function heroMove() {

  // Hero movement
  if (keyWentDown(38)) {
    hero.velocity.y = -1;
  }
  else if (keyWentDown(40)) {
    hero.velocity.y = 1;
  }
  else if (keyWentDown(37)) {
    hero.velocity.x = -1;
  }
  else if (keyWentDown(39)) {
    hero.velocity.x = 1;
  }
  if (moveActive === 1) {
    if (mouseY > pmouseY) {
        hero.velocity.y = 3;
    }
    if (mouseY < pmouseY) {
        hero.velocity.y = -3;
    }
    if (mouseX > pmouseX) {
      hero.velocity.x = 3;
    }
    if (mouseX > pmouseX) {
      hero.velocity.x = -3;
    }
  }
  //ZingTouch
  /*if (ZingTouch) {
    if (activeRegion) {
      activeRegion.bind(cnv, 'moveUp', function(e) {
        if ((!gameOver) && (startGame)) {
          hero.velocity.y = -1;
        }
      });
      activeRegion.bind(cnv, 'moveDown', function(e) {
        if ((!gameOver) && (startGame)) {
          hero.velocity.y = 1;
        }
      });
      activeRegion.bind(cnv, 'moveLeft', function(e) {
        if ((!gameOver) && (startGame)) {
          hero.velocity.x = -1;
        }
      });
      activeRegion.bind(cnv, 'moveRight', function(e) {
        if ((!gameOver) && (startGame)) {
          hero.velocity.x = 1;
        }
      });
    }
  }*/
  //hammer.js touch controls
  /*mc.on("swipeUp", function(ev) {
    hero.velocity.y = -1;
  });
  mc.on("swipeDown", function(ev) {
    hero.velocity.y = 1;
  });
  mc.on("swipeLeft", function(ev) {
    hero.velocity.x = -1;
  });
  mc.on("swipeRight", function(ev) {
    hero.velocity.x = 1;
  });*/
}

// End Game by pressing Esc key
function gameEnd() {
  if (keyWentDown(27) && (startGame)) {
    gameOver = true;
  }
  if ((dualClick) && (startGame)) {
    gameOver = true;
  }
  //ZingTouch
  /*if (ZingTouch) {
    if (activeRegion) {
    activeRegion.bind(cnv, 'doubleTap', function(e) {
      if ((!gameOver) && (startGame)) {
        gameOver = true;
      }
    });
    }
  }*/
}


// Keep hero in screen bounds
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
  // Define penultimate and last shark position in sharkGroup
  if (lastShark) {
   penShark = lastShark;
  }
  if (currentShark) {
  lastShark = currentShark;
  }
  // Spawn a new shark
  // If mobile
  if (screen.size <= 800) {
    shark = createSprite(width, random(0, height), 140, 47);
  }
  // Otherwise
  else {
    shark = createSprite(width, random(0, height), 280, 93);
  }
  shark.velocity.y = 0;
  shark.velocity.x = -3;
  shark.addAnimation('default', sharkSprite);
  shark.depth = 1;
  shark.setDefaultCollider;
  sharkGroup.add(shark);
  // Define currentShark position in sharkGroup
  currentShark = sharkGroup.length - 1;
  // Debug call
  console.log('Shark' + currentShark);
}

function removeOldShark() {
    //  Despawn shark that has left the canvas
 for (let i = 0; i<sharkGroup; i++) {
   if ((sharkGroup[i].position.x) < 0) {
     sharkGroup[i].remove();
     // If identified modify order
     if ((i === currentShark) || (i === lastShark) || (i === penShark) || (i === finalShark)) {
       currentShark -= 1;
      if (lastShark) {
       lastShark -= 1;
      }
      if (penShark) {
       penShark -= 1;
      }
        if (finalShark) {
          finalShark -= 1;
        }
      }
     else {
       if (!lastShark) {
         lastShark = i;
       }
       else if ((lastShark) && (!penShark)) {
         penShark = i;
       }
       else if ((lastShark) && (penShark) && (!finalShark)) {
         finalShark = i;
       }
     }
   }
 }
}

function createNewGem() {
  // Define penultimate and last gem position in gemGroup
  if (lastGem) {
    penGem = lastGem;
  }
  if (currentGem) {
    lastGem = currentGem;
  }
  // Spawn a new gem
  if (screen.size <= 800) {
    gem = createSprite(width, random(0, height), 60, 55);
  }
   else {
  gem = createSprite(width, random(0, height), 119, 109);
  }
  gem.velocity.y = 0;
  gem.velocity.x = -3;
  gem.addAnimation('default', gemIcon);
  gem.depth = 1;
  gem.setDefaultCollider;
  gemGroup.add(gem);
  // Define current Gem position in gemGroup
  currentGem = gemGroup.length - 1;
  // Debug call
  console.log('Gem' + currentGem);
}

function removeOldGem() {
  // Despawn gem that has left the canvas; modify current, last, penultimate and final items if necessary
 for (let i = 0; i < gemGroup; i++) {
   if ((gemGroup[i].position.x) < 0) {
     gemGroup[i].remove();
     if ((i === currentGem) || (i === lastGem) || (i === penGem) || (i === finalGem)) {
      currentGem -= 1;
      if (lastGem) {
        lastGem -= 1;
      }
      if (penGem) {
        penGem -= 1;
      }
      if (finalGem) {
        finalGem -= 1;
      }
     }
     else  {
       if (!lastGem) {
         lastGem = i;
       }
       else if ((lastGem) && (!penGem)) {
         penGem = i;
       }
       else if ((lastGem) && (penGem) && (!finalGem)) {
         finalGem = i;
       }
     }
   }
 }
}

function createNewCoin() {
  // Define penultimate and last coin position if the previous exists
  if (lastCoin) {
    penCoin = lastCoin;
  }
  if (currentCoin) {
    lastCoin = currentCoin;
  }
  // Spawn a new coin
  if (screen.size <= 800) {
    coin = createSprite(width, random(0, height), 34, 35);
  }
  else {
    coin = createSprite(width, random(0, height), 68, 69);
  }
  coin.velocity.y = 0;
  coin.velocity.x = -3;
  coin.addAnimation('default', coinIcon);
  coin.depth =1;
  coin.setDefaultCollider;
  coinGroup.add(coin);
  // Define current coin position in coinGroup
    currentCoin = coinGroup.length - 1;
  // Debug call
    console.log('Coin' + currentCoin);
}
function removeOldCoin() {
  // Despawn gem that has left the canvas; modify current, last, penultimate and final items if necessary
 for (let i = 0; i < coinGroup; i++) {
   if ((coinGroup[i].position.x) < 0) {
    coinGroup[i].remove();
    if ((i === currentCoin) || (i === lastCoin) || (i === penCoin)) {
    }
    else {
      finalCoin = i;
    }
 }
}

function createNewHeart() {
  // Define penultimate and last heart position in heartGroup
  if (lastHeart) {
     penHeart = lastHeart;
   }
  if (currentHeart) {
    lastHeart = currentHeart;
  }
  //spawn new heart
  if (screen.size <= 800) {
    heart = createSprite(width, random(0, height), 20, 20);
  }
  else {
    heart = createSprite(width, random(0, height), 40, 40);
  }
  heart.velocity.y = 0;
  heart.velocity.x = -3;
  heart.addAnimation('default', heartIcon);
  heart.depth = 1;
  heart.setDefaultCollider;
  heartGroup.add(heart);
  // Define current heart position in heartGroup
  currentHeart = heartGroup.length;// - 1;
  console.log('Heart' + currentHeart);
}

function removeOldHeart() {
  // Despawn gem that has left the canvas; modify current, last, penultimate and final items if necessary
 for (let i = 0; i<heartGroup; i++) {
   if ((heartGroup[i].position.x) < 0) {
     heartGroup[i].remove();
     if ((i === currentHeart) || (i === lastHeart) || (i === penHeart) (i === finalHeart)) {
       currentHeart -= 1;
       if (lastHeart) {
         lastHeart -= 1;
       }
       if (penHeart) {
         penHeart -= 1;
       }
       if (finalHeart) {
         finalHeart -= 1;
       }
     }
     else {
       finalCoin = i;
     }
     }
   }
 }
}
function gemGet() {
  // Gem procured
  // Add 50 points to score
  score += 50;
  // Add 1 gem to count
  gemCount = gemCount + 1;
  // Despawn sprites
  // Failsafe if current Gem is undefined
  if (!currentGem || !gemGroup[currentGem]) {
    currentGem = gemGroup.length - 1;
    gemGroup[0].remove();
    currentGem -= 1;
    if (lastGem) {
      lastGem -= 1;
    }
    if (penGem) {
    penGem -= 1;
    }
    if (finalGem) {
      finalGem -= 1;
    }
  }
  // How it should work
  else {
    // Compare hero position with item position, update variables and necessary
    if (hero.position === gemGroup[(currentGem)].position) {
      gemGroup[currentGem].remove();
      currentGem -= 1;
      if (lastGem) {
        lastGem -= 1;
      }
      if (penGem) {
        penGem -= 1;
      }
      if (lastGem) {
        lastGem -= 1;
      }
    }
    if (hero.position === gemGroup[(lastGem)].position) {
      gemGroup[lastGem].remove();
      currentGem -= 1;
      lastGem -= 1;
      if (penGem) {
        penGem -= 1;
      }
      if (finalGem) {
        finalGem -=1;
      }
    }
    if (hero.position === gemGroup[(penGem)].position) {
      gemGroup[(penGem)].remove();
      currentGem -= 1;
      lastGem -= 1;
      penGem -= 1;
      if (finalGem) {
        finalGem -= 1;
      }
    }
    if (hero.position === gemGroup[(finalGem)]) {
      gemGroup[(finalGem)].remove();
      currentGem -= 1;
      lastGem -= 1;
      penGem -= 1;
      finalGem -= 1;
    }
  }
}

function coinGet() {
  // Coin procured
  // Add 10 points to score
  score += 10;
  // Add 1 coin to count
  coinCount = coinCount + 1;
  // Despawn sprites
  // Failsafe code
  if (!currentCoin || !coinGroup[currentCoin]) {
    currentCoin = coinGroup.length - 1;
    coinGroup[0].remove();
    currentCoin -= 1;
    if (lastCoin) {
      lastCoin -= 1;
    }
    if (penCoin) {
      penCoin -= 1;
    }
    if (finalCoin) {
      finalCoin -= 1;
    }
  }
  // How it should work
  else {
    // Compare hero position with item position, update variables and necessary
    if (hero.position === coinGroup[(currentCoin)].position) {
      coinGroup[(currentCoin)].remove();
      currentCoin -= 1;
      if (lastCoin) {
        lastCoin -= 1;
      }
      if (penCoin) {
        penCoin -= 1;
      }
      if (finalCoin) {
        finalCoin -= 1;
      }
    }
    if (hero.position === coinGroup[(lastCoin)].position) {
      coinGroup[lastCoin].remove();
      currentCoin -= 1;
      lastCoin -= 1;
      if (penCoin) {
        penCoin -= 1;
      }
      if (finalCoin) {
        finalCoin -= 1;
      }
    }
    if (hero.position === coinGroup[(penCoin)].position) {
      coinGroup[(penCoin)].remove();
      currentCoin -= 1;
      lastCoin -= 1;
      penCoin -= 1;
      if (finalCoin) {
        finalCoin -= 1;
      }
    }
    if (hero.position === coinGroup[finalCoin].position) {
      coinGroup[(finalCoin)].remove();
      currentCoin -= 1;
      lastCoin -= 1;
      penCoin -= 1;
      finalCoin -= 1;
    }
  }
}


function heartGet() {
  // Heart procured
  // Gain HP
  lifeGain();
}

function lifeGain() {
  // If HP is full
  if (hitPoints === 4) {
  }
  // Otherwise
  else {
    hitPoints += 1;
  }
  // Failsafe code
  if (!currentHeart || !coinGroup[currentHeart]) {
    currentHeart = heartGroup.length - 1;
    heartGroup[0].remove();
    currentHeart -= 1;
    if (lastHeart) {
      lastHeart -= 1;
    }
    if (penHeart) {
      penHeart -= 1;
    }
    if (finalHeart) {
      finalHeart -= 1;
    }
  }
  // How it should work
  else {
    // Compare hero position with item position, update variables and necessary
    if (hero.position === heartGroup[(currentHeart)].position) {
    heartGroup[currentHeart].remove();
    currentHeart -= 1;
    if (lastHeart) {
      lastHeart -= 1;
    }
    if (penHeart) {
      penHeart -= 1;
    }
    if (finalHeart) {
      finalHeart -= 1;
    }
    }
    if (hero.position === heartGroup[(lastHeart)].position) {
      heartGroup[lastHeart].remove();
      currentHeart -= 1;
      lastHeart -= 1;
      if (penHeart) {
        penHeart -= 1;
      }
      if (finalHeart) {
        finalHeart -= 1;
      }
    }
    if (hero.position === heartGroup[(penHeart)].position) {
      heartGroup[(penHeart)].remove();
      currentHeart -= 1;
      lastHeart -= 1;
      penHeart -= 1;
      if (finalHeart) {
        finalHeart -= 1;
      }
    }
    if (hero.position === heartGroup[(finalHeart)].position) {
      heartGroup[(finalHeart)].remove();
      currentHeart -= 1;
      lastHeart -= 1;
      penHeart -= 1;
      finalHeart -= 1;
    }
  }
}

function hpLoss() {
  // lose 1 hp per hit
  hitPoints -= 1;
  // Old animations
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
  // If HP is 0, Game Over
  if (hitPoints === 0) {
    gameOver = true;
  }
  // Despawn sprites
  // Failsafe code
  if (!currentShark || !sharkGroup[currentShark]) {
    currentShark = sharkGroup.length - 1;
    sharkGroup[0].remove();
    currentShark -= 1;
    if (lastShark) {
      lastShark -= 1;
    }
    if (penShark) {
      penShark -= 1;
    }
    if (finalShark) {
      finalShark -= 1;
    }
  }
  // How it should work
  else {
    // Compare hero position with item position, update variables and necessary
    if (hero.position === sharkGroup[(currentShark)].position) {
      sharkGroup[currentShark].remove();
      currentShark -= 1;
      if (lastShark) {
        lastShark -= 1;
      }
      if (penShark) {
        penShark -= 1;
      }
      if (finalShark) {
        finalShark -= 1;
      }
    }
    if (hero.position === sharkGroup[(lastShark)].position) {
      sharkGroup[lastShark].remove();
      currentShark -= 1;
      lastShark -= 1;
      if (penShark) {
        penShark -= 1;
      }
      if (finalShark) {
        finalShark -= 1;
      }
    }
    if (hero.position === sharkGroup[(penShark)].position) {
      sharkGroup[penShark].remove();
      currentShark -= 1;
      lastShark -= 1;
      penShark -= 1;
      if (finalShark) {
        finalShark -= 1;
      }
    }
    if (hero.position === sharkGroup[(finalShark)].position) {
      sharkGroup[finalShark].remove();
      currentShark -= 1;
      lastShark -= 1;
      penShark -= 1;
      finalShark -= 1;
    }
  }
}

function collisionChecks() {
  // Check for collisions and trigger events
  // Shark
  if (hero.overlap(sharkGroup)) {
    hpLoss();
  }
  else {
  }
  // Gem
  if (hero.overlap(gemGroup)) {
    gemGet();
  }
  else {
  }
  // Coin
  if (hero.overlap(coinGroup)) {
    coinGet();
  }
  else {
  }
  // Heart
  if (hero.overlap(heartGroup)) {
    heartGet();
  }
  else {
  }
}
// Game over text
function gameOverText() {
  startGame = false;
  background(0,0,0,10);
  fill('white');
  stroke('black');
  textAlign(CENTER);
  textFont(gameFont);
  strokeWeight(2);
  textSize(90);
  strokeWeight(10);
  text("GAME OVER", width / 2, height / 2);
  textSize(15);
  text("Coins: " + coinCount, width / 2, (height / 2) + 50);
  text("Gems: " + gemCount, width / 2, (height / 2) + 80);
  text("Press Enter or tap to try again", width / 2, (height / 2) + 110);
  //text("Press Enter or touch the screen to try again", width / 2, (height / 2) + 110);
  if (keyWentDown(13)) {
    location.reload();
  }
  if ((touchActive === 0) && (gameOver)) {
    location.reload();
  }
}
