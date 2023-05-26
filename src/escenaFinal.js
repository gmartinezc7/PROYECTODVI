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
        this.load.image('niveles', './assets/fondoniveles.jpg');
		this.load.image('gameOver', './assets/endgame.png');
		this.load.image('menu', './assets/Botones/Boton Menu.png');

		this.load.audio('gameover','./assets/Sonidos/GameOver.mp3');
		this.load.audio('winaudio','./assets/Sonidos/Won!.mp3');

        //this.load.image('win', './assets/you_win.png');
		this.load.image('restart', './assets/Botones/Boton reiniciar.png');
		this.load.image('victoria1', './assets/Dialogo Victoria/Victoria1.png');
		this.load.image('victoria2', './assets/Dialogo Victoria/Victoria2.png');
		this.load.image('victoria3', './assets/Dialogo Victoria/Victoria3.png');
		//this.load.image('lose', './assets/lose.jpg');
	}

	init(data){
		this.final = data.numero;
		this.totalEsferas = data.totalEsferas;
		this.totalRecogidas = data.totalRecogidas;
		this.level = data.nivel;
		this.scoreFinal = data.puntuacion;
		this.levelCompleted=1;
		
		this.totalStars=0;
		this.bestScoreLevel1=0;
		this.bestScoreLevel2=0;
		this.bestScoreLevel3=0;
		this.bestScoreLevel4=0;
		this.bestScoreLevel5=0;

		

		
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

			const levelCompleted = this.registry.get('levelCompleted');

            switch(this.level){
                case 1:
                    if (!(levelCompleted < this.level) && !(levelCompleted > this.level) ) {
                
                        this.registry.set('levelCompleted', 2);
                      }

                
                break;
                case 2:
                    if (!(levelCompleted < this.level) && !(levelCompleted > this.level) ) {
                
                        this.registry.set('levelCompleted', 3);
                      }

                break;
                case 3:
                    if (!(levelCompleted < this.level) && !(levelCompleted > this.level) ) {
                
                        this.registry.set('levelCompleted', 4);
                      }

                break;
                case 4:
                    if (!(levelCompleted < this.level) && !(levelCompleted > this.level) ) {
                
                        this.registry.set('levelCompleted', 5);
                      }
                break;
                
            }

			const totalStars = this.registry.get('totalStars')
			const bestScore=this.registry.get(`bestScoreLevel${this.level}`)
			

			if (this.totalRecogidas >= 0.8*this.totalEsferas){
				this.add.image(360,300, 'victoria3');
				this.registry.set('totalStars', totalStars+3);
				this.registry.set(`bestScoreLevel${this.level}`,3)
			}
			else if(this.totalRecogidas >= 0.4*this.totalEsferas){
				this.add.image(360,300, 'victoria2');
				this.registry.set('totalStars', totalStars+2);
				if (bestScore<2){
					this.registry.set(`bestScoreLevel${this.level}`,2)

				}

			}
			else{
				this.add.image(360,300, 'victoria1');
				this.registry.set('totalStars', totalStars+1);
				if (bestScore<1){
					this.registry.set(`bestScoreLevel${this.level}`,1)

				}
			}



			this.scoreText2 = this.add.text(200, 410, 'Score: ' + this.scoreFinal, {fontFamily: 'Arial', fontSize: '55px', fontStyle: 'bold', color: '#F1A63F'});
			this.scoreText2.style.fontStyle.bold();
			this.scoreText2.setScrollFactor(0,0);
			this.scoreText2.setDepth(5);





			
			this.sound.stopAll();
			this.Winsound=this.sound.add('winaudio');
			this.Winsound.play();
		}





		// BOTON MENU NO REINICIA BIEN LA ESCENA
		this.buttonBack = this.add.image(550,660,'menu').setInteractive();
		this.buttonBack.setScale(0.7);
        this.buttonBack.on('pointerdown', pointer => {
			this.scene.start('menuniveles');

	    });




		// BOTON RESTART FUNCIONA
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
