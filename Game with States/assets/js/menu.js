var Menu = {

    preload: function () {
        // Load the needed image for this game screen.
        game.load.spritesheet('play', './assets/images/buttons-moon.png', 221, 70);
        game.load.spritesheet('controls', './assets/images/buttons-moon.png', 221, 70);
         game.load.spritesheet('rules', './assets/images/buttons-moon.png', 221, 70);
        game.load.image('background', './assets/images/space.png');
        
    },

    create: function () {
        background = game.add.tileSprite(0, 0, 800, 600, 'background');

        var play = game.add.button(450, 200,  'play', this.startGame, this, 5, 4, 5);  
        play.anchor.set(0.5, 0.5);
        
        var controls = game.add.button(450, 300, 'controls', this.startGame2, this, 3, 2, 3);
        controls.anchor.set(0.5, 0.5);
        
        var rules = game.add.button(450, 400, 'rules', this.startGame3, this, 11, 10, 11);
        rules.anchor.set(0.5, 0.5);

        
       
        game.add.text(0, 0, "LAST SCORE: "+ score.toString(), { font: "bold 16px sans-serif", fill: "#fff", align: "center"});
        
    },
        

    startGame: function () {
        score = 0;
        this.game.state.start('Game');
    
    },
    
     startGame2: function () {
    
        this.game.state.start('Controls');
    
    },
    
     startGame3: function () {
    
        this.game.state.start('Credits');
    
    },
 
};