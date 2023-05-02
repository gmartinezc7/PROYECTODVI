
import Phaser from 'phaser'

export default class titulo extends Phaser.Scene {
	
	constructor() {
		super({ key:'titulo'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        //this.load.image('sky', 'https://labs.phaser.io/public/assets/skies/space3.png');
		this.load.image('inicio', 'public/assets/inicio720.jpg')
		this.load.image('start', 'public/assets/start2.jpg');
		this.load.image('start', 'public/assets/mascleto.png');
		this.load.audio('music', 'public/assets/music.mp3');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'inicio');

		this.sound.stopAll();
		

		//Añadimos el botón de start
		this.start = this.add.image(200, 500, 'start').setInteractive();
		this.start.setScale(0.6);

		//const sound = this.sound.add('music', { loop: true, volume: 0.5 });
		//sound.play();


		this.input.mouse.disableContextMenu();
		/*this.input.on('pointermove', (pointer) => {
			sound.resume();
		});*/
		
		this.scene.stop('game');
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
