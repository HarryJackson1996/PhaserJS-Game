var Game;


game = new Phaser.Game(850, 600, Phaser.AUTO, 'test', null, false, true);

game.state.add('Menu', Menu);
game.state.start('Menu');
game.state.add('Game_Over', Game_Over);
game.state.add('Game', Game);
game.state.add('Credits', Credits);
game.state.add('Controls', Controls);


