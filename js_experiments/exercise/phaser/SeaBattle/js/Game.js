var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('starfield', 'assets/backgroundSea.png');
}


var starfield;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  The scrolling starfield background
    starfield = game.add.tileSprite(0, 0, 640, 360, 'starfield');
}

function update() {

    //  Scroll the background
    starfield.tilePosition.y += 2;
}