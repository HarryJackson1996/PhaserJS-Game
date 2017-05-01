//Initialisation of our global variables

var isoGroup;
var cursorPos; 
var cursor;
var player;
var bullets;
var turret;
var fireRate = 100;
var nextFire = 0;
var speed = 100;
var highscore = 0;
var score;
var scoreText;
var highscoreText;
var j;
var waves = 1;
var wavestext;
var bullet;
var damage = 10;
var w = 850, h = 600;
var Game = {
    

//The preload function: loading all our images and sprites prior to use
    preload : function () {
    
    game.load.image('tile', './assets/images/tile4.png');
    game.load.image('tile2', './assets/images/tile3.png');
    game.load.image('tile1', './assets/images/ground_tile.png');
    game.time.advancedTiming = true;
    game.load.image('turret', './assets/images/turret1.png');
    game.load.image('enemy', './assets/images/cubeface.png');
    game.load.image('menu', './assets/images/menu.png');
    game.load.image('bullet1', './assets/images/ball1.png');
    game.load.image('bullet2', './assets/images/ball2.png');
    game.load.image('bullet3', './assets/images/ball3.png');
    game.load.image('bullet4', './assets/images/ball4.png');
    game.load.image('bullet5', './assets/images/ball5.png');
    game.load.image('bullet6', './assets/images/ball6.png');
     game.load.image('ball', './assets/images/star.png');
    },

    
//the Create function: In this function we are creating our assets by calling the sprites from the preload function
    create : function () {
    
        //Start the different physics systems, arcade and isoarcade
        //load the isometric plugin
        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.physics.startSystem(Phaser.Physics.ARCADE); 
        game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
    
        //create a isoGroup and isoGroup1
        //we use this to handle collisions later on between isometric objects within this group
        //set the anchor point (where the map is drawn)
        isoGroup = game.add.group();
        isoGroup1 = game.add.group();

        game.iso.anchor.setTo(0.5,0.15);
    
        
        // Call the spawnTiles function in order to make our tiles.
        // Let's make a load of tiles on a grid.
        this.spawnTiles();
        
        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3(); 
        
        // Create a custom timer
        timer = game.time.create();
        
        // Create a delayed event 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 30, this.resetTime, this);
        
        // Start the timer
        timer.start();
        
        j = 3;
        
        //Reset the score from the previous game back to 0;
        score = 0;
        
        //Set score text to screen, to be updated.
        highscoreText = game.add.text(710, 500, 'High Score: '+highscore, {font: '32px', fill: '#fff'});
        scoreText = game.add.text(710, 450, 'Score: 0', { font: '32px', fill: '#fff' });
        
        //add waves text
        wavestext = game.add.text(710, 550, 'Wave: ' + waves, {font: '32px', fill: '#fff'});
        
        game.world.bounds.setTo(100, 100, 800, 800);      
        // We are creating a player - this is an isometric sprite
        // It is the base of our turret
        // We set its anchor point
        // enable isoArcade physics on the player
        // stop it from leaving the world bounds
        // Dont allow player rotation
        player = game.add.isoSprite(168, 168, 0, 'tile2', 0, isoGroup);
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true
        game.physics.enable(player, Phaser.Physics.ARCADE);
        player.body.allowRotation = false;
    
        
        // We are creating a turret - this is an isometric sprite
        // It the turret piece on top of the player
        // We set its anchor point
        // enable isoArcade physics on the player
        // stop it from leaving the world bounds       
        turret = game.add.isoSprite(168, 168, 29, 'turret', 0,  isoGroup);
        turret.tint = 0x86bfda;
        turret.anchor.set(0.5);
        game.physics.isoArcade.enable(turret);
        turret.body.collideWorldBounds = true
        game.physics.enable(turret, Phaser.Physics.ARCADE);
        
        
        
        // Creating the bullet game group
        // Enable body = allow collisions
        // set physics type
        // kill bullet if it goes out of world bounds.
        // Create multiple bullets (50)
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(2, 'bullet1', 0, false);
        bullets.setAll('anchor.x', 0.1);
        bullets.setAll('anchor.y', 1.8);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        heart = game.add.group();
        heart = game.add.sprite(-10, -20, 'bullet1');
        game.physics.arcade.enable(heart);

    
        // This is where the floating balls the follow you are created
        // Enable body for collision handling
        // We are currently creating 5 bullets randomly on the map
        balls = game.add.group();
        balls.enableBody = true;

        for (var i = 0; i < 3; i++)
        {
        var ball = balls.create(game.world.randomX, game.world.randomY, 'ball');
        enemyHealth = 50;
        }  
    
        
        
        // This is where the blue face enemies are created
        // We are creating 4 for the time being
        for (var xx = 256; xx > 0; xx -= 256) {
            for (var yy = 256; yy > 0; yy -= 256) {
                
                // Create a cube using the new game.add.isoSprite factory method at the specified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
                enemys = game.add.isoSprite(xx, yy, 0, 'enemy', 20, isoGroup);
                enemys.anchor.set(0.5);

                // Enable the physics body on this cube.
                game.physics.isoArcade.enable(enemys);
                enemys.enableBody = true;
                
                // Collide with the world bounds so it doesn't go falling forever or fly off the screen!
                enemys.body.collideWorldBounds = true;
                game.physics.arcade.enable(enemys);
                
         
                // Add some X and Y drag to make cubes slow down after being pushed.
                enemys.body.drag.set(100, 100, 0);
            }
        }
    
        
        
        
        // This is where we add cursors to our game allowing movement
        // Added up, down, left, right and spacebar functionality 
        // 
        this.cursors = game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([
            
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR    
        ]);



    
        
        // Creating the pause button prototype
        pause_label = game.add.text(w - 100, 20, 'Pause', { font: '24px Arial', fill: '#fff' });
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function () {
        
        // When the pause button is pressed, we pause the game
        game.paused = true;

    
        // Then add the menu at point (425,300 = middle of screen)
        // Set its anchor point
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);

       
        // And a label to illustrate which menu item was chosen. (This is not necessary)
        // good indicator as of now to see what box has been clicked 
        // this will later on become the shop
        choiseLabel = game.add.text(w/2, h-50, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
        
    });   
        
        //Unpauses the game
        game.input.onDown.add(unpause, self);
        
        
    },
    


    // The update function updates our game as it is played
    update: function() {
        
        // This deals with the collision between the bullets and ball enemies
        // We call the killplayer function which will handle the collision
        game.physics.arcade.overlap(bullets,balls, destroyBalls, null, this);   
        game.physics.arcade.overlap(heart,balls, killplayer, null, this); 
        
        // Hover effect
        game.iso.unproject(game.input.activePointer.position, cursorPos);

        // Loop through all tiles and test to see if the 3D position from above intersects with the automatically generated IsoSprite tile bounds.
        isoGroup.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0xFF0000;
            }
            
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
               
                //tint colour red
            }
        });
        
        // Second isoGroup - doesnt do anything as of now
        isoGroup1.forEach(function (tile) {
            
        });
        
        
        // Deals with the collision between both items in the IsoGroup (player, blueCubes)
        game.physics.isoArcade.collide(isoGroup);
        game.iso.topologicalSort(isoGroup);
        // Deals with the collision between both items in the IsoGroup1 (nothing)
        game.physics.isoArcade.collide(isoGroup1);
        game.iso.topologicalSort(isoGroup1);
        
        
    
         // Movement changed for x, y (non iso movement)
         // Up, Down, Left, right movement
        if (this.cursors.up.isDown) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = -speed;
            turret.body.velocity.x = -speed;
            turret.body.velocity.y = -speed;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.x = speed;
            player.body.velocity.y = speed;
            turret.body.velocity.x = speed;
            turret.body.velocity.y = speed;
        }
        else if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = speed;
            turret.body.velocity.x = -speed;
            turret.body.velocity.y = speed;
        }
       else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
            player.body.velocity.y = -speed;
            turret.body.velocity.x = speed;
            turret.body.velocity.y = -speed;
        }
        else {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
            turret.body.velocity.x = 0;
            turret.body.velocity.y = 0;
        }
      
       
        
    //Rotates our turret toward the mouse
    turret.rotation = game.physics.arcade.angleToPointer(turret);
        
    //This deals with the balls and hows they move towards the player
    balls.forEach( function(balls) {
        this.accelerateToObject(balls, player, 500, 250, 250);
    }, game.physics.arcade);
    
        
    // This is how the bullets are fired, calls the fire function that handles it
    if (game.input.activePointer.isDown)
    {
        fire();
    }
        
    // The function that deals with the collision of the blue balls and bullets
     function destroyBalls(bullets, balls) {     
            bullets.kill();
            enemyHealth = enemyHealth - damage;
            console.log(enemyHealth);
            if(enemyHealth <= 0){
            balls.kill();
            score += 10;
            scoreText.text = 'Score: ' + score;
            }
        }
      
  player.addChild(heart);
 
      function killplayer(heart, balls) {   
        console.log("collide");
        balls.kill();
        player.kill();
          
        }
    },

    
    // Function used for drawing the base tilemap
  spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 408; xx += 38) {
            for (var yy = 0; yy < 408; yy += 38) {
                // Create a tile using the new game.add.isoSprite factory method at the sspecified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
             
                if( xx == 0 || yy == 0){
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0);
            
            }
                else{
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0); 
                
                    }
                }
            }
        },
    
     render: function () {
        // If our timer is running, show the time in a nicely formatted way, else show 'Done!'
        if (timer.running) {
            game.debug.text("Next wave spawins in: " + this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 450, 580, "#fff");
        }
        else {
            game.debug.text("Done!", 450, 580, "#0f0");
        }
    },
    
    resetTime: function() {
        timerEvent = timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 30, this.resetTime, this);
        
        waves++;
        wavestext.text = 'Wave: ' + waves;
        
        j = j+3;
        
        for (var i = 0; i < j; i++)
        {
        var ball = balls.create(game.world.randomX, game.world.randomY, 'ball');
        enemyHealth = 50;
        }
    },
    
    formatTime: function(s) {
        // Convert seconds (s) to a nicely formatted and padded time string
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    }
    

    };

    // Function for firing the bullet
    function fire() {

        if (game.time.now > nextFire && bullets.countDead() > 0)
            {
                nextFire = game.time.now + 100;

                bullet = bullets.getFirstDead();
                
                bullet.reset(player.x - 8, player.y - 8);

                game.physics.arcade.moveToPointer(bullet, 300);
            }

    }

    //Function to update highscore if needed
    function updatehighscore(){
        if(score > highscore){
            highscore = score;
            localStorage.highscore;
        }
    }

    //This is the pause function
    // Deals with everything to do with the pause menu (shop)
    function unpause(event){
        // Only act if paused
        if(game.paused){
            // Calculate the corners of the menu
            var x1 = w/2 - 540/2, x2 = w/2 + 540/2,
                y1 = h/2 - 360/2, y2 = h/2 + 360/2;
            
            
            
            // Check if the click was inside the menu
            if(event.x > x1 && event.x < x2 && event.y > y1 && event.y < y2 ){
                // The choicemap is an array that will help us see which item was clicked
                var choisemap = ['one', 'two', 'three', 'four', 'five', 'six'];

                // Get menu local coordinates for the click
                var x = event.x - x1,
                    y = event.y - y1;

                // Calculate the choice 
                var choise = Math.floor(x / 180) + 3*Math.floor(y / 180);
                // Display the choice
                choiseLabel.text = 'You chose menu item: ' + choisemap[choise];
                
                if(choisemap[choise] == 'one'){
                console.log("1");    
                game.input.onDown.add(changeWeapon1, this);
                damage = 20;
                }
                if(choisemap[choise] == 'two'){
                console.log("2");    
                game.input.onDown.add(changeWeapon2, this);
                damage = 30;
                }
                if(choisemap[choise] == 'three'){
                console.log("3");    
                game.input.onDown.add(changeWeapon3, this);
                damage = 40;
                }
                if(choisemap[choise] == 'four'){
                console.log("4");    
                game.input.onDown.add(changeWeapon4, this);
                damage = 50;
                }
                if(choisemap[choise] == 'five'){
                console.log("5");    
                game.input.onDown.add(changeWeapon5, this);
                damage = 60;
                }
                if(choisemap[choise] == 'six'){
                console.log("6");    
                game.input.onDown.add(changeWeapon6, this);
                damage = 100;
                }
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                choiseLabel.destroy();

                // Unpause the game
                game.paused = false;
            }
        }
    };


    //This is a weird function 
    // Basically you can change a sprite mid game using this function
    // As of now it changes the player sprite (base of turret)
    // this function is called in the above function 
    function changeWeapon1 () {    bullet.loadTexture("bullet2");    bullet.body.setSize(bullets.width, bullets.height);
    }

    function changeWeapon2 () {    bullet.loadTexture("bullet3");    bullet.body.setSize(bullets.width, bullets.height);
    }

    function changeWeapon3 () {    bullet.loadTexture("bullet4");    bullet.body.setSize(bullets.width, bullets.height);
    }

    function changeWeapon4 () {    bullet.loadTexture("bullet1");    bullet.body.setSize(bullets.width, bullets.height);
    }

    function changeWeapon5 () {    bullet.loadTexture("bullet5");    bullet.body.setSize(bullets.width, bullets.height);
    }

    function changeWeapon6 () {    bullet.loadTexture("bullet6");    bullet.body.setSize(bullets.width, bullets.height);
    }


