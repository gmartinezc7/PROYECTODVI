
import Phaser from 'phaser'

export default class game extends Phaser.Scene {

	constructor(nivel) {
		super({ key:'game'});
        this.fondoJuego = undefined;
        this.valor = 0;
        //this.nivel = nivel;
        //this.nivel= this.scene.settings.data;
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('fondo','assets/fondo720.jpg')
        this.load.image('character', 'assets/mascleto.png');
        this.load.image('coin1', 'assets/Bolas/bola_de_luz_amarilla.png');
        this.load.image('coin2', 'assets/Bolas/bola_de_luz_morada.png');
        this.load.image('coin3', 'assets/Bolas/bola_de_luz_roja.png');
        this.load.image('coin4', 'assets/Bolas/bola_de_luz_verde.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        this.score = 0;
        var espacioPulsado = false;

		//Pintamos un fondo y creamos el personaje para pintar un fondo que se mueva lo hacemos con sprite y que se actualice cada vez
        this.fondoJuego = this.add.tileSprite(360,360,0,0,'fondo')

        //Marcador de puntuación
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});

        //Se crea el personaje con sus propiedades
        this.character = this.physics.add.sprite(360, 650, 'character');
        this.character.setScale(0.2); 
        this.character.body.allowGravity = true;
        this.character.setCollideWorldBounds(true);

        //Se crean las esferas de luz con sus propiedades
        this.coin = this.physics.add.group({
            allowGravity: false
        });
        this.evento = this.time.addEvent({
            delay: 6000, // tiempo en milisegundos entre cada moneda
            callback: this.generateCoins,
            callbackScope: this,
            loop: true, // para que se repita indefinidamente
            paused: true
        });
    
        //Que el jugador recoga la moneda
        this.physics.add.overlap(this.character, this.coin, this.collectStar, null, this);

        this.physics.world.enable(this.character);

        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();
	}

    update() {
        var rotacionIzquierda = false;
        /*if (this.character.y < 350){
            this.fondoJuego.tilePositionY -= 4;
        }*/
        if (this.character.y < 350){
            this.fondoJuego.tilePositionY -= 4;
        }
        /*if (this.character.y < 200){
            this.fondoJuego.tilePositionY -= 4;
        }
        if (this.character.y < 180){
            this.fondoJuego.tilePositionY -= 5;
        }
        if (this.character.y < 120){
            this.fondoJuego.tilePositionY -= 6;
        }
        if (this.character.y < 100){
            this.fondoJuego.tilePositionY -= 7;
        }
        if (this.character.y < 80){
            this.fondoJuego.tilePositionY -= 8;
        }*/

        
        if(this.cursors.space.isDown && !this.espacioPulsado){
            this.character.setVelocityY(-350);
            this.espacioPulsado = true;
            this.character.setCollideWorldBounds(false);
        }
        if(this.espacioPulsado){
            //this.valor += 0.087;
            this.fondoJuego.tilePositionY -= 1;

            this.evento.paused = false;

            //this.fondoJuego.tilePositionY -= this.nivel.numero;

            if(this.cursors.left.isDown) {
                rotacionIzquierda = true;
                if(rotacionIzquierda) {
                    this.valor += -0.087;
                }
                this.character.setVelocityX(-500);
                this.character.setRotation(this.valor);
                this.physics.world.wrap(this.character, 0);
            }
            else if(this.cursors.up.isDown){
                this.character.setVelocityY(-200);
            }
            else if (this.cursors.right.isDown) {
                rotacionIzquierda = false;
                if(!rotacionIzquierda) {
                    this.valor += 0.087;
                }
                this.character.setVelocityX(500);
                this.character.setRotation(this.valor);
                this.physics.world.wrap(this.character, 50);
            }
            else { 
                if(rotacionIzquierda) {
                    this.valor += -0.087;
                }
                else{
                    this.valor += 0.087;
                }
                this.character.setRotation(this.valor);
                this.character.setVelocityX(0);
            }

            //En el caso de que el jugador haya caído hacia bajo, pierde y da paso a la escena final.
            //Se reinian los valores por si volvemos a querer jugar al juego
            if(this.character.y > 1000){
                this.scene.start('escenaFinal',{numero: 0});
                //falta resetear todos los valores
                this.espacioPulsado = false;
                this.valor = 0;
            }
        }
    }

    //Función que genera monedas aleatoriamente
    generateCoins(){
        //Generar monedas aleatoriamente
        const numCoins = Phaser.Math.Between(1, 2);
        //const colorCoin = Phaser.Math.Between(1, 4);
        const coinColors = ['coin1', 'coin2', 'coin3', 'coin4'];
        for(let i = 0; i < numCoins; i++){
            const coinX = Phaser.Math.Between(100, 620);
            const coinY = Phaser.Math.Between(0, 720);
            const colorIndex = Phaser.Math.Between(0, coinColors.length - 1);
            const coin = this.coin.create(coinX, coinY, coinColors[colorIndex]);
            coin.setScale(0.2);
        }

        /*this.tweens.add({
            targets: this.coin,
            alpha: 0.5,
            duration: 500,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
        });*/
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

    collectStar(character, coin){
        coin.disableBody(true, true);
        this.score += 100; 
        this.scoreText.setText('Score: ' + this.score);
        this.character.setVelocityY(-350);
        if(this.score == 400){
            this.scene.start('escenaFinal',{numero : 1}); 
            this.espacioPulsado = false;
            this.valor = 0;     
        }
    }
}