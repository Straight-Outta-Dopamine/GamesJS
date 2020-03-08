import Phaser from 'phaser'
import config from '../config'

export class DuelPlayer extends Phaser.Sprite {
  constructor ({ game, x, y, asset }) {
    super(game, x, y, asset)
    this.anchor.setTo(0.5)
    this.game.physics.arcade.enable(this)
    this.leftArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.leftArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
    this.rightArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.rightArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    this.upArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.upArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.W)
    this.downArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN)
    this.downArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.S)

    this.speed = 10
  }

  update () {
    this.rotation = this.game.physics.arcade.angleToPointer(this)
    if (this.leftArrow.isDown || this.leftArrow2.isDown) {
      this.position.x -= this.speed
    } else if (this.rightArrow.isDown || this.rightArrow2.isDown) {
      this.position.x += this.speed
    }
    if (this.upArrow.isDown || this.upArrow2.isDown) {
      this.position.y -= this.speed
    }
    if (this.downArrow.isDown || this.downArrow2.isDown) {
      this.position.y += this.speed
    }
    this.checkWorldBounds()
  }

  checkWorldBounds () {
    if (this.position.x > config.gameWidth - 600) {
      this.position.x = config.gameWidth - 600
      console.log('HERAE')
    }
    if (this.position.x < 10) {
      this.position.x = 10
    }
    if (this.position.y > config.gameHeight - 1300) {
      this.position.y = config.gameHeight - 1300
    }
    if (this.position.y < 10) {
      this.position.y = 10
    }
  }
}
