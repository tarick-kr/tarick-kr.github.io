
var game = new Phaser.Game(640, 360, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render });

function preload() {

    game.load.image('myTorpedo', 'assets/myTorpedo.png');
    game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
    game.load.image('backgroundSea', 'assets/bgSea.png');
    game.load.image('backgroundSky', 'assets/bgSky.png');
    game.load.image('backgroundGround', 'assets/bgGround.png');
    game.load.spritesheet('mySubmarine', 'assets/mySub78x45.png', 78, 45, 9);


}

var backgroundSky;
var backgroundSea;
var backgroundGround;
var mySubmarine;
var speed = 2;

function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);


    backgroundSea = game.add.image(0, 0, 'backgroundSea');
 

    //  The scrolling backgroundSky backgroundGround
    backgroundSky = game.add.tileSprite(0, 0, 640, 58, 'backgroundSky');  
    

    mySubmarine = game.add.sprite(100, 100, 'mySubmarine');
    var move = mySubmarine.animations.add('move');
    mySubmarine.animations.play('move', 60, true);
    mySubmarine.anchor.setTo(0.5, 0.5);
    game.physics.enable(mySubmarine, Phaser.Physics.ARCADE);

    backgroundGround = game.add.tileSprite(0, 264, 640, 96, 'backgroundGround');
}


function update() {

    //  Scroll the background
    backgroundSky.tilePosition.x -= 1;
    backgroundGround.tilePosition.x -= 3;    

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)){
        mySubmarine.x -= speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)){
        mySubmarine.x += speed;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.UP)){
        mySubmarine.y -= speed;
        mySubmarine.angle = -3;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)){
        mySubmarine.y += speed;
        mySubmarine.angle = 3;
    }
    else{
        mySubmarine.angle = 0;
    }

    if (mySubmarine.x - mySubmarine.width/2 <= 0){
        mySubmarine.x = mySubmarine.width/2;
    }
    if (mySubmarine.x + mySubmarine.width/2 >= game.width){
        mySubmarine.x = game.width - mySubmarine.width/2;
    }
    if (mySubmarine.y  <= 58){
        mySubmarine.y = 58;
    }
    if (mySubmarine.y >= 310){
        mySubmarine.y = 310;
    }
}

function render() {


}



