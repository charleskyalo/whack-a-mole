class PreloadScene extends Phaser.Scene {

  constructor() {
    super({ key: "PreloadScene" })
  }

  preload() {
    this.load.image('background', '../../assets/whack-amole-epic.png')

    let assets = ['game-0ver01.png ', 'whack-amole-epic.png',
      'mole-sprite-all.png', 'whack-amole-rainbow.png'];
    for (let i = 0; i < assets.length; i++) {
      this.load.image(assets[i], `../../assets/${assets[i]}`)
    }

    this.load.on('progress', this.updateBar);
    this.load.on('complete', this.complete);
  }

  updateBar(percentage) {
    console.log("Percentage" + percentage);
  }

  complete() {
    console.log("Complete");
  }

}