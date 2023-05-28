import Phaser from 'phaser'

export default class menuniveles extends Phaser.Scene {
	
	constructor() {
		super({ key:'menuniveles'});
	}

	
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        this.load.image('niveles', './assets/fondoniveles720.jpg');
		this.load.image('skins', './assets/Botones/boton skins.png');
		this.load.image('nivel1', './assets/niveles/nivel1.png');
		this.load.image('nivel2', './assets/niveles/nivel2.png');
		this.load.image('nivel3', './assets/niveles/nivel3.png');
		this.load.image('nivel4', './assets/niveles/nivel4.png');
		this.load.image('nivel5', './assets/niveles/nivel5.png');
        this.load.image('back', './assets/Botones/botonback.jpg');
		this.load.image('estrellas', './assets/Dialogo Victoria/estrellas.png');
		this.load.image('bestscore0', './assets/Dialogo Victoria/bestScore0.png');
        this.load.image('bestscore1', './assets/Dialogo Victoria/bestScore1.png');
        this.load.image('bestscore2', './assets/Dialogo Victoria/bestscore2.png');
        this.load.image('bestscore3', './assets/Dialogo Victoria/bestscore3.png');
		this.load.image('esferas', './assets/Mapas/esfera4.png');
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

		const totalStars = this.registry.get('totalStars') || 0;
		const EsferaCont=this.registry.get('EsferaCont')|| 0;

		const starImage = this.add.image(100,50, 'estrellas');
        starImage.setScale(0.25);
    	const starsText = this.add.text(140, 35, `: ${totalStars}`, {
			fontFamily: 'Arial Black, Arial, sans-serif',
			fontSize: '40px',
			color: '#8B4513',
    	});
    starsText.setScrollFactor(0, 0);

	const EsferaImage = this.add.image(450,50, 'esferas');
	EsferaImage.setScale(0.25);
	const EsferaText = this.add.text(490, 35, `: ${EsferaCont}`, {
		fontFamily: 'Arial Black, Arial, sans-serif',
		fontSize: '40px',
		color: '#8B4513',
	});
	EsferaText.setScrollFactor(0, 0);
		
		
		//Añadimos los botones de niveles
        //Escuchamos los eventos del ratón cuando interactual con nuestro sprite de cada nivel

        //a cada nivel habría que pasarle los datos de ese nivel
        const levelCompleted = this.registry.get('levelCompleted') || 1 ;
		const highestlevel = this.registry.get('highestlevel') || 1 ;
		

		for (let i = 1; i <= 5; i++) {
            const levelButton = this.add
            .image(200 + (i - 1) % 2 * 300, 200 + Math.floor((i - 1) / 2) * 150, `nivel${i}`)
            .setInteractive();

			const bestScore = this.registry.get(`bestScoreLevel${i}`) || 0;

			if(bestScore<1){
				const score0  = this.add.image(levelButton.x ,levelButton.y - 75, 'bestscore0');
                score0.setScale(0.075);

			}
			else if(bestScore<2){
				const score1 = this.add.image(levelButton.x ,levelButton.y - 75, 'bestscore1');
				score1.setScale(0.12);
			}
			else if(bestScore<3){
				const score2 = this.add.image(levelButton.x ,levelButton.y - 75, 'bestscore2');
				score2.setScale(0.12);
			}
			else if(bestScore<4){
				const score3 = this.add.image(levelButton.x ,levelButton.y - 75, 'bestscore3');
				score3.setScale(0.12);
			}
            
			const requiredLevel = i - 1;
			const requiredStars = 3*i-5;

            if (i > levelCompleted || (i === levelCompleted && totalStars < requiredStars)) {
                levelButton.setTint(0x808080);
				levelButton.on('pointerdown', () => {
					 // Replace with the actual required number of stars
					this.createRequirementsPopup(i, requiredLevel, requiredStars);
				});
            } else {
                levelButton.on('pointerdown', () => {
				this.registry.set(`highestlevel`,i);
                this.scene.start('game', { nivel: i });
                });
            }
        }

        this.buttonBack = this.add.image(600,640,'back').setInteractive();
        this.buttonBack.on('pointerdown', pointer => {
            this.scene.start('titulo');
			this.registry.set('levelCompleted', 1);
			this.registry.set('totalStars', 0);
			this.registry.set('bestScoreLevel1', 0);
			this.registry.set('bestScoreLevel2', 0);
			this.registry.set('bestScoreLevel3', 0);
			this.registry.set('bestScoreLevel4', 0);
			this.registry.set('bestScoreLevel5', 0);
			this.registry.set('EsferaCont',0);
	    });
		this.skins = this.add.image(350,660, 'skins').setInteractive();
		this.skins.setScale(0.6);
		this.skins.on('pointerdown', pointer => {
			this.registry.set('level', nivel.numero);
			this.registry.set('selectedCharacter', this.character);
	    	this.scene.start('tienda');
	    });
	}

	update(){	}

	createRequirementsPopup(level, requiredLevel, requiredStars) {
		const popup = this.add.container(360, 360);
		const background = this.add.graphics();
		background.fillStyle(0x000000, 0.8);
		background.fillRect(-200, -100, 400, 200);
		popup.add(background);
	
		const text = this.add.text(0, -50, `Level ${level} locked!`, {
			fontFamily: 'Arial',
			fontSize: '24px',
			color: '#ffffff',
			align: 'center',
			wordWrap: { width: 300, useAdvancedWrap: true },
		});
		text.setOrigin(0.5);
		popup.add(text);
	
		const requirementText = this.add.text(0, 0, `Complete level ${requiredLevel} and earn ${requiredStars} stars to unlock.`, {
			fontFamily: 'Arial',
			fontSize: '16px',
			color: '#ffffff',
			align: 'center',
			wordWrap: { width: 300, useAdvancedWrap: true },
		});
		requirementText.setOrigin(0.5);
		popup.add(requirementText);
	
		const closeText = this.add.text(0, 50, 'Close', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
		closeText.setOrigin(0.5);
		closeText.setInteractive();
		closeText.on('pointerdown', () => {
			popup.destroy();
		});
		popup.add(closeText);
		/*
		const dialogBox = this.add.container(360, 360);
        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 300);
        dialogBackground.fillRect(-250, -200, 500, 300);
        dialogBox.add(dialogBackground);
            

        let characterName = this.add.text(0, -150, character.name + ' BLOQUEADO', { font: '32px Arial', color: '#ff0000' }).setOrigin(0.5);
        dialogBox.add(characterName);
        const requiredLevelText = `Debes alcanzar el nivel ${character.requiredLevel} para desbloquear este personaje.`;
        const characterDescription = this.add.text(0, -50, `${requiredLevelText}`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
      
        const closeButton = this.add.text(0, 20, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });
        dialogBox.add(closeButton);
		*/
	}
}
