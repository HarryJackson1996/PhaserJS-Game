/*****************************************************************
 *
 * ISO plugin demonstration
 * Code heavily derived from: http://thoughts.amphibian.com/2015/07/starting-out-with-phaser-and-isometric.html
 *
 * V1.0,  25/02/2017
 * Edited by: Robin
 *
 ***************************************************************/

    var BasicGame = function (game) {};
    BasicGame.Boot = function (game) {};

    var isoGroup, cursorPos, cursor, player;
    var sprite;
    var bullets;

    var fireRate = 100;
    var nextFire = 0;

var init = function () {
    var game = new Phaser.Game(850, 600, Phaser.AUTO, 'test', null, false, true);


BasicGame.Boot.prototype =
{
    preload: function () {
        game.load.image('tile', 'assets/tile.png');
        game.load.image('tile1', 'assets/ground_tile.png');
        game.time.advancedTiming = true;
        game.load.image('arrow', 'assets/sprites/arrow.png');
        game.load.image('bullet', 'assets/sprites/purple_ball.png');

        // Add and enable the plug-in.
        game.plugins.add(new Phaser.Plugin.Isometric(game));
        game.physics.startSystem(Phaser.Physics.ARCADE); game.physics.startSystem(Phaser.Plugin.Isometric.ISOARCADE);
        // This is used to set a game canvas-based offset for the 0, 0, 0 isometric coordinate - by default
        // this point would be at screen coordinates 0, 0 (top left) which is usually undesirable.
        game.iso.anchor.setTo(0.47, 0.2);


    },
    

    create: function () {

        // Create a group for our tiles.
        isoGroup = game.add.group();
        isoGroup1 = game.add.group();

        // Let's make a load of tiles on a grid.
        this.spawnTiles();

        // Provide a 3D position for the cursor
        cursorPos = new Phaser.Plugin.Isometric.Point3();
        player = game.add.isoSprite(128, 128, 0, 'tile', 0, isoGroup);
        player.tint = 0x86bfda;
        player.anchor.set(0.5);
        game.physics.isoArcade.enable(player);
        player.body.collideWorldBounds = true
        
        this.cursors = game.input.keyboard.createCursorKeys();
        this.game.input.keyboard.addKeyCapture([
            
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN,
            Phaser.Keyboard.SPACEBAR    
        ]);

        
    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;  
        
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);   
        
    sprite = game.add.sprite(400, 300, 'arrow');
    sprite.anchor.set(0.5);

    game.physics.enable(sprite, Phaser.Physics.ARCADE);

    sprite.body.allowRotation = false;
    },
    
    update: function () {
        // Update the cursor position.
        // It's important to understand that screen-to-isometric projection means you have to specify a z position manually, as this cannot be easily
        // determined from the 2D pointer position without extra trickery. By default, the z position is 0 if not set.
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
                tile.tint = 0xffffff;                   //tint colour red
            }
        });
        
            isoGroup1.forEach(function (tile) {
            var inBounds = tile.isoBounds.containsXY(cursorPos.x, cursorPos.y);
            // If it does, do a little animation and tint change.
            if (!tile.selected && inBounds) {
                tile.selected = true;
                tile.tint = 0x76EE00;                    //tint colour green
            }
            // If not, revert back to how it was.
            else if (tile.selected && !inBounds) {
                tile.selected = false;
                tile.tint = 0xffffff;
            }
        });
        
        
        
            var speed = 100;
         
//movement changed for x, y (non iso movement)
        if (this.cursors.up.isDown) {
            player.body.velocity.y = -speed;
            player.body.velocity.x = -speed;
        }
        else if (this.cursors.down.isDown) {
            player.body.velocity.y = speed;
            player.body.velocity.x = speed;
        }
        else if (this.cursors.left.isDown) {
            player.body.velocity.x = -speed;
            player.body.velocity.y = speed;
        }
       else if (this.cursors.right.isDown) {
            player.body.velocity.x = speed;
            player.body.velocity.y = -speed;
        }
        else {
            player.body.velocity.x = 0;
            player.body.velocity.y = 0;
        }
      
       
     game.physics.isoArcade.collide(isoGroup1);
     game.iso.topologicalSort(isoGroup1);
        
        
     sprite.rotation = game.physics.arcade.angleToPointer(sprite);

        
    
    if (game.input.activePointer.isDown)
    {
        fire();
    }
    },
    
 
    
    spawnTiles: function () {
        var tile;
        for (var xx = 0; xx < 408; xx += 38) {
            for (var yy = 0; yy < 408; yy += 38) {
                // Create a tile using the new game.add.isoSprite factory method at the sspecified position.
                // The last parameter is the group you want to add it to (just like game.add.sprite)
             
                if( xx == 0 || yy == 0){
                tile = game.add.isoSprite(xx, yy, 8, 'tile1', 0, isoGroup1);
                tile.anchor.set(0.5, 0);
            
            }
                else{
                tile = game.add.isoSprite(xx, yy, 0, 'tile', 0, isoGroup);
                tile.anchor.set(0.5, 0); 
                
                }
            }
        }
    }
};
    
    
function fire() {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;

        var bullet = bullets.getFirstDead();

        bullet.reset(sprite.x - 8, sprite.y - 8);

        game.physics.arcade.moveToPointer(bullet, 300);
    }

}
    game.state.add('Boot', BasicGame.Boot);
    game.state.start('Boot');

} // end of init();

window.onload = init;