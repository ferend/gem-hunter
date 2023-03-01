import { config } from "../config/config";

export default class GameTimer {
    private scene : Phaser.Scene;
    private time : number;

    constructor(scene : Phaser.Scene, time : number) {
        this.scene = scene;
        this.time = time;
        this.createTimer();
    }

    private createTimer() : void {
        const timerText = this.scene.add.text(config.scale.width / 2 + 220, config.scale.height / 2 - 500, 'Time: ' + this.time, {
            fontSize: '40px',
            color: '#ffffff',
            fontFamily: 'Trebuchet MS',

        }).setOrigin(0.5);
        var timedEvent = this.scene.time.addEvent( {
            delay: 1000,
            loop: true,
            callbackScope: this,
            callback: () => {
                this.time--;
                timerText.setText('Time: ' + this.time);
                if(this.time === 0) {
                    this.scene.time.removeEvent(timedEvent);
                    this.scene.events.emit('save');
                    this.scene.scene.start('GameOverScene');
                }
            }
        });
    }
} 