/* globals __DEV__ */
import Phaser from 'phaser'
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
    this.startBg.scale.set(1.2, 1)
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

    this.drinks = this.game.add.group()
    this.drinks.enableBody = true
    this.drinks.physicsBodyType = Phaser.Physics.ARCADE
    this.drinks.createMultiple(50, 'drink')
    this.drinks.setAll('anchor.x', 0.5)
    this.drinks.setAll('anchor.y', 1)
    this.drinks.setAll('outOfBoundsKill', true)
    this.drinks.setAll('body.immovable', true)

    this.ground = this.game.add.sprite(0, this.world.bounds.bottom - 50, 'platform')
    this.game.physics.enable(this.ground, Phaser.Physics.ARCADE)
    this.ground.scale.set(10, 10)
    this.ground.enableBody = true
    this.ground.body.immovable = true
    this.ground.body.checkWorldBounds = true

    this.virusInitialX = this.world.bounds.left - 200
    this.virusInitialY = this.world.centerY - 200
    this.virus = this.game.add.sprite(this.world.bounds.left - 200, this.world.centerY - 200, 'virus')
    this.game.physics.enable(this.virus, Phaser.Physics.ARCADE)
    this.virus.scale.set(1.7)
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
      asset: 'player'
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
    this.virus.position.y = this.player.position.y - 300

    if (this.virus.body.velocity.x < 0 && this.virus.position.x < this.virusInitialX) {
      this.virus.body.velocity.x = 30
    }
    if (this.game.time.now > this.platformTime) {
      const platformX = this.world.bounds.right + 50
      const platformY = this.rnd.integerInRange(500, this.world.bounds.bottom - 600)

      const platform = this.platforms.getFirstExists(false)

      const rnd = this.rnd.integerInRange(1, 3)
      if (rnd === 3) {
        const drink = this.drinks.getFirstExists(false)
        drink.reset(platformX, platformY - 30)
        drink.scale.set(0.1)
        drink.body.velocity.x = -300
      }

      platform.reset(platformX, platformY)
      platform.body.velocity.x = -300
      platform.scale.set(0.4, 0.3)
      this.platformTime = this.game.time.now + 1500;
    }
    if (this.game.time.now > this.bgTime) {
      const bg = this.bgs.getFirstExists(false)

      bg.reset(this.world.bounds.right, this.world.bounds.bottom)
      bg.sendToBack()
      bg.body.velocity.x = -300
      bg.scale.set(1.2, 1)
      this.bgTime = this.game.time.now + 2000
    }
    this.game.physics.arcade.collide(this.player, this.platforms)
    this.game.physics.arcade.collide(this.player, this.ground)
    // this.game.physics.arcade.collide(this.player, this.drinks)
    this.game.physics.arcade.overlap(this.drinks, this.player, this.drinkAndPlayerCollisionHandler, null, this)
    this.game.physics.arcade.overlap(this.virus, this.player, this.virusAndPlayerCollisionHandler, null, this)
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.startBg, 32, 32)
    // }
  }

  drinkAndPlayerCollisionHandler (player, drink) {
    drink.kill()

    this.virus.body.velocity.x = -200
    // this.virus.reset(this.virusInitialX, this.virusInitialY)
    // this.virus.scale.set(this.virus.scale.x - 0.2, this.virus.scale.y - 0.2)
  }

  virusAndPlayerCollisionHandler(virus, player) {
    virus.kill()
  }
}
