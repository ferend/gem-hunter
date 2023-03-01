export default class Player {
    
    public currentScore: number;
    private scene : Phaser.Scene;
    private scoreText : Phaser.GameObjects.Text;
    constructor(scene : Phaser.Scene, scoreText : Phaser.GameObjects.Text) {
        this.currentScore = 0;
        this.scene = scene;
        this.scoreText = scoreText;
        
        this.scene.events.on('chatsubo', () => {
            this.increaseScore(10,this.scoreText);
        } , this);
        
        this.scene.events.on('save', () => {
            this.savePlayerScoreToLocal();
        }, this);
    }


    private increaseScore(scoreAmount : number, scoreText : Phaser.GameObjects.Text) {
        this.currentScore += scoreAmount;
        scoreText.setText('Score: ' + this.currentScore);
    }

    private savePlayerScoreToLocal() : void {
        if(this.currentScore === 0) return;
        localStorage.setItem('playerScore', this.currentScore.toString());
    }

}