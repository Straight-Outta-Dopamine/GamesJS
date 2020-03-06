/* globals __DEV__ */
import Phaser from 'phaser'
import {Player} from '../sprites/Player'

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    this.map = this.game.add.tilemap('level01')
    this.map.addTilesetImage('tiles')

    this.player = new Player({
      game: this.game,
      x: this.world.centerX,
      y: this.world.bounds.bottom - 130,
      asset: 'player'
    })
    this.player.smoothed = false
    this.player.scale.set(0.5)

    this.game.add.existing(this.player)
  }

  render () {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.player, 32, 32)
    }
  }
}
