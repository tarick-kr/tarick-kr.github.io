
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('backgroundSea', 'assets/backgroundSea.png');
    game.load.image('backgroundSky', 'assets/backgroundSky.png');

}

var backgroundSky;
var backgroundSea;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    backgroundSky = game.add.tileSprite(0, 0, 640, 360, 'backgroundSky');

  
}


function update() {

    //  Scroll the background
    backgroundSky.tilePosition.x -= 5;

}

function render() {

    // for (var i = 0; i < aliens.length; i++)
    // {
    //     game.debug.body(aliens.children[i]);
    // }

}



