BattleSea.Game = function(game) {
    this.gameover;
    this.music;
    this.endGame;
    this.boom;
    this.ding;
    this.shoot;

    this.bg;
    this.backgroundSky;
    this.seaBack;
    this.seaFront;
    this.groundBack;
    this.groundFront;
    this.player;

};

BattleSea.Game.prototype = {
    
    create: function() {

        this.gameover = false;

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.05, true);
        this.endGame = this.add.audio('gameOver_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.shoot = this.add.audio('shoot_audio');

        this.buildWorldGame();

        // this.buildEnemies();
   
    },
    
    buildWorldGame: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        //Создание заднего фона
        bg = this.add.image(0, 0, 'bg');

        //Создание неба
        backgroundSky = this.add.tileSprite(0, 0, 1920, 58, 'bgSky');
        backgroundSky.scale.setTo(1.2, 1.8);  

        //Создание заднего плана моря
        seaBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackSea');
        // backgroundGround.scale.setTo(1, 0.6);

        //Создание переднего плана моря
        seaFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontSea');
        // backgroundGround.scale.setTo(1, 0.6);

        //Создание заднего плана дна
        groundBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackGround');

        this.buildPlayer();

        //Создание переднего плана дна
        groundFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontGround');
    },

    buildPlayer: function() {

        player = this.add.sprite(100, 300, 'titleSubmarine');
        player.anchor.setTo(0.5, 0.5); 
        player.scale.setTo(0.25, 0.25);
        player.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        player.animations.play('move');

        this.physics.arcade.enable(player);
    },

    // buildEnemies: function() {

    // },
 
    update: function() {

        //  Прокрутка заднего фона
        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;          
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;
    },

    render: function() {

    }
};