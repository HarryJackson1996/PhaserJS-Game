var clickSound;

var Game_Over = {

    preload: function () {
        // Load the needed image for this game screen.
        game.load.spritesheet('play', './assets/images/buttons.png', 274, 87);
        game.load.spritesheet('home', './assets/images/buttons.png', 274, 87);
        game.load.image('background', './assets/images/background-GameOver.png'); 
        game.load.audio('click',['./assets/sounds/Click_Sound.mp3','./assets/sounds/Click_Sound.ogg']);
    },

    create: function () {
        
        //initialise audio
        clickSound = game.add.audio('click');
        
        //Set background image
        background = game.add.tileSprite(0, 0, 850, 600, 'background');
        
        
        //Add two buttons
        var playAgain = game.add.button(425, 300,  'play', this.startGame, this, 9, 8, 9);  
        playAgain.anchor.set(0.5, 0.5);
        var homeReturn = game.add.button(425, 400, 'home', this.returnHome, this, 7, 6, 7);
        homeReturn.anchor.set(0.5, 0.5);
    
        //Add highscore text
        game.add.text(400, 220, "SCORE: "+ score.toString(), { font: "bold 16px Agency FB", fill: "#000000", align: "center"});
   
        
        //Reset all global variables
        score = 0;
        waves = 0;
        bulletSpeed = 0;
        scoreMultiplier = 10;
        speed = 100;
        money = 0;
        life = 1;
        xValue = 0;

    },
        
    //Start the game state
    //plays sound
    startGame: function () {
        clickSound.play();
        this.game.state.start('Game');
    },
    
    //start the menu state (return home)
    //plays sound
    returnHome: function () {
        clickSound.play();
        this.game.state.start('Menu');
    },
 
};