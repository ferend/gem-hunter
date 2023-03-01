import BaseScene from "./baseScene";
import { config } from "../config/config";
export default class GameOverScene extends BaseScene {
    constructor() {
    
        super({ key: 'GameOverScene' });
    }

    create() {
        super.create();
        this.gameOverText();
        this.returnToMenuButton();
        this.bestScoreText();
    }

    private gameOverText(): Phaser.GameObjects.Text {
        return this.add
            .text(config.scale.width / 2, config.scale.height / 2, "Game Over", {
                fontSize: "64px",
                color: "#ffffff",
                fontFamily: "Trebuchet MS",
            })
            .setOrigin(0.5);
    }
    
    private returnToMenuButton(): Phaser.GameObjects.Text {
        const startButton = this.add
            .text(config.scale.width / 2, config.scale.height / 2 + 150, "Return to Menu", {
                fontSize: "40px",
                color: "#ffffff",
                fontFamily: "Trebuchet MS",
            })
            .setOrigin(0.5)
            .setScale(1)
            .setInteractive();
        startButton.on("pointerup", () => {
            window.location.reload();
        });
        return startButton;
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