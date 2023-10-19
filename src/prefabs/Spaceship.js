class SpaceShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {

        console.log('space ships')
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue; 
        this.moveSpeed = 3;
    }
    update() {
        this.x -= this.moveSpeed;
        if(this.x <= 0 - this.width) {
            this.reset();
        }
    }
    // 
    reset() { 
        this.x = game.config.width; 
    }
}