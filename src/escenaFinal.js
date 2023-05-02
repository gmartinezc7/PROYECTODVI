import Phaser from 'phaser'

export default class escenaFinal extends Phaser.Scene {
	
	constructor() {
		super({ key:'escenaFinal'});
		this.final = 0;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('niveles', 'public/assets/fondoniveles.jpg');
		this.load.image('gameOver', 'public/assets/endgame.png');
		this.load.image('menu', 'public/assets/Boton Menu.png');

		this.load.audio('gameover','public/assets/GameOver.mp3');
		this.load.audio('winaudio','public/assets/Won!.mp3');

        //this.load.image('win', 'public/assets/you_win.png');
		this.load.image('restart', 'public/assets/Boton reiniciar.png');
		this.load.image('victoria1', 'public/assets/Dialogo Victoria/Victoria1.png');
		this.load.image('victoria2', 'public/assets/Dialogo Victoria/Victoria2.png');
		this.load.image('victoria3', 'public/assets/Dialogo Victoria/Victoria3.png');
		//this.load.image('lose', 'public/assets/lose.jpg');
	}

	init(data){
		this.final = data.numero;
		this.totalEsferas = data.totalEsferas;
		this.totalRecogidas = data.totalRecogidas;
		this.level = data.nivel;
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360, 'niveles')

		if(this.final == 0){
			this.sound.stopAll();
			this.GameOversound=this.sound.add('gameover');
			this.GameOversound.play();
			this.texto = this.add.image(360, 360, 'gameOver')
		}else{

			if (this.totalRecogidas >= 0.8*this.totalEsferas){
				this.add.image(360,300, 'victoria3');
			}
			else if(this.totalRecogidas >= 0.4*this.totalEsferas){
				this.add.image(360,300, 'victoria2');
			}
			else{
				this.add.image(360,300, 'victoria1');
			}
			this.sound.stopAll();
			this.Winsound=this.sound.add('winaudio');
			this.Winsound.play();
		}


		this.buttonBack = this.add.image(550,660,'menu').setInteractive();
		this.buttonBack.setScale(0.7);
        this.buttonBack.on('pointerdown', pointer => {
			this.scene.stop('escenafinal');
            this.scene.start('menuniveles');
            this.scene.stop();
            
	    });

		this.buttonRestart = this.add.image(320, 660, 'restart').setInteractive();
		this.buttonRestart.setScale(0.7);
		this.buttonRestart.on('pointerdown', pointer => {
			this.scene.stop('escenafinal');
            this.scene.start('game');
            this.scene.stop();
            //this.scene.start('game', {nivel: this.level})
	    });


		// HACER UN IF Y DEPENDIENDO DEL SCORE QUE SE RECIBA SE MUESTRA IMAGEN CON
		// 1 ESTRELLA, 2 O 3
		

        //La escena se queda pausada ya que hemos perdido
		//this.scene.pause();
	}

	update(){

	}
}
