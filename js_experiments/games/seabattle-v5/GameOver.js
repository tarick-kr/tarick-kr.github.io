BattleSea.GameOver = function(game) {
    this.gameover;
    
    // Музыка, звуки
    this.music;
    this.endGame;
    this.boom;
    this.ding;
    this.shoot;
    
   
    // Фон игры
    this.bg;
    this.backgroundSky;
    this.seaBack;
    this.seaFront;
    this.groundBack;
    this.groundFront;


    this.enemies;
    this.boomBoom;

    this.enemiesByDistanceX;
    this.distanceX;

    // this.totalKilledEnemies;


};

BattleSea.GameOver.prototype = {
    
    create: function() {

        this.gameover = true;
        this.enemies = [];
        this.enemiesByDistanceX = [];


        // this.music = this.add.audio('game_audio');
        // this.music.play('', 0, 0.06, true);
        // this.endGame = this.add.audio('gameOver_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');

        this.buildWorldGame();

    },
    
    buildWorldGame: function() {

        console.log('gameover ' + this);

        this.physics.startSystem(Phaser.Physics.ARCADE);

        // Создание заднего фона
        bg = this.add.image(0, 0, 'bg');
        bg.inputEnabled = true;
        bg.events.onInputDown.addOnce(this.startMenu, this);

        // Создание неба
        backgroundSky = this.add.tileSprite(0, 0, 1920, 58, 'bgSky');
        backgroundSky.scale.setTo(1.2, 1.8);  

        // Создание заднего плана моря
        seaBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackSea');

        // Создание переднего плана моря
        seaFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontSea');

        // Создание заднего плана дна
        groundBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackGround');

        
        this.gameOverEnemies = this.add.group();

        // Создание противникв
        this.buildEnemies();

        this.gameOverWindow = this.add.group();

        //Создание переднего плана дна
        groundFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontGround');

        // mySubTopBar = this.add.image(20, 10, 'mySubTopBar');
        // backgroundBar = this.game.add.image(120, 35, 'red-bar');
        // backgroundBar.fixedToCamera = true;
        // backgroundBar.scale.setTo(0.4, 0.3);




        this.style = { font: "84px Minnie", fill: "#ffffff" };
        this.style2 = { font: "50px Minnie", fill: "#ffffff" };
        gameOverPrompt1 = this.add.text(this.world.centerX, this.world.centerY - 200,'Игра окончена', this.style);
        gameOverPrompt1.anchor.setTo(0.5, 0.5);
        gameOverPrompt1.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2); 
        this.gameOverWindow.add(gameOverPrompt1);

        gameOverEnemySub = this.add.image(this.world.centerX - 100, this.world.centerY - 50, 'enemySubTopBar');
        gameOverEnemySub.scale.setTo(0.7, 0.7);
        gameOverEnemySub.anchor.setTo(0.5, 0.5);
        gameOverTotalKilledEnemies = this.add.text(this.world.centerX - 30, this.world.centerY - 70, ' x ' + this.game.global.totalKilledEnemies, this.style2);
        gameOverTotalKilledEnemies.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.gameOverWindow.add(gameOverEnemySub);
        this.gameOverWindow.add(gameOverTotalKilledEnemies);

        gameOverMoney = this.add.image(this.world.centerX - 100, this.world.centerY + 40, 'money');
        gameOverMoney.anchor.setTo(0.5, 0.5);
        gameOverTotalMoney = this.add.text(this.world.centerX - 30, this.world.centerY + 20, ' x ' + this.game.global.totalMoney, this.style2);
        gameOverTotalMoney.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2); 
        this.gameOverWindow.add(gameOverMoney);
        this.gameOverWindow.add(gameOverTotalMoney);

        gameOverPrompt2 = this.add.text(this.world.centerX, this.world.centerY + 200,'Нажмите чтобы продолжить', this.style);
        gameOverPrompt2.anchor.setTo(0.5, 0.5);
        gameOverPrompt2.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
        this.gameOverWindow.add(gameOverPrompt2);


    },


    buildEnemies: function() {
        if(this.gameover == true){
            var timer = this.game.time.create(false);
            timer.loop(this.rnd.integerInRange(1000, 3000), this.generateEnemy, this);
            timer.start();
        }
    },

    generateEnemy: function() {
        var xPos = this.world.width + 200;
        var yPos = this.game.rnd.integerInRange(100, this.world.height-95);
        this.enemy = this.add.sprite(xPos, yPos, 'enemySub');
        this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.anchor.setTo(0.5, 0.5);
        // this.enemy.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        this.enemy.animations.add('move', [0,1,2,3], 10, true);
        this.enemy.animations.play('move');
        this.enemy.scale.setTo(0.7, 0.7);
        this.enemy.body.setSize(280, 78, -20, 6);
        this.enemy.enableBody = true;
        this.enemy.body.velocity.x = this.rnd.integerInRange(-400, -150);
        this.enemies.push(this.enemy);
        this.enemy.checkWorldBounds = true;
        this.enemy.events.onOutOfBounds.add(this.resetEnemy, this);
        this.distanceX = Math.abs(this.enemy.width * 2);
        this.gameOverEnemies.add(this.enemy);

    },

    resetEnemy: function(enemy) {
        for (var i = 0; i < this.enemies.length; ++i) {
            if(this.enemies[i].x - this.enemy.width/2 < 0) {
                this.enemies[i].kill();   
            }
        }
    },


    explosion: function(x, y) {
        this.boom.play('', 0, 0.03, false);
        this.boomBoom = this.add.sprite(x, y, 'boomBoom');
        this.physics.arcade.enable(this.boomBoom);
        this.boomBoom.enableBody = true;
        this.boomBoom.anchor.setTo(0.5, 0.5); 
        this.boomBoom.scale.setTo(0.8, 0.8);
        this.boomBoom.animations.add('move');
        this.boomBoom.animations.play('move', [0,1,2,3,2,1,0], 10, true);
    },

    startMenu: function (pointer) {
        this.ding.play();
        this.state.start('StartMenu');
    },

 
    update: function() {

        // Прокрутка заднего фона
        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;          
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;


        // Находим столкновения
        // Противника с противника

        for (var i = 0; i < this.enemies.length; ++i) {
            for (var j = 0; j < this.enemies.length; ++j) {
                if(this.physics.arcade.collide(this.enemies[j], this.enemies[i], null, null, this)) {
                    this.enemies[i].kill();
                    this.enemies[j].kill();
                    this.explosion(this.enemies[i].x, this.enemies[i].y);
                }
            }
        }

        // Определяем противников, которые могут между собой столкнуться и выбираем для них направление движения

        // Создаём новый массив противнтков в котором противники будут отсортированы по возрастанию координаты Х
        this.enemiesByDistanceX = this.enemies.slice(0);
        this.enemiesByDistanceX.sort(function(a,b) {
            return a.x - b.x;
        });

        for (var k = 0; k < this.enemiesByDistanceX.length; k++){
            var topClearance = 100 + this.enemiesByDistanceX[k].height + this.enemiesByDistanceX[k].height/2;
            var bottomClearance = this.world.height - 95 - this.enemiesByDistanceX[k].height - this.enemiesByDistanceX[k].height/2;
            var enemyTopK = this.enemiesByDistanceX[k].y - this.enemiesByDistanceX[k].height/2;
            var enemyBottomK = this.enemiesByDistanceX[k].y + this.enemiesByDistanceX[k].height/2;
            var enemyLeftK = this.enemiesByDistanceX[k].x - Math.abs(this.enemiesByDistanceX[k].width/2);
            var enemyRightK = this.enemiesByDistanceX[k].x + Math.abs(this.enemiesByDistanceX[k].width/2);
            var enemyVelocityXK = Math.abs(this.enemiesByDistanceX[k].body.velocity.x);
            for (var m = 0; m < this.enemiesByDistanceX.length; m++) {
                var enemyTopM = this.enemiesByDistanceX[m].y - this.enemiesByDistanceX[m].height/2;
                var enemyBottomM = this.enemiesByDistanceX[m].y + this.enemiesByDistanceX[m].height/2;
                var enemyLeftM = this.enemiesByDistanceX[m].x - Math.abs(this.enemiesByDistanceX[m].width/2);
                var enemyRightM = this.enemiesByDistanceX[m].x + Math.abs(this.enemiesByDistanceX[m].width/2);
                var enemyVelocityXM = Math.abs(this.enemiesByDistanceX[m].body.velocity.x);

                //==== Находим элемент массива у которого скорость больше, чем у предыдущего
                if (enemyVelocityXM > enemyVelocityXK) {
                    // console.log('скорость выше');
                    //==== Проверяем может ли он пересечся с предыдущим по оси Y
                    if ( ((enemyTopM < enemyBottomK) && (enemyTopM > enemyTopK)) || ((enemyBottomM < enemyBottomK) && (enemyBottomM > enemyTopK)) ) {
                        // console.log('возможно пересечение по оси Y');
                        //==== Проверяем дистанцию между этим и предыдущим элементом (по Оси Х) 
                        if ( (enemyLeftM - enemyRightK) < this.distanceX ) {
                            // console.log('дистанция уменьшилась');

                            //==== Определяем возможные направления движения
                            if ( this.enemiesByDistanceX[m].y <= this.world.height/2) {
                                if ((enemyTopK >= topClearance) && (enemyBottomK > enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вниз
                                // console.log('двигаемся вниз');
                                this.enemiesByDistanceX[m].body.velocity.y += 1;                                    
                                }
                                else if ((enemyTopK >= topClearance) && (enemyBottomK <= enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вверх
                                // console.log('двигаемся вверх');
                                this.enemiesByDistanceX[m].body.velocity.y -= 1;  
                                }
                                else if ((enemyTopK <= topClearance) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вниз
                                // console.log('двигаемся вниз');
                                this.enemiesByDistanceX[m].body.velocity.y += 1; 
                                }
                                else {
                                // уменьшаем скорость
                                // console.log('уменьшаем скорость');
                                this.enemiesByDistanceX[m].body.velocity.x = -120;
                                }
                            }

                            else if ( this.enemiesByDistanceX[m].y > this.world.height/2) {
                                if ((bottomClearance - enemyBottomK >= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && (enemyBottomK <= enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вниз
                                // console.log('двигаемся вниз');
                                this.enemiesByDistanceX[m].body.velocity.y += 1;                                    
                                }
                                else if ((bottomClearance - enemyBottomK >= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && (enemyBottomK > enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вверх
                                // console.log('двигаемся вверх');
                                this.enemiesByDistanceX[m].body.velocity.y -= 1;  
                                }
                                else if ((bottomClearance - enemyBottomK <= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && (enemyRightK + 150 < enemyLeftM )) {
                                // двигаемся вверх
                                // console.log('двигаемся вверх');
                                this.enemiesByDistanceX[m].body.velocity.y -= 1; 
                                }
                                else {
                                // уменьшаем скорость
                                // console.log('уменьшаем скорость');
                                this.enemiesByDistanceX[m].body.velocity.x = -120;
                                }
                            }
                        }                       
                    }
                }
                if ((enemyTopK <= topClearance) || (enemyBottomK >= bottomClearance)) {
                    this.enemiesByDistanceX[k].body.velocity.y = 0;  
                }
                if ((enemyTopM <= topClearance) || (enemyBottomM >= bottomClearance)) {
                    this.enemiesByDistanceX[m].body.velocity.y = 0;  
                }
            }
        }

    },

    render: function() {

    }
};