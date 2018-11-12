var BattleSea = {};

BattleSea.Boot = function(game) {};

BattleSea.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'images/loaderBar.png');
        this.load.image('titleText', 'images/titleText.png');
        this.load.image('prelodSubmarine', 'images/titleSubmarine.png');
        


    },
    
    create: function() {

        this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = false;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 640;
		this.scale.minHeight = 360;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = false;
		this.stage.forceLandscape = true;

		this.scale.setScreenSize(true);

		this.input.addPointer();

        this.state.start('Preloader');
    }
}