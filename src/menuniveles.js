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
		this.load.image('nivel1', 'assets/niveles/nivel1.jpg');
		this.load.image('nivel2', 'assets/niveles/nivel2.jpg');
		this.load.image('nivel3', 'assets/niveles/nivel3.jpg');
        this.load.image('back', 'assets/back.jpg');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(512, 512, 'niveles')
		

		//Añadimos los botones de niveles
        //Escuchamos los eventos del ratón cuando interactual con nuestro sprite de cada nivel

        //a cada nivel habría que pasarle los datos de ese nivel

        this.level1 = this.add.image(350, 300, 'nivel1').setInteractive();		
	    this.level1.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

		this.level2 = this.add.image(650, 300, 'nivel2').setInteractive();		
	    this.level2.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

        this.level3 = this.add.image(350, 500, 'nivel3').setInteractive();		
	    this.level3.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

        this.level4 = this.add.image(650, 500, 'nivel1').setInteractive();		
	    this.level4.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

        this.level5 = this.add.image(350, 700, 'nivel1').setInteractive();		
	    this.level5.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

        this.level6 = this.add.image(650, 700, 'nivel1').setInteractive();		
	    this.level6.on('pointerdown', pointer => {
	    	this.scene.start('game');
	    });

        this.buttonBack = this.add.image(850,920,'back').setInteractive();
        this.buttonBack.on('pointerdown', pointer => {
            this.scene.start('titulo');
	    });



        //faltaria boton de back
	    /*this.start.on('pointerup', pointer => {
			this.scene.start('animation'); //Cambiamos a la escena de juego

	    });*/
	}

	update(){

	}
}
