//start conditions
let hitPoints = 4;
let score = 0;
let time = 0;
let gemCount = 0;
let coinCount = 0;
let posX;
let posY;
let spriteSpeed;
let nextShark = 0;
let sharkMinWait = 1;
let sharkInterval = 3;
let nextGem = 0;
let gemMinWait = 20;
let gemInterval = 30;
let nextCoin = 0;
let coinMinWait = 5;
let coinInterval = 10;
let scoreOutput = document.getElementById('scoreOutput');
let shark = document.getElementById('shark');
let hpDisplay = document.getElementById('hp');

setInterval(function () {
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

}, 1000);

function scoreSeconds() {
  //1 pt per second
  score += 1,
  scoreOutput.innertext = "SCORE :" + (score)
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
      gameOver();
    }
}

function gameOver() {
}

function createNewShark() {
  // spawn a new shark
}

function createNewGem() {
  // spawn a new gem

}

function createNewCoin() {
  // spawn a new coin
}

function gemGet() {
  //add 50 points to score
  score = score + 50;
  //add 1 gem to count
  gemCount = gemCount + 1;
}

function coinGet() {
  //add 10 points to score
  score = score + 10;
  //add 1 coin to count
  coinCount = coinCount + 1;
}

function init(){
  hero = document.getElementById("hero");
  hero.style.position='relative';
  hero.style.left='20px';
  hero.style.top='50%';
}

window.onload-init;
