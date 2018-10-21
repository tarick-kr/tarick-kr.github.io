
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('backgroundSea', 'assets/bgSea.png');
    game.load.image('backgroundSky', 'assets/bgSky.png');
    game.load.image('backgroundGround', 'assets/bgGround.png');
    game.load.spritesheet('mySubmarine', 'assets/mySub45x45.png, 45, 45, 9');
    game.load.image('hhhh', 'assets/mySub45x45.png');

}

var backgroundSky;
var backgroundSea;
var backgroundGround;
var mySubmarine;
var h;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    backgroundSea = game.add.image(0, 0, 'backgroundSea');
    h = game.add.image(50, 50, 'hhhh');

    //  The scrolling backgroundSky backgroundGround
    backgroundSky = game.add.tileSprite(0, 0, 640, 58, 'backgroundSky');  
    backgroundGround = game.add.tileSprite(0, 264, 640, 96, 'backgroundGround');

    mySubmarine = game.add.sprite(100, 100, 'mySubmarine');
    var move = mySubmarine.animations.add('move');
    mySubmarine.animations.play('move', 30, true); 
}


function update() {

    //  Scroll the background
    backgroundSky.tilePosition.x -= 1;
    backgroundGround.tilePosition.x -= 1.5;

}

function render() {


}



