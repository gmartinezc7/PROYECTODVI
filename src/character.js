export default class Character extends Phaser.GameObjects.Sprite {
	/**
	 * Constructor de del personaje principal
	 * @param {Scene} scene - escena en la que aparece
	 * @param {number} x - coordenada x
	 * @param {number} y - coordenada y
	 */
	constructor(scene, x, y) {
		super(scene, x, y, 'character');
		this.speedy = -550; // Velocidad de movimiento hacia arriba del personaje
		this.speedx = 190;
		this.inicio = true;
		this.cheatActivated = false;
		this.laterales = false;
		this.delay = 0;

		this.scene.add.existing(this); //Añadimos el personaje a la escena

		// Seteamos las teclas para mover al personaje
		this.wKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
		this.aKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
		this.dKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
		this.sKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

		this.auxKey = this.scene.input.keyboard.addKey('W');
		this.cheatKey = this.scene.input.keyboard.addKey('C');

		// Agregamos el personaje a las físicas para que Phaser lo tenga en cuenta
		scene.physics.add.existing(this);
		this.body.allowGravity = false;
	}

	/**
	 * Bucle principal del personaje, actualizamos su posición y ejecutamos acciones según el Input
	 * @param {number} t - Tiempo total
	 * @param {number} dt - Tiempo entre frames
	 */
	preUpdate(t, dt) {
		super.preUpdate(t, dt);

		// Mientras pulsemos la tecla 'A' movemos el personaje en la X
		if(this.aKey.isDown){
			if (this.delay != 1){
				this.setFlip(true, false)
				this.body.setVelocityX(-this.speedx);
				this.delay = 1;
			}else{
				this.delay = 0;	
			}
					
		}

		// Mientras pulsemos la tecla 'D' movemos el personaje en la X
		if(this.dKey.isDown){
			if (this.delay != 1){
				this.setFlip(false, false)
				this.body.setVelocityX(this.speedx);
				this.delay = 1;
			}else{
				this.delay = 0;	
			}
		}

		if(this.auxKey.isDown){
			this.body.setVelocityY(-this.speedx);
		}

		// Si pulsamos 'W' movemos el personaje en la Y
		if(this.wKey.isDown){
			this.body.allowGravity = true;
			if(this.inicio == true){
				this.body.setVelocityY(-600);
			}
			this.inicio = false;
		}

		// Si pulsamos la letra C se activan los cheats

		if(this.cheatKey.isDown){
			this.body.setVelocityY(-2000);
			this.cheatActivated = true;
		}
	}

	playerCheat (){
		return this.cheatActivated;
	}
	playerGetSpeed(){
		return this.speedy;
	}

	
}