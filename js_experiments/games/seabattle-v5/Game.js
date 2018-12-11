BattleSea.Game = function(game) {

    // ОБЩИЕ ПЕРЕМЕННЫЕ

    // Флаг для определения состояния игры
    this.gameover;
    
    // Музыка, звуки
    this.music;
    this.endGame;
    this.boom;
    this.ding;
    this.shoot;
    this.dustSound

    // Фон игры
    this.bg;
    this.backgroundSky;
    this.seaBack;
    this.seaFront;
    this.groundBack;
    this.groundFront;

    // Управление 
    this.cursors;
    this.fireButton;

    // Верхняя и нижняя граница мира доступного для игрока и вражеских субмарин 
    this.borderTop;
    this.borderBottom;

    //============================================


    // ПЕРЕМЕННЫЕ СВЯЗАННЫЕ С TOP_BAR  И ПРОЧИМ UI

    this.healthBar;
    this.backgroundBar;
    this.countKilledEntmies;

    //============================================


    // ПЕРЕМЕННЫЕ СВЯЗАННЫЕ С ИГРОКОМ

    this.player;

    // Скорость перемещения игрока
    this.speed;

    // Торпеды
    this.myTorpedo; // одна торпеда
    this.myTorpeds; // массив торпед

    // Орграничение скорости выстрелов
    this.fireRate;     // задержка выстрела
    this.nextFireTime; // время следующего выстрела 

    // Объект добавляющий жизнь игроку
    this.addHealth;  // один объект
    this.addHealths; // массив таких объектов

    //============================================


    // ПЕРЕМЕННЫЕ СВЯЗАННЫЕ С ПРОТИВНИКАМИ

    this.enemy;
    this.enemies; // массив противников
    this.enemiesByDistanceX; // массив противников отсортированный по возрастанию координаты Х

    // Массив торпед
    this.enemiesTorpeds;

    // Орграничение скорости выстрелов
    this.fireEnemyRate;     // задержка выстрела
    this.nextEnemyFireTime; // время следующего выстрела 

    // Минимальная дистанция между противниками
    this.distanceX;

    // Кол-во сгенерированных противников
    this.totalEnemies;

    //============================================

    
    // ПЕРЕМЕННЫЕ СВЯЗАННЫЕ С ДРУГИМИ ИГРОВЫМИ ОБЪЕКТАМИ

    // Вспышка при выстреле
    this.flash;         // игрока
    this.enemyFlashes;  // противника

    // Взрыв
    this.boomBoom;

    // Сундук с монетами
    this.monBox;

    // Пыль (при косании дна)
    this.dust;

    // Корабль свой
    this.ship;
    this.myShips; // массив своих кораблей

    //============================================

};

