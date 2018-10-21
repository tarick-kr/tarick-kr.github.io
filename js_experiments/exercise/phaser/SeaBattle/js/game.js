
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('backgroundSea', 'assets/bgSea.png');
    game.load.image('backgroundSky', 'assets/bgSky.png');
    game.load.image('backgroundGround', 'assets/bgGround.png');

}

var backgroundSky;
var backgroundSea;
var backgroundGround;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    backgroundSea = game.add.image(0, 0, 'backgroundSea');
    backgroundSky = game.add.tileSprite(0, 0, 640, 58, 'backgroundSky');  
    backgroundGround = game.add.tileSprite(0, 0, 640, 216, 'backgroundSky');  
}


function update() {

    //  Scroll the background
    backgroundSky.tilePosition.x -= 1;
    backgroundGround.tilePosition.x -= 1.5;

}

function render() {


}



