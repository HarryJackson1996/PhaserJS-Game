var clickSound;

var Rules = {

    preload: function () {
  
        game.load.image('background', './assets/images/background-Rules.png');
        game.load.spritesheet('home', './assets/images/buttons.png', 274, 87);
        game.load.audio('click',['./assets/sounds/Click_Sound.mp3','./assets/sounds/Click_Sound.ogg']);
    },

    create: function () {

        //Add background image
        background = game.add.tileSprite(0, 0, 850, 600, 'background');
       
        //Add click Audio
        clickSound = game.add.audio('click');
        
        //Add home button
        var home = game.add.button(425, 400,  'home', this.startGame, this, 7, 6, 7);  
        home.anchor.set(0.5, 0.5); 
        
        //Add all text to explain rules
        game.add.text(100, 95, " 1) IF YOU COLLIDE WITH ANY ENEMIES THEN YOU DIE AND ITS GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 135, " 2) YOU CAN FIRE BULLETS TO A LOCATION BY CLICKING ON THE SCREEN!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 175, " 3) BULLETS KILL ENEMIES!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 215, " 4) KILLING ENEMIES WILL PROVIDE 10 SCRAPS (MONEY)!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 255, " 5) UPGRADES CAN BE PURCHASED FROM THE SHOP WITH SCRAPS!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 295, " 6) UPGRADES ARE CAPPED ONCE FULLY UPGRADED!",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 335, " 7) ENEMIES CONTINUOUSLY SPAWN!",{ font: "bold 16px sans-serif", fill: "white", align: "center"}); 

    
    },
        
    
   
    //Start the menu state
    //plays sound
    //Stop music to prevent overlapping music
    startGame: function () {
        clickSound.play();
        this.game.state.start('Menu');
          menuMusic.stop();
    },
 
};