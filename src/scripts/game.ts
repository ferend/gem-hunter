import 'phaser'
import { config } from './config/config';

var canvas = document.querySelector("canvas");


window.addEventListener('load', () => {
  const game = new Phaser.Game(config)
  resizeCanvas(game);
});

function resizeCanvas(game: any): void {
  const resize = () => {
    game.renderer.resize(window.innerWidth, window.innerHeight);
  };

  resize();

  window.addEventListener("resize", resize);
}
