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


    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.y = 0;
    this.game.physics.arcade.gravity.x = 0;
    this.player = new Player({
      game: this.game,
      x: this.world.centerX - 500,
      y: this.world.bounds.bottom - 230,
      asset: 'player'
    })
    this.player.body.gravity.y = 1000;
    this.player.body.collideWorldBounds = true
    this.game.physics.enable(this.platforms, Phaser.Physics.ARCADE);
    this.player.smoothed = false
    this.player.scale.set(0.5)

    this.game.add.existing(this.player)
  }

  update () {
    if (this.game.time.now > this.platformTime) {
      const platform = this.platforms.getFirstExists(false)

      platform.reset(this.world.bounds.right, this.rnd.integerInRange(500, this.world.bounds.bottom - 400))
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
  }

  render () {
    /* if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    } */
  }
}
