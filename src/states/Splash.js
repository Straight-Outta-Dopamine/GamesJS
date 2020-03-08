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
    this.load.spritesheet('virus', 'assets/sprites/virus_sprite.png', 293, 336)
    this.load.spritesheet('player', 'assets/sprites/player_sprite.png', 260, 352)
    this.load.image('mushroom', 'assets/images/mushroom2.png')
    // this.load.image('player', 'assets/images/ball.png')
    this.load.image('player_duel', 'assets/images/ball_white.png')
    this.load.image('tiles', 'assets/tiles/tiles.png')
    this.load.image('platform', 'assets/images/platform.jpg')
    this.load.image('floor', 'assets/images/floor.png')
    this.load.image('bg', 'assets/images/bg.png')
    // this.load.image('virus', 'assets/images/virus.png')
    this.load.image('drink', 'assets/images/drink.png')
    this.load.image('drink_bad', 'assets/images/drink_bad.png')
    this.load.image('bullet', 'assets/images/bullet.png')
    this.load.image('stomach', 'assets/images/stomach.jpg')
    this.load.image('crate', 'assets/images/crate.png')
    this.load.image('menu', 'assets/images/menu_screen.png')
    this.load.image('startBtn', 'assets/images/start_button.png')
    this.load.image('killTheVirusText', 'assets/images/kill_the_virus.png')
    this.load.image('bin', 'assets/images/trash_bin.png')
    this.load.audio('ambulance', 'assets/audio/ambulance.wav')
    this.load.audio('music', 'assets/audio/music.mp3')
    this.load.audio('jumpSound', 'assets/audio/jump_sound.wav')
    this.load.tilemap('level01', 'http://examples.phaser.io/assets/tilemaps/maps/features_test.json', null, Phaser.Tilemap.TILED_JSON)
  }

  create () {
    this.state.start('Start')
  }
}
