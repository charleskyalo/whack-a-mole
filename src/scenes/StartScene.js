import Phaser from 'phaser';

class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }
  preload() {
    this.load.image('startScreen', 'assets/whack-amole-epic.png')
  }


  create() {
    const background = this.add.image(0, 0, 'startScreen');

    background.setOrigin(0).setScale(0.5);

    this.input.on("pointerup", () => {
      this.scene.start('GameScene');
      this.scene.stop('StartScene');
    })
  }
}

export default StartScene;