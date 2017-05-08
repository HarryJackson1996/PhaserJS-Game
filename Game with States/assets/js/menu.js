var Menu = {

    preload: function () {
        // Load the needed image for this game screen.
        game.load.spritesheet('play', './assets/images/buttons.png', 274, 87);
        game.load.spritesheet('rules', './assets/images/buttons.png', 274, 87);
        game.load.spritesheet('controls', './assets/images/buttons.png', 274, 87);
        game.load.image('background', './assets/images/background.png');
        
    },

    create: function () {
        background = game.add.tileSprite(0, 0, 850, 600, 'background');

        var play = game.add.button(425, 200,  'play', this.startGame, this, 1, 0, 1);  
        play.anchor.set(0.5, 0.5);
        
        var rules = game.add.button(425, 300, 'rules', this.startGame2, this, 5, 4, 5);
        rules.anchor.set(0.5, 0.5);
        
       var controls = game.add.button(425, 400, 'controls', this.startGame3, this, 3, 2, 3);
       controls.anchor.set(0.5, 0.5);

        
        
        
    },
        

    startGame: function () {
        score = 0;
        this.game.state.start('Game');
    
    },
    
     startGame2: function () {
    
        this.game.state.start('Controls');
    
    },
    
     startGame3: function () {
    
        this.game.state.start('Rules');
    
    },
 
};