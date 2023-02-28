import BaseScene from "./baseScene";
import { config } from "../config/config";

export default class PauseScene extends BaseScene {
  constructor() {
    super({ key: "PauseScene" });
  }

  create() {
    super.create();
    this.gamePausedText();
    this.continueGameText();
  }

  private gamePausedText(): Phaser.GameObjects.Text {
    return this.add
      .text(config.scale.width / 2, config.scale.height / 2, "Game Paused", {
        fontSize: "64px",
        color: "#ffffff",
        fontFamily: "Trebuchet MS",
      })
      .setOrigin(0.5);
  }

  private continueGameText(): void {
    var text = this.add
      .text(config.scale.width / 2, config.scale.height / 2 + 150, "Continue", {
        fontSize: "40px",
        color: "#ffffff",
        fontFamily: "Trebuchet MS",
      })
      .setOrigin(0.5)
      .setScale(1);
    text.setInteractive();
    text.on("pointerup", () => {
      this.scene.resume("MainScene");
      this.scene.stop();
    });
  }
}
