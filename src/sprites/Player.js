import Phaser from 'phaser'
import config from '../config'

export class Player extends Phaser.TileSprite {
  constructor ({ game, x, y, width, height, key }) {
    super(game, x, y, width, height, key)
    // this.anchor.setTo(0.5)
    this.animations.add('walk')
    this.animations.add('idle', [3])
    this.animations.add('jump', [1])
    this.game.physics.arcade.enable(this)
    this.leftArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT)
    this.leftArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.A)
    this.rightArrow = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT)
    this.rightArrow2 = this.game.input.keyboard.addKey(Phaser.Keyboard.D)
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.UP)
    this.jumpButton2 = this.game.input.keyboard.addKey(Phaser.Keyboard.W)

    this.jumpAudio = this.game.add.audio('jumpSound')

    this.inAir = false
    this.speed = 300
    this.jumpHeight = -800
  }

  update () {
    // this.body.velocity.x = -300
    if (this.body.onFloor() || this.body.touching.down) {
      this.inAir = false
    }
    this.body.velocity.x = 0
    if (this.leftArrow.isDown || this.leftArrow2.isDown) {
      if (this.body.onFloor() || this.body.touching.down) {
        this.animations.play('walk', 24, true)
      }
      this.body.velocity.x = -this.speed
    } else if (this.rightArrow.isDown || this.rightArrow2.isDown) {
      if (this.body.onFloor() ||this.body.touching.down) {
        this.animations.play('walk', 24, true)
      }
      this.body.velocity.x = this.speed
    } else if (!this.inAir) {
       this.animations.play('idle', 24, false)
    } else {
      this.animations.play('jump', 24, false)
    }
    if ((this.jumpButton.isDown || this.jumpButton2.isDown) && (this.body.onFloor() || this.body.touching.down)) {
      this.animations.play('jump', 24, false)
      this.inAir = true
      this.body.velocity.y = this.jumpHeight;
      this.jumpAudio.play()
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
  }
}
