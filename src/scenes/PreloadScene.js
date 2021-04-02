class PreloadScene extends Phaser.Scene {

  constructor() {
    super({ key: "PreloadScene" })
  }

  preload() {

    this.graphics = this.add.graphics();
    this.newGraphics = this.add.graphics();
    let progressBar = new Phaser.Geom.Rectangle(50, 200, 400, 50);
    let progressBarFill = new Phaser.Geom.Rectangle(55, 205, 290, 40);

    this.graphics.fillStyle(0xffffff, 1);
    this.graphics.fillRectShape(progressBar);

    this.newGraphics.fillStyle(0x025928, 1);
    this.newGraphics.fillRectShape(progressBarFill);

    let loadingText = this.add.text(100, 260, "Loading: ", { fontSize: '32px', fill: '#FFF' });



    this.load.image('background', '../../assets/whack-amole-epic.png')

    let assets = ['game-0ver01.png ', 'whack-amole-epic.png',
      'mole-sprite-all.png', 'whack-amole-rainbow.png','whack-amole-level-2.png'];
    for (let i = 0; i < assets.length; i++) {
      this.load.image(assets[i], `../../assets/${assets[i]}`)
    }

    this.load.on('progress', this.updateBar, { newGraphics: this.newGraphics, loadingText: loadingText });
    this.load.on('complete', this.complete, { scene: this.scene });
  }

  updateBar(percentage) {
    this.newGraphics.clear();
    this.newGraphics.fillStyle(0x025928, 1);
    this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(55, 205, percentage * 390, 40));

    percentage = percentage * 100;
    this.loadingText.setText("Loading: " + percentage.toFixed(2) + "%");

  }

  complete() {
    this.scene.start('StartScene');
    this.scene.stop('PreloadScene');
  }

}