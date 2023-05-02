//import Phaser from 'phaser'
import titulo from './titulo.js'
import game from './game.js'
import menuniveles from './menuniveles.js'
import escenaFinal from './escenaFinal.js'
import tienda from './tienda.js'
import escenaPausada from './escenaPausada.js'



const config = {
	type: Phaser.AUTO,
	parent: 'phaser-game',
	width: 720,
	height: 720,
	pixelArt: true,
	scale: {
		autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
		// Configuramos phaser para que se adapte al tamaño de pantalla donde ejecutadmos
		// con un mínimo y un máximo de tamaño
		mode: Phaser.Scale.FIT,
		min: {
            width: 188,
            height: 328
        },
		max: {
            width: 752,
            height: 1312
        },
		zoom: 1
    },
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: { y: 300 },
		},
	},
	scene: [titulo, tienda, menuniveles, game, escenaPausada, escenaFinal],
}

export default new Phaser.Game(config);
