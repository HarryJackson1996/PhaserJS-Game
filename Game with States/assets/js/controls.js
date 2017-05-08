
var cursors;

var Controls = {

    preload : function () {
        // Load all the needed resources for the menu.
        
        game.load.image('mouse', './assets/images/mouse2.png');
        
        game.load.image('up', './assets/images/up.png');
        game.load.image('W', './assets/images/W.png');
            
        game.load.image('left', './assets/images/left.png');
         game.load.image('A', './assets/images/A.png');
        
        game.load.image('right', './assets/images/right.png');
        game.load.image('D', './assets/images/D.png');    
        
         game.load.image('down', './assets/images/down.png');
        game.load.image('S', './assets/images/S.png'); 
        
        game.load.spritesheet('home', './assets/images/buttons.png', 274, 88);
        
        game.load.image('background', './assets/images/background-Controls.png');
        
        
    },

    create: function () {
       
        background = game.add.tileSprite(0, 0, 850, 600, 'background');
          
        var home = game.add.button(425, 400,  'home', this.startGame, this, 7, 6, 7);  
        home.anchor.set(0.5, 0.5);
        
        up = game.add.sprite(90,90,'up');
        down = game.add.sprite(90,150,'down');
        left = game.add.sprite(90,210,'left');
        right = game.add.sprite(90,270,'right');
    
        W = game.add.sprite(190, 90,'W');
        S = game.add.sprite(190, 150,'S');
        A = game.add.sprite(190,210,'A');
        D = game.add.sprite(190,270,'D');

        mouse = game.add.sprite(550, 80,'mouse');
        
        game.add.text(252, 105, "= MOVE UP", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(252, 165, "= MOVE DOWN", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(252, 225, "= MOVE LEFT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(252, 285, "= MOVE RIGHT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
        game.add.text(152, 105, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(152, 165, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(152, 225, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(152, 285, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(635, 105, "= FIRE BULLET", { font: "bold 16px sans-serif", fill: "white", align: "center"});
      
              
     
    },

    update: function () {
        
    
                
},
    
    startGame: function () {
    
        this.game.state.start('Menu');
       
    
    },
       

 

        


};
