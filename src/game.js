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
        this.dir = 1; // Direccion de los pajaros
        //Toggle de los power-ups
        this.iman_activo = false;
        this.x2_activo = false;
        this.globo_activo = false;
        this.boost_activo = false;
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
        this.totalStars = this.registry.get('totalStars') || 0;
        this.EsferaCont= 0;
        this.bestScore = this.registry.get(`bestScoreLevel${this.nivel}`) || 0;
// variable de inicio para barra de progreso
    }

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){

        this.load.image('btnPause', './assets/Botones/Boton pausa.png');
        this.load.image('character', './assets/Skins/mascleto.png');


        // A PARTIR DE AQUÍ IF PARA CAMBIAR DEPENDIENDO DEL NIVEL

        // AHACER LO DE LOS STRINGS
        this.cadena = "mapa_lvl" + this.nivel + ".json";
        this.cadena2 = "Tile" + this.nivel + ".png";

        this.load.tilemapTiledJSON(`tilemap${this.nivel}`, './assets/Mapas/' + this.cadena);
        this.load.image('patronesTilemap'+ this.nivel, './assets/Mapas/' + this.cadena2);
        this.load.image('plataformax'+ this.nivel,'./assets/Mapas/plataforma' + this.nivel + '.png');
        this.load.image('estrellaluz' + this.nivel,'./assets/Mapas/esfera' + this.nivel + '.png');
        this.load.image('gotaax','./assets/Skins/enemigo_agua.png');
        this.load.image('cenizaax','./assets/Skins/enemigo_ceniza.png');
        this.load.image('pajaroox', './assets/Skins/enemigo_pajaro.png');
        this.load.image('pajaroox2', './assets/Skins/enemigo_pajaro2.png');
        this.load.image('iman','./assets/potenciadores/potenciador_iman.png');
        this.load.image('globo','./assets/potenciadores/potenciador_globo.png');
        this.load.image('x2','./assets/potenciadores/potenciador_x2.png');
        this.load.image('boost','./assets/potenciadores/potenciador_boost.png');
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(data) {
        
        //if (this.restart == true){
           //this.activate();
        //}else this.restart = true;

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

        //Indicadores power up
        this.iman_icono = this.add.image(570,50,'iman');
        this.iman_icono.setScale(0.2);
        this.iman_icono.setScrollFactor(0,0);
        this.iman_icono.setDepth(5);
        this.iman_icono.visible = false;
        this.x2_icono = this.add.image(570,50,'x2');
        this.x2_icono.setScale(0.2);
        this.x2_icono.setScrollFactor(0,0);
        this.x2_icono.setDepth(5);
        this.x2_icono.visible = false;
        this.boost_icono = this.add.image(570,50,'boost');
        this.boost_icono.setScale(0.2);
        this.boost_icono.setScrollFactor(0,0);
        this.boost_icono.setDepth(5);
        this.boost_icono.visible = false;
        this.globo_icono = this.add.image(570,50,'boost');
        this.globo_icono.setScale(0.2);
        this.globo_icono.setScrollFactor(0,0);
        this.globo_icono.setDepth(5);
        this.globo_icono.visible = false;


        this.map = this.make.tilemap({ 
            key: `tilemap${this.nivel}`, 
            tileWidth: 32, 
            tileHeight: 32 
        });


        const tileset1 = this.map.addTilesetImage('Tile'+ this.nivel, 'patronesTilemap'+ this.nivel);
        

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
        this.scoreText = this.add.text(0, 0, 'Score: ' + this.score, {fontFamily: 'Arial', fontSize: '44px', color: '#FFFF00'});
        this.scoreText.setScrollFactor(0,0);
        this.scoreText.setDepth(5);

        //Se crea el personaje con sus propiedades
        this.mov = this.map.createFromObjects('Objetos', {name: 'player', classType: Character, key:this.selectedCharacter.image});
		this.player = this.mov[0];
        //this.player.body.position.x;
        this.player.setScale(0.2);

        
        const totalStars = this.totalStars;
        this.registry.set('totalStars', totalStars);

       

        this.EsferaCont =this.registry.get('EsferaCont')|| 0;
		
       
       const bestScore = Math.max(this.bestScore, this.score);
       this.registry.set(`bestScoreLevel${this.nivel}`, bestScore);


        
        

        //En todos los niveles menos en el primero se incorpora el enemigo 'Gotas'
        if(this.nivel > 1){

            this.pajarosLayer = this.map.createLayer('Pajaros',tileset1);
            let pajaros = this.map.createFromObjects('Pajaros', {name: "Pajaro", key: 'pajaroox'});

            this.pajarosGroup = this.add.group();
            this.pajarosGroup.addMultiple(pajaros);
            pajaros.forEach(obj => {
                this.physics.add.existing(obj);
                obj.body.allowGravity = false;
                obj.body.immovable = true;

                //obj.setVelocityX(1 * this.dir);

                this.time.addEvent({
                    delay:500,
                    loop: true,
                    callback: function(){
                        if(obj.texture.key === 'pajaroox'){
                            obj.setTexture('pajaroox2');
                        }else{
                            obj.setTexture('pajaroox');
                        }
                    }
                });
            });
            
            this.physics.add.collider(this.player, this.pajarosGroup, this.handlePlayerOnGotaorCeniza, null, this);

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
                    obj.direccion = 1;
                    //obj.body.gravity.y = 5;
                });
                this.physics.add.collider(this.player, this.cenizasGroup, this.handlePlayerOnGotaorCeniza, null, this);
            }
        }

        //this.physics.world.enable(this.player);

        // Creamos los objetos a través de la capa de objetos del tilemap y la imagen o la clase que queramos
		let plataformas = this.map.createFromObjects('Plataformas', {name: "Plataforma", key: 'plataformax'+ this.nivel });
		
		this.platGroup = this.add.group();
		this.platGroup.addMultiple(plataformas)
		plataformas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;
            obj.direccion = 1;  
		});

        this.physics.add.collider(this.player, this.platGroup, this.handlePlayerOnPlatform, null, this);
        this.platGroup.children.iterate(function (plataforma){
            plataforma.body.checkCollision.up = true;
            plataforma.body.checkCollision.left = false;
            plataforma.body.checkCollision.right = false;
            plataforma.body.checkCollision.down = false;
            plataforma.body.allowGravity = false;
        });
        let esferas = this.map.createFromObjects('Esferas', {name: "Esfera", key: 'estrellaluz' + this.nivel});

		this.esfGroup = this.add.group();
		this.esfGroup.addMultiple(esferas)
		esferas.forEach(obj => {
			this.physics.add.existing(obj);
            obj.body.allowGravity = false;      
            obj.body.immovable = true;
            this.totalEsferas++;
		});

        this.physics.add.overlap(this.player, this.esfGroup, this.handlePlayerCollisionEsfera, null, this);

        //Power up Iman
        let imanes = this.map.createFromObjects('Imanes',{name: "Iman", key: "iman"});
        this.imanGroup = this.add.group();
        this.imanGroup.addMultiple(imanes);
        imanes.forEach(obj => {
            this.physics.add.existing(obj);
            obj.body.allowGravity = false;
            obj.body.immovable = true;
        });
        
        this.physics.add.overlap(this.player, this.imanGroup, this.handlePlayerCollisionIman, null, this);

        //Power up x2
        let x2 = this.map.createFromObjects('Multiplicadores',{name: "Multiplicador", key: "x2"});
        this.x2Group = this.add.group();
        this.x2Group.addMultiple(x2);
        x2.forEach(obj => {
            this.physics.add.existing(obj);
            obj.body.allowGravity = false;
            obj.body.immovable = true;
        });
        
        this.physics.add.overlap(this.player, this.x2Group, this.handlePlayerCollisionX2, null, this);

        //Power up globo
        let globos = this.map.createFromObjects('Globos',{name: "Globo", key: "globo"});
        this.globosGroup = this.add.group();
        this.globosGroup.addMultiple(globos);
        globos.forEach(obj => {
            this.physics.add.existing(obj);
            obj.body.allowGravity = false;
            obj.body.immovable = true;
        });

        this.physics.add.overlap(this.player, this.globosGroup, this.handlePlayerCollisionGlobo, null, this);

        //Power up boost
        let boosters = this.map.createFromObjects('Boosters',{name: "Boost", key: "boost"});
        this.boostGroup = this.add.group();
        this.boostGroup.addMultiple(boosters);
        boosters.forEach(obj => {
            this.physics.add.existing(obj);
            obj.body.allowGravity = false;
            obj.body.immovable = true;
        });

        this.physics.add.overlap(this.player, this.boostGroup, this.handlePlayerCollisionBoost, null, this);

        // Nueva función de seguir al jugador
        this.cameras.main.setFollowOffset(100,0);
        this.cameras.main.startFollow(this.player,false,0,1);

        //Permitir obtener que teclas ha pulsado
        this.cursors = this.input.keyboard.createCursorKeys();


        // Texto de tutorial de inicio de juego
        this.startText = this.add.text(250, 600, 'Press ↑ to Start', {fontFamily: 'Arial', fontSize: '33px', color: '#FFFFFF'});
        this.startText.setScrollFactor(0,0);
        this.startText.setDepth(5);
        

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
        
        if(this.nivel > 1){
            
            this.pajarosGroup.getChildren().forEach(function(pajaro) {
                pajaro.x += 1 * this.dir;
                //pajaro.body.setVelocityX(1*this.dir)
    
                if(pajaro.x >= 690 && this.dir === 1){
                    //pajaro.flipX= !pajaro.flipX;
                    this.dir = -1;
                    
                }else if (pajaro.x <= 30 && this.dir === -1){
                    //pajaro.flipX= !pajaro.flipX;
                    this.dir = 1;
                }

                
            }, this);

            this.pajarosGroup.getChildren().forEach(function(pajaro) {
                if(pajaro.x > 650){
                    pajaro.flipX= true;
                    
                    
                }else if (pajaro.x < 40){
                    pajaro.flipX= false;
                    
                }
            });

            this.gotasGroup.getChildren().forEach(function(gota){
                gota.y += 0.5;
            });

        }
        
        if(this.nivel ===5){
            this.platGroup.getChildren().forEach(function(plat){
                
                plat.x += 1 * plat.direccion;

                if(plat.x >= 640 || plat.x <= 70){
                    plat.direccion *= -1;
                }
            });
        }
        if(this.nivel === 5){
            this.cenizasGroup.getChildren().forEach(function(ceni){

                ceni.x += 1 * ceni.direccion;
                
                if(ceni.x >= 640 || ceni.x <= 70){
                    ceni.direccion *= -1;
                }
            });
        }

        if(this.iman_activo){
            this.esfGroup.getChildren().forEach(function(esfera) {
            
                var direccionX = this.player.body.position.x - esfera.x;
                var direccionY = this.player.body.position.y - esfera.y;
            
                
                var distancia = Math.sqrt(direccionX * direccionX + direccionY * direccionY);

                if(distancia < 1000){
                    var fuerza = 500 / (distancia * distancia);
                    esfera.body.velocity.x += direccionX * fuerza;
                    esfera.body.velocity.y += direccionY * fuerza;
                }
                
              }.bind(this));

        }

        if(this.globo_activo){
            this.player.body.allowgravity = false;
        }
        

        
        
        

        let actualSpeed;
        

        // Este if nos sirve para conseguir la altura del mapa, que luego utilizaremos para implementar la barra de progreso
        if (this.inicioJuego2 == false){
            this.mapHeight = this.player.body.position.y;
        } 
        this.inicioJuego2 = true;
        

        if (this.player.body.position.y != this.mapHeight){
            this.startText.destroy();

        }
        


        this.progreso = this.mapHeight - this.player.body.position.y;

        this.updateBarraProgreso();


        // CODIGO PARA LIMITES LATERALES

        if (this.player.body.position.x > 690){
            actualSpeed = -(Math.abs(this.player.body.velocity.x));
            this.player.body.velocity.x=actualSpeed;
        }

        if (this.player.body.position.x < -10 ){
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
            this.scene.start('escenaFinal',{numero : 1, totalEsferas: this.totalEsferas, totalRecogidas: this.totalRecogidas, puntuacion: this.score, nivel:this.nivel}); 
        }


    }

    activate(){
        const scene = this.scene.get('game');
        this.scene.restart(scene);
        this.scene.start('game');
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
        if(this.x2_activo){ this.score += 100*2; }
        else{ this.score += 100; }
        this.scoreText.setText('Score: ' + this.score);
        esfera.body.visible = false;
        esfera.destroy();
        this.totalRecogidas++;   
        
		this.registry.set('EsferaCont',this.EsferaCont+this.totalRecogidas);
    }

    //handler con el iman
    handlePlayerCollisionIman(player,iman){
        this.iman_activo = true;
        iman.body.visible = false;
        iman.destroy();
        this.iman_icono.visible = true;
        this.time.addEvent({
            delay: 5000, //Duracion del iman
            loop: false,
            callback: function(){
                this.iman_activo = false;
                this.iman_icono.visible = false;
            }.bind(this)
        });
    }

    //handler con el x2
    handlePlayerCollisionX2(player,x2){
        this.x2_activo = true;
        x2.body.visible = false;
        x2.destroy();
        this.x2_icono.visible = true;
        this.time.addEvent({
            delay: 5000, //Duracion del power up
            loop: false,
            callback: function(){
                this.x2_activo = false;
                this.x2_icono.visible = false;
            }.bind(this)
        });

    }

    //handler con el boost
    handlePlayerCollisionBoost(player,boost){
        this.boost_activo = true;
        this.player.body.setVelocityY(-1600);
        boost.body.visible = false;
        boost.destroy();
        this.boost_icono.visible = true;
        this.time.addEvent({
            delay: 5000, //Duracion del power up
            loop: false,
            callback: function(){
                this.boost_activo = false;
                this.player.body.setVelocityY(-600);
                this.boost_icono.visible = false;
            }.bind(this)
        });
    }

    handlePlayerCollisionGlobo(player,globo){
        this.globo_activo = true;
        globo.body.visible = false;
        globo.destroy();
        this.globo_icono.visible = true;
        this.time.addEvent({
            delay: 5000,
            loop: false,
            callback: function(){
                this.globo_activo = false;
                this.globo_icono.visible = false;
            }.bind(this)
        });
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