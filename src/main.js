import Phaser from 'phaser'
//import HelloWorldScene from './HelloWorldScene'
import titulo from './titulo.js'
import game from './game.js'
import menuniveles from './menuniveles.js'
import escenaFinal from './escenaFinal.js'

const config = {
	type: Phaser.AUTO,
	parent: 'phaser-game',
	width: 720,
	height: 720,
	physics: {
		default: 'arcade',
		arcade: {
			debug: false,
			gravity: { y: 200 },
		},
	},
	scene: [titulo, menuniveles, game, escenaFinal],
}

export default new Phaser.Game(config)
