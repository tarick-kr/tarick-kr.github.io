BattleSea.Preloader = function(game) {
    this.preloadBar = null;
    this.titleText = null;
    this.titleSub = null;
    this.ready = false;
};

BattleSea.Preloader.prototype = {
	
	preload: function () {
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY+410, 'preloaderBar');
		this.preloadBar.anchor.setTo(0.5, 0.5);
		this.load.setPreloadSprite(this.preloadBar);
		this.titleText = this.add.image(this.world.centerX, this.world.centerY-300, 'titleimage');
		this.titleText.anchor.setTo(0.5, 0.5);
        this.load.image('titlescreen', 'images/backgroundSea.png');
        this.titleSub = this.add.image(this.world.centerX, this.world.centerY, 'titleSubmarine');
        this.titleSub.anchor.setTo(0.5, 0.5);
        // this.load.image('hill', 'images/hill.png');
        // this.load.image('sky', 'images/sky.png');
        // this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml');
        // this.load.atlasXML('spacerock', 'images/spritesheets/SpaceRock.png', 'images/spritesheets/SpaceRock.xml');
        // this.load.image('explosion', 'images/explosion.png');
        // this.load.image('ghost', 'images/ghost.png');
        // this.load.audio('explosion_audio', 'audio/explosion.mp3');
        // this.load.audio('hurt_audio', 'audio/hurt.mp3');
        // this.load.audio('select_audio', 'audio/select.mp3');
        this.load.audio('game_audio', 'audio/bgm.mp3');
        

	},

	create: function () {
        // this.stage.setBackgroundColor = 'rgba(68, 136, 170, 0.5)';
		this.preloadBar.cropEnabled = false;

	},

	update: function () {
        if(this.cache.isSoundDecoded('game_audio') && this.ready == false) {
            this.ready = true;
            this.state.start('StartMenu');
        }
	}
};