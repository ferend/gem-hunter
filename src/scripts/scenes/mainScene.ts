import Engine from "../objects/engine";
import { gameOptions } from "../gameOptions";
export default class MainScene extends Phaser.Scene {

  private engine : Engine;
  private canPick : boolean;
  private dragging : boolean;
  private poolArray : any;

  constructor() {
    super({ key: 'MainScene' })
  }

  create() {
    this.engine = new Engine({rows: 8, columns: 8, items: 5});
    this.engine.generateField();
    this.canPick = true;
    this.dragging = false;
    this.createField();
  }

  createField() : void {
    this.poolArray = [];
    for(let i = 0; i < this.engine.getRowNumber(); i ++){
      for(let j = 0; j < this.engine.getColumnNumber(); j ++){
          let gemX = gameOptions.boardOffset.x + gameOptions.gemSize * j + gameOptions.gemSize / 2;
          let gemY = gameOptions.boardOffset.y + gameOptions.gemSize * i + gameOptions.gemSize / 2
          let gem = this.add.sprite(gemX, gemY, "spritesheet", this.engine.valueAt(i, j));
          this.engine.setCustomData(i, j, gem);
      }
  }
  };
}

