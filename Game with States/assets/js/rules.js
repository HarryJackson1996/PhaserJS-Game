var Rules = {

    preload: function () {
  
        game.load.image('background', './assets/images/background-Rules.png');
        game.load.spritesheet('home', './assets/images/buttons.png', 274, 87);
    },

    create: function () {

        background = game.add.tileSprite(0, 0, 850, 600, 'background');
          
        var home = game.add.button(425, 400,  'home', this.startGame, this, 7, 6, 7);  
        home.anchor.set(0.5, 0.5); 
            
        game.add.text(100, 105, " HEALTH = 100: YOU LOSE HEALTH WHEN ENEMIES HIT YOU, THE AMOUNT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 125, " OF HEALTH LOST IS DEPENDENT ON HOW LONG THE CONTACT LASTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 155, " 1) IF YOUR HEALTH = 0: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 185, " 2) IF YOU FALL IN LAVA: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 225, " 3) IF YOU DIE ON LEVEL1 YOU MUST RESTART THE LEVEL!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 265, " 4) IF YOU DIE ON LEVEL2 YOU LOSE 100 POINTS AND RESTART LEVEL2!",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(100, 305, " 5) IF YOU DIE ON LEVEL3 YOU LOSE 100 POINTS AND RESTART LEVEL3!",{ font: "bold 16px sans-serif", fill: "white", align: "center"}); 

    
    },
        
    
   
    
    startGame: function () {
        this.game.state.start('Menu');
    },
 
};