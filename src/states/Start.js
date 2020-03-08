/* globals __DEV__ */
import Phaser from 'phaser'
import config from "../config";

export default class extends Phaser.State {
  init () { }
  preload () { }

  create () {
    const bg = this.game.add.sprite(0, -150, 'menu')
    bg.scale.set(0.76)
    this.game.add.button(this.game.world.centerX - 100, this.world.centerY, 'startBtn', () => {
      this.state.start('Game')
    }, this, 2, 1, 0)
  }

  update () {
  }
}
