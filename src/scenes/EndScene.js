import Phaser from 'phaser';
import { score } from './GameScene'
class EndScene extends Phaser.Scene {
  constructor() {
    super({ key: 'EndScene' })
  }



  preload() {
    this.load.image('EndScreen', '../assets/game-0ver01.png ');
  }


  create() {
    const background = this.add.image(0, 0, 'EndScreen');
    background.setOrigin(0);
    background.setScale(0.5);

    this.input.on('pointerup', () => {
      this.scene.stop('EndScene');
      this.scene.start('StartScene');
    })
    this.add.text(20, 300, `Your score is ${score}.`).setColor('#fff').setFontSize(40);
  }

}


export default EndScene;




