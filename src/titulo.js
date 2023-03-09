
import Phaser from 'phaser'

export default class titulo extends Phaser.Scene {
	
	constructor() {
		super({ key:'titulo'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        this.load.image('sky', 'https://labs.phaser.io/assets/skies/space3.png');
		this.load.image('inicio', 'imagenes/inicio.png')
		this.load.image('start', 'imagenes/start.png');
		this.load.image('start', 'imagenes/mascleto.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(512, 512, 'inicio')
		

		//Añadimo el botón de start
		this.start = this.add.image(300, 800, 'start').setInteractive();

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    this.start.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

	    /*this.start.on('pointerup', pointer => {
			this.scene.start('animation'); //Cambiamos a la escena de juego

	    });*/
	}

	update(){

	}
}
