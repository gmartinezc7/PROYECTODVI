import Phaser from 'phaser'
//import HelloWorldScene from './HelloWorldScene'
import titulo from './titulo.js'
import game from './game.js'
import menuniveles from './menuniveles.js'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 1024,
	height: 1024,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [titulo, game, menuniveles],
}

export default new Phaser.Game(config)
