var Game_Over = {

    preload: function () {
        // Load the needed image for this game screen.
        game.load.spritesheet('play', './assets/images/buttons-moon.png', 221, 70);
        game.load.spritesheet('home', './assets/images/buttons-moon.png', 221, 70);
        game.load.image('background', './assets/images/space2.png');
        
    },

    create: function () {
        background = game.add.tileSprite(0, 0, 800, 600, 'background');

        var playAgain = game.add.button(300,200,  'play', this.startGame, this, 7, 6, 7);  
        playAgain.anchor.set(0.5, 0.5);
        
      
        
        
        var homeReturn = game.add.button(300, 100, 'home', this.returnHome, this, 1, 0, 1);
        homeReturn.anchor.set(0.5, 0.5);
 
        
    
        game.add.text(265, 350, "SCORE: "+ score.toString(), { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
   
        health = 100;
    },
        
    
    startGame: function () {
        this.game.state.start('Game');
        score = 0;
    },
    
    returnHome: function () {
        this.game.state.start('Menu');
    },
 
};