var BattleSea = {};

BattleSea.Boot = function(game) {};

BattleSea.Boot.prototype = {
    preload: function() {
        this.load.image('preloaderBar', 'images/loader_bar.png');
        this.load.image('titleimage', 'images/TitleImage2.png');
    },
    
    create: function() {

		this.stage.backgroundColor = '#0088ff';    	
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