/* globals __DEV__ */
import Phaser from 'phaser'
import {Player} from '../sprites/Player'
import {DuelPlayer} from "../sprites/DuelPlayer";

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.map = this.game.add.tilemap('level01')
    this.map.addTilesetImage('tiles')

    this.game.physics.startSystem(Phaser.Physics.ARCADE)

    this.nextFire = 0
    this.fireRate = 800

    this.bullets = this.game.add.group();
    this.bullets.enableBody = true;
    this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
    this.bullets.createMultiple(30, 'bullet', 0, false);
    this.bullets.setAll('anchor.x', 0.5);
    this.bullets.setAll('anchor.y', 0.5);
    this.bullets.setAll('outOfBoundsKill', true);
    this.bullets.setAll('checkWorldBounds', true);

    //  Set the world (global) gravity
    this.game.physics.arcade.gravity.x = 0;
    this.game.physics.arcade.gravity.y = 0;
    this.player = new DuelPlayer({
      game: this.game,
      x: this.world.centerX,
      y: this.world.bounds.bottom - 230,
      asset: 'player'
    })
    // this.player.body.collideWorldBounds = true
    this.player.smoothed = false
    this.player.scale.set(0.5)

    this.game.add.existing(this.player)
  }

  update () {
    if (game.input.activePointer.isDown) {
      this.fire()
    }
  }

  fire () {
    if (this.game.time.now > this.nextFire && this.bullets.countDead() > 0) {
      this.nextFire = this.game.time.now + this.fireRate;

      const bullet = this.bullets.getFirstExists(false)
      bullet.scale.set(0.05)

      bullet.reset(this.player.position.x, this.player.position.y)

      bullet.rotation = this.game.physics.arcade.moveToPointer(bullet, 1000, this.game.input.activePointer) + 90
    }
  }

  render () {
    // if (__DEV__) {
    //   this.game.debug.spriteInfo(this.startBg, 32, 32)
    // }
  }
}
