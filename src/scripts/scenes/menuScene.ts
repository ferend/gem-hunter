import BaseScene from "./baseScene";
import { config } from "../config/config";
export default class MenuScene extends BaseScene {
  constructor() {
    super({ key: "MenuScene" });
  }

  create() {
    super.create();
    this.gameTitletext();
    this.startButton();
    if(localStorage.getItem('playerScore') !== null) {
        this.bestScoreText();
    }
  }

  private gameTitletext(): Phaser.GameObjects.Text {
    return this.add
      .text(config.scale.width / 2, config.scale.height / 2, "Gem Hunter", {
        fontSize: "64px",
        color: "#ffffff",
        fontFamily: "Trebuchet MS",
      })
      .setOrigin(0.5);
  }

  private startButton(): void {
    const startButton = this.add
      .text(config.scale.width / 2, config.scale.height / 2 + 150, "Play", {
        fontSize: "40px",
        color: "#ffffff",
        fontFamily: "Trebuchet MS",
      })
      .setOrigin(0.5)
      .setScale(1)
      .setInteractive();
    startButton.on("pointerup", () => {
      this.scene.stop();
      this.scene.start("MainScene");
    });
  }

  private bestScoreText(): Phaser.GameObjects.Text {
    return this.add
      .text(config.scale.width / 2, config.scale.height / 2 + 300, "Best Score : " + localStorage.getItem("playerScore"), {
        fontSize: "40px",
        color: "#ffffff",
        fontFamily: "Trebuchet MS",
      })
      .setOrigin(0.5);
  }
}
