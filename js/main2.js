(function () {
  // define variables
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let player = {};
  let ground = [];
  let platformWidth = 32;
  let platformHeight = canvas.height - platformWidth * 4;

  //Asset pre-loader object. Loads all images and sounds
  let assetLoader = (function() {
    //images
    this.imgs = {
      "bg" : "./img/background.svg",
      "hero1" : "./img/mermovesheet.svg",
      "shark" : "./img/sharkreg.svg",
      "coin" : "./img/coin.svg",
      "gem" : "./img/gem.svg",
      "hpfull" : "./img/4health.svg",
      "hp3" : "./img/3health.svg",
      "hp2" : "./img/2health.svg",
      "hp1" : "./img/1health.svg",
  };

  //assetsLoaded
  let assetsLoaded = 0;

  //number of image assets
  let numImgs = Object.keys(this.imgs).length;

  //total number of assets
  this.totalAssest = numImgs;

  function assetLoaded(dic, name) {
    // don't count assets that have already loaded
    if (this[dic][name].status !== "loading" ) {
      return;
    }

   this[dic][name].status = "loaded";
   assetsLoaded++;

   // finished callback
   if (assetsLoaded === this.totalAssest && typeof this.finished === "function") {
     this.finished();
   }
 }
    //Create assets, set callback
    this.downloadAll = function() {
      let _this = this;
      let src;

      // load images
      for (var img in this.imgs) {
        if (this.imgs.hasOwnProperty(img)) {
          src = this.imgs[img];

          // create a closure for event binding
          (function(_this, img) {
            _this.imgs[img] = new Image();
            _this.imgs[img].status = 'loading';
            _this.imgs[img].name = img;
            _this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) };
            _this.imgs[img].src = src;
          })(_this, img);
        }
      }
    }

   return {
     imgs: this.imgs,
     totalAssest: this.totalAssest,
     downloadAll: this.downloadAll
   };
 })();

 assetLoader.finished = function() {
   startGame();
 }
 //Prepare function for creating spritesheet
 function SpriteSheet(path, frameWidth, frameHeight, frameSpeed, endFrame) {
  let image = new Image();
  let framesPerRow;

  //calculate number of frames per framesPerRow
  let self = this;
  image.onload = function() {
    framesPerRow = Math.floor(image.width / frameWidth);
  };

  image.src = path;
  //frames to draw
  let currentFrame = 0;
  //frame rate
  let counter = 0;

  //animation update
  this.update = function() {

   // Draw the current frame
   this.draw = function(x, y) {
   // get the row and col of the frame
   var row = Math.floor(currentFrame / framesPerRow);
   var col = Math.floor(currentFrame % framesPerRow);

   ctx.drawImage(
      image,
      col * frameWidth, row * frameHeight,
      frameWidth, frameHeight,
      x, y,
      frameWidth, frameHeight);
 };
    }
  }
  function Animation(spritesheet, frameSpeed, startFrame, endFrame) {

    let animationSequence = [];  // array holding the order of the animation
    let currentFrame = 0;        // the current frame to draw
    let counter = 0;             // keep track of frame rate

    // start and end range for frames
    for (let frameNumber = startFrame; frameNumber <= endFrame; frameNumber++)
      animationSequence.push(frameNumber);

    //Update the animation
    this.update = function() {

    // update to the next frame if it is time
    if (counter == (frameSpeed - 1))
      currentFrame = (currentFrame + 1) % animationSequence.length;

      // update the counter
      counter = (counter + 1) % frameSpeed;
    };

    /**
     * Draw the current frame
     * @param {integer} x - X position to draw
     * @param {integer} y - Y position to draw
     */
    this.draw = function(x, y) {
      // get the row and col of the frame
      let row = Math.floor(animationSequence[currentFrame] / spritesheet.framesPerRow);
      let col = Math.floor(animationSequence[currentFrame] % spritesheet.framesPerRow);

      ctx.drawImage(
        spritesheet.image,
        col * spritesheet.frameWidth, row * spritesheet.frameHeight,
        spritesheet.frameWidth, spritesheet.frameHeight,
        x, y,
        spritesheet.frameWidth, spritesheet.frameHeight);
    };
  }

  //parallax background
  let background = (function() {
    let bg = {};

    //draw background
    this.draw = function() {
      ctx.drawImage(assetLoader.imgs.bg, 0, 0);

      //Pan bg
      bg.x -= bg.speed;

      //draw images
      ctx.drawImage(assetLoader.imgs.bg, bg.x, bg.y);
      ctx.drawImage(assetLoader.imgs.bg, bg.x + canvas.width, bg.y);

      //reset image
      if (bg.x + assetLoader/imgs.bgwidt <= 0)
        bg,x= 0;
      };

      //Reset bg to 0
      this.reset = function() {
        bg.x = 0;
        bg.y = 0;
        bg.speed = 0.4;
      }

      return {
        draw: this.draw,
        reset: this.reset
      };
    })();

    function animate() {
      requestAnimFrame( animate );

      background.draw();

      player.anim.update();
      player.anim.draw(64, 260);
    }

    //Request Animation Polyfill

    var requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(callback, element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();
  function startGame() {

    // setup the player
    player.width  = 794;
    player.height = 313;
    player.speed  = 6;
    player.sheet  = new SpriteSheet("imgs/Mermovesheet.svg", player.width, player.height);
    player.anim   = new Animation(player.sheet, 2, 0, 2);

    // create the ground tiles
    for (i = 0, length = Math.floor(canvas.width / platformWidth) + 2; i < length; i++) {
      ground[i] = {'x': i * platformWidth, 'y': platformHeight};
    }

    background.reset();

    animate();
  }

  assetLoader.downloadAll();
})()
