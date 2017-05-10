//Declare variables
var highscoreText;
var highscore = 0;
var waves = 0;
var wavestext;
var clickSound;
var menuMusic;

var Menu = {

    preload: function () {
        // Load the needed image for this game screen.
        // Load the spritesheets
        // Load the audio
        game.load.spritesheet('play', './assets/images/buttons.png', 274, 87);
        game.load.spritesheet('rules', './assets/images/buttons.png', 274, 87);
        game.load.spritesheet('controls', './assets/images/buttons.png', 274, 87);
        game.load.image('background', './assets/images/background.png');
         game.load.audio('click',['./assets/sounds/Click_Sound.mp3','./assets/sounds/Click_Sound.ogg']);
        game.load.audio('menuMusic',['./assets/sounds/menu_music.mp3','./assets/sounds/menu_music.ogg']);
    },

    
    create: function () {
        
        //Add music for main menu
        //loop music
        menuMusic = game.add.audio('menuMusic');
        menuMusic.loopFull(0.6);

        //Add audio 
        clickSound = game.add.audio('click');
        
        //Add background image
        background = game.add.tileSprite(0, 0, 850, 600, 'background');
                
        //Create play button
        var play = game.add.button(425, 200,  'play', this.startGame, this, 1, 0, 1);  
        play.anchor.set(0.5, 0.5);
        
        //Create rules button
        var rules = game.add.button(425, 300, 'rules', this.startGame2, this, 5, 4, 5);
        rules.anchor.set(0.5, 0.5);
        
        //Create controls button
        var controls = game.add.button(425, 400, 'controls', this.startGame3, this, 3, 2, 3);
        controls.anchor.set(0.5, 0.5);
        
        
        //Print highscore to main menu
        highscoreText = game.add.text(650, 445, 'Highscore: '+highscore, {font: '25px Agency FB', fill: '#fff'});
        
        //Print max wave achieved to main menu
        highwaveText = game.add.text(655, 485, 'Max wave: '+newWave, {font: '25px Agency FB', fill: '#fff'});
        
    },
        
    //Start the game state
    //plays sound
    //set score = 0
    //Stop music
    startGame: function () {
        score = 0;
        clickSound.play();
        this.game.state.start('Game');
        menuMusic.stop();
    
    },
    
     //Start the control state
     //plays sound
     startGame2: function () {
        clickSound.play();
        this.game.state.start('Controls');
    },
     
     //Start the rule state
     //plays sound
     startGame3: function () {
        clickSound.play();
        this.game.state.start('Rules');
        
    
    },
 
};