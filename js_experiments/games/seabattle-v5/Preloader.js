BattleSea.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.prelodSub = null;
    this.ready = false;
};

BattleSea.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+410, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY-300, 'titleText');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'images/titleBackground.png');
        this.load.image('bubble', 'images/bubble.png');
        this.prelodSub = this.add.image(this.world.centerX, this.world.centerY, 'prelodSubmarine');
        this.prelodSub.anchor.setTo(0.5, 0.5);
        this.load.spritesheet('titleSubmarine', 'images/submarineSprite623x404.png', 623, 404, 9);

        this.load.image('bg', 'images/bg/bg.png');
        this.load.image('bgBackGround', 'images/bg/bgBackGround.png');
        this.load.image('bgFrontGround', 'images/bg/bgFrontGround.png');
        this.load.image('bgBackSea', 'images/bg/bgBackSea.png');
        this.load.image('bgFrontSea', 'images/bg/bgFrontSea.png');
        this.load.image('bgSky', 'images/bg/bgSky.png');

        this.load.image('myTorpedo', 'images/myTorpedo.png');
        this.load.image('flash', 'images/flash.png');
        this.load.image('enemyTorpedo', 'images/enemyTorpedo.png');
        this.load.image('mySubTopBar', 'images/mySubTopBar.png');
        this.load.image('enemySubTopBar', 'images/enemySubTopBar.png');

        this.load.image('green-bar', 'images/healthBarGreen.png');
        this.load.image('red-bar', 'images/healthBarRed.png');
        this.load.image('moneyBox', 'images/moneyBox.png');
        this.load.image('money', 'images/money.png');
        this.load.image('addHealth', 'images/addHealth.png');
        this.load.image('bomb', 'images/bomb.png');

        this.load.spritesheet('mySub', 'images/mySub155x100.png', 155, 100, 9);
        this.load.spritesheet('enemySub', 'images/enemySubSprite 330x140.png', 330, 140, 4);
        this.load.spritesheet('boomBoom', 'images/boom222x222.png', 222, 222, 5);
        this.load.spritesheet('clockTopBar', 'images/clockTopBar.png', 100, 100, 10);
        this.load.spritesheet('myShip', 'images/myShip560x190.png', 560, 190, 9);
        this.load.spritesheet('enemyShip', 'images/enemyShipSprite560x190.png', 560, 190, 9);

        this.load.spritesheet('submarineDust', 'images/largeSubmarineDustSprite.png', 300, 200, 9);

        this.load.audio('explosion_audio', 'audio/explosion.mp3');
        this.load.audio('gameOver_audio', 'audio/gameover.wav');
        this.load.audio('shoot_audio', 'audio/shoot.wav');
        this.load.audio('game_audio', ['audio/bgm.mp3', 'audio/bgm.ogg']);
        this.load.audio('select_audio', 'audio/select.mp3');
        this.load.audio('start_audio', ['audio/start.mp3', 'audio/start.ogg']);
        this.load.audio('dust_audio', ['audio/dust.wav']);
        this.load.audio('dust_audio', ['audio/dust.wav']);
        this.load.audio('timerBoom_audio', ['audio/timerboom.mp3']);

	},

	create: function () {
		this.preloadBar.cropEnabled = false;
	},

	update: function () {
        if(this.cache.isSoundDecoded('game_audio') && this.cache.isSoundDecoded('start_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
	}
};