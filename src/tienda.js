import Phaser from 'phaser'

export default class tienda extends Phaser.Scene {
	
	constructor() {
		super({ key:'tienda'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        this.load.image('niveles', './assets/fondoniveles720.jpg');
        this.load.image('personaje0', './assets/Skins/mascleto.png');
        this.load.image('personaje1', './assets/Skins/mascleto_skin_1.png');
        this.load.image('personaje2', './assets/Skins/mascleto_skin_2.png');
        this.load.image('personaje3', './assets/Skins/mascleto_skin_3.png');
        this.load.image('personaje4', './assets/Skins/mascleto_skin_4.png');
        this.load.image('personaje5', './assets/Skins/mascleto_skin_5.png');
        this.load.image('personaje6', './assets/Skins/mascleto_skin_6.png');
        this.load.image('personaje7', './assets/Skins/mascleto_skin_7.png');
        this.load.image('personaje8', './assets/Skins/mascleto_skin_8.png');
        this.load.image('back', './assets/Botones/botonback.jpg');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
        this.registry.set('Personaje 0',1);
        var Personaje1 = this.registry.get('Personaje 1') || 0 ;
        var Personaje2 = this.registry.get('Personaje 2') || 0 ;
        var Personaje3 = this.registry.get('Personaje 3') || 0 ;
        var Personaje4 = this.registry.get('Personaje 4') || 0 ;
        var Personaje5 = this.registry.get('Personaje 5') || 0 ;
        var Personaje6 = this.registry.get('Personaje 6') || 0 ;
        var Personaje7 = this.registry.get('Personaje 7') || 0 ;
        var Personaje8 = this.registry.get('Personaje 8') || 0 ;

        this.inicio = this.add.image(360, 360 , 'niveles');
        var nivelActual = this.registry.get('levelCompleted') || 1 ;
        var highestlevel=this.registry.get('highestlevel')|| 1 ;
        
        let selectedCharacter = this.registry.get('selectedCharacter');
        
        const EsferaCont=this.registry.get('EsferaCont')|| 0;
		
        const EsferaImage = this.add.image(40,50, 'esferas');
        EsferaImage.setScale(0.25);
        const EsferaText = this.add.text(80, 35, `: ${EsferaCont}`, {
            fontFamily: 'Arial Black, Arial, sans-serif',
            fontSize: '40px',
            color: '#8B4513',
        });
        EsferaText.setScrollFactor(0, 0);
        this.add.text(450, 60, 'SELECCIONAR SKIN', {
            fontFamily: 'Arial Black, Arial, sans-serif',
			fontSize: '40px',
			color: '#8B4513',
        }).setOrigin(0.5);

        this.characters = [
            { name: 'Personaje 0', description: 'Descripción del personaje 0', image: 'personaje0', requiredLevel: 0, starCost:0},
            { name: 'Personaje 1', description: 'Descripción del personaje 1', image: 'personaje1', requiredLevel: 0, starCost:0},
            { name: 'Personaje 2', description: 'Descripción del personaje 2', image: 'personaje2', requiredLevel: 2, starCost:125},
            { name: 'Personaje 3', description: 'Descripción del personaje 3', image: 'personaje3', requiredLevel: 3, starCost:175},
            { name: 'Personaje 4', description: 'Descripción del personaje 4', image: 'personaje4', requiredLevel: 3, starCost:225},
            { name: 'Personaje 5', description: 'Descripción del personaje 5', image: 'personaje5', requiredLevel: 4, starCost:275},
            { name: 'Personaje 6', description: 'Descripción del personaje 6', image: 'personaje6', requiredLevel: 4, starCost:325},
            { name: 'Personaje 7', description: 'Descripción del personaje 7', image: 'personaje7', requiredLevel: 5, starCost:375},
            { name: 'Personaje 8', description: 'Descripción del personaje 8', image: 'personaje8', requiredLevel: 5, starCost:425}
          ];
          // this.registry.set('selectedCharacter', this.characters[0]);

          if(!this.registry.get('selectedCharacter')){
            //Establecer el personaje por defecto
            selectedCharacter = this.characters[0].name;
            this.registry.set('selectedCharacter', selectedCharacter);
           }
           else{
            this.registry.set('selectedCharacter', selectedCharacter.name);
           }
          // Creación de una nueva imagen para cada personaje
          this.characters.forEach((character, index) => {
            var x, y;
0
                if(index < 4){
                    x = 130 + index * 150;
                    y = 200;
                }
                else if(index == 8) {
                    x = 360;
                    y = 600;
                }
                else{
                    x = 130 + (index - 4) * 150;
                    y = 400;
                }
                
                const rect = this.add.rectangle(x, y, 100, 150, 0x333333, 0.8).setOrigin(0.5, 0.5);
                if(highestlevel >= character.requiredLevel){
                    if(character.name === this.registry.get('selectedCharacter')){
                        rect.setFillStyle(0x00ff00);
                        rect.setStrokeStyle(8, 0xff0000);
                    }
                    else if(!this.registry.get(character.name)){
                    rect.setFillStyle(0xffff00);
                    rect.setStrokeStyle(4, 0xffffff);
                    }
                    else{
                        rect.setFillStyle(0x00ff00);
                        rect.setStrokeStyle(4, 0xffffff);
                    }
                }
                else {
                    rect.setFillStyle(0x333333);
                    rect.setStrokeStyle(4, 0xffffff);
                }
      
                const characterImage = this.add.image(x, y, character.image);
                characterImage.setScale(0.3);
                characterImage.setInteractive();

                const selectedCharacterText = this.add.text(360, 700, `Personaje seleccionado: ${this.registry.get('selectedCharacter')}`, {
                    fontFamily: 'Arial',
                    fontSize: '30px',
                    color: '#ffffff',
                    align: 'center'
                }).setOrigin(0.5);

                //Si seleccionamos un personaje se interactua con el
                characterImage.on('pointerdown', () => {
                    //Si el personaje esta desbloqueado, te muestra dialogo de que no puedes seleccionarlo
                    if(highestlevel < character.requiredLevel ){
                        this.showCharacterBlock(character);
                    }
                    else if(this.registry.get('selectedCharacter') == character.name){
                            this.showCharacterSelected(character);   
                    }
                    else if(this.registry.get(character.name)){
                        this.PersonajeComprado(character);
                        this.registry.set('selectedCharacter', character);   
                    }
                    else if(EsferaCont >= character.starCost&& !this.registry.get(character.name)){
                        this.CompraPersonaje(character);
                        this.registry.set('selectedCharacter', character);
                    }
                    else if (EsferaCont < character.starCost){
                        this.showInsufficientStars(character);
                    }
                });
            });
	}

	update(){}

    showCharacterBlock(character){
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
    }

    CompraPersonaje(character){
        const dialogBox = this.add.container(360, 360);
        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 300);
        dialogBackground.fillRect(-250, -200, 500, 300);
        dialogBox.add(dialogBackground);
        let characterName = this.add.text(0, -150, ' COMPRA '+ character.name , { font: '32px Arial', color: '#00ff00' }).setOrigin(0.5);
        dialogBox.add(characterName);

        const requiredLevelText = `Este personaje costa ${character.starCost} esferas, ¿quieres comprarlo?`;
        const characterDescription = this.add.text(0, -50, `${requiredLevelText}`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
        const closeButton = this.add.text(100, 20, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });
        const ComprarButton = this.add.text(-50, 20, 'Comprar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        ComprarButton.on('pointerdown', () => {
            const EsferaCont = this.registry.get('EsferaCont');
            this.registry.set('EsferaCont',EsferaCont-character.starCost);
            this.registry.set(character.name,1);
            dialogBox.destroy();
            this.scene.start('menuniveles');

        });

        dialogBox.add(closeButton);
        dialogBox.add(ComprarButton);

    }

    PersonajeComprado(character){
        const dialogBox = this.add.container(360, 360);
        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 300);
        dialogBackground.fillRect(-250, -200, 500, 300);
        dialogBox.add(dialogBackground);
        let characterName = this.add.text(0, -150, character.name , { font: '32px Arial', color: '#00ff00' }).setOrigin(0.5);
        dialogBox.add(characterName);
        const requiredLevelText = `Este personaje esta comprado, ¿quieres seleccionarlo?`;
        const characterDescription = this.add.text(0, -50, `${requiredLevelText}`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
        const closeButton = this.add.text(100, 20, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });
        const ComprarButton = this.add.text(-50, 20, 'Seleccionar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        ComprarButton.on('pointerdown', () => {
           
            dialogBox.destroy();
            this.scene.start('menuniveles');

        });

        dialogBox.add(closeButton);
        dialogBox.add(ComprarButton);
    }

    showInsufficientStars(character) {
        const dialogBox = this.add.container(360, 360);
        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 300);
        dialogBackground.fillRect(-250, -200, 500, 300);
        dialogBox.add(dialogBackground);
        let characterName = this.add.text(0, -150, character.name + ' SEMI-DESBLOQUEADO', { font: '29px Arial', color: '#ffff00' }).setOrigin(0.5);
        dialogBox.add(characterName);
        const requiredLevelText = `Has alcanzado el nivel necesario para desbloquear este personaje, pero este mascleto cuesta ${character.starCost} esferas, y tu no la tienes!`;
        const characterDescription = this.add.text(0, -50, `${requiredLevelText}`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
      
        const closeButton = this.add.text(0, 40, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });
        dialogBox.add(closeButton);

        // Add code to display the insufficient stars dialog box
      }

    showCharacterSelected(character){
        const dialogBox = this.add.container(360, 360);
        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 150);
        dialogBackground.fillRect(-250, -200, 500, 150);
        dialogBox.add(dialogBackground);
            
        const characterDescription = this.add.text(0, -150, `${character.name} ya seleccionado`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
      
        const closeButton = this.add.text(0, -100, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });
        dialogBox.add(closeButton);
    }
}
