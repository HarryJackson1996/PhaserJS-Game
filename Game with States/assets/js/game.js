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
var score = 0;
var scoreText;
var highscoreText;
var j;
var waves = 0;
var wavestext;
var life = 1;
var infinity = 10;
var bullet;
var damage = 10;
var bulletSpeed = 0;
var w = 850, h = 600;
var money = 10000;
var scoreMultiplyer = 10;
var bulletSound;
var clearSound;
var clickSound;
var purchaseSound;
var music;
var Game = {
    

//The preload function: loading all our images and sprites prior to use
    preload : function () {
    
    game.load.image('tile', './assets/images/tile45.png');
    game.load.image('tile2', './assets/images/tile3.png');
    game.load.image('tile1', './assets/images/ground_tile.png');
    game.time.advancedTiming = true;
    game.load.image('turret', './assets/images/turret1.2.png');
    game.load.image('menu', './assets/images/menu.png');
    game.load.image('menu2', './assets/images/menu2.png');
    game.load.image('menu3', './assets/images/menu3.png');
    game.load.image('bullet1', './assets/images/ball1.5.png');
    game.load.image('bullet2', './assets/images/ball2.png');
    game.load.image('bullet3', './assets/images/ball3.png');
    game.load.image('bullet4', './assets/images/ball4.png');
    game.load.image('bullet5', './assets/images/ball5.png');
    game.load.image('bullet6', './assets/images/ball6.png');
     game.load.image('ball', './assets/images/star.png');
    game.load.spritesheet('Key', './assets/images/ball1.2.png', 23, 18);
    game.load.spritesheet('Flash', './assets/images/flash.png', 850, 600);
    game.load.audio('clear',['./assets/sounds/Explosion.mp3','./assets/sounds/Explosion.ogg']);
    game.load.audio('bullet',['./assets/sounds/Bullet.mp3','./assets/sounds/Bullet.ogg']);
    game.load.audio('music',['./assets/sounds/gme.mp3','./assets/sounds/gme.ogg']);
    game.load.audio('purchase',['./assets/sounds/Purchase Sound.mp3','./assets/sounds/Purchase_Sound.ogg']);
    game.load.audio('click',['./assets/sounds/Click Sound.mp3','./assets/sounds/Click_Sound.ogg']);
    },

    
//the Create function: In this function we are creating our assets by calling the sprites from the preload function
    create : function () {
        
        music= game.add.audio('music');
        clearSound = game.add.audio('clear');
        bulletSound = game.add.audio('bullet');
        purchaseSound = game.add.audio('purchase');
        clickSound = game.add.audio('click');
        
        music.loopFull(0.6);
    
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

        game.iso.anchor.setTo(0.53,0.15);
    
        
        // Call the spawnTiles function in order to make our tiles.
        // Let's make a load of tiles on a grid.
        this.spawnTiles();
        
        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3(); 
        
        // Create a custom timer
        timer = game.time.create();
        
        // Create a delayed event 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 5, this.resetTime, this);
        
        // Start the timer
        
        timer.start();
        
        j = 1;
        
        
        //Set score text to screen, to be updated.
        highscoreText = game.add.text(700, 560, 'High Score: '+highscore, {font: '25px Agency FB', fill: '#fff'});
        
        scoreText = game.add.text(10, 50, 'Score: 0', { font: '25px Agency FB', fill: '#33cc00' });
        
        //add waves text
        wavestext = game.add.text(10, 90, 'Wave: ' + waves, {font: '25px Agency FB', fill: '#b32d00'});
        
        moneyText = game.add.text(10, 10, 'Scraps: ' + money, {font: '25px Agency FB', fill: '#C0C0C0'});
        
        speedText = game.add.text(10, 480, 'Player-Speed: ' + speed, {font: '25px Agency FB', fill: '#3BE2F8'});
        
        bulletSpeedText = game.add.text(10, 520, 'Bullet-Speed: ' + bulletSpeed, {font: '25px Agency FB', fill: '#3BE2F8'});
        
        multiplyerText = game.add.text(10, 560, 'Score-Multiplyer: ' + scoreMultiplyer, {font: '25px Agency FB', fill: '#3BE2F8'});
        
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
        turret = game.add.isoSprite(169, 168, 29, 'turret', 0,  isoGroup);
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
        bullets.setAll('anchor.x', 0.09);
        bullets.setAll('anchor.y', 1.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
        
        heart = game.add.group();
        heart = game.add.sprite(-11, -21, 'Key');
        game.physics.arcade.enable(heart);
        heart.animations.add('walk');

        heart.animations.play('walk', 5, true);

    
        
        flash = game.add.group();
      
        
        // This is where the floating balls the follow you are created
        // Enable body for collision handling
        // We are currently creating 5 bullets randomly on the map
        balls = game.add.group();
        
        
        
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


        //WDA keyboard movement
        game.input.keyboard.addKey(Phaser.Keyboard.A)
        game.input.keyboard.addKey(Phaser.Keyboard.D)
        game.input.keyboard.addKey(Phaser.Keyboard.W)
        game.input.keyboard.addKey(Phaser.Keyboard.S)
        game.input.keyboard.addKey(Phaser.Keyboard.P)
        
        
        // Creating the pause button prototype
        pause_label = game.add.sprite(w - 170, 10, 'menu3');
        pause_label.inputEnabled = true;
        pause_label.events.onInputUp.add(function ()  {
        // When the pause button is pressed, we pause the game
        game.paused = true;
        clickSound.play();
        
    
        // Then add the menu at point (425,300 = middle of screen)
        // Set its anchor point
        menu = game.add.sprite(w/2, h/2, 'menu');
        menu.anchor.setTo(0.5, 0.5);
        menu2 = game.add.sprite(w/2, h-520, 'menu2');
        menu2.anchor.setTo(0.5, 0.5);

       
        // And a label to illustrate which menu item was chosen. (This is not necessary)
        // good indicator as of now to see what box has been clicked 
        // this will later on become the shop
        choiseLabel = game.add.text(425, 80, 'Click outside menu to continue', { font: '20px Arial', fill: '#fff' });
        choiseLabel.anchor.setTo(0.5, 0.5);
        
    });   
        
        //Unpauses the game
        game.input.onDown.add(unpause, self);
        clickSound.play();
        
        
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
        if (this.cursors.up.isDown  || game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = -speed;
            turret.body.velocity.x = -speed;
            turret.body.velocity.y = -speed;
        }
        else if (this.cursors.down.isDown || game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player.body.velocity.x = speed;
            player.body.velocity.y = speed;
            turret.body.velocity.x = speed;
            turret.body.velocity.y = speed;
        }
        else if (this.cursors.left.isDown || game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = speed;
            turret.body.velocity.x = -speed;
            turret.body.velocity.y = speed;
        }
       else if (this.cursors.right.isDown || game.input.keyboard.isDown(Phaser.Keyboard.D)) {
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
    if(waves == 1 || waves == 2 || waves == 3){
    balls.forEach( function(balls) {
        this.accelerateToObject(balls, player, 0, 250, 250);
    }, game.physics.arcade);
    }
    if(waves == 4 || waves == 5 || waves == 6){
    balls.forEach( function(balls) {
        this.accelerateToObject(balls, player, 0, 250, 250);
    }, game.physics.arcade);
    }
    if(waves == 7 || waves == 8 || waves == 9){
    balls.forEach( function(balls) {
        this.accelerateToObject(balls, player, 0, 250, 250);
    }, game.physics.arcade);
    }
        
    // This is how the bullets are fired, calls the fire function that handles it
    if (game.input.activePointer.isDown)
    {
        fire();
    }
        
    // The function that deals with the collision of the blue balls and bullets
     function destroyBalls(bullets, balls) {   
            if(life < infinity){
            bullets.kill();
            }
            enemyHealth = enemyHealth - damage;
            console.log(enemyHealth);
            if(enemyHealth <= 0){
            balls.kill();
            score = score + scoreMultiplyer;
            money += 10;
            scoreText.text = 'Score: ' + score;
            moneyText.text = 'Scraps: ' + money;
            clearSound.play();
            }
        }
      
  player.addChild(heart);
 
      function killplayer(heart, balls) {   
        console.log("collide");
        balls.kill();
        player.kill();
        heart = game.add.group();
        heart = game.add.sprite(turret.x, turret.y+45, 'Key');
        game.physics.arcade.enable(heart);
        heart.animations.add('walk');

        heart.animations.play('walk', 5, true);
        updatehighscore();
        game.state.start('Game_Over');
          
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
            game.debug.text("Next wave spawns in: " + this.formatTime(Math.round((timerEvent.delay - timer.ms) / 1000)), 300, 570, "#b32d00", '30px Agency FB' );
        }
        else {
            game.debug.text("Done!", 450, 560, "#0f0");
        }
         
        // game.add.text(425, 50, 'Click outside menu to continue', { font: '30px Arial', fill: '#fff' });
    },
    
    resetTime: function() {
        timer = game.time.create();
        
        // Create a delayed event 30s from now
        timerEvent = timer.add(Phaser.Timer.MINUTE * 0 + Phaser.Timer.SECOND * 5, this.resetTime, this);
        
        // Start the timer
        
        timer.start();
        
        waves++;
        wavestext.text = 'Wave: ' + waves;
        
        j = 11;
        
//balls.destroy();
  
        balls.enableBody = true;
        for (var i = 0; i < j; i++)
        {
  
        var ball = balls.create(game.world.randomX, game.world.randomY, 'ball');
        enemyHealth = 10;
        
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

                game.physics.arcade.moveToPointer(bullet, 300+bulletSpeed);
                
                bulletSound.play();
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
                if(money >= 10 && bulletSpeed <= 2000){
                bulletSpeed = bulletSpeed + 50;
                money = money - 10;
                purchaseSound.play();
                moneyText.text = 'Scraps: ' + money;
                bulletSpeedText.text = 'Bullet-Speed: ' + bulletSpeed;
                choiseLabel.text = 'You purchased red bullet for: 10';
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }  
                }
                if(choisemap[choise] == 'two'){
                console.log("2");   
                if(money >= 40 && scoreMultiplyer < 200){
                game.input.onDown.add(changeWeapon2, this);
                scoreMultiplyer = scoreMultiplyer + 10;
                money = money - 40;
                purchaseSound.play();
                moneyText.text = 'Scraps: ' + money;
                multiplyerText.text = 'Score-Multiplyer: ' + scoreMultiplyer;
                choiseLabel.text = 'You purchased yellow bullet for: 40';
                
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }
                    
                }
                if(choisemap[choise] == 'three'){
                console.log("3");  
                if(money >= 100 && speed < 1000){
                speed = speed + 50;
                money = money - 100;
                purchaseSound.play();
                speedText.text = 'Player-Speed: ' + speed;
                moneyText.text = 'Scraps: ' + money;
                choiseLabel.text = 'Purchased Speed upgrade for: 100';
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }
                if(speed > 1000){
                 console.log("false");
                 choiseLabel.text = 'MAX speed reached!';   
                }
                }
                
                if(choisemap[choise] == 'four'){
                console.log("4");
                if(money >= 200 && speed < 1000){
                game.input.onDown.add(changeWeapon4, this);
                money = money - 200;
                purchaseSound.play();
                moneyText.text = 'Scraps: ' + money;
                choiseLabel.text = 'You purchased fast bullet for: 200';
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }
                }
                
                if(choisemap[choise] == 'five'){
                console.log("5"); 
                if(money >= 300){
                game.input.onDown.add(changeWeapon5, this);
                life = 11;
                money = money - 300;
                purchaseSound.play();
                moneyText.text = 'Scraps: ' + money;
                choiseLabel.text = 'You purchased infinity cube for: 300';
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }
                }
                
                if(choisemap[choise] == 'six'){
                console.log("6");    
                if(money >= 400){
                flash = game.add.sprite(0, 0, 'Flash');
                flash.animations.add('flicker');
                flash.animations.play('flicker', 7);
                game.world.remove(balls);
                balls = game.add.group();
                money = money - 400;
                purchaseSound.play();
                moneyText.text = 'Scraps: ' + money;
                choiseLabel.text = 'You purchased Nuke for: 400';
                }
                else{
                 console.log("false");
                 choiseLabel.text = 'NOT ENOUGH SCRAPS!';
                }
                }
            }
            else{
                // Remove the menu and the label
                menu.destroy();
                menu2.destroy();
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

    function changeWeapon2 () {     
        bullets.destroy();
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(2, 'bullet3', 0, false);
        bullets.setAll('anchor.x', 0.09);
        bullets.setAll('anchor.y', 1.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    }

    function changeWeapon4 () {     bullets.destroy();
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(2, 'bullet1', 0, false);
        bullets.setAll('anchor.x', 0.09);
        bullets.setAll('anchor.y', 1.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    }

    function changeWeapon5 () {     
        bullets.destroy();
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(2, 'bullet5', 0, false);
        bullets.setAll('anchor.x', 0.09);
        bullets.setAll('anchor.y', 1.5);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);
    }

