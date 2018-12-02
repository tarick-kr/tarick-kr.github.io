BattleSea.Game = function(game) {
    this.gameover;
    
    // Музыка, звуки
    this.music;
    this.endGame;
    this.boom;
    this.ding;
    this.shoot;
    
    // Управление
    this.cursors;
    this.fireButton;
    
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

    this.fireEnemyRate;
    this.nextEnemyFireTime;

    this.flash;
    this.fireEnemy;
    this.enemyFlashes;

    this.enemies;
    this.myTorpeds
    this.boomBoom;
    this.enemiesTorpeds;

    this.enemiesByDistanceX;
    this.distanceX;

    this.healthBar;
    this.backgroundBar;
    this.countKilledEntmies;
    this.totalEnemies;
    this.monBox;
    this.totalMoney;

};

BattleSea.Game.prototype = {
    
    create: function() {

        this.gameover = false;
        this.speed = 5;
        this.fireRate = 2000;
        this.nextFireTime = 0;
        this.fireEnemyRate = 2500;
        this.nextEnemyFireTime = 1500;
        this.enemies = [];
        this.myTorpeds = [];
        this.enemiesTorpeds = [];
        this.enemyFlashes = [];
        this.enemiesByDistanceX = [];
        this.totalKilledEnemies = 0;
        this.totalEnemies = 0;
        this.totalMoney = 0;
        this.moneyBoxes = [];

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.06, true);
        this.endGame = this.add.audio('gameOver_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.shoot = this.add.audio('shoot_audio');

        // Создане 'кнопок' для управления игроком

        cursors = this.input.keyboard.createCursorKeys();
        fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.buildWorldGame();

    },
    
    buildWorldGame: function() {

        this.physics.startSystem(Phaser.Physics.ARCADE);

        // Создание заднего фона
        bg = this.add.image(0, 0, 'bg');


        // Создание неба
        backgroundSky = this.add.tileSprite(0, 0, 1920, 58, 'bgSky');
        backgroundSky.scale.setTo(1.2, 1.8); 


        // Создание заднего плана моря
        seaBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackSea');


        // Создание переднего плана моря
        seaFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontSea');

        this.ground = this.add.group();

        // Создание заднего плана дна
        groundBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackGround');
        this.ground.add(groundBack);        


        this.buildMoneyBox();

        // Создание игока
        this.buildPlayer();



        // Создание противникв
        this.buildEnemies();



        //Создание переднего плана дна
        groundFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontGround');

        // Шкала состояния игрока
        // Уровень жизни
        mySubTopBar = this.add.image(20, 10, 'mySubTopBar');
        backgroundBar = this.game.add.image(120, 35, 'red-bar');
        backgroundBar.fixedToCamera = true;
        backgroundBar.scale.setTo(0.4, 0.3);
        this.healthBar = this.game.add.image(120, 35, 'green-bar');
        this.healthBar.fixedToCamera = true;
        this.healthBar.scale.setTo(0.4, 0.3);
        myTorpedsTopBar = this.add.image(410, 40, 'myTorpedo');
        myTorpedsTopBar.scale.setTo(1.8, 1.8);
        this.clockTopBar = this.add.sprite(490, 20, 'clockTopBar');
        this.clockTopBar.scale.setTo(0.5, 0.5);
        this.clockTopBar.animations.add('move', [0,1,2,3,4,5,6,7,8,9,10], 10/this.fireRate*1000, false);
        this.clockTopBar.animations.play('move');

        this.style = { font: "36px Minnie", fill: "#ffffff" };        

        moneyTopBar = this.add.image(570, 22, 'money');
        moneyTopBar.scale.setTo(0.7, 0.7);
        this.countMoney = this.add.text(640, 30, 'x ' + this.totalMoney, this.style);            
        this.countMoney.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2); 




        this.countKilledEntmies = this.add.text(this.world.width - 190, 25, '' + this.totalKilledEnemies + ' x', this.style);            
        this.countKilledEntmies.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);   
        enemySubTopBar = this.add.image(this.world.width - 20, 10, 'mySubTopBar');
        enemySubTopBar.scale.setTo(-1, 1);
    },

    buildPlayer: function() {

        // Создание игрока
        this.player = this.add.sprite(100, 300, 'mySub');
        this.physics.arcade.enable(this.player);
        // Изменение физического размера тела
        this.player.body.setSize(140, 76, 5, 14);

        this.player.anchor.setTo(0.5, 0.5); 
        // this.player.scale.setTo(1.8, 1.8);
        this.player.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        this.player.animations.play('move');
        this.player.health = 100;
        this.player.maxHealth = 100;
    },

    buildEnemies: function() {
        if(this.gameover == false){
            var timer = this.game.time.create(false);
            timer.loop(this.rnd.integerInRange(2500, 4000), this.generateEnemy, this);
            timer.start();
        }
    },



    generateEnemy: function() {
        this.totalEnemies ++;
        var xPos = this.world.width + 200;
        var yPos = this.game.rnd.integerInRange(100, this.world.height-95);
        this.enemy = this.add.sprite(xPos, yPos, 'enemySub');
        this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.anchor.setTo(0.5, 0.5);
        // this.enemy.scale.setTo(-1, 1); 
        // this.enemy.scale.setTo(-0.25, 0.25); 
        this.enemy.body.bounce.set(0.1, 0.7);
        this.enemy.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        this.enemy.animations.play('move');
        this.enemy.body.setSize(140, 76, -5, 14);
        this.enemy.enableBody = true;
        this.enemy.body.velocity.x = this.rnd.integerInRange(-400, -150);
        this.enemies.push(this.enemy);
        this.enemy.checkWorldBounds = true;
        this.enemy.events.onOutOfBounds.add(this.resetEnemy, this);

        this.distanceX = Math.abs(this.enemy.width * 2);

        this.fireEnemy();

    },


    buildMoneyBox: function() {
        if(this.gameover == false){
            var timer = this.game.time.create(false);
            timer.loop(this.rnd.integerInRange(50000, 80000), this.generateMoneyBox, this);
            timer.start();
        }
    },

    generateMoneyBox: function() {
        this.monBox = this.add.sprite(this.world.width + 200, this.world.height-75, 'moneyBox');
        this.physics.enable(this.monBox, Phaser.Physics.ARCADE);
        this.monBox.anchor.setTo(0.5, 0.5);
        this.monBox.body.bounce.set(0.1, 0.7);
        this.monBox.enableBody = true;
        this.monBox.body.velocity.x = -150;
        this.moneyBoxes.push(this.monBox);
        this.monBox.checkWorldBounds = true;
        this.monBox.events.onOutOfBounds.add(this.resetMonBox, this);
        this.ground.add(this.monBox);
    },

    resetMonBox: function(monBox) {
        for (var i = 0; i < this.moneyBoxes.length; ++i) {
            if(this.moneyBoxes[i].x - this.monBox.width/2 < 0) {
                this.moneyBoxes[i].kill();   
            }
        }
    },  

    takeMoney: function(s) {
        this.totalMoney += s;
        this.countMoney.setText('x ' + this.totalMoney); 
    },

    resetEnemy: function(enemy) {
        for (var i = 0; i < this.enemies.length; ++i) {
            if(this.enemies[i].x - this.enemy.width/2 < 0) {
                this.enemies[i].kill();   
            }
        }
    },

    fireEnemy: function() {
        if (this.time.now > this.nextEnemyFireTime) { 
            //Расчёт времени следующего выстрела
            this.nextEnemyFireTime = this.time.now + this.fireEnemyRate;

            for (var i = 0; i < this.enemies.length; ++i) {

                if (this.enemies[i].alive == true) {

                    if ((this.player.y - this.player.height/2 < this.enemies[i].y) && (this.player.y + this.player.height/2 > this.enemies[i].y) && ((this.player.x + this.player.width * 2) < this.enemies[i].x)) {

                        //Звук выстрела
                        this.shoot.play('', 0, 0.07, false);
                        this.enemyTorpedo = this.add.sprite(this.enemies[i].x - 120, this.enemies[i].y + 30, 'enemyTorpedo');
                        this.physics.enable(this.enemyTorpedo, Phaser.Physics.ARCADE);
                        this.enemyTorpedo.enableBody = true;
                        this.enemyTorpedo.anchor.setTo(1, 0.5);
                        this.enemyTorpedo.body.velocity.x = -500;
                        this.enemiesTorpeds.push(this.enemyTorpedo);
                        this.flashEnemies(this.enemies[i].x, this.enemies[i].y);
                    }
                }
            }
        }
    },

    flashEnemies: function(ememyX, enemyY) {
        // Вспышка при выстриле
        var timer = this.game.time.create(false);
        timer.add(100, this.killFlashEnemy, this);
        timer.start();
        this.flashEnemy = this.add.image(ememyX - 130, enemyY + 30, 'flash');
        this.flashEnemy.anchor.setTo(0.5, 0.5);
        this.flashEnemy.scale.setTo(-0.1, 0.1);
        this.enemyFlashes.push(this.flashEnemy);
    },

    killFlashEnemy: function() {
        for (var i = 0; i < this.enemyFlashes.length; i++) {
            this.enemyFlashes[i].kill();
        }
    },

    fire: function() {
        if (this.time.now > this.nextFireTime){

            //Расчёт времени следующего выстрела
            this.nextFireTime = this.time.now + this.fireRate;

            //Звук выстрела
            this.shoot.play('', 0, 0.07, false);

            this.myTorpedo = this.add.sprite(this.player.x + 120, this.player.y + 30, 'myTorpedo');
            this.physics.enable(this.myTorpedo, Phaser.Physics.ARCADE);
            this.myTorpedo.enableBody = true;
            this.myTorpedo.anchor.setTo(1, 0.5);
            this.myTorpedo.body.velocity.x = 500;
            this.myTorpeds.push(this.myTorpedo);

            // Вспышка при выстриле
            var timer = this.game.time.create(false);
            timer.add(100, this.killFlash, this);
            timer.start();
            this.flash = this.add.image(this.player.x + 100, this.player.y + 30, 'flash');
            this.flash.anchor.setTo(0.5, 0.5);
            this.flash.scale.setTo(0.1, 0.1);

            this.clockTopBar.animations.play('move');

        }
    },

    killFlash: function() {
        this.flash.kill();
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

    damage: function() {
        this.player.damage(20);
        this.healthBar.scale.setTo(0.4 * this.player.health / this.player.maxHealth, 0.3);
        if (this.player.alive == false){

            this.gameOver('', 0, 0.06, false);
        }
    },

    updateTotalKilledEnemies: function() {
        this.totalKilledEnemies ++;

        if (this.totalKilledEnemies < 10) {
            this.countKilledEntmies.position.setTo(this.world.width - 190, 25);
            this.countKilledEntmies.setText('' + this.totalKilledEnemies + ' x');            
        }
        else {
            this.countKilledEntmies.position.setTo(this.world.width - 225, 25);
            this.countKilledEntmies.setText('' + this.totalKilledEnemies + ' x');
        }
    },

    gameOver: function() {
        this.music.stop();
        this.endGame.play();
        this.state.start('GameOver');
    },
 
    update: function() {


        // console.log(this.totalEnemies);


        // Прокрутка заднего фона
        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;  
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;

        // Управление лодкой
        if (cursors.left.isDown){
            this.player.x -= this.speed;
        }
        else if (cursors.right.isDown){
            this.player.x += this.speed;
        }
        if (cursors.up.isDown){
            this.player.y -= this.speed;
        }
        else if (cursors.down.isDown){
            this.player.y += this.speed;
        }
        if (fireButton.isDown){
            this.fire();
        }

        // Ограничение перемещения лодки
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


        // Находим столкновения

        // Торпеды игрока с противниками

        for (var i = 0; i < this.enemies.length; ++i) {
            for (var j = 0; j < this.myTorpeds.length; ++j) {
                if(this.physics.arcade.overlap(this.myTorpeds[j], this.enemies[i], null, null, this)) {
                    this.updateTotalKilledEnemies();
                    this.enemies[i].kill();
                    this.myTorpeds[j].kill();
                    this.explosion(this.enemies[i].x, this.enemies[i].y);
                    this.takeMoney(10);
 
                }
            }
        }


        // Торпеда игрока с торпедой противника

        for (var i = 0; i < this.enemiesTorpeds.length; ++i) {
            for (var j = 0; j < this.myTorpeds.length; ++j) {
                if(this.physics.arcade.collide(this.myTorpeds[j], this.enemiesTorpeds[i], null, null, this)) {
                    this.enemiesTorpeds[i].kill();
                    this.myTorpeds[j].kill();
                    this.explosion(this.myTorpeds[j].x, this.myTorpeds[j].y);
                }
            }
        }

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

        // Противника с торпедой противника

        for (var i = 0; i < this.enemies.length; ++i) {
            for (var j = 0; j < this.enemiesTorpeds.length; ++j) {
                if(this.physics.arcade.overlap(this.enemiesTorpeds[j], this.enemies[i], null, null, this)) {
                    this.enemies[i].kill();
                    this.enemiesTorpeds[j].kill();
                    this.explosion(this.enemies[i].x, this.enemies[i].y);
                }
            }
        }

        // Противника с игроком

        for (var i = 0; i < this.enemies.length; ++i) {
            if(this.physics.arcade.overlap(this.enemies[i], this.player, null, null, this)) {
                this.updateTotalKilledEnemies();
                this.enemies[i].kill();
                this.explosion(this.enemies[i].x, this.enemies[i].y);
                this.damage();
                this.takeMoney(10);

            }
        }

        // Игрока с торпедой противника

        for (var i = 0; i < this.enemiesTorpeds.length; ++i) {
            if(this.physics.arcade.overlap(this.enemiesTorpeds[i], this.player, null, null, this)) {
                this.enemiesTorpeds[i].kill();
                this.explosion(this.enemiesTorpeds[i].x, this.enemiesTorpeds[i].y);
                this.damage();
            }
        }

        // Игрока с сундуком

        for (var i = 0; i < this.moneyBoxes.length; ++i) {
            if(this.physics.arcade.overlap(this.moneyBoxes[i], this.player, null, null, this)) {
                this.moneyBoxes[i].kill();
                this.ding.play();
                this.takeMoney(100);
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

        // this.game.debug.spriteInfo(this.player, 50, 400);
        // this.game.debug.body(this.player);
        // this.game.debug.body(this.enemy, 'rgba(0,255,0,0.4)', false);
        // this.game.debug.soundInfo(this.music, 50, 200);
        // this.game.debug.spriteInfo('Sprite z-depth: ' + this.monBox, 200, 200);


    }
};