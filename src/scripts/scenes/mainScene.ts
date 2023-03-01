import Engine from "../core/engine";
import { gameOptions } from "../config/gameOptions";
import Gem from "../prefabs/gem";
import BaseScene from "./baseScene";
import Player from "../prefabs/player";
import { config } from "../config/config";
import GameTimer from "../prefabs/gameTimer";
export default class MainScene extends BaseScene{

  private engine : Engine;
  //private canPick : boolean;
  private dragging : boolean;
  private poolArray : any;
  private swappingGems : number;
  private selectedGem : any;
  private player : Player;
  private scoreText : Phaser.GameObjects.Text;
  private gameTimer : GameTimer;

  constructor() {
    super({key: "MainScene"})
  }

  create() {
    super.create();
    this.engine = new Engine({rows: 7, columns: 6, items: 6});
    this.engine.generateField();
    //this.canPick = true;
    this.dragging = false;
    this.createField();
    this.input.on("pointerdown", this.pickGem, this);
    this.createScoreText();
    this.player = new Player(this, this.scoreText);
    this.pauseButton();
    this.gameTimer = new GameTimer(this, gameOptions.gameDuration);
  }

  private createScoreText() : void {
    this.scoreText = this.add.text(config.scale.width / 2, config.scale.height / 2 - 500, 'Score: 0', { 
        fontSize: '40px', 
        color: '#ffffff',
        fontFamily: 'Trebuchet MS',
    }).setOrigin(0.5);
  }

  private pauseButton() : void{
    const button = this.add.text(config.scale.width / 2 - 240, config.scale.height / 2 - 500, 'PAUSE', {
        fontSize: '32px',
        fontStyle: 'bold', 
        color: '#ffffff',
    })
        .setOrigin(0.5)
        .setInteractive();
    button.on('pointerdown', () => {
        this.scene.pause();
        this.physics.pause();
        // Rather than using scene.start I used scene.launch in here, start shuts down current scene and loads new one.
        this.scene.launch('PauseScene');
        this.events.emit('save');
    });
}

  private createField() : void {
    this.poolArray = new Array();
    for(let i = 0; i < this.engine.getRowNumber(); i ++){
      for(let j = 0; j < this.engine.getColumnNumber(); j ++){
          let gemX = gameOptions.boardOffset.x + gameOptions.gemSize * j + gameOptions.gemSize / 2;
          let gemY = gameOptions.boardOffset.y + gameOptions.gemSize * i + gameOptions.gemSize / 2
          let gem = new Gem(this, gemX, gemY, "spritesheet", this.engine.valueAt(i, j));
          this.engine.setCustomData(i, j, gem);
      }
  }
  };

  private pickGem(pointer) : void {
    //if(this.canPick){
      this.dragging = true;
      let row = Math.floor((pointer.y - gameOptions.boardOffset.y) / gameOptions.gemSize);
      let col = Math.floor((pointer.x - gameOptions.boardOffset.x) / gameOptions.gemSize);
      if(this.engine.validPick(row, col)){
          let selectedGem = this.engine.getSelectedItem();
          if(!selectedGem){
              this.engine.customDataOf(row, col).setScale(1.2);
              this.engine.customDataOf(row, col).setDepth(1);
              this.engine.setSelectedItem(row, col);
          }
          else{
              if(this.engine.areTheSame(row, col, selectedGem.row, selectedGem.column)){
                  this.engine.customDataOf(row, col).setScale(1);
                  this.engine.deleselectItem();
              }
              else{
                  if(this.engine.areNext(row, col, selectedGem.row, selectedGem.column)){
                      this.engine.customDataOf(selectedGem.row, selectedGem.column).setScale(1);
                      this.engine.deleselectItem();
                      this.swapGems(row, col, selectedGem.row, selectedGem.column, true);
                  }
                  else{
                      this.engine.customDataOf(selectedGem.row, selectedGem.column).setScale(1);
                      this.engine.customDataOf(row, col).setScale(1.2);
                      this.engine.setSelectedItem(row, col);
                  }
              }
          }
      }
  //}
  };

