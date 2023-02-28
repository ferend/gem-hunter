import BaseScene from "./baseScene";

export default class PreloadScene extends BaseScene {
  constructor() {
    super({ key: 'PreloadScene' });
  }

  preload() {
    this.load.image('phaser-logo', 'assets/img/phaser-logo.png')
    this.load.spritesheet("spritesheet", "assets/img/spritesheet.png", { frameWidth: 116, frameHeight: 114 });
    this.load.spritesheet('bg', 'assets/img/spritesheet2.png', { frameWidth: 1280, frameHeight: 960 });
  }

  create() {
    this.scene.start('MenuScene')

    /**
     * This is how you would dynamically import the mainScene class (with code splitting),
     * add the mainScene to the Scene Manager
     * and start the scene.
     * The name of the chunk would be 'mainScene.chunk.js
     * Find more about code splitting here: https://webpack.js.org/guides/code-splitting/
     */
    // let someCondition = true
    // if (someCondition)
    //   import(/* webpackChunkName: "mainScene" */ './mainScene').then(mainScene => {
    //     this.scene.add('MainScene', mainScene.default, true)
    //   })
    // else console.log('The mainScene class will not even be loaded by the browser')
  }
}
