/* globals __DEV__ */
import Phaser from 'phaser'
import config from '../config'
import {Player} from '../sprites/Player'

export default class extends Phaser.State {
    init (payload) {
        this.score = +payload.score
    }
    preload () { }

    create () {
        this.stage.backgroundColor = 'black'
        this.scoreText = this.game.add.text(this.game.world.centerX - 300, this.world.centerY - 100, 'Your score: ' +  this.score, {
            font: '34px Times New Roman',
            fill: '#fff'
        }).scale.set(1.4)
        this.game.add.sprite(this.game.world.centerX - 300, this.world.centerY - 300, 'gameOverText')
        this.game.add.button(this.game.world.centerX - 250, this.world.centerY, 'tryAgainBtn', () => {
            this.state.start('Game')
        }, this, 2, 1, 0).scale.set(0.8)
    }

    update () {
    }
}
