
var game = new Phaser.Game(1920, 1080, Phaser.CANVAS, 'game');
// var game = new Phaser.Game(640, 360, Phaser.CANVAS, 'game');

var background;
var backgroundSky;
var seaBack;
var seaFront;
var groundBack;
var groundFront;
var player;
var speed = 2;
var fs_btn;


var mainState = {

    preload() {

        game.load.audio('music', ['assets/funin_and_sunin.mp3']);
        game.load.image('myTorpedo', 'assets/myTorpedo.png');
        game.load.image('enemyTorpedo', 'assets/enemyTorpedo.png');
        game.load.image('background', 'assets/new/bg.png');
        game.load.image('sky', 'assets/bgSky.png');
        game.load.image('groundFront', 'assets/new/bgFrontGround.png');
        game.load.image('groundBack', 'assets/new/bgBackGround.png');
        game.load.image('seaBack', 'assets/new/bgBackSea.png');
        game.load.image('seaFront', 'assets/new/bgFrontSea.png');
        game.load.spritesheet('mySubmarine', 'assets/mySub78x45.png', 78, 45, 9);

    },

    create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        //Создание заднего фона
        background = game.add.image(0, 0, 'background');

        //Создание неба
        backgroundSky = game.add.tileSprite(0, 0, 1920, 58, 'sky');
        backgroundSky.scale.setTo(1.2, 1.8);  

        //Создание заднего плана моря
        seaBack = game.add.tileSprite(0, 0, 1920, 1080, 'seaBack');
        // backgroundGround.scale.setTo(1, 0.6);

        //Создание переднего плана моря
        seaFront = game.add.tileSprite(0, 0, 1920, 1080, 'seaFront');
        // backgroundGround.scale.setTo(1, 0.6);

        //Создание заднего плана дна
        groundBack = game.add.tileSprite(0, 0, 1920, 1080, 'groundBack');

        //Создание игрока (подводной лодки)
        player = game.add.sprite(100, 100, 'mySubmarine');
        var move = player.animations.add('move');
        player.animations.play('move', 60, true);
        player.anchor.setTo(0.5, 0.5);    
        player.scale.setTo(1.4, 1.4);
        game.physics.enable(player, Phaser.Physics.ARCADE);

        //Создание переднего плана дна
        groundFront = game.add.tileSprite(0, 0, 1920, 1080, 'groundFront');
               
        //Добавление музыки
        music = game.add.audio('music');
        music.play('', 0, 1, true);

        //Создание полноэкранного режима
        game.input.onDown.add(go_fullscreen, this);

        //Создане переменных для управления лодкой
        upKey = game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    },


    update() {

        //  Прокрутка заднего фона
        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;          
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;  
        
        // Управление лодкой
        if (!upKey.isDown){
            player.angle =0;
        }
        if (!downKey.isDown){
            player.angle =0;
        }
        if (upKey.isDown){
            player.y -= speed;
            player.angle = -3;
        }
        if (downKey.isDown){
            player.y += speed;
            player.angle = 3;
        }
        if (rightKey.isDown){
            player.x += speed;
            player.angle = 0;
        }
        if (leftKey.isDown){
            player.x -= speed;
            player.angle = 0;
        }

        //Ограничение перемещения лодки
        if (player.x <= (0 + player.width/2)){
            player.x = player.width/2;
        }
        if (player.x >= (game.width - player.width/2)){
            player.x = game.width - player.width/2;
        }
        if (player.y >= (game.height - 85)){
            player.y = game.height - 85;
        }
        if (player.y <= 100){
            player.y = 100;
        }
    },

    render() {


    }

}

function go_fullscreen(){
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
    if (game.scale.isFullScreen){
        game.scale.stopFullScreen();
        fs_btn.frame = 0;
    }else{
        game.scale.startFullScreen();
        fs_btn.frame = 1;
    }
}


game.state.add('mainState', mainState);

game.state.start('mainState');


