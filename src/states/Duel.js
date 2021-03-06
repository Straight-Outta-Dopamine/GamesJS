/* globals __DEV__ */
import Phaser from 'phaser'
import config from "../config";
import {DuelPlayer} from "../sprites/DuelPlayer";

export default class extends Phaser.State {
  init (payload) {
    this.score = +payload.score
  }
  preload () { }

  create () {
    this.ambulanceAudio = this.game.add.audio('ambulance')
    this.ambulanceAudio.loopFull()
    this.evilLaughAudio = this.game.add.audio('evilLaugh')
    this.evilLaughAudio.play()
    this.gunshotAudio = this.game.add.audio('gunshot')

    this.readyFlag = false

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.nextFire = 0
    this.fireRate = 800

    this.bg = this.game.add.sprite(0, 0, 'stomach')
    this.bg.scale.set(1)

    this.bullets = this.game.add.group()
    this.bullets.enableBody = true
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE
    this.bullets.createMultiple(30, 'bullet', 0, false)
    this.bullets.setAll('anchor.x', 0.5)
    this.bullets.setAll('anchor.y', 0.5)
    this.bullets.setAll('outOfBoundsKill', true)
    this.bullets.setAll('checkWorldBounds', true)

    this.viruses = this.game.add.physicsGroup(Phaser.Physics.ARCADE)
    this.viruses.enableBody = true
    this.viruses.physicsBodyType = Phaser.Physics.ARCADE
    this.viruses.createMultiple(30, 'virus')
    this.viruses.setAll('anchor.x', 0.5)
    this.viruses.setAll('anchor.y', 0.5)
    this.viruses.setAll('body.collideWorldBounds', true)
    this.viruses.setAll('body.bounce.x', 1)
    this.viruses.setAll('body.bounce.y', 1)

    this.virusesCount = 10
    for (let i = 0; i < this.virusesCount; i++) {
      const virus = this.viruses.getFirstDead()
      virus.scale.set(0.4)
      const posX = this.rnd.integerInRange(100, config.gameWidth - 600)
      const posY = this.rnd.integerInRange(100, this.world.bounds.bottom - 600)
      virus.reset(posX, posY)
    }

    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.x = 0;
    this.game.physics.arcade.gravity.y = 0;
    this.player = new DuelPlayer({
      game: this.game,
      x: this.world.centerX,
      y: this.world.bounds.bottom - 100,
      asset: 'player_duel'
    })
    // this.player.body.collideWorldBounds = true
    this.player.smoothed = false
    this.player.scale.set(0.5)

    this.game.add.existing(this.player)

    const killTheVirus = this.game.add.sprite(this.world.centerX - 200, this.world.centerY - 200, 'killTheVirusText')
    killTheVirus.scale.set(1.5)

    setTimeout(() => {
      this.readyFlag = true
      killTheVirus.destroy()
    }, 2000)
  }

  update () {
    if (this.readyFlag) {
      if (this.virusesCount <= 0) {
        this.ambulanceAudio.stop()
        this.state.start('Game', true, false, {score: this.score})
      }
      this.game.physics.arcade.collide(this.viruses)

      this.viruses.forEach(virus => {
        this.game.physics.arcade.moveToObject(virus, this.player, 200)
      })
      if (this.game.input.activePointer.isDown) {
        this.fire()
      }

      this.game.physics.arcade.overlap(this.viruses, this.bullets, this.virusAndBulletCollisionHandler, null, this)
      this.game.physics.arcade.overlap(this.viruses, this.player, this.virusAndPlayerCollisionHandler, null, this)
    }
  }

  fire () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
      this.gunshotAudio.play()
      this.nextFire = this.game.time.now + this.fireRate;

      const bullet = this.bullets.getFirstExists(false)
      bullet.scale.set(0.1)

      bullet.reset(this.player.position.x, this.player.position.y)

      bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer) + 90
    }
  }

  virusAndBulletCollisionHandler (virus, bullet) {
    virus.kill()
    bullet.kill()
    this.virusesCount--
  }

  virusAndPlayerCollisionHandler (player, virus) {
    this.ambulanceAudio.stop()
    this.state.start('GameOver', true, false, {score: this.score})
  }
}
