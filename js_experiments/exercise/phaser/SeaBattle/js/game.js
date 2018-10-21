
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('sea', 'assets/bgSea.png');
    game.load.image('sky', 'assets/bgSky.png');
    game.load.image('ground', 'assets/bgGround.png');

}

var sky;
var sea;
var ground;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    sea = game.add.image(0, 0, 'sea');
    sky = game.add.tileSprite(0, 0, 640, 57, 'sky');  
    ground = game.add.tileSprite(0, 0, 640, 216, 'ground');  
}


function update() {

    //  Scroll the background

    sky.tilePosition.x -= 1;
    ground.tileSprite.x -= 1.5;

}

function render() {

}



