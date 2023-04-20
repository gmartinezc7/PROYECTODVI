
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
		this.load.image('inicio', 'assets/inicio720.jpg')
		this.load.image('start', 'assets/start2.jpg');
		this.load.image('start', 'assets/mascleto.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'inicio')
		

		//Añadimos el botón de start
		this.start = this.add.image(200, 500, 'start').setInteractive();



		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    this.start.on('pointerdown', pointer => {
	    	this.scene.start('menuniveles');
	    });

	    /*this.start.on('pointerup', pointer => {
			this.scene.start('animation'); //Cambiamos a la escena de juego

	    });*/
	}

	update(){

	}
}
