var gem;
var stars;

var Credits = {

    preload: function () {
  
game.load.image('background', './assets/images/space2.png');
 game.load.spritesheet('home', './assets/images/buttons-moon.png', 221, 70);
 game.load.image('gem', './assets/images/diamond.png');
 game.load.image('star', './assets/images/star.png');
    },

    create: function () {

    game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
          
        var home = game.add.button(450, 400,  'home', this.startGame, this, 1, 0, 1);  
        home.anchor.set(0.5, 0.5); 
  
 
        gems = game.add.group();
        gems.enableBody = true;
        var gem = gems.create(10, 10, 'gem');
        
        stars = game.add.group();
        stars.enableBody = true;
        var star = stars.create(15, 60, 'star');
        
        game.add.text(60, 15, "DIAMOND = +50 POINTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
        game.add.text(60, 65, "STAR = +10 POINTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
        game.add.text(0, 105, " HEALTH = 100: YOU LOSE HEALTH WHEN ENEMIES HIT YOU, THE AMOUNT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 125, " OF HEALTH LOST IS DEPENDENT ON HOW LONG THE CONTACT LASTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 155, " 1) IF YOUR HEALTH = 0: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 185, " 2) IF YOU FALL IN LAVA: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 225, " 3) IF YOU DIE ON LEVEL1 YOU MUST RESTART THE LEVEL!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 265, " 4) IF YOU DIE ON LEVEL2 YOU LOSE 100 POINTS AND RESTART LEVEL2!",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 305, " 5) IF YOU DIE ON LEVEL3 YOU LOSE 100 POINTS AND RESTART LEVEL3!",{ font: "bold 16px sans-serif", fill: "white", align: "center"}); 
        game.add.text(0, 345, " 6) AFTER COMPLETING EACH LEVEL, YOUR REMAINING HEALTH IS ADDED ",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 365, " TO YOUR SCORE!",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
    
    },
        
    
   
    
    startGame: function () {
        this.game.state.start('Menu');
    },
 
};