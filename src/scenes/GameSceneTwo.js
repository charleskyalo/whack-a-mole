
let time = 15;
// game Score;
let Score = 0;
// initial game state with  not paused state;
let isGamePaused = false;
// store the current burrow location of the mole;
let currentBurrowKeyy;

// global game variables

const gameStateVariables = {}

class GameSceneTwo extends Phaser.Scene {
  constructor() {
    super({ key: 'GameSceneTwo' })

    /* 
     list of all burrow locations
    
     each location contains a corresponding key on the keyboard.
    
     the x and y pixel cordinates on the screen.
      */

    this.burrowLocations = [{
      key: 'b',
      x: 70,
      y: 380,
    },
    {
      key: 'e',
      x: 240,
      y: 430,
    },
    {
      key: 'f',
      x: 400,
      y: 460,
    },

    {
      key: "g",
      x: 280,
      y: 520,
    },
    {
      key: "i",
      x: 90,
      y: 155,
    },
    {
      key: "n",
      x: 245,
      y: 120,
    },

    {
      key: "o",
      x: 365,
      y: 150,
    },

    {
      key: "p",
      x: 72.5,
      y: 260,
    },

    {
      key: "s",
      x: 400,
      y: 255,
    }
      , {
      key: "t",
      x: 240,
      y: 330,
    },
    {
      key: "d",
      x: 400,
      y: 375,
    }
      ,
    {
      key: "w",
      x: 72.5,
      y: 470
    }
    ];

  }

  // import all of the visual assets need in the game;
  preload() {
    this.load.image('playgroundd', '../../assets/whack-amole-level-2.png');
    this.load.spritesheet('mole', '../../assets/mole-sprite-all.png', { frameWidth: 198, frameHeight: 250 });

  }



  create() {
    // update time
    const updateTimer = (timeElapsed) => {
      time -= timeElapsed;
    }

    // execute timer each second
    const onSecondLapsed = (timeElapsed) => {
      if (isGamePaused === false) {
        // update timer by amount of time elapsed
        updateTimer(timeElapsed);
        // display the timer to the user 
        this.updateTimerText();
      }
    }

    //display background
    this.initializeBackground();

    // show instructions
    this.showInstructions();

    // initial Score text;
    this.initializeScoreText();


    // loop throught each burrow and set up key listeners on the corresponding key;
    this.initializeBurrowKeys();

    // set up animation callbacks
    this.initializeAnimations();

    //set up mole and place in its  initial location.
    this.initializeMole();


    // set up text for timer and callback for countdown 
    this.initializeTimer(onSecondLapsed);

  }



