import Phaser from 'phaser'

export default class escenaPausada extends Phaser.Scene {

	constructor() {
        super({ key: 'escenaPausada' });
        this.botonPlay = false;
    }

    preload(){
        
        this.load.image('btnPlay', 'public/assets/Boton reanudar.png');
        this.load.image('btnRestart', 'public/assets/Boton reiniciar.png');
        this.load.image('btnQuit', 'public/assets/Boton salir.png');
        this.load.image('dialogo', 'public/assets/dialogo menu.png');
    }

    init(data){
        this.levelMenu = data.nivel;
    }

    create(){
        this.dialog = this.add.image(360,360, 'dialogo');

        this.dialog.setScrollFactor(0,0);
        this.dialog.setDepth(5);
            
        this.characterName = this.add.text(360, 200, 'MENU PAUSE', { font: '60px Arial', color: '#ffffff' }).setOrigin(0.5);

        this.characterName.setScrollFactor(0,0);
        this.characterName.setDepth(5);


        let playArea = new Phaser.Geom.Rectangle(75, 130, 300, 140);
        let restartArea = new Phaser.Geom.Rectangle(75, 130, 300, 140);
        let quitArea = new Phaser.Geom.Rectangle(75, 130, 300, 140);    

        this.btnPlay = this.add.image(360,300,'btnPlay').setInteractive(playArea, Phaser.Geom.Rectangle.Contains);
        this.btnPlay.setScale(0.7);

        this.btnRestart = this.add.image(360,400,'btnRestart').setInteractive(restartArea, Phaser.Geom.Rectangle.Contains);
        this.btnRestart.setScale(0.7);

        this.btnQuit = this.add.image(360,500,'btnQuit').setInteractive(quitArea, Phaser.Geom.Rectangle.Contains);
        this.btnQuit.setScale(0.7);

        this.btnPlay.setScrollFactor(0,0);
        this.btnPlay.setDepth(5);

        this.btnRestart.setScrollFactor(0,0);
        this.btnRestart.setDepth(5);

        this.btnQuit.setScrollFactor(0,0);
        this.btnQuit.setDepth(5);




        // BOTON RESUME Y RESTART FUNCIONAN
        this.btnPlay.on('pointerdown', () =>{
                this.botonPlay = true;
                this.scene.resume('game');
                this.scene.stop();
        });

        this.btnRestart.on('pointerdown', () => {
            this.botonPlay = false;
            this.scene.stop('game');
            this.scene.start('game');
            this.scene.stop();
        });

        // BOTON QUIT NO FUNCIONA
        this.btnQuit.on('pointerdown', () => {
            this.botonPlay = false;
            this.scene.stop('game'); 
            this.scene.start('menuniveles',{restart: true});
            this.scene.stop();
        });
    }

    update(){}
}
