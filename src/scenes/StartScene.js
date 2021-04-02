class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }
  preload() {
    this.load.image('startScreen', 'assets/whack-amole-epic.png')
  }


  create() {
    const background = this.add.image(0, 0, 'startScreen');

    const level1Box = this.add.rectangle(250, 475, 150, 45, 0xFFFFFF);
    level1Box.alpha = 0.5;
    level1Box.strokeColor = 0x000000;
    level1Box.strokeWeight = 1;
    level1Box.setInteractive();
    let level1 = this.add.text(200, 460, `Level 1`).setColor('#000000').setFontSize(25);



    const level2Box = this.add.rectangle(250, 550, 150, 45, 0xFFFFFF);
    level2Box.alpha = 0.5;
    level2Box.strokeColor = 0x000000;
    level2Box.strokeWeight = 1;
    level2Box.setInteractive();
    let level2 = this.add.text(200, 535, `Level 2`).setColor('#000000').setFontSize(25);


    level1Box.on('pointerover', function () {
      level1Box.setStrokeStyle(3, 0x000, 1);
      level1.setFontStyle('bold');
    })

    level1Box.on('pointerout', function () {
      level1Box.setStrokeStyle(1, 0x000000, 1);
      level1.setFontStyle('normal');
    })



    level1Box.on('pointerup', () => {
      timeLeft = 30;
      score = 0;
      isPaused = false;

      this.scene.start('GameScene');
      this.scene.stop('StartScene');
    })


    level2Box.on('pointerover', function () {
      level2Box.setStrokeStyle(3, 0x000, 1);
      level2.setFontStyle('bold');
    })

    level2Box.on('pointerout', function () {
      level2Box.setStrokeStyle(1, 0x000000, 1);
      level2.setFontStyle('normal');
    })


    level2Box.on('pointerup', () => {
      time = 15;
      score = 0;
      isGamePaused = false;
      this.scene.start('GameSceneTwo');
      this.scene.stop('StartScene');
    })

    background.setOrigin(0).setScale(0.5);

  }
}
