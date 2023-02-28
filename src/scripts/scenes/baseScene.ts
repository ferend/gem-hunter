import { config } from '../config/config';

export default class BaseScene extends Phaser.Scene {
    private screenCenter: number[];
    constructor({key: string}) {
    
        super({ key : string })
  
    }

  create() {
    this.screenCenter = [config.scale.width / 2, config.scale.height / 2];
    if(config.canGoBack) {
        const backButton = this.add.text(config.scale.width /2 ,config.scale.height / 2, 'BACK')
            .setOrigin(1)
            .setScale(1)
            .setInteractive();
        backButton.on('pointerup' , () => {
            this.scene.start('MenuScene');
        })
    }
    var bgConfig = {
        key: "bgAnimation",
        frames: this.anims.generateFrameNumbers("bg", {
          start: 0,
          end: 15,
          first: 0
        }),
        frameRate: 2,
        repeat: -1
      };

        this.anims.create(bgConfig);
        this.add.sprite(-20, -20, "bg").setOrigin(0, 0).play("bgAnimation").setScale(1.5);
  }

}