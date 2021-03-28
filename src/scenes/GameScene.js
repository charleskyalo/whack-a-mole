import Phaser from 'phaser';

let timeLeft = 30;
// game score;
let score = 0;
// initial game state with  not paused state;
let isPaused = false;
// store the current burrow location of the mole;
let currentBurrowKey;

// global game variables

const gameState = {}


class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' })


    /* 
     list of all burrow locations
    
     each location contains a corresponding key on the keyboard.
    
     the x and y pixel cordinates on the screen.
      */

    this.burrowLocations = [{
      key: 'j',
      x: 100,
      y: 310,
    },
    {
      key: 'k',
      x: 240,
      y: 390,
    },
    {
      key: 'l',
      x: 380,
      y: 310,
    },

    {
      key: "m",
      x: 240,
      y: 230,
    },
    {
      key: "q",
      x: 90,
      y: 145,
    },
    {
      key: "r",
      x: 250,
      y: 145,
    },

    {
      key: "h",
      x: 400,
      y: 145,
    },
    {
      key: "a",
      x: 80,
      y: 230,
    },
    {
      key: "c",
      x: 400,
      y: 230,
    }
      , {
      key: "r",
      x: 240,
      y: 310,
    }
      , {
      key: "z",
      x: 390,
      y: 390,
    }
      ,
    {
      key: "v",
      x: 90,
      y: 420
    }
    ];

  }

  // import all of the visual assets need in the game;
  preload() {
    this.load.image('playground', '../../assets/whack-amole-rainbow.png');
    this.load.spritesheet('mole', '../../assets/mole-sprite-all.png', { frameWidth: 198, frameHeight: 250 });

  }



  create() {
    // update time
    const updateTimer = (timeElapsed) => {
      timeLeft -= timeElapsed;
    }

    // execute timer each second
    const onSecondLapsed = (timeElapsed) => {
      if (isPaused === false) {
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

    // initial score text;
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

    if (timeLeft <= 0) {
      // stop this scene and start the end scene ;
      /* add other levels later */
      this.scene.stop('GameScene');
      this.scene.start('EndScene');

    }
    // update users score
    const updateScore = (points) => {
      score += points;
    }


    // user hits the correct mole reward; +5 points 

    const applyHitReward = () => {
      // display how many points the user will gain 
      this.displayRewardText();
      // updateReward
      updateScore(5);
      // show the new score to the user
      this.updateScoreText();
    }


    // apply miss penalty us by taking users 5 points ;
    const applyMissPenalty = () => {
      // display how many points that the user will loose;
      this.displayPenaltyText();
      updateScore(-5);
      // display the new score to the user
      this.updateScoreText();
    }


    // when a user hits a burrow ;
    const onBurrowHit = (key) => {
      // check if the user has successfully hits the moles current mole
      if (key === currentBurrowKey) {
        applyHitReward();
        this.relocateMole();
      } else {
        applyMissPenalty();
      }
    }


    // check if the burrow that the user is hitting  the corresponding key. and call on burrow handler to determine whether to penalize or to reward.

    if (isPaused === false) {
      if (Phaser.Input.Keyboard.JustDown(gameState.jkey)) {
        onBurrowHit('j');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.kkey)) {

        onBurrowHit('k');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.lkey)) {
        onBurrowHit('l');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameState.qkey)) {
        onBurrowHit('q');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.rkey)) {
        onBurrowHit('r');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.hkey)) {
        onBurrowHit('h');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameState.akey)) {
        onBurrowHit('a');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.mkey)) {
        onBurrowHit('m');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.ckey)) {
        onBurrowHit('c');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.zkey)) {
        onBurrowHit('z');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.rkey)) {
        onBurrowHit('r');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.vkey)) {
        onBurrowHit('v');
      }
    }

    const togglePause = () => {
      if (isPaused === true) {
        isPaused = false;
        this.removePauseScreen();
      } else {
        isPaused = true;
        this.displayPauseScreen();
      }
    };

    // pause scene using space bar
    if (Phaser.Input.Keyboard.JustDown(gameState.spaceKey)) {
      togglePause();
    }
  }

  // custom methods

  // add playground to the scene and start at 0,0 cordinates;
  initializeBackground() {
    const playground = this.add.image(0, 0, 'playground');
    playground
      .setScale(0.5)
      .setOrigin(0, 0);


    // create a score box and timer
    const scoreBox = this.add.rectangle(90, 70, 140, 90, 0xFFFFFF);
    scoreBox.alpha = 0.5;

  }

  // display users score  on the screen
  initializeScoreText() {
    gameState.scoreText = this.add.text(50, 50, `Score: ${score}`)
      .setColor('#000000');
  }
  showInstructions() {
    gameState.instructions = this.add.text(50, 100, "Hit the keyboard key where you see a mole").setColor('#73280D');
  }

  // loop through the burrow and set up event listeners on the corresponding skin
  initializeBurrowKeys() {
    gameState.jkey = this.input.keyboard.addKey('j');
    gameState.kkey = this.input.keyboard.addKey('k');
    gameState.lkey = this.input.keyboard.addKey('l');
    gameState.qkey = this.input.keyboard.addKey('q');
    gameState.rkey = this.input.keyboard.addKey('r');
    gameState.hkey = this.input.keyboard.addKey('h');
    gameState.akey = this.input.keyboard.addKey('a');
    gameState.mkey = this.input.keyboard.addKey('m');
    gameState.ckey = this.input.keyboard.addKey('c');
    gameState.zkey = this.input.keyboard.addKey('z');
    gameState.rkey = this.input.keyboard.addKey('r');
    gameState.vkey = this.input.keyboard.addKey('v');
    gameState.spaceKey = this.input.keyboard.addKey('space')


    // set up text to identify which key belongs to which burrow;
    this.burrowLocations.forEach(burrow => (
      this.add.text(burrow.x - 10, burrow.y + 70, burrow.key.toUpperCase(), {
        fontSize: 32,
        color: '#553a1f'
      })
    ))
  }


  // create mole from the sprite sheet that was loaded.

  initializeMole() {
    gameState.mole = this.physics.add.sprite(0, 0, 'mole');
    gameState.mole.setScale(0.5, 0.5);


    // set moles location in thee burrow
    this.updateBurrow();



    // after mole appears ,run idle animation
    gameState.mole.on('animationcomplete-appear', () => {
      gameState.mole.anims.play('idle')
    })

    // after the mole is hidden , immeaditely relocate to another burrow
    gameState.mole.on('animationcomplete-disappear', () => {
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
    gameState.timerText = this.add.text(50, 75, `Time :${timeLeft}`)
      .setColor('#000000');

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
    currentBurrowKey = burrowLocation.key;

    // set the moles position to the new borrow`s (x,y) coordinates
    gameState.mole.setPosition(burrowLocation.x, burrowLocation.y);

    // play animation to make  a mole appear 
    gameState.mole.anims.play('appear');
  }

  // play the disppear animation   to indicate it was hit and after animation is complete,mole will move to a new burrow
  relocateMole() {
    gameState.mole.anims.play('disappear');
  }

  // update the score text on  the screen to reflect the changed amount
  updateTimerText() {
    gameState.timerText.setText(`Time: ${timeLeft}`);
  }

  // update the score text on the screen to reflect the changed amount
  updateScoreText() {
    gameState.scoreText.setText(`Score: ${score}`);
  }

  // display  the number of points the user gained
  displayRewardText() {
    // add text to display score reward
    const rewardText = this.add.text(160, 50, '+5')
      .setColor("#228B22");
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
    // add text to display score penalty
    const penaltyText = this.add.text(160, 50, '-5')
      .setColor('#991A00');
    this.time.addEvent({
      delay: 300, //call after 300
      callback: () => { penaltyText.destroy(); },
      args: [penaltyText],//text to remove
      repeat: -1
    })
  }


  displayPauseScreen() {
    gameState.pauseOverlay = this.add.rectangle(0, 0, 480, 640, 0xF2913D);
    gameState.pauseOverlay.aplha = 0.75;
    gameState.pauseOverlay.setOrigin(0, 0);
    gameState.pauseText = this.add.text(210, 325, ' GAME PAUSED').setColor('#000000');
    gameState.resumeText = this.add.text(125, 375, 'press space to resume game').setColor('#000000');
  }

  // remove pause gamescreen wnen the game is unpaused
  removePauseScreen() {
    gameState.pauseOverlay.destroy();
    gameState.pauseText.destroy();
    gameState.resumeText.destroy();
  }

}


export {
  GameScene,
  score
}