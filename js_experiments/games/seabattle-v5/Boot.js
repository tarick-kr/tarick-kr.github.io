var BattleSea = {};

BattleSea.Boot = function(game) {};

BattleSea.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar2.png');
        this.load.image('titleimage', 'images/titleImage2.png');
        this.load.image('titleSubmarine', 'images/titleSubmarine.png');

    },
    
    create: function() {

        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 480;
		this.scale.minHeight = 270;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = false;
		this.stage.forceLandscape = true;

		this.scale.setScreenSize(true);

		this.input.addPointer();

        this.state.start('Preloader');
    }
}