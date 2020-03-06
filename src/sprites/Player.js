import Phaser from 'phaser'
import config from '../config'

export class Player extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this)
    this.leftArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.rightArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)

    this.speed = 10
    this.jumpHeight = -800
  }

  update () {
    this.body.velocity.x = -300
    if (this.leftArrow.isDown) {
      this.position.x -= this.speed
      this.angle -= this.speed
    } else if (this.rightArrow.isDown) {
      this.position.x += this.speed
      this.angle += this.speed
    }
    if (this.jumpButton.isDown && (this.body.onFloor() || this.body.touching.down)) {
      this.body.velocity.y = this.jumpHeight;
    }
    this.checkWorldBounds()
  }

  checkWorldBounds () {
    if (this.position.x > config.gameWidth - 30) {
      this.position.x = config.gameWidth - 30
    }
    if (this.position.x < 10) {
      this.position.x = 10
    }
  }
}
