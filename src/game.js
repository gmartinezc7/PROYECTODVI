
import Phaser from 'phaser'

export default class game extends Phaser.Scene {

	constructor() {
		super({ key:'game'});
        this.fondoJuego = undefined;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('fondo','assets/fondofinal.jpg')
        this.load.image('character', 'assets/mascleto.png');
        this.load.image('coin', 'https://labs.phaser.io/assets/sprites/star.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        var score = 0;

		//Pintamos un fondo y creamos el personaje
        this.fondoJuego = this.add.tileSprite(512,512,0,0,'fondo')


        var scoreText = this.add.text(0, 0, 'Score: ' + score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});
        this.character = this.physics.add.sprite(400, 500, 'character');
        this.character.setScale(0.4); 
        this.character.body.allowGravity = false;
        
        this.character.setCollideWorldBounds(true);
        
        //this.coin = this.physics.add.sprite(100, 400, 'coin');

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: 5,
            allowGravity: false,
            setXY: { x: 200, y: 300, stepX: 210 }
        });
    
        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();

        //Que el jugador recoga la moneda
        this.physics.add.overlap(this.character, this.coin, collectStar, null, this);
        function collectStar(character, coin){
            coin.disableBody(true, true);
            score += 100; // Aumenta el puntaje del jugador en 10
            scoreText.setText('Score: ' + score);
        }
	}

    update() {
        this.fondoJuego.tilePositionY -= 1;

        if(this.cursors.left.isDown) {
            this.character.setVelocityX(-500);
        }
        else if(this.cursors.up.isDown){
            this.character.setVelocityY(-500);

        }
        else if (this.cursors.right.isDown) {
            this.character.setVelocityX(500);
        }
        else { 
            this.character.setVelocityX(0);
        }


    }
}
