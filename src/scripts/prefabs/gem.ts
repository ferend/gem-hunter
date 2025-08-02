export default class Gem extends Phaser.GameObjects.Sprite {
    public gemValue: number;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, value: number) {
        super(scene, x, y, texture, value); // 'value' as frame index!
        this.gemValue = value;
        this.scene.add.existing(this);
    }
}
