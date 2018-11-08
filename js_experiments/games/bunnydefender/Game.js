BunnyDefender.Game = function(game) {
    this.totalBunnies;
    this.bunnyGroup;
    this.totalSpacerocks;
    this.spacerockgroup;
    this.burst;
    this.gameover;
    this.countdown;
    this.level;
    this.countLevel;
    this.overmessage;
    this.secondsElapsed;
    this.timer;
    this.music;
    this.ouch;
    this.boom;
    this.ding;
    this.style;
    this.deltaSpeedMin;
    this.deltaSpeedMax;
    this.timerSpeed;
    this.countSpeed;
    this.minVel;
    this.maxVel;
};

BunnyDefender.Game.prototype = {
    
    create: function() {
        this.gameover = false;
        this.secondsElapsed = 0;
        this.timer = this.time.create(false);
        this.timer.loop(1000, this.updateSeconds, this);
        this.totalBunnies = 20;
        this.totalSpacerocks = 20;
        
        this.music = this.add.audio('game_audio');
        this.music.play('', 0, 0.3, true);
        this.ouch = this.add.audio('hurt_audio');
        this.boom = this.add.audio('explosion_audio');
        this.ding = this.add.audio('select_audio');


        this.countSpeed = 1;
        this.deltaSpeedMin = 1;
        this.deltaSpeedMax = 1;
        this.minVel = 100;
        this.maxVel = 350;

        this.countLevel = 1;
      
        this.buildWorld();
   
    },
    
    updateSeconds: function() {
        this.secondsElapsed++;
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'sky');
        this.add.image(0, 800, 'hill');
        this.buildBunnies();
        this.buildSpaceRocks();
        this.buildEmitter();
        this.style = { font: "32px Roboto", fill: "#ffffff" };
        this.countdown = this.add.text(10, 50, 'Осталось кроликов ' + this.totalBunnies, this.style);
        this.level = this.add.text(10, 10, 'LEVEL ' + this.countLevel, this.style);
        this.timer.start();
        this.speedGame();
    },
    
    buildBunnies: function() {
        this.bunnygroup = this.add.group();
        this.bunnygroup.enableBody = true;
        for(var i=0; i<this.totalBunnies; i++) {
            var b = this.bunnygroup.create(this.rnd.integerInRange(50, this.world.width-50), this.rnd.integerInRange(this.world.height-180, this.world.height-60), 'bunny', 'Bunny0000');
            b.anchor.setTo(0.5, 0.5);
            b.body.moves = false;
            b.animations.add('Rest', this.game.math.numberArray(1,58));
            b.animations.add('Walk', this.game.math.numberArray(68,107));
            b.animations.play('Rest', 24, true);
            this.assignBunnyMovement(b);
        }
    },
    
    assignBunnyMovement: function(b) {
        bposition = Math.floor(this.rnd.realInRange(50, this.world.width-50));
        bdelay = this.rnd.integerInRange(2000, 6000);
        if(bposition < b.x){
            b.scale.x = 1;
        }else{
            b.scale.x = -1;
        }
        t = this.add.tween(b).to({x:bposition}, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay);
        t.onStart.add(this.startBunny, this);
        t.onComplete.add(this.stopBunny, this);
    },
    
    startBunny: function(b) {
        b.animations.stop('Play');
        b.animations.play('Walk', 24, true);
    },
    
    stopBunny: function(b) {
        b.animations.stop('Walk');
        b.animations.play('Rest', 24, true);
        this.assignBunnyMovement(b);
    },
    
    buildSpaceRocks: function() {
        this.spacerockgroup = this.add.group();
        
        for(var i=0; i<this.totalSpacerocks; i++) {
            var r = this.spacerockgroup.create(this.rnd.integerInRange(50, this.world.width-50), this.rnd.realInRange(-2000, 0), 'spacerock', 'SpaceRock0000');
            var scale = this.rnd.realInRange(0.3, 1.0);
            r.scale.x = scale;
            r.scale.y = scale;
            r.anchor.x = 0.5;
            r.anchor.y = 0.5;
            this.physics.enable(r, Phaser.Physics.ARCADE);
            r.enableBody = true;
            r.body.velocity.y = this.rnd.realInRange(this.minVel, this.maxVel);
            r.animations.add('Fall');
            r.animations.play('Fall', 20, true);
            r.checkWorldBounds = true;
            r.events.onOutOfBounds.add(this.resetRock, this);
        }
    },
    
    
    resetRock: function(r) {
        if(r.y > this.world.height) {
            this.respawnRock(r);   
        }
    },
    
    respawnRock: function(r) {
        if(this.gameover == false){
            r.reset(this.rnd.integerInRange(50, this.world.width-50), this.rnd.realInRange(-2000, 0));
            r.body.velocity.y = this.rnd.integerInRange(this.minVel, this.maxVel);
        }
    },
    
    buildEmitter:function() {
        this.burst = this.add.emitter(0, 0, 80);
        this.burst.minParticleScale = 0.3;
        this.burst.maxParticleScale = 1.0;
        this.burst.minParticleSpeed.setTo(-20, 20);
        this.burst.maxParticleSpeed.setTo(20, -20);
        this.burst.makeParticles('explosion');
        this.input.onDown.add(this.fireBurst, this);
    },
    
    fireBurst: function(pointer) {
        if(this.gameover == false){
            this.boom.play();
            this.boom.volume = 0.2;
            this.burst.emitX = pointer.x;
            this.burst.emitY = pointer.y;
            this.burst.start(true, 800, null, 10);
        }
    },
    
    burstCollision: function(r, b) {
        this.respawnRock(r);  
    },
    
    bunnyCollision: function(r, b) {
        if(b.exists){
            this.ouch.play();
            this.respawnRock(r);
            this.makeGhost(b);
            b.kill();
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },
    
    checkBunniesLeft: function() {
        if(this.totalBunnies <= 0){
            this.gameover = true;
            this.timerSpeed.stop();
            this.timer.stop();
            this.music.stop();
            this.countdown.setText('Кроликов больше нет');
            this.style = { font: "45px Roboto", fill: "#ffffff" };
            this.overmessage = this.add.text(this.world.centerX-180, this.world.centerY-120, 'ИГРА ОКОНЧЕНА\n\n' + this.secondsElapsed + ' сек\n\n' + 'LEVEL ' + this.countLevel, this.style);
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true;
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this);
        }else {
            this.countdown.setText('Осталось кроликов ' + this.totalBunnies);
        }
    },
    
    quitGame:function(pointer) {
        this.ding.play();

        this.state.start('StartMenu');
    },
    
    friendlyFire: function(b, e){
        if(b.exists){
            this.ouch.play();
            this.makeGhost(b);
            b.kill();
            this.totalBunnies--;
            this.checkBunniesLeft();
        }
    },
    
    makeGhost: function(b) {
        bunnyghost = this.add.sprite(b.x-20, b.y-180, 'ghost');
        bunnyghost.anchor.setTo(0.5, 0.5);
        bunnyghost.scale.x = b.scale.x;
        this.physics.enable(bunnyghost, Phaser.Physics.ARCADE);
        bunnyghost.enableBody = true;
        bunnyghost.checkWorldBounds = true;
        bunnyghost.body.velocity.y = -800;
    },


    speedGame: function() {
        this.timerSpeed = this.time.create(false);
        this.timerSpeed.loop(15000, this.updateCountSpeed, this);
        this.timerSpeed.start();
    },

    updateCountSpeed: function() {
   
        this.countSpeed++;
        
        this.totalSpacerocks += 5;        
        this.ding.play();
        this.deltaSpeedMin = 1 + this.countSpeed / 10;
        this.deltaSpeedMax = 1 + this.countSpeed / 2 / 10;

        this.minVel = 100;
        this.maxVel = 350;
        this.minVel = this.minVel * this.deltaSpeedMin;
        this.maxVel = this.maxVel * this.deltaSpeedMax;

        this.countLevel++;
        this.level.setText('LEVEL ' + this.countLevel);

    },
    
    
    
    update: function() {
        this.physics.arcade.overlap(this.spacerockgroup, this.burst, this.burstCollision, null, this);
        this.physics.arcade.overlap(this.spacerockgroup, this.bunnygroup, this.bunnyCollision, null, this);
        this.physics.arcade.overlap(this.bunnygroup, this.burst, this.friendlyFire, null, this);
    },

    render: function() {
        // this.game.debug.text('timer: ' + this.secondsElapsed, 50, 200);
        // this.game.debug.text('timerSpeed: ' + this.timerSpeed.duration.toFixed(0), 50, 250);
        // this.game.debug.text('countSpeed: ' + this.countSpeed, 50, 300);
        // this.game.debug.text('deltaSpeedMin: ' + this.deltaSpeedMin, 50, 350);        
        // this.game.debug.text('deltaSpeedMax: ' + this.deltaSpeedMax, 50, 400);        
        // this.game.debug.text('minVel: ' + this.minVel, 50, 450);
        // this.game.debug.text('maxVel: ' + this.maxVel, 50, 500);
        // this.game.debug.text('totalSpacerocks: ' + this.totalSpacerocks, 50, 550);
        // this.game.debug.text('countLevel: ' + this.countLevel, 50, 550);

    }
  
    

    
};