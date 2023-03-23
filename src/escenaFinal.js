import Phaser from 'phaser'

export default class escenaFinal extends Phaser.Scene {
	
	constructor() {
		super({ key:'escenaFinal'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('niveles', 'assets/fondoniveles.jpg');
		this.load.image('gameOver', 'assets/game_over.png');
        //this.load.image('win', 'assets/win.jpg');
		//this.load.image('lose', 'assets/lose.jpg');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'niveles')


		this.texto = this.add.image(360, 360, 'gameOver')
		

        //La escena se queda pausada ya que hemos perdido
		//this.scene.pause();
	}

	update(){

	}
}