  update() {

    if (time <= 0) {
      // stop this scene and start the end scene ;
      /* add other levels later */
      this.scene.stop('GameSceneTwo');
      this.scene.start('EndScene');

    }
    // update users Score
    const updateScore = (points) => {
      Score += points;
    }


    // user hits the correct mole reward; +5 points 

    const applyHitReward = () => {
      // display how many points the user will gain 
      this.displayRewardText();
      // updateReward
      updateScore(5);
      // show the new Score to the user
      this.updateScoreText();
    }


    // apply miss penalty us by taking users 5 points ;
    const applyMissPenalty = () => {
      // display how many points that the user will loose;
      this.displayPenaltyText();
      updateScore(-5);
      // display the new Score to the user
      this.updateScoreText();
    }


    // when a user hits a burrow ;
    const onBurrowHit = (key) => {
      // check if the user has successfully hits the moles current mole
      if (key === currentBurrowKeyy) {
        applyHitReward();
        this.relocateMole();
      } else {
        applyMissPenalty();
      }
    }


    // check if the burrow that the user is hitting  the corresponding key. and call on burrow handler to determine whether to penalize or to reward.

    if (isGamePaused === false) {
      if (Phaser.Input.Keyboard.JustDown(gameStateVariables.bkey)) {
        onBurrowHit('b');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.ekey)) {

        onBurrowHit('e');
      } else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.dkey)) {
        onBurrowHit('d');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.gkey)) {
        onBurrowHit('g');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.ikey)) {
        onBurrowHit('i');
      } else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.fkey)) {
        onBurrowHit('f');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.skey)) {
        onBurrowHit('s');
      } else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.tkey)) {
        onBurrowHit('t');
      } else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.wkey)) {
        onBurrowHit('w');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.nkey)) {
        onBurrowHit('n');
      } else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.okey)) {
        onBurrowHit('o');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameStateVariables.pkey)) {
        onBurrowHit('p');
      }
    }


    // pause scene using space bar
    if (Phaser.Input.Keyboard.JustDown(gameStateVariables.spaceKey)) {
      this.togglePause("GAME PAUSED");
    }
  }

  togglePause(text) {
    if (isGamePaused === true) {
      isGamePaused = false;
      this.removePauseScreen();
    } else {
      isGamePaused = true;
      this.displayPauseScreen(text);
    }
  };


  // custom methods

  // add playgroundd to the scene and start at 0,0 cordinates;
  initializeBackground() {
    const playgroundd = this.add.image(0, 0, 'playgroundd');
    playgroundd
      .setScale(0.5)
      .setOrigin(0, 0);


    // create a Score box and timer
    const ScoreBox = this.add.rectangle(90, 70, 150, 90, 0xFFFFFF);
    ScoreBox.alpha = 0.5;

  }

  // display users Score  on the screen
  initializeScoreText() {
    gameStateVariables.ScoreText = this.add.text(50, 50, `Score:${Score}`)
      .setColor('#000000').setFontSize(20);
    // show game level 
    gameState.level = this.add.text(200, 50, `Level 2`).setColor('#ffffff').setFontSize(25);
  }
  showInstructions() {
    gameStateVariables.instructions = this.add.text(350, 50, "help❓").setColor('#fff').setFontSize(25);
    gameStateVariables.instructions.setInteractive();
    gameStateVariables.instructions.on("pointerup", () => {
      this.togglePause("GAME INSTRUCTIONS");
    })

  }

  // loop through the burrow and set up event listeners on the corresponding skin
  initializeBurrowKeys() {
    gameStateVariables.bkey = this.input.keyboard.addKey('b');
    gameStateVariables.dkey = this.input.keyboard.addKey('d');
    gameStateVariables.ekey = this.input.keyboard.addKey('e');
    gameStateVariables.fkey = this.input.keyboard.addKey('f');
    gameStateVariables.gkey = this.input.keyboard.addKey('g');
    gameStateVariables.ikey = this.input.keyboard.addKey('i');
    gameStateVariables.nkey = this.input.keyboard.addKey('n');
    gameStateVariables.okey = this.input.keyboard.addKey('o');
    gameStateVariables.pkey = this.input.keyboard.addKey('p');
    gameStateVariables.skey = this.input.keyboard.addKey('s');
    gameStateVariables.tkey = this.input.keyboard.addKey('t');
    gameStateVariables.wkey = this.input.keyboard.addKey('w');
    gameStateVariables.spaceKey = this.input.keyboard.addKey('space')


    // set up text to identify which key belongs to which burrow;
    this.burrowLocations.forEach(burrow => (
      this.add.text(burrow.x - 10, burrow.y + 70, burrow.key.toUpperCase(), {
        fontSize: 32,
        color: '#fff'
      })
    ))
  }


  // create mole from the sprite sheet that was loaded.

  initializeMole() {
    gameStateVariables.mole = this.physics.add.sprite(0, 0, 'mole');
    gameStateVariables.mole.setScale(0.5, 0.5);


    // set moles location in thee burrow
    this.updateBurrow();



    // after mole appears ,run idle animation
    gameStateVariables.mole.on('animationcomplete-appear', () => {
      gameStateVariables.mole.anims.play('idle')
    })

    // after the mole is hidden , immeaditely relocate to another burrow
    gameStateVariables.mole.on('animationcomplete-disappear', () => {
      this.updateBurrow();
    })
  }


  // creates all the animations that will run after an action is perfomed

  initializeAnimations() {
    // create the appear animation from mole spritesheet
    this.anims.create({
      key: 'appear',
      frames: this.anims.generateFrameNumbers('mole', {
        start: 0,
        end: 2
      }),
      frameRate: 10
    })

    // create the idle animation from mole spritesheet that will repeat indefinately
    this.anims.create({
      key: 'idle',
      frames: this.anims.generateFrameNumbers('mole', {
        frames: [
          1, 3, 1, 1, 4]
      }),
      frameRate: 3,
      repeat: -1,
    });

    // create the disappear animation from mole spritesheet

    this.anims.create({
      key: 'disappear',
      frames: this.anims.generateFrameNumbers('mole', {
        frames: [5, 6, 6, 5, 2, 1, 0]
      }),
      frameRate: 15,
    })
  }


  // display remaining  time on the screen  and run update after every second

  initializeTimer(timerCallback) {
    gameStateVariables.timerText = this.add.text(50, 75, `Time :${time}`)
      .setColor('#000000').setFontSize(20);

    this.time.addEvent({
      delay: 1000, //update time after every 1000,
      callback: timerCallback,
      args: [1],
      callbackScope: this,
      loop: true,
    })
  }


  // fetch a random burrow from a list of burrows;
  getRandomBurrow() {
    return Phaser.Utils.Array.GetRandom(this.burrowLocations);
  }

  // select a burrow and move a move to it
  updateBurrow() {
    // select a random burrow from a list of burrows
    const burrowLocation = this.getRandomBurrow();

    // update the current burrow key to the new burrows key
    currentBurrowKeyy = burrowLocation.key;

    // set the moles position to the new borrow`s (x,y) coordinates
    gameStateVariables.mole.setPosition(burrowLocation.x, burrowLocation.y);

    // play animation to make  a mole appear 
    gameStateVariables.mole.anims.play('appear');
  }

  // play the disppear animation   to indicate it was hit and after animation is complete,mole will move to a new burrow
  relocateMole() {
    gameStateVariables.mole.anims.play('disappear');
  }

  // update the Score text on  the screen to reflect the changed amount
  updateTimerText() {
    gameStateVariables.timerText.setText(`Time: ${time}`);
  }

  // update the Score text on the screen to reflect the changed amount
  updateScoreText() {
    gameStateVariables.ScoreText.setText(`Score:${Score}`);
  }

  // display  the number of points the user gained
  displayRewardText() {
    // add text to display Score reward
    const rewardText = this.add.text(160, 50, '+5')
      .setColor("#228B22").setFontSize(30);
    this.time.addEvent({
      delay: 300,  // call after 300ms
      callback: () => {
        rewardText.destroy();
      },
      args: [rewardText], //text to remove
      repeat: -1
    })
  }

  // display the number of points the user lost
  displayPenaltyText() {
    // add text to display Score penalty
    const penaltyText = this.add.text(160, 50, '-5')
      .setColor('#991A00').setFontSize(30);
    this.time.addEvent({
      delay: 300, //call after 300
      callback: () => { penaltyText.destroy(); },
      args: [penaltyText],//text to remove
      repeat: -1
    })
  }


  displayPauseScreen(text) {
    gameStateVariables.pauseOverlay = this.add.rectangle(0, 0, 480, 640, 0xFFFFFF);
    gameStateVariables.pauseOverlay.alpha = 0.75;
    gameStateVariables.pauseOverlay.setOrigin(0, 0);

    gameStateVariables.pauseText = this.add.text(195, 325, `${text}`).setColor('#000000');
    gameStateVariables.resumeText = this.add.text(125, 375, `
    The GAME HAS BEEN 
          PAUSED\n
    ***INSTRUCTIONS***\n
  Hit the keyboard key \n
where you see a mole appear.\n 
press SPACEBAR to resume game
    `).setColor('#000000');
  }

  // remove pause gamescreen wnen the game is unpaused
  removePauseScreen() {
    gameStateVariables.pauseOverlay.destroy();
    gameStateVariables.pauseText.destroy();
    gameStateVariables.resumeText.destroy();
  }

}


