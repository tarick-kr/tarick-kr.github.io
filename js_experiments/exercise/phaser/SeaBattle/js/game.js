
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('Sea', 'assets/bgSea.png');
    game.load.image('Sky', 'assets/bgSky.png');
    game.load.image('Ground', 'assets/bgGround.png');

}

var Sky;
var Sea;
var Ground;


function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    Sea = game.add.image(0, 0, 'bgSea');
    Sky = game.add.tileSprite(0, 0, 640, 57, 'Sky');  
    Ground = game.add.tileSprite(0, 0, 640, 216, 'Ground');  
}


function update() {

    //  Scroll the background
    Sky.tilePosition.x -= 1;
    Ground.tileSprite.x -= 1.5;

}

function render() {

}