  private swapGems(row, col, row2, col2, swapBack) : void {
    let movements = this.engine.swapItems(row, col, row2, col2);
    this.swappingGems = 2;
    //this.canPick = false;
    movements.forEach((movement) => {
        this.tweens.add({
            targets: this.engine.customDataOf(movement.row, movement.column),
            x: this.engine.customDataOf(movement.row, movement.column).x + gameOptions.gemSize * movement.deltaColumn,
            y: this.engine.customDataOf(movement.row, movement.column).y + gameOptions.gemSize * movement.deltaRow,
            duration: gameOptions.swapSpeed,
            callbackScope: this,
            onComplete: () => {
                this.swappingGems --;
                if(this.swappingGems == 0){
                    if(!this.engine.matchInBoard()){
                        if(swapBack){
                            this.swapGems(row, col, row2, col2, false);
                        }
                        else{
                            //this.canPick = true;
                        }
                    }
                    else{
                        this.handleMatches();
                    }
                }
            }
        })
    });
  };

  private handleMatches() : void {
    let gemsToRemove = this.engine.getMatchList();
    let destroyed = 0;

    gemsToRemove.forEach((gem) => {
      this.poolArray.push(this.engine.customDataOf(gem.row, gem.column))
            destroyed ++;
            this.tweens.add({
                targets: this.engine.customDataOf(gem.row, gem.column),
                alpha: 0,
                duration: gameOptions.destroySpeed,
                callbackScope: this,
                onComplete: () =>{
                    destroyed --;
                    if(destroyed == 0){
                        this.makeGemsFall();
                    }
                }
            });
            if(destroyed === 0) return;
            this.events.emit('chatsubo');
    });

  };

  private makeGemsFall() : void {
    let moved = 0;
    this.engine.removeMatches();
    let fallingMovements = this.engine.arrangeBoardAfterMatch();
    let endOfMove = this.endOfMove();
    fallingMovements.forEach((movement) => {
      moved ++;
      this.tweens.add({
          targets: this.engine.customDataOf(movement.row, movement.column),
          y: this.engine.customDataOf(movement.row, movement.column).y + movement.deltaRow * gameOptions.gemSize,
          duration: gameOptions.fallSpeed * Math.abs(movement.deltaRow),
          callbackScope: this,
          onComplete: () =>{
              moved --;
              if(moved == 0){
                  endOfMove;
              }
          }
      })
    });

    let replenishMovements = this.engine.replenishBoard();
    replenishMovements.forEach((movement) => {
      moved ++;
      let sprite = this.poolArray.pop();
      sprite.alpha = 1;
      sprite.y = gameOptions.boardOffset.y + gameOptions.gemSize * (movement.row - movement.deltaRow + 1) - gameOptions.gemSize / 2;
      sprite.x = gameOptions.boardOffset.x + gameOptions.gemSize * movement.column + gameOptions.gemSize / 2,
      sprite.setFrame(this.engine.valueAt(movement.row, movement.column));
      this.engine.setCustomData(movement.row, movement.column, sprite);
      this.tweens.add({
          targets: sprite,
          y: gameOptions.boardOffset.y + gameOptions.gemSize * movement.row + gameOptions.gemSize / 2,
          duration: gameOptions.fallSpeed * movement.deltaRow,
          callbackScope: this,
          onComplete: function(){
              moved --;
              if(moved == 0){
                  endOfMove;
              }
          }
      });
    });
  };

  private endOfMove() : void {
    if(this.engine.matchInBoard()){
      this.time.addEvent({
          delay: 200,
          callback: () => this.handleMatches(),
      });
  }
  else{
      //this.canPick = true;
      this.selectedGem = null;
  }
  }


};
