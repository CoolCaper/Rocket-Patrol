class SpaceShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, Speed = game.settings.spaceshipSpeed) {

        //console.log('space ships')
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = Speed;
        this.right = false;
    }
    update() {
        if (!this.right) {
            this.x -= this.moveSpeed;
            if(this.x <= 0 - this.width) {
                this.reset();
            }
        } else {
            this.x += this.moveSpeed;
            //console.log("Should be going right");
            if(this.x > game.config.width) {
                this.reset();
            }

        }
    }
    // 
    reset() { 
        if (!this.right) {
            this.x = game.config.width; 
        } else {
            this.x = 0;
        }
    }
}