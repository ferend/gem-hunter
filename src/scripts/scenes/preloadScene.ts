import BaseScene from "./baseScene";

export default class PreloadScene extends BaseScene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.spritesheet("spritesheet", "assets/img/spritesheet.png", { frameWidth: 120, frameHeight: 118 });
    this.load.spritesheet('bg', 'assets/img/spritesheet2.png', { frameWidth: 1280, frameHeight: 960 });
  }

  create() {
    this.scene.start('MenuScene')

  }
}
