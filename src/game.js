import Phaser from "phaser";
import StartScene from './scenes/StartScene';
const config = {
  type: Phaser.AUTO,
  width: 480,
  height: 640,
  physics: {
    default: 'arcade',
  },
  backgroundColor: 'F8B392',
  scene: [StartScene]

}

const game = new Phaser.Game(config);