class Play extends Phaser.Scene {
    constructor() {
      super("playScene");
    }
    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/rocket.png');
        this.load.image('spaceship', './assets/spaceship.png');
        this.load.image('starfield', './assets/starfield.png');
        this.load.spritesheet('explosion', './assets/explosion.png', {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
        this.load.image('spaceship2', './assets/spaceship2.png');
      }
    create() {
        // place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0, 0);
        this.add.rectangle(0, borderUISize + borderPadding, game.config.width, borderUISize * 2, 0x00FF00).setOrigin(0, 0);
        // white borders
        this.add.rectangle(0, 0, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, game.config.height - borderUISize, game.config.width, borderUISize, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(0, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.add.rectangle(game.config.width - borderUISize, 0, borderUISize, game.config.height, 0xFFFFFF).setOrigin(0, 0);
        this.p1Rocket = new Rocket(this, game.config.width/2, game.config.height - borderUISize - borderPadding, 'rocket').setOrigin(0.5, 0);  // define keys
        //keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        // add spaceships (x3)
        this.ship01 = new SpaceShip(this, game.config.width + borderUISize*6, borderUISize*4, 'spaceship', 0, 20).setOrigin(0, 0);
        this.ship02 = new SpaceShip(this, game.config.width + borderUISize*3, borderUISize*5 + borderPadding*2, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship03 = new SpaceShip(this, game.config.width, borderUISize*6 + borderPadding*4, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship04 = new SpaceShip(this, game.config.width, borderUISize*6 + borderPadding*6, 'spaceship2', 0, 50, game.settings.spaceshipSpeed + 3).setOrigin(0,0);
        //this.ship04.moveSpeed = game.settings.spaceshipSpeed + 5;
        
        //console.log(this.time.number);
        // animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });
        // initialize score
        this.p1Score = 0;
          // display score
  let scoreConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'right',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }

  
  let timerConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#FACADE',
    color: '#843605',
    align: 'left',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 100
  }
  this.scoreLeft = this.add.text(borderUISize + borderPadding, borderUISize + borderPadding*2, this.p1Score, scoreConfig);
  // GAME OVER flag
this.gameOver = false;
// 60-second play clock
scoreConfig.fixedWidth = 0;
let time = 45.0;
this.integer = 0;
this.timerText = this.add.text(borderUISize + borderPadding * 18, borderUISize + borderPadding*2, time, timerConfig);
this.timer = this.time.addEvent({
  delay: 1000,                // ms
  callback: increment,
  //args: [],
  callbackScope: this,
  loop: true
});
this.gameOverZero = 1;
}

update() { 
      //time -= this.clock.getElapsedSeconds();
      //this.timerText = time;
      // check key input for restart
      let textTime = ((game.settings.gameTimer / 1000 - integer) + bonus) * this.gameOverZero;
      this.timerText.text = textTime;
      if (textTime <= 0) {
        this.gameOverZero = 0;
        this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', GlobalConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/2 + 64, 'Press (R) to Restart or < for Menu', GlobalConfig).setOrigin(0.5);
        this.gameOver = true;
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)) {
          this.gameOverZero = 1;
          integer = 0;
          bonus = 0;
          textTime = game.settings.gameTimer;
          this.scene.restart();
      }
      if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
        this.gameOverZero = 1;
        integer = 0;
        bonus = 0;
        textTime = game.settings.gameTimer;
        this.scene.start("menuScene");
      }
      this.starfield.tilePositionX -= 4;
      if (!this.gameOver) {               
        this.p1Rocket.update();         // update rocket sprite
        this.ship01.update();           // update spaceships (x3)
        this.ship02.update();
        this.ship03.update();
        this.ship04.update();
    } 
    
      // check collisions
if(this.checkCollision(this.p1Rocket, this.ship03)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship03);   
}
if(this.checkCollision(this.p1Rocket, this.ship03)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship03);   
}
if (this.checkCollision(this.p1Rocket, this.ship02)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship02);
}
if (this.checkCollision(this.p1Rocket, this.ship01)) {
  this.p1Rocket.reset();
  this.shipExplode(this.ship01);
}

//console.log(this.clock.getElapsedSeconds());

    }
    checkCollision(rocket, ship) {
      // simple AABB checking
      if (rocket.x < ship.x + ship.width && 
        rocket.x + rocket.width > ship.x && 
        rocket.y < ship.y + ship.height &&
        rocket.height + rocket.y > ship. y) {
        return true;
      } else {
        return false;
      }
    }
    shipExplode(ship) {
      // temporarily hide ship
      ship.alpha = 0;
      // create explosion sprite at ship's position
      let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
      boom.anims.play('explode');             // play explode animation
      boom.on('animationcomplete', () => {    // callback after anim completes
        ship.reset();                         // reset ship position
        ship.alpha = 1;                       // make ship visible again
        boom.destroy();                       // remove explosion sprite
      
  // score add and repaint
  this.p1Score += ship.points;
  bonus += 5;
  // 
  this.scoreLeft.text = this.p1Score;
      });       
      let value = Phaser.Math.Between(0, 4);
      console.log(value);
      if (value = 0) {
        console.log('explosion 0');
        this.sound.play('sfx_explosion');
      } else if (value = 1) {
        console.log('explosion 1');
        this.sound.play('sfx_explosion1');
      } else if (value = 2) {
        console.log('explosion 2');
        this.sound.play('sfx_explosion2');
      } else if (value = 3) {
        console.log('explosion 3');
        this.sound.play('sfx_explosion3');
      } else if (value = 4) {
        console.log('explosion 4');
        this.sound.play('sfx_explosion4');
      }
    }
    reset() {
      this.isFiring = false; 
      this.y = game.config.height - borderUISize - borderPadding;
    }
  }