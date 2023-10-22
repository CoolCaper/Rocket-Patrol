class SpaceShip extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue, Speed = game.settings.spaceshipSpeed) {

        console.log('space ships')
        super(scene, x, y, texture, frame);
        scene.add.existing(this);
        this.points = pointValue;
        this.moveSpeed = Speed;
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