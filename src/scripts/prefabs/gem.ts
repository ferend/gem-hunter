export default class Gem extends Phaser.GameObjects.Sprite {
    public gemScore : number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, value: number) {
        super(scene, x, y, texture,value);
        this.scene = scene;
        this.scene.add.existing(this);
    }
}