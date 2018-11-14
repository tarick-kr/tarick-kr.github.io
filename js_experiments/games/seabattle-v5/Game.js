BattleSea.Game = function(game) {
    this.gameover;
    
    // Музыка, звуки
    this.music;
    this.endGame;
    this.boom;
    this.ding;
    this.shoot;
    
    // Управление
    this.upKey;
    this.downKey;
    this.leftKey;
    this.rightKey;
    this.fireKey;
    
    // Фон игры
    this.bg;
    this.backgroundSky;
    this.seaBack;
    this.seaFront;
    this.groundBack;
    this.groundFront;
    
    // Скорость перемещения игрока
    this.speed;
    this.player;

    // Группа торпед игрока
    this.myTorpeds;
    this.myTorpedo;
    // Задержка выстрела
    this.fireRate;
    this.nextFireTime;

    this.flash;

};

BattleSea.Game.prototype = {
    
    create: function() {

        this.gameover = false;
        this.speed = 5;
        this.fireRate = 1500;
        this.nextFireTime = 0;

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.05, true);
        this.endGame = this.add.audio('gameOver_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.shoot = this.add.audio('shoot_audio');

        //Создане 'кнопок' для управления игроком
        upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        //Создане 'кнопки' выстрела
        fireKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.buildWorldGame();
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

        //Создание переднего плана моря
        seaFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontSea');

        //Создание заднего плана дна
        groundBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackGround');

        //Создание группы торпед игрока
        this.buildMyTorpeds();

        //Создание игока
        this.buildPlayer();

        //Создание переднего плана дна
        groundFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontGround');
    },

    buildMyTorpeds: function() {

        // Создание своей группы торпед
        this.myTorpeds = this.add.group();
        this.myTorpeds.enableBody = true;
        this.myTorpeds.physicsBodyType = Phaser.Physics.ARCADE;
        this.myTorpeds.createMultiple(50, 'myTorpedo');
        this.myTorpeds.setAll('checkWorldBounds', true);
        this.myTorpeds.setAll('outOfBoundsKill', true);
        this.myTorpeds.setAll('anchor.x', 1);
        this.myTorpeds.setAll('anchor.y', 0.5);
    },

    buildPlayer: function() {

        // Создание игрока
        this.player = this.add.sprite(100, 300, 'titleSubmarine');
        this.player.anchor.setTo(0.5, 0.5); 
        this.player.scale.setTo(0.25, 0.25);
        this.player.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        this.player.animations.play('move');

        this.physics.arcade.enable(this.player);


    },

    fire: function() {
        if (this.time.now > this.nextFireTime){

            //Расчёт времени следующего выстрела
            this.nextFireTime = this.time.now + this.fireRate;

            //Звук выстрела
            this.shoot.play('', 0, 0.05, false);

            myTorpedo = this.myTorpeds.getFirstDead();


            var timer = this.game.time.create(false);
            timer.add(100, this.killFlash, this);
            timer.start();

            this.flash = this.add.image(this.player.x + 100, this.player.y + 30, 'flash');
            this.flash.anchor.setTo(0.5, 0.5);
            this.flash.scale.setTo(0.1, 0.1);


            myTorpedo.reset(this.player.x + 120, this.player.y + 30);
            myTorpedo.body.velocity.x = 500;

        }
    },

    killFlash: function() {
        this.flash.kill();
    },
 
    update: function() {

        //  Прокрутка заднего фона
        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;          
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;

        //Запуск функции выстрела при нажатии пробела
        if (fireKey.isDown){
            this.fire();
        }; 
        
        // Управление лодкой
        if (upKey.isDown){
            this.player.y -= this.speed;
        }
        if (downKey.isDown){
            this.player.y += this.speed;
        }
        if (rightKey.isDown){
            this.player.x += this.speed;
        }
        if (leftKey.isDown){
            this.player.x -= this.speed;
        };

        //Ограничение перемещения лодки
        if (this.player.x <= (0 + this.player.width/2)){
            this.player.x = this.player.width/2;
        }
        if (this.player.x >= (this.game.width - this.player.width/2)){
            this.player.x = this.game.width - this.player.width/2;
        }
        if (this.player.y >= (this.game.height - 95)){
            this.player.y = this.game.height - 95;
        }
        if (this.player.y <= 100){
            this.player.y = 100;
        }

        // условие перекрытия объектов (лодки и торпеды)
        if (this.physics.arcade.overlap(this.myTorpeds, this.player, null, null, this)) {
            
            // какой-то код ????

        }
    },

    render: function() {

        // this.game.debug.spriteInfo(player, 50, 400);
        this.game.debug.body(this.player);

    }
};