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
		this.load.image('gameOver', 'assets/endgame.png');
		this.load.image('menu', 'assets/menu.jpg');
        this.load.image('win', 'assets/you_win.png');
		//this.load.image('lose', 'assets/lose.jpg');
	}

	init(data){
		this.final = data;
		//console.log('final: %d',data);
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'niveles')

		if(this.final == 0){
			this.texto = this.add.image(360, 360, 'gameOver')
		}else{
			this.texto = this.add.image(360,360,'win')
		}

		//this.texto = this.add.image(360, 360, 'gameOver')

		this.buttonBack = this.add.image(550,660,'menu').setInteractive();
        this.buttonBack.on('pointerdown', pointer => {
            this.scene.start('menuniveles');
	    });
		

        //La escena se queda pausada ya que hemos perdido
		//this.scene.pause();
	}

	update(){

	}
}
