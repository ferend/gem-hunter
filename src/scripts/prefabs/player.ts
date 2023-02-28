export default class Player {
    
    public currentScore: number;
    constructor(scene : Phaser.Scene, scoreText : Phaser.GameObjects.Text) {
        this.currentScore = 0;
        scene.events.on('chatsubo', () => {
            this.increaseScore(10,scoreText);
        } , this);
    }

    private increaseScore(scoreAmount : number, scoreText : Phaser.GameObjects.Text) {
        this.currentScore += scoreAmount;
        scoreText.setText('Score: ' + this.currentScore);
    }
}