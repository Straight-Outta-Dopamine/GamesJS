/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import {Player} from '../sprites/Player'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.map = this.game.add.tilemap('level01')
    this.map.addTilesetImage('tiles')

    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.bgTime = 200
    this.bgs = this.game.add.group()
    this.bgs.enableBody = true
    this.bgs.physicsBodyType = Phaser.Physics.ARCADE
    this.bgs.createMultiple(50, 'bg')
    this.bgs.setAll('anchor.x', 0.5)
    this.bgs.setAll('anchor.y', 1)
    this.bgs.setAll('outOfBoundsKill', true)
    this.bgs.setAll('body.immovable', true)
    this.bgs.setAll('checkWorldBounds', true)

    this.startBg = this.game.add.sprite(0, 0, 'bg')
    this.game.physics.enable(this.startBg, Phaser.Physics.ARCADE)
    this.startBg.enableBody = true
    this.startBg.body.immovable = true
    this.startBg.body.checkWorldBounds = true
    this.startBg.body.velocity.x = -300

    this.platformTime = 200
    this.platforms = this.game.add.group()
    this.platforms.enableBody = true
    this.platforms.physicsBodyType = Phaser.Physics.ARCADE
    this.platforms.createMultiple(50, 'platform')
    this.platforms.setAll('anchor.x', 0.5)
    this.platforms.setAll('anchor.y', 1)
    this.platforms.setAll('outOfBoundsKill', true)
    this.platforms.setAll('body.immovable', true)
    this.platforms.setAll('checkWorldBounds', true)

    this.crates = this.game.add.group()
    this.crates.enableBody = true
    this.crates.physicsBodyType = Phaser.Physics.ARCADE
    this.crates.createMultiple(50, 'crate')
    this.crates.setAll('anchor.x', 0.5)
    this.crates.setAll('anchor.y', 1)
    this.crates.setAll('outOfBoundsKill', true)
    this.crates.setAll('body.immovable', true)

    this.drink = this.game.add.sprite(-2000, -2000, 'drink')
    this.drink.scale.set(2)
    this.drinkBad = this.game.add.sprite(-2000, -2000, 'drink_bad')
    this.drinkBad.scale.set(2)

    this.ground = this.game.add.sprite(0, this.world.bounds.bottom - 50, 'floor')
    this.game.physics.enable(this.ground, Phaser.Physics.ARCADE)
    this.ground.scale.set(10, 10)
    this.ground.enableBody = true
    this.ground.body.immovable = true
    this.ground.body.checkWorldBounds = true

    this.virusInitialX = this.world.bounds.left - 200
    this.virusInitialY = this.world.centerY - 200
    this.virus = this.game.add.tileSprite(this.world.bounds.left - 200, this.world.centerY - 200, 293, 336,'virus')
    this.virus.animations.add('idle')
    this.virus.animations.play('idle', 24, true)
    this.game.physics.enable(this.virus, Phaser.Physics.ARCADE)
    this.virus.scale.set(1)
    this.virus.enableBody = true
    this.virus.body.immovable = true
    this.virus.body.velocity.x = 30
    // this.virus.body.checkWorldBounds = true

    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.y = 0;
    this.game.physics.arcade.gravity.x = 0;
    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.bounds.bottom - 230,
      width: 260,
      height: 352,
      key: 'player'
    })
    this.player.body.gravity.y = 1000;
    // this.player.body.collideWorldBounds = true
    this.game.physics.enable(this.platforms, Phaser.Physics.ARCADE)
    this.player.smoothed = false
    this.player.scale.set(0.5)

    this.game.add.existing(this.player)

  }

  update () {
    // this.game.physics.arcade.moveToObject(this.virus, this.player, 30)
    this.virus.position.y = this.player.position.y - 100

    if (this.virus.body.velocity.x < 0 && this.virus.position.x < this.virusInitialX) {
      this.virus.body.velocity.x = 30
    }
    if (this.game.time.now > this.platformTime) {
      const platformX = this.world.bounds.right + 50
      const platformY = this.rnd.integerInRange(500, this.world.bounds.bottom - 600)

      const platform = this.platforms.getFirstExists(false)

      let rnd = this.rnd.integerInRange(1, 3)
      if (rnd === 3) {
        const crate = this.crates.getFirstExists(false)
        crate.reset(platformX, platformY - 30)
        crate.scale.set(0.5)
        crate.body.velocity.x = -300
      }

      platform.reset(platformX, platformY)
      platform.body.velocity.x = -300
      platform.scale.set(0.4, 0.3)
      this.platformTime = this.game.time.now + 1500;
    }
    if (this.game.time.now > this.bgTime) {
      const bg = this.bgs.getFirstExists(false)

      bg.reset(this.world.bounds.right, this.world.bounds.bottom + 300)
      bg.sendToBack()
      bg.body.velocity.x = -300
      this.bgTime = this.game.time.now + 2900
    }
    this.game.physics.arcade.collide(this.player, this.platforms)
    this.game.physics.arcade.collide(this.player, this.ground)
    // this.game.physics.arcade.collide(this.player, this.crate)
    this.game.physics.arcade.overlap(this.crates, this.player, this.crateAndPlayerCollisionHandler, null, this)
    this.game.physics.arcade.overlap(this.virus, this.player, this.virusAndPlayerCollisionHandler, null, this)
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.startBg, 32, 32)
    // }
  }

  crateAndPlayerCollisionHandler (player, crate) {
    crate.kill()

    const rnd = this.rnd.integerInRange(1, 2)
    const drinkSize = 0.6
    const drinkX = this.world.centerX + 500
    const drinkY = this.world.centerY - 300
    if (rnd === 2) {
      this.drink.position.x = drinkX
      this.drink.position.y = drinkY
      this.drink.scale.set(drinkSize)
      this.virus.body.velocity.x = -200
      setTimeout(() => {
        this.drink.position.x = -2000
        this.drink.position.y = -2000
      }, 2000)
    } else {
      this.drinkBad.position.x = drinkX
      this.drinkBad.position.y = drinkY
      this.drinkBad.scale.set(drinkSize)
      this.game.camera.shake(0.05, 2000)
      setTimeout(() => {
        this.drinkBad.position.x = -2000
        this.drinkBad.position.y = -2000
      }, 3000)
    }
  }

  virusAndPlayerCollisionHandler (virus, player) {
    this.game.state.start('Duel')
  }
}
