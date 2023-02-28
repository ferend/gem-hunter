import BaseScene from "./baseScene";
import { config } from "../config/config";
export default class MenuScene extends BaseScene {
    private menu : any;
  constructor() {
    super({ key: "MenuScene" });
    this.menu = [
        {scene : 'PlayScene',text :'Play'},
        {scene : 'ScoreScene',text :'Leaderboard'},
        {scene : null, text :'Exit'}
    ]
  }

  create() {
    super.create();
    this.gameTitletext();
    this.startButton();
  }

  private gameTitletext(): Phaser.GameObjects.Text {
    return this.add
      .text(config.scale.width / 2, config.scale.height / 2, "Gem Hunter", {
        fontSize: "64px",
        color: "#ffffff",
      })
      .setOrigin(0.5);
  }

  private startButton(): void {
    const startButton = this.add
      .text(config.scale.width / 2, config.scale.height / 2 + 150, "Play", {
        fontSize: "40px",
        color: "#ffffff",
      })
      .setOrigin(0.5)
      .setScale(1)
      .setInteractive();
    startButton.on("pointerup", () => {
      this.scene.start("MainScene");
    });
  }
}
