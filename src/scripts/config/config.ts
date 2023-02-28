import MainScene from '../scenes/mainScene'
import PreloadScene from '../scenes/preloadScene'
import MenuScene
 from '../scenes/menuScene'
const DEFAULT_WIDTH = 720
const DEFAULT_HEIGHT = 1280

export const config = {
    type: Phaser.AUTO,
    backgroundColor: '#ffffff',
    canGoBack: true,
    scale: {
      parent: 'phaser-game',
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT
    },
    scene: [PreloadScene, MainScene, MenuScene],
    physics: {
      default: 'arcade',
      arcade: {
        debug: false,
        gravity: { y: 400 }
      }
    }
};