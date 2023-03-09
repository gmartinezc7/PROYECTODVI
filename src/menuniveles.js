import Phaser from 'phaser'

export default class menuniveles extends Phaser.Scene {
	
	constructor() {
		super({ key:'menuniveles'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        this.load.image('niveles', 'assets/fondoniveles.jpg');
		this.load.image('start', 'assets/start.png');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(512, 512, 'niveles')
		

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
