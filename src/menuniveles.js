//import Phaser from 'phaser'

export default class menuniveles extends Phaser.Scene {
	
	constructor() {
		super({ key:'menuniveles'});
	}

	
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        this.load.image('niveles', 'public/assets/fondoniveles720.jpg');
		this.load.image('skins', 'public/assets/boton skins.png');
		this.load.image('nivel1', 'public/assets/niveles/nivel1.png');
		this.load.image('nivel2', 'public/assets/niveles/nivel2.png');
		this.load.image('nivel3', 'public/assets/niveles/nivel3.png');
		this.load.image('nivel4', 'public/assets/niveles/nivel4.png');
		this.load.image('nivel5', 'public/assets/niveles/nivel5.png');
        this.load.image('back', 'public/assets/botonback.jpg');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {


		//Pintamos un fondo
        this.inicio = this.add.image(360, 360 , 'niveles')

		var nivel = {
			numero: 1,
		};

		this.character = this.registry.get('selectedCharacter');
		
		
		//Añadimos los botones de niveles
        //Escuchamos los eventos del ratón cuando interactual con nuestro sprite de cada nivel

        //a cada nivel habría que pasarle los datos de ese nivel

        this.level1 = this.add.image(200, 200, 'nivel1').setInteractive();		
	    this.level1.on('pointerdown', pointer => {
			this.scene.stop('game');
			nivel.numero = 1;
	    	this.scene.start('game', {nivel: nivel.numero});
	    });

		this.level2 = this.add.image(500, 200, 'nivel2').setInteractive();		
	    this.level2.on('pointerdown', pointer => {
			this.scene.stop('game');
	    	nivel.numero = 2;
	    	this.scene.start('game', {nivel: nivel.numero});
	    });

        this.level3 = this.add.image(200, 350, 'nivel3').setInteractive();		
	    this.level3.on('pointerdown', pointer => {
			this.scene.stop('game');
	    	nivel.numero = 3;
	    	this.scene.start('game', {nivel: nivel.numero});
	    });

        this.level4 = this.add.image(500, 350, 'nivel4').setInteractive();		
	    this.level4.on('pointerdown', pointer => {
			this.scene.stop('game');
	    	nivel.numero = 4;
	    	this.scene.start('game', {nivel: nivel.numero});
	    });

        this.level5 = this.add.image(350, 500, 'nivel5').setInteractive();		
	    this.level5.on('pointerdown', pointer => {
			this.scene.stop('game');
	    	nivel.numero = 5;
	    	this.scene.start('game', {nivel: nivel.numero});
	    });

        this.buttonBack = this.add.image(600,640,'back').setInteractive();
        this.buttonBack.on('pointerdown', pointer => {
            this.scene.start('titulo');
	    });

		this.skins = this.add.image(350,660, 'skins').setInteractive();
		this.skins.setScale(0.6);
		this.skins.on('pointerdown', pointer => {
			this.registry.set('level', nivel.numero);
			this.registry.set('selectedCharacter', this.character);
	    	this.scene.start('tienda');
	    });
	}

	update(){

	}
}
