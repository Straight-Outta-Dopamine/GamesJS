import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    this.load.image('player', 'assets/images/ball.png')
    this.load.image('tiles', 'assets/tiles/tiles.png')
    this.load.image('platform', 'assets/images/platform.jpg')
    this.load.image('bg', 'assets/images/bg.jpg')
    this.load.tilemap('level01', 'http://examples.phaser.io/assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    this.state.start('Game')
  }
}
