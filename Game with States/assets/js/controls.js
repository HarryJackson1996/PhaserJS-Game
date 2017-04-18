
var cursors;

var bullet;
var bullets;
var bulletTime = 0;

var Controls = {

    preload : function () {
        // Load all the needed resources for the menu.
        game.load.image('background', './assets/images/space2.png');
        
        game.load.image('ground', './assets/images/platform1.png');
        
        game.load.image('bullet', './assets/images/star.png');
        
        game.load.image('up', './assets/images/up.png');
        game.load.image('W', './assets/images/W.png');
        
        game.load.image('none', './assets/images/none.png');
        
        game.load.image('spacebar', './assets/images/Spacebar.png');
        
        game.load.image('left', './assets/images/left.png');
         game.load.image('A', './assets/images/A.png');
        
        game.load.image('right', './assets/images/right.png');
        game.load.image('D', './assets/images/D.png');
        
        game.load.spritesheet('dude', './assets/images/dude2.0.png', 32, 48);
        
         game.load.spritesheet('home', './assets/images/buttons-moon.png', 221, 70);
    },

    create: function () {
        game.physics.startSystem(Phaser.Physics.ARCADE);
        background = game.add.tileSprite(0, 0, 800, 600, 'background');
          
        var home = game.add.button(450, 400,  'home', this.startGame, this, 1, 0, 1);  
        home.anchor.set(0.5, 0.5);
        
        none = game.add.sprite(60,25,'none');
        right = game.add.sprite(60,145,'right');
        left = game.add.sprite(60,265,'left');
        up = game.add.sprite(60,380,'up');
        D = game.add.sprite(140,145,'D');
        A = game.add.sprite(140,265,'A');
        W = game.add.sprite(140,380,'W');
        space = game.add.sprite(300,25,'spacebar');
        
        platforms = game.add.group();
        platforms.enableBody = true;
        
        //first ground platforms
        ground = platforms.create(0, 435, 'ground');
        ground.scale.setTo(0.5, 1);
        ground.body.immovable = true;        
        
        
        dude = game.add.sprite(20, 20, 'dude');
    
        
        dude2 = game.add.sprite(20, 140, 'dude');
        dude2.animations.add('left', [0, 1, 2, 3], 10, true);
        dude2.animations.add('right', [5, 6, 7, 8], 10, true);
        
        dude3 = game.add.sprite(20, 260, 'dude');
        dude3.animations.add('left', [0, 1, 2, 3], 10, true);
        dude3.animations.add('right', [5, 6, 7, 8], 10, true);
        
        dude4 = game.add.sprite(20, 380, 'dude');
        game.physics.arcade.enable(dude4);
        dude4.body.gravity.y = 150;
            
        dude5 = game.add.sprite(355, 120, 'dude');
        dude5.anchor.set(0.5);
        game.physics.enable(dude5, Phaser.Physics.ARCADE);
 
         
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;

    //  All 40 of them
        bullets.createMultiple(30, 'bullet');
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 0.5);    
        
 

        
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
        
              
     cursors = game.input.keyboard.createCursorKeys();
    game.input.keyboard.addKeyCapture([ Phaser.Keyboard.SPACEBAR ]);
    },

    update: function () {
        game.physics.arcade.overlap(dude4, platforms, collisionHandler, null, this);
        dude.frame = 4;
        dude2.animations.play('right');
        dude3.animations.play('left');
        dude4.frame = 4;
        dude5.frame = 5;
        
        function collisionHandler (dude4, platforms) {
            dude4.body.velocity.y = -100;  
    }
        
        if (game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
    {
         fireBullet();
        
    }
        
        
    
        function fireBullet () {

    if (game.time.now > bulletTime)
    {
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            bullet.reset(dude5.body.x + 42, dude5.body.y + 26);
            bullet.lifespan = 2000;
        
            if(dude5.body.velocity.x==0){
            bullet.body.velocity.x = 300;
            bulletTime = game.time.now + 50;
        }
      
    }

}
        }
    
        
},
    
    startGame: function () {
    
        this.game.state.start('Menu');
    
    },
       

 

        


};