BattleSea.Game.prototype = {
    
    create: function() {

        this.gameover = false;
        this.totalEnemies = 0;

        this.borderTop = 165;
        this.borderBottom = this.game.height - 95;

        this.speed = 5;
        this.fireRate = 2000;
        this.nextFireTime = 0;
        this.myTorpeds = [];

        this.enemies = [];        
        this.fireEnemyRate = 2500;
        this.nextEnemyFireTime = 1500;
        this.enemiesTorpeds = [];
        this.enemyFlashes = [];
        this.enemiesByDistanceX = [];

        this.myShips = [];

        this.moneyBoxes = [];
        this.addHealths = [];

        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.06, true);
        this.endGame = this.add.audio('gameOver_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');
        this.shoot = this.add.audio('shoot_audio');
        this.dustSound = this.add.audio('dust_audio');

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
        backgroundSky = this.add.tileSprite(0, 0, 1920, 110, 'bgSky');
        backgroundSky.scale.setTo(1.2, 1.5); 

        // Создание заднего плана моря
        seaBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackSea');

        // Создание переднего плана моря
        seaFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontSea');

        // Группа в которой находятся  переменные groundBack, this.monBox, this.dust (необходимо для отрисовки на нужном слое)
        this.ground = this.add.group();

        // Создание заднего плана дна
        groundBack = this.add.tileSprite(0, 0, 1920, 1080, 'bgBackGround');
        this.ground.add(groundBack);        

        // Функция запускающая процесс создания сундуков с монетами
        this.buildMoneyBox();

        // Создание игока
        this.buildPlayer();

        // Функция запускающая процесс создания противников
        this.buildEnemies();

        //Создание переднего плана дна
        groundFront = this.add.tileSprite(0, 0, 1920, 1080, 'bgFrontGround');

        //======================================================================

        // TOP_BAR

        // Уровень жизни
        mySubTopBar = this.add.image(20, 10, 'mySubTopBar');
        backgroundBar = this.game.add.image(120, 35, 'red-bar');
        backgroundBar.fixedToCamera = true;
        backgroundBar.scale.setTo(0.4, 0.3);
        this.healthBar = this.game.add.image(120, 35, 'green-bar');
        this.healthBar.fixedToCamera = true;
        this.healthBar.scale.setTo(0.4, 0.3);

        // Часы отображающие перезарядку
        myTorpedsTopBar = this.add.image(410, 40, 'myTorpedo');
        myTorpedsTopBar.scale.setTo(1.8, 1.8);
        this.clockTopBar = this.add.sprite(490, 20, 'clockTopBar');
        this.clockTopBar.scale.setTo(0.5, 0.5);
        this.clockTopBar.animations.add('move', [0,1,2,3,4,5,6,7,8,9,10], 10/this.fireRate*1000, false);
        this.clockTopBar.animations.play('move');


        this.style = { font: "36px Minnie", fill: "#ffffff" };        

        // Отрисовка кол-ва монет
        moneyTopBar = this.add.image(570, 22, 'money');
        moneyTopBar.scale.setTo(0.7, 0.7);
        this.countMoney = this.add.text(640, 30, 'x ' + this.game.global.totalMoney, this.style);            
        this.countMoney.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2); 

        // Отрисовка кол-ва уничтоженных противников
        this.countKilledEntmies = this.add.text(this.world.width - 190, 25, '' + this.game.global.totalKilledEnemies + ' x', this.style);            
        this.countKilledEntmies.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);   
        enemySubTopBar = this.add.image(this.world.width - 20, 10, 'mySubTopBar');
        enemySubTopBar.scale.setTo(-1, 1);
    },

    buildPlayer: function() {

        // Создание игрока

        this.player = this.add.sprite(100, 350, 'mySub');
        this.physics.arcade.enable(this.player);
        this.player.body.setSize(140, 76, 5, 14);  // изменение физического размера тела
        this.player.anchor.setTo(0.5, 0.5); 
        this.player.animations.add('move', [0,1,2,3,4,5,6,7,8], 60, true);
        this.player.animations.play('move');
        this.player.health = 100;       // кол-во жизни при старте
        this.player.maxHealth = 100;    // максимальное кол-во жизни
    },

    generateMyShip: function() {

        // Создание корабля

        this.ship = this.add.sprite(-360, 110, 'myShip');
        this.physics.enable(this.ship, Phaser.Physics.ARCADE);
        this.ship.anchor.setTo(0.5, 0.5); 
        this.ship.scale.setTo(0.6, 0.6);
        this.ship.animations.add('move', [0,1,2,3,4,5,6,7,8], 10, true);
        this.ship.animations.play('move');
        this.ship.body.velocity.x = 100;
        this.myShips.push(this.ship);
        this.ship.checkWorldBounds = true;
        this.ship.events.onOutOfBounds.add(this.resetMyShip, this);
    },

    resetMyShip: function(ship) {

        // Уничтожение корабля при выходе за границы мира

        for (var i = 0; i < this.myShips.length; ++i) {
            if(this.myShips[i].x + this.ship.width/2 > this.world.width) {
                this.myShips.length = 0;
                this.updateshipActive();
            }
        }
    },

    updateshipActive: function() {

        // Обнуление флага наличия корабля в игре

        this.game.global.shipActive = 0;
    },

    buildEnemies: function() {

        // Функция запускающая процесс создания противника с рандомным интервалом времени

        if(this.gameover == false){
            var timer = this.game.time.create(false);
            timer.loop(this.rnd.integerInRange(2500, 4000), this.generateEnemy, this);
            timer.start();
        }
    },

    generateEnemy: function() {

        // Создание противника

        this.totalEnemies ++;

        // Координа по оси Y зависит от наличия корабля в игре
        if (this.myShips.length !== 0) {
            var xPos = this.world.width + 200;
            var yPos = this.game.rnd.integerInRange(this.borderTop+55, this.borderBottom);
        }else{
            var xPos = this.world.width + 200;
            var yPos = this.game.rnd.integerInRange(this.borderTop, this.borderBottom);            
        }

        this.enemy = this.add.sprite(xPos, yPos, 'enemySub');
        this.physics.enable(this.enemy, Phaser.Physics.ARCADE);
        this.enemy.anchor.setTo(0.5, 0.5);
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

    resetEnemy: function(enemy) {

        // Уничтожение противника при выходе за границы мира

        for (var i = 0; i < this.enemies.length; ++i) {
            if(this.enemies[i].x - this.enemy.width < 0) {
                this.enemies[i].kill();   
            }
        }
    },

    fireEnemy: function() {

        // Создание торпеды (выстрел портивник)

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

        // Создание вспышки при выстриле

        var timer = this.game.time.create(false);
        timer.add(100, this.killFlashEnemy, this);
        timer.start();

        this.flashEnemy = this.add.image(ememyX - 130, enemyY + 30, 'flash');
        this.flashEnemy.anchor.setTo(0.5, 0.5);
        this.flashEnemy.scale.setTo(-0.1, 0.1);
        this.enemyFlashes.push(this.flashEnemy);
    },

    killFlashEnemy: function() {

        // Уничтожение вспышки после выстрела

        for (var i = 0; i < this.enemyFlashes.length; i++) {
            this.enemyFlashes[i].kill();
        }
    },

    buildMoneyBox: function() {

        // Функция запускающая процесс создания сундука с рандомным интервалом времени

        if(this.gameover == false){
            var timer = this.game.time.create(false);
            timer.loop(this.rnd.integerInRange(50000, 80000), this.generateMoneyBox, this);
            timer.start();
        }
    },

    generateMoneyBox: function() {

        // Создание сундука с монетами

        this.monBox = this.add.sprite(this.world.width + 200, this.world.height-75, 'moneyBox');
        this.physics.enable(this.monBox, Phaser.Physics.ARCADE);
        this.monBox.anchor.setTo(0.5, 0.5);
        this.monBox.enableBody = true;
        this.monBox.body.velocity.x = -150;
        this.moneyBoxes.push(this.monBox);
        this.monBox.checkWorldBounds = true;
        this.monBox.events.onOutOfBounds.add(this.resetMonBox, this);
        this.ground.add(this.monBox);
    },

    resetMonBox: function(monBox) {

        // Уничтожение сундука при выходе за границы мира

        for (var i = 0; i < this.moneyBoxes.length; ++i) {
            if(this.moneyBoxes[i].x - this.monBox.width/2 < 0) {
                this.moneyBoxes[i].kill();   
            }
        }
    },  

    takeMoney: function(s) {

        // Увеличение кол-ва монет и отрисовка их заново в TOP_BAR

        this.game.global.totalMoney += s;
        this.countMoney.setText('x ' + this.game.global.totalMoney); 
    },

    fire: function() {

        // Создание торпеды (выстрел игрока)

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

        // Уничтожение вспышки после выстрела

        this.flash.kill();
    },

    explosion: function(x, y) {

        // Создание взрыва

        this.boom.play('', 0, 0.03, false);
        this.boomBoom = this.add.sprite(x, y, 'boomBoom');
        this.physics.arcade.enable(this.boomBoom);
        this.boomBoom.enableBody = true;
        this.boomBoom.anchor.setTo(0.5, 0.5); 
        this.boomBoom.scale.setTo(0.8, 0.8);
        this.boomBoom.animations.add('move');
        this.boomBoom.animations.play('move', [0,1,2,3,2,1,0], 10, true);
    },

    killExplosion: function() {

        // Удаление взрыва

        this.boomBoom.kill();
    },

    damage: function() {

        // Уменьшение жизни игрока при столкновении с торпедой или противником

        this.player.damage(20);

        this.healthBar.scale.setTo(0.4 * this.player.health / this.player.maxHealth, 0.3);
        if (this.player.alive == false){

            this.explosion(this.player.x, this.player.y);

            var timer1 = this.game.time.create(false);
            timer1.add(100, this.killExplosion, this);
            timer1.start();

            var timer2 = this.game.time.create(false);
            timer2.add(400, this.gameOver, this);
            timer2.start();
        }
    },

    damageDust: function() {

        // Уменьшение жизни игрока при косании дна

        this.player.damage(0.1);

        this.healthBar.scale.setTo(0.4 * this.player.health / this.player.maxHealth, 0.3);

        if (this.player.alive == false){

            this.dust.visible = false;
            this.explosion(this.player.x, this.player.y);

            var timer1 = this.game.time.create(false);
            timer1.add(100, this.killExplosion, this);
            timer1.start();

            var timer2 = this.game.time.create(false);
            timer2.add(400, this.gameOver, this);
            timer2.start();
            
        }
    },

    heal: function() {

        // Увеличение жизни игрока

        this.player.health += 50;

        if(this.player.health > this.player.maxHealth) {
            this.player.health = this.player.maxHealth;
        }
        this.healthBar.scale.setTo(0.4 * this.player.health / this.player.maxHealth, 0.3);
        this.updateaddHealthActive();
    },

    updateTotalKilledEnemies: function() {

        // Обновление количества уничтоженных противников

        this.game.global.totalKilledEnemies ++;

        if (this.game.global.totalKilledEnemies < 10) {
            this.countKilledEntmies.position.setTo(this.world.width - 190, 25);
            this.countKilledEntmies.setText('' + this.game.global.totalKilledEnemies + ' x');            
        }
        else {
            this.countKilledEntmies.position.setTo(this.world.width - 225, 25);
            this.countKilledEntmies.setText('' + this.game.global.totalKilledEnemies + ' x');
        }
    },

    generateAddHealth: function() {

        // Создание объекта добавляющего жизнь

        this.addHealth = this.add.sprite(this.ship.x, this.ship.y, 'addHealth');
        this.physics.enable(this.addHealth, Phaser.Physics.ARCADE);
        this.addHealth.anchor.setTo(0.5, 0.5);
        this.addHealth.enableBody = true;
        this.addHealth.body.velocity.y = 80;
        this.addHealth.body.velocity.x = -30;
        this.addHealths.push(this.addHealth);
        this.addHealth.checkWorldBounds = true;
        this.addHealth.events.onOutOfBounds.add(this.resetAddHealth, this);
        this.game.global.addHealthActive ++;
    },

    resetAddHealth: function(addHealth) {

        // Удаление объекта добавляющего жизнь при выходе за границы мира

        for (var i = 0; i < this.addHealths.length; ++i) {
            if(this.addHealths[i].x - this.addHealth.width/2 <= 0) {
                this.addHealths = []; 
                this.updateaddHealthActive();
            }
        }
    },

    updateaddHealthActive: function() {

        // Обнуление флага наличия объекта добавляющего жизнь

        this.game.global.addHealthActive = 0;
    },

    generateDust: function(x) {

        // Создание пыли (при косании дна)

        this.game.global.dustActive ++;

        this.dust = this.add.sprite(x, this.borderBottom+10, 'submarineDust');
        this.physics.enable(this.dust, Phaser.Physics.ARCADE);
        this.dust.anchor.setTo(0.5, 0.5); 
        this.dust.scale.setTo(0.5, 0.35)
        this.dust.animations.add('move', [0,1,2,3,4,5,6,7,8], 20, true);
        this.dust.animations.play('move');
        this.dustSound.play('', 0, 0.06, true);
        this.ground.add(this.dust);
    },

    gameOver: function() {

        // Функция вызываемая при кол-ве жизни = 0

        this.music.stop();
        this.dustSound.stop();
        this.endGame.play();
        this.state.start('GameOver');
    },
 
    update: function() {

        // Прокрутка заднего фона

        backgroundSky.tilePosition.x -= 1;
        seaBack.tilePosition.x -= 1.5;          
        seaFront.tilePosition.x -= 2;  
        groundBack.tilePosition.x -= 2.5;          
        groundFront.tilePosition.x -= 3;

        // =====================================

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

        // ======================================

        // Ограничение перемещения лодки

        if (this.myShips.length !== 0) {

            for (var i = 0; i < this.myShips.length; ++i) {
                var playerBorderLeft = this.player.x - this.player.width/2;
                var playerBorderRight = this.player.x + this.player.width/2;
                var shipBorderLeft = this.myShips[i].x - this.ship.width/2;
                var shipBorderRight = this.myShips[i].x + this.ship.width/2;

                if ( ((playerBorderLeft >= shipBorderLeft) && (playerBorderRight <= shipBorderRight)) || 
                     ((playerBorderLeft < shipBorderLeft)  && (playerBorderRight > shipBorderLeft))   || 
                     ((playerBorderLeft < shipBorderRight) && (playerBorderRight > shipBorderRight)) ) {

                    if (this.player.x <= (0 + this.player.width/2)){
                        this.player.x = this.player.width/2;
                    }
                    if (this.player.x >= (this.game.width - this.player.width/2)){
                        this.player.x = this.game.width - this.player.width/2;
                    }
                    if (this.player.y >= (this.borderBottom)){
                        this.player.y = this.borderBottom;
                        this.damageDust();
                    }
                    if (this.player.y <= 220) {
                        this.player.y = 220;
                    }
    
                } else {

                    if (this.player.x <= (0 + this.player.width/2)){
                        this.player.x = this.player.width/2;
                    }
                    if (this.player.x >= (this.game.width - this.player.width/2)){
                        this.player.x = this.game.width - this.player.width/2;
                    }
                    if (this.player.y >= (this.borderBottom)){
                        this.player.y = this.borderBottom;
                        this.damageDust();
                    }
                    if (this.player.y <= this.borderTop){
                        this.player.y = this.borderTop;
                    }      
                }
            }
        } 

        if (this.myShips.length == 0) {

            if (this.player.x <= (0 + this.player.width/2)){
                this.player.x = this.player.width/2;
            }
            if (this.player.x >= (this.game.width - this.player.width/2)){
                this.player.x = this.game.width - this.player.width/2;
            }
            if (this.player.y >= this.borderBottom){
                this.player.y = this.borderBottom;
                this.damageDust();
            }
            if (this.player.y <= this.borderTop){
                this.player.y = this.borderTop;
            }
        }

        if (this.player.y >= this.borderBottom && this.game.global.dustActive === 0) {
            this.generateDust(this.player.x - this.player.width);
        }

        if (this.player.y < this.borderBottom) {

            if (typeof this.dust !== 'undefined') {
                this.game.global.dustActive = 0;
                this.dust.visible = false;
                this.dustSound.stop();
            }
        }

        if (typeof this.dust !== 'undefined') {
            this.dust.x = this.player.x - this.player.width;
        }

        // ============================================================================


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
                this.explosion(this.enemiesTorpeds[i].x-50, this.enemiesTorpeds[i].y);
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

        // Игрока и объекта добавляющего жизнь

        for (var i = 0; i < this.addHealths.length; ++i) {
            if(this.physics.arcade.overlap(this.addHealths[i], this.player, null, null, this)) {
                this.addHealths[i].kill();
                this.ding.play();
                this.heal();
            }
        }


        // Определяем противников, которые могут между собой столкнуться и выбираем для них направление движения

        // Создаём новый массив противнтков в котором противники будут отсортированы по возрастанию координаты Х
        this.enemiesByDistanceX = this.enemies.slice(0);
        this.enemiesByDistanceX.sort(function(a,b) {
            return a.x - b.x;
        });

        for (var k = 0; k < this.enemiesByDistanceX.length; k++){
            var topClearance = this.borderTop + this.enemiesByDistanceX[k].height + this.enemiesByDistanceX[k].height/2;
            var bottomClearance = this.borderBottom - this.enemiesByDistanceX[k].height - this.enemiesByDistanceX[k].height/2;
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

                    //==== Проверяем может ли он пересечся с предыдущим по оси Y
                    if ( ((enemyTopM < enemyBottomK) && (enemyTopM > enemyTopK)) || 
                         ((enemyBottomM < enemyBottomK) && (enemyBottomM > enemyTopK)) ) {

                        //==== Проверяем дистанцию между этим и предыдущим элементом (по Оси Х) 
                        if ( (enemyLeftM - enemyRightK) < this.distanceX ) {

                            //==== Определяем возможные направления движения
                            if ( this.enemiesByDistanceX[m].y <= this.world.height/2) {
                                if ((enemyTopK >= topClearance) && (enemyBottomK > enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вниз
                                    this.enemiesByDistanceX[m].body.velocity.y += 1;                                    
                                }
                                else if ((enemyTopK >= topClearance) && (enemyBottomK <= enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вверх
                                    this.enemiesByDistanceX[m].body.velocity.y -= 1;  
                                }
                                else if ((enemyTopK <= topClearance) && (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вниз
                                    this.enemiesByDistanceX[m].body.velocity.y += 1; 
                                }
                                else {
                                    // уменьшаем скорость
                                    this.enemiesByDistanceX[m].body.velocity.x = -120;
                                }
                            }

                            else if ( this.enemiesByDistanceX[m].y > this.world.height/2) {
                                if ((bottomClearance - enemyBottomK >= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && 
                                    (enemyBottomK <= enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вниз
                                    this.enemiesByDistanceX[m].body.velocity.y += 1;                                    
                                }
                                else if ((bottomClearance - enemyBottomK >= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && 
                                         (enemyBottomK > enemyBottomM) && (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вверх
                                    this.enemiesByDistanceX[m].body.velocity.y -= 1;  
                                }
                                else if ((bottomClearance - enemyBottomK <= this.enemiesByDistanceX[m].height + this.enemiesByDistanceX[m].height/2) && 
                                         (enemyRightK + 150 < enemyLeftM )) {
                                    // двигаемся вверх
                                    this.enemiesByDistanceX[m].body.velocity.y -= 1; 
                                }
                                else {
                                    // уменьшаем скорость
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


        // После создания 20 противников запускать функцию создания корабля

        if(this.gameover == false){

            if(((this.game.global.totalKilledEnemies+1) % 20 == 0) && this.game.global.shipActive === 0){
                this.generateMyShip();
                this.game.global.shipActive ++;
            }
        }

        // При существовании корабля когда он на середине ширины мира запустить функцию сздания объекта добавляющего жизнь

        if (typeof this.ship !== "undefined") {

            if ( (Math.round(this.ship.x) >= (Math.round(this.game.width/2)-5)) && 
                 (Math.round(this.ship.x) < (Math.round(this.game.width/2)+5))  && 
                 (this.game.global.addHealthActive === 0) ) {

                this.generateAddHealth();
            }
        }

        // Перемещение объекта добавляющего жизнь при косании дна

        if (typeof this.addHealth !== "undefined") {

            if (this.addHealth.body.y >= this.borderBottom) {
                this.addHealth.body.y = this.borderBottom;
                this.addHealth.body.velocity.x = -150;
            }

            if (this.addHealth.body.y >= this.borderBottom-100) {
                this.ground.add(this.addHealth);                
            }
        }

    },

    render: function() {

        // this.game.debug.spriteInfo(this.player, 50, 400);
        // this.game.debug.spriteInfo(this.ship, 50, 400);
        // this.game.debug.body(this.player);
        // if (typeof this.ship !== "undefined") {
        //     this.game.debug.body(this.ship);
        // }
        // this.game.debug.body(this.enemy, 'rgba(0,255,0,0.4)', false);
        // this.game.debug.soundInfo(this.music, 50, 200);
        // this.game.debug.spriteInfo('Sprite z-depth: ' + this.monBox, 200, 200);


    }
};