var gem;
var stars;
var clickSound;
var Credits = {

    preload: function () {
  
 game.load.image('background', './assets/images/background.png');
 game.load.spritesheet('home', './assets/images/buttons-moon2.png', 274, 87);
game.load.audio('click',['./assets/sounds/Click_Sound.mp3','./assets/sounds/Click_Sound.ogg']);
    },
    

    create: function () {

    
        clickSound = game.add.audio('click');
        
        var home = game.add.button(425, 400,  'home', this.startGame, this, 7, 6, 7);  
        home.anchor.set(0.5, 0.5); 
        
        game.add.text(60, 15, "DIAMOND = +50 POINTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
        game.add.text(60, 65, "STAR = +10 POINTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
        game.add.text(0, 105, " HEALTH = 100: YOU LOSE HEALTH WHEN ENEMIES HIT YOU, THE AMOUNT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 125, " OF HEALTH LOST IS DEPENDENT ON HOW LONG THE CONTACT LASTS", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 155, " 1) IF YOUR HEALTH = 0: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 185, " 2) IF YOU FALL IN LAVA: GAME OVER!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 225, " 3) IF YOU DIE ON LEVEL1 YOU MUST RESTART THE LEVEL!", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 265, " 4) IF YOU DIE ON LEVEL2 YOU LOSE 100 POINTS AND RESTART LEVEL2!",{ font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(0, 305, " 5) IF YOU DIE ON LEVEL3 YOU LOSE 100 POINTS AND RESTART LEVEL3!",{ font: "bold 16px sans-serif", fill: "white", align: "center"}); 

    
    },
        
    
   
    
    startGame: function () {
         clickSound.play();
        this.game.state.start('Menu');
    },
 
};