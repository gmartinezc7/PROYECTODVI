import Phaser from 'phaser'
import Character from './character.js';

export default class game extends Phaser.Scene {

	constructor() {
		super({ key:'game'});
        this.fondoJuego = undefined;
        this.valor = 0;
        this.height = 600;
        this.width = 600;
        this.restart = false;
	}

    init(data) {
        if(!this.registry.get('selectedCharacter')){
            this.registry.set('selectedCharacter', {image : 'character'})
        }
        this.selectedCharacter = this.registry.get('selectedCharacter');
        this.nivel = data.nivel;
        this.score = 0;
        this.totalEsferas = 0;
        this.totalRecogidas = 0;
        this.inicioJuego = false;
        this.inicioJuego2 = false;
    }

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){

        this.load.image('btnPause', 'public/assets/Boton pausa.png');
        this.load.image('character', 'public/assets/Skins/mascleto.png');


        // A PARTIR DE AQUÍ IF PARA CAMBIAR DEPENDIENDO DEL NIVEL

        // AHACER LO DE LOS STRINGS
        this.cadena = "mapa_lvl" + this.nivel + ".json";
        this.cadena2 = "Tile" + this.nivel + ".png";

        this.load.tilemapTiledJSON('tilemap', 'public/assets/Mapas2/' + this.cadena);
        this.load.image('patronesTilemap', 'public/assets/Mapas2/' + this.cadena2);
        this.load.image('plataformax','public/assets/Mapas2/plataforma' + this.nivel + '.png');
        this.load.image('estrellaluz','public/assets/Mapas2/esfera' + this.nivel + '.png');
        this.load.image('gotaax','public/assets/enemigo_agua.png');
        this.load.image('cenizaax','public/assets/enemigo_ceniza.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
        

        this.botonPlay = data.botonPlay;
        if(!this.botonPlay){
            this.espacioPulsado = false;
        }
        let quitArea = new Phaser.Geom.Rectangle(55, 60, 230, 220);  
        this.btnPause = this.add.image(670,50,'btnPause').setInteractive(quitArea, Phaser.Geom.Rectangle.Contains);
        this.btnPause.setScale(0.4);
        this.btnPause.setScrollFactor(0,0);
        this.btnPause.setDepth(5);

        this.btnPause.on('pointerdown', () => {
            this.scene.pause();
            this.scene.launch('escenaPausada');
        });

        this.map = this.make.tilemap({ 
			key: 'tilemap', 
			tileWidth: 32, 
			tileHeight: 32 
		});


        const tileset1 = this.map.addTilesetImage('Tile'+ this.nivel, 'patronesTilemap');
        

        // creamos las diferentes capas a través del tileset. El nombre de la capa debe aparecer en el .json del tilemap cargado
        this.wallLayer = this.map.createLayer('Plataformas', tileset1);
        this.groundLayer = this.map.createLayer('Fondo', tileset1);
        this.skyLayer = this.map.createLayer('Nubes', tileset1);    
        this.esferasLayer = this.map.createLayer('Esferas', tileset1);
        //Si el nivel es el 2 se añade una nueva capa
        if(this.nivel == 2){
            this.lateralLayer = this.map.createLayer('Laterales', tileset1);
        }

        //Marcador de puntuación
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#000000'});
        this.scoreText.setScrollFactor(0,0);
        this.scoreText.setDepth(5);

        //Se crea el personaje con sus propiedades
        this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:this.selectedCharacter.image});
		this.player = this.mov[0];
        //this.player.body.position.x;
        this.player.setScale(0.2);

        
        


        //En todos los niveles menos en el primero se incorpora el enemigo 'Gotas'
        if(this.nivel > 1){
            this.gotasLayer = this.map.createLayer('Gotas', tileset1);
            let gotas = this.map.createFromObjects('Gotas', {name: "Gota", key: 'gotaax' });
		
            this.gotasGroup = this.add.group();
            this.gotasGroup.addMultiple(gotas)
            gotas.forEach(obj => {
                this.physics.add.existing(obj);
                obj.body.allowGravity = false;
                obj.body.immovable = true;
                //obj.body.gravity.y = 5;
            });
            this.physics.add.collider(this.player, this.gotasGroup, this.handlePlayerOnGotaorCeniza, null, this);

            //El nivel 4 y 5, además incorporan un nuevo enemigo "Ceniza"
            if(this.nivel >= 4){
                if(this.nivel == 4){
                    this.fuegoLayer = this.map.createLayer('Fuegos', tileset1);
                }
                this.estelasLayer = this.map.createLayer('Estelas', tileset1);
                this.estrellasLayer = this.map.createLayer('Estrellas', tileset1);
                this.cenizasLayer = this.map.createLayer('Cenizas', tileset1);
                let cenizas = this.map.createFromObjects('Cenizas', {name: "Ceniza", key: 'cenizaax' });
            
                this.cenizasGroup = this.add.group();
                this.cenizasGroup.addMultiple(cenizas)
                cenizas.forEach(obj => {
                    this.physics.add.existing(obj);
                    obj.body.allowGravity = false;
                    obj.body.immovable = true;
                    //obj.body.gravity.y = 5;
                });
                this.physics.add.collider(this.player, this.cenizasGroup, this.handlePlayerOnGotaorCeniza, null, this);
            }
        }

        //this.physics.world.enable(this.player);

        // Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		let plataformas = this.map.createFromObjects('Plataformas', {name: "Plataforma", key: 'plataformax' });
		
		this.platGroup = this.add.group();
		this.platGroup.addMultiple(plataformas)
		plataformas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;   
		});

        this.physics.add.collider(this.player, this.platGroup, this.handlePlayerOnPlatform, null, this);
        this.platGroup.children.iterate(function (plataforma){
            plataforma.body.checkCollision.up = true;
            plataforma.body.checkCollision.left = false;
            plataforma.body.checkCollision.right = false;
            plataforma.body.checkCollision.down = false;
            plataforma.body.allowGravity = false;
        });
        let esferas = this.map.createFromObjects('Esferas', {name: "Esfera", key: 'estrellaluz' });
		this.esfGroup = this.add.group();
		this.esfGroup.addMultiple(esferas)
		esferas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;
            this.totalEsferas++;
		});

        this.physics.add.overlap(this.player, this.esfGroup, this.handlePlayerCollisionEsfera, null, this);

        // Nueva función de seguir al jugador
        this.cameras.main.setFollowOffset(100,0);
        this.cameras.main.startFollow(this.player,false,0,1);

        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();


        

        // CREACIÓN DE LA BARRA DE PROGRESO DE JUEGO
        //Marcador de puntuación
        //this.progressBar = this.add.text(0, 650, 'Progreso: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#ffffff'});

        this.progressBox = this.add.graphics();
        this.progressBox.lineStyle(2,0xffffff,1);
        this.progressBox.strokeRect(0,710,720,10);        
        this.progressBox.setScrollFactor(0,0);
        this.progressBox.setDepth(6);


        this.progressBar = this.add.graphics();
        this.progressBar.fillStyle(0xFF0000,1);
        this.progressBar.fillRect(0,710,0,0);
        this.progressBar.setScrollFactor(0,0);
        this.progressBar.setDepth(7);


        this.progreso = 0;

	}

    update() {

        let actualSpeed;
        
        if (this.inicioJuego2 == false){
            this.mapHeight = this.player.body.position.y;
        } 
        this.inicioJuego2 = true;
        


        this.progreso = this.mapHeight - this.player.body.position.y;

        this.updateBarraProgreso();


        // CODIGO PARA LIMITES LATERALES

        if (this.player.body.position.x > 660){
            actualSpeed = -(Math.abs(this.player.body.velocity.x));
            this.player.body.velocity.x=actualSpeed;
        }

        if (this.player.body.position.x < -40 ){
            actualSpeed = Math.abs(this.player.body.velocity.x);
            this.player.body.velocity.x=actualSpeed;
        }

        
        if (this.player.body.position.y > this.alturalimite+300 && this.inicioJuego){
            
            this.scene.start('escenaFinal',{numero : 0});
            //this.resetGame();

        }
        // CONDICION DE FIN DE JUEGO : DERROTA
        
        if (this.player.body.position.y < 300){
            this.cameras.main.stopFollow();
        }
        if(this.nivel >= 4){
            if(this.player.body.position.y > 21128){
                this.cameras.main.stopFollow();
                this.scene.start('escenaFinal',{numero : 0});
            }
        }
        else{
            if(this.player.body.position.y > 14000){
                this.cameras.main.stopFollow();
                this.scene.start('escenaFinal',{numero : 0}); 
            }
        }
        if (this.player.body.position.y < 100){
            this.scene.start('escenaFinal',{numero : 1, totalEsferas: this.totalEsferas, totalRecogidas: this.totalRecogidas}); 
        }


    }

    handlePlayerOnPlatform(player, platform) {
        this.alturalimite = this.player.body.position.y;
        this.inicioJuego = true;
        const playerBottom = player.body.y + player.body.height;
        const platformTop = platform.body.y;

        if (playerBottom <= platformTop + 5) { // el jugador está encima de la plataforma
          player.body.velocity.y = player.playerGetSpeed(); // impulsa al jugador hacia arriba
        }
    }
    
    handlePlayerCollisionEsfera(player, esfera){
        this.score += 100;
        this.scoreText.setText('Score: ' + this.score);
        esfera.body.visible = false;
        esfera.destroy();
        this.totalRecogidas++;   
    }

    handlePlayerOnGotaorCeniza(player, gota) {
        if (player.playerCheat() == false){
            this.scene.start('escenaFinal',{numero : 0}); 
        }
        
    }

    updateBarraProgreso() {
        this.progressBar.clear();
        this.progressBar.fillStyle(0xFF0000,1);
        this.progressBar.fillRect(0,710,this.progreso/(this.mapHeight/740),10);

    }

    resetGame(player){
        player.cheatActivated = false;

    }

    restartScene(){
        this.init();
    }

    


}