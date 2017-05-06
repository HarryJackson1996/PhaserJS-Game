
var cursors;

var Controls = {

    preload : function () {
        // Load all the needed resources for the menu.
        
        game.load.image('bullet', './assets/images/star.png');
        
        game.load.image('up', './assets/images/up.png');
        game.load.image('W', './assets/images/W.png');
        
        game.load.image('none', './assets/images/none.png');
        
        game.load.image('spacebar', './assets/images/Spacebar.png');
        
        game.load.image('left', './assets/images/left.png');
         game.load.image('A', './assets/images/A.png');
        
        game.load.image('right', './assets/images/right.png');
        game.load.image('D', './assets/images/D.png');        
        game.load.spritesheet('home', './assets/images/buttons-moon2.png', 274, 88);
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
          
        var home = game.add.button(425, 400,  'home', this.startGame, this, 7, 6, 7);  
        home.anchor.set(0.5, 0.5);
        
        none = game.add.sprite(60,25,'none');
        right = game.add.sprite(60,145,'right');
        left = game.add.sprite(60,265,'left');
        up = game.add.sprite(60,380,'up');
        D = game.add.sprite(140,145,'D');
        A = game.add.sprite(140,265,'A');
        W = game.add.sprite(140,380,'W');
        space = game.add.sprite(300,25,'spacebar');
        

        
        game.add.text(114, 40, "= STANDING STILL", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(200, 160, "= RIGHT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(200, 280, "= LEFT", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(200, 400, "= UP", { font: "bold 16px sans-serif", fill: "white", align: "center"});
       
        game.add.text(112, 160, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(112, 280, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(112, 400, "OR", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(400, 40, "= FIRE BULLET", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        game.add.text(400, 60, "(LEVEL 3", { font: "bold 16px sans-serif", fill: "red", align: "center"});
         game.add.text(480, 60, "- TRY IT OUT)", { font: "bold 16px sans-serif", fill: "white", align: "center"});
        
              
     
    },

    update: function () {
        
    
                
},
    
    startGame: function () {
    
        this.game.state.start('Menu');
    
    },
       

 

        


};