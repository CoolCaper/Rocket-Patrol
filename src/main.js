/*
Rocket Patrol Z
12 Hours
I IMPLEMENTED THE FOLLOWING MODS
1-Point Tier
Implement the 'FIRE' UI text from the original game (1)
Implement the speed increase that happens after 30 seconds in the original game (1)
Randomize each spaceship's movement direction at the start of each play (1)
Allow the player to control the Rocket after it's fired (1)
3-Point Tier
Create 4 new explosion sound effects and randomize which one plays on impact (3)
Display the time remaining (in seconds) on the screen (3)
5-Point Tier
Create a new enemy Spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (5)
Implement a new timing/scoring mechanism that adds time to the clock for successful hits (5)

SOURCES:
Little spaceship - me
explosions - by me with help of https://sfxr.me/
*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [ Menu, Play ]
}
let game = new Phaser.Game(config);
// reserve keyboard vars
let keyF, keyR, keyLEFT, keyRIGHT;
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;
let integer = 0;
let bonus = 0;
function increment() {
    integer++;
  }


let GlobalConfig = {
    fontFamily: 'Courier',
    fontSize: '28px',
    backgroundColor: '#F3B141',
    color: '#843605',
    align: 'center',
    padding: {
      top: 5,
      bottom: 5,
    },
    fixedWidth: 700
  }