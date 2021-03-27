import Phaser from 'phaser';




let timeLeft = 10;
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

      /*
      this.scene.stop('GameScene');
      this.Scene.start('EndScene');
      */

      // update users score
      const updateScore = (points) => {
        score += points;
      }
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
      this.updatedScoreText();
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
      else if (Phaser.Input.Keyboard.JustDown(gameState.kKey)) {

        onBurrowHit('k');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.lKey)) {
        onBurrowHit('l');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameState.qKey)) {
        onBurrowHit('q');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.rKey)) {
        onBurrowHit('r');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.hKey)) {
        onBurrowHit('h');
      }

      else if (Phaser.Input.Keyboard.JustDown(gameState.aKey)) {
        onBurrowHit('a');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.mKey)) {
        onBurrowHit('m');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.cKey)) {
        onBurrowHit('c');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.zKey)) {
        onBurrowHit('z');
      } else if (Phaser.Input.Keyboard.JustDown(gameState.rKey)) {
        onBurrowHit('r');
      }
      else if (Phaser.Input.Keyboard.JustDown(gameState.vKey)) {
        // 	// USER ACTIVITY: Call the key handler
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
    gameState.scoreText = this.add.text(50, 50, `Score: ${score}`);
    setColor('#000000');
  }

  // loop through the burrow and set up event listeners on the corresponding skin
  initializeBurrowKeys() {
    gameState.jkey = this.input.keyboard.addKey('j');
    gameState.kkey = this.input.keyboard.addKey('k');
    gameState.lkey = this.input.keyboard.addKey('l');
    gameState.qkey = this.input.keyboard.addKey('q');
    gameState.rkey = this.input.keyboard.addKey('r');
    gameState.hKey = this.input.keyboard.addKey('h');
    gameState.aKey = this.input.keyboard.addKey('a');
    gameState.mKey = this.input.keyboard.addKey('m');
    gameState.cKey = this.input.keyboard.addKey('c');
    gameState.zkey = this.input.keyboard.addKey('z');
    gameState.rKey = this.input.keyboard.addKey('r');
    gameState.vKey = this.input.keyboard.addKey('v');
    gameState.spaceKey = this.input.keyboard.addKey('space')


    // set up text to identify which key belongs to which burrow;
    this.burrowLocations.forEach(burrow => (
      this.add.text(burrow.x - 10, burrow.y + 70, burrow.key.toUpperCase(), {
        fontSize: 32,
        color: '#553a1f'
      })
    ))
  }















}




export default GameScene;