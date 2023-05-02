import Phaser from 'phaser'

export default class tienda extends Phaser.Scene {
	
	constructor() {
		super({ key:'tienda'});
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
        
        this.load.image('niveles', 'public/assets/fondoniveles720.jpg');
        this.load.image('personaje0', 'public/assets/Skins/mascleto.png');
        this.load.image('personaje1', 'public/assets/Skins/mascleto_skin_1.png');
        this.load.image('personaje2', 'public/assets/Skins/mascleto_skin_2.png');
        this.load.image('personaje3', 'public/assets/Skins/mascleto_skin_3.png');
        this.load.image('personaje4', 'public/assets/Skins/mascleto_skin_4.png');
        this.load.image('personaje5', 'public/assets/Skins/mascleto_skin_5.png');
        this.load.image('personaje6', 'public/assets/Skins/mascleto_skin_6.png');
        this.load.image('personaje7', 'public/assets/Skins/mascleto_skin_7.png');
        this.load.image('personaje8', 'public/assets/Skins/mascleto_skin_8.png');

        this.load.image('back', 'public/assets/botonback.jpg');
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//Pintamos un fondo
        this.inicio = this.add.image(360, 360 , 'niveles');
        var nivelActual = this.registry.get('level');
        let selectedCharacter = this.registry.get('selectedCharacter');

        this.add.text(360, 50, 'SELECCIONAR SKIN', {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#ffffff',
            align: 'center'
        }).setOrigin(0.5);

        this.characters = [
            { name: 'Personaje 0', description: 'Descripción del personaje 0', image: 'personaje0', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 1', description: 'Descripción del personaje 1', image: 'personaje1', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 2', description: 'Descripción del personaje 2', image: 'personaje2', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 3', description: 'Descripción del personaje 3', image: 'personaje3', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 4', description: 'Descripción del personaje 4', image: 'personaje4', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 5', description: 'Descripción del personaje 5', image: 'personaje5', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 6', description: 'Descripción del personaje 6', image: 'personaje6', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 7', description: 'Descripción del personaje 7', image: 'personaje7', unlocked: true, requiredLevel: 0},
            { name: 'Personaje 8', description: 'Descripción del personaje 8', image: 'personaje8', unlocked: true, requiredLevel: 0}
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
                if(nivelActual >= character.requiredLevel){
                    rect.setFillStyle(0x00ff00);
                    if(character.name === this.registry.get('selectedCharacter')){
                        rect.setStrokeStyle(8, 0xff0000);
                    }
                    else{
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
                    if(character.locked && nivelActual < character.requiredLevel){
                        this.showCharacterBlock(character);
                    }
                    else if(this.registry.get('selectedCharacter') == character.name){
                        this.showCharacterSelected(character);
                    }
                    else {
                        this.showCharacterUnBlock(character);
                        this.registry.set('selectedCharacter', character);
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

    showCharacterUnBlock(character){
        const dialogBox = this.add.container(360, 360);

        const dialogBackground = this.add.graphics();
        dialogBackground.fillStyle(0x000000, 0.7).fillRect(-250, -200, 500, 300);
        dialogBackground.fillRect(-250, -200, 500, 300);
        dialogBox.add(dialogBackground);
            

        let characterName = this.add.text(0, -150, character.name + ' DESBLOQUEADO', { font: '32px Arial', color: '#00ff00' }).setOrigin(0.5);
        dialogBox.add(characterName);
        const requiredLevelText = `¿Estas seguro que deseas seleccionar ${character.name} ?`;
        const characterDescription = this.add.text(0, -50, `${requiredLevelText}`, { font: '24px Arial', color: '#ffffff', align: 'center', wordWrap: { width: 350 } }).setOrigin(0.5);
        dialogBox.add(characterDescription);
      
        const closeButton = this.add.text(100, 20, 'Cerrar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        closeButton.on('pointerdown', () => {
          dialogBox.destroy();
        });

        const addButton = this.add.text(-50, 20, 'Seleccionar', { font: '24px Arial', color: '#ffffff', backgroundColor: '#333333', padding: { x: 10, y: 5 },}).setOrigin(0.5).setInteractive();
        addButton.on('pointerdown', () => {
          dialogBox.destroy();
          this.scene.start('menuniveles');
        });
        dialogBox.add(closeButton);
        dialogBox.add(addButton);
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
