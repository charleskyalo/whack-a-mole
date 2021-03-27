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









}




export default GameScene;