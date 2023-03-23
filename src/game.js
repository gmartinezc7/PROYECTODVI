
import Phaser from 'phaser'

export default class game extends Phaser.Scene {
	constructor() {
		super({ key:'game'});
        this.fondoJuego = undefined;
        this.valor = 0;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('fondo','assets/fondo720.jpg')
        this.load.image('character', 'assets/mascleto.png');
        this.load.image('coin', 'assets/bola_snaps/bola_de_luz_10.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        var score = 0;
        var espacioPulsado = false;

		//Pintamos un fondo y creamos el personaje para pintar un fondo que se mueva lo hacemos con sprite y que se actualice cada vez
        this.fondoJuego = this.add.tileSprite(360,360,0,0,'fondo')

        //Marcador de puntuación
        var scoreText = this.add.text(0, 0, 'Score: ' + score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});

        //Se crea el personaje con sus propiedades
        this.character = this.physics.add.sprite(360, 650, 'character');
        this.character.setScale(0.3); 
        this.character.body.allowGravity = true;
        this.character.setCollideWorldBounds(true);

        //Se crean las esferas de luz con sus propiedades
        this.coin = this.physics.add.group({
            allowGravity: false
        });
        this.time.addEvent({
            delay: 5000, // tiempo en milisegundos entre cada moneda
            callback: this.generateCoins,
            callbackScope: this,
            loop: true // para que se repita indefinidamente
        });
    
        //Que el jugador recoga la moneda
        this.physics.add.overlap(this.character, this.coin, collectStar, null, this);
        function collectStar(character, coin){
            coin.disableBody(true, true);
            score += 100; 
            scoreText.setText('Score: ' + score);
            this.character.setVelocityY(-500);
            if(score == 900){
                this.scene.start('escenaFinal');
            }
        }

        this.physics.world.enable(this.character);

        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();
	}

    update() {
        if(this.cursors.space.isDown){
            this.character.setVelocityY(-400);
            this.espacioPulsado = true;
            this.character.setCollideWorldBounds(false);
        }
        if(this.espacioPulsado){
            this.valor += 0.087;
            this.fondoJuego.tilePositionY -= 1;

            if(this.cursors.left.isDown) {
                this.character.setVelocityX(-500);
                this.character.setRotation(this.valor*(-1));
                this.physics.world.wrap(this.character, 0);
            }
            else if(this.cursors.up.isDown){
                this.character.setVelocityY(-200);
            }
            else if (this.cursors.right.isDown) {
                this.character.setVelocityX(500);
                this.character.setRotation(this.valor);
                this.physics.world.wrap(this.character, 50);
            }
            else { 
                this.character.setRotation(this.valor);
                this.character.setVelocityX(0);
            }
            
            //En el caso de que el jugador haya caído hacia bajo, pierde y da paso a la escena final
            if(this.character.y > 1000){
                this.scene.start('escenaFinal');
            }
        }
    }

    //Función que genera monedas aleatoriamente
    generateCoins(){
        //Generar monedas aleatoriamente
        const numCoins = Phaser.Math.Between(1, 2);
        for(let i = 0; i < numCoins; i++){
            const coinX = Phaser.Math.Between(0, 720);
            const coinY = Phaser.Math.Between(0, 720);
            const coin = this.coin.create(coinX, coinY, 'coin');
            coin.setScale(0.2);
        }
        //Generar monedas cerca unas de otras
        /*for(let i = 0; i < numCoins; i++){
            // Si no hay monedas en el juego, genera la primera moneda en una posición aleatoria
            if (this.coin.getLength() === 0) {
                const coinX = Phaser.Math.Between(0, 1024);
                const coinY = Phaser.Math.Between(0, 1024);
                const coin = this.coin.create(coinX, coinY, 'coin');
                coin.setScale(0.2);
                this.coinPosition = new Phaser.Math.Vector2(coinX, coinY);
                return;
            }
            
            // Genera una nueva moneda cerca de la posición anterior
            const coinX = Phaser.Math.Between(this.coinPosition.x - 110, this.coinPosition.x + 110);
            const coinY = Phaser.Math.Between(this.coinPosition.y - 110, this.coinPosition.y + 110);
            const coin = this.coin.create(coinX, coinY, 'coin');
            coin.setScale(0.2);
            this.coinPosition = new Phaser.Math.Vector2(coinX, coinY);
        }*/
    }
}
