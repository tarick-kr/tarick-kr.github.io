BattleSea.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
    // this.ding;
    this.style;
}

BattleSea.StartMenu.prototype = {
	
	create: function () {
        // this.ding = this.add.audio('select_audio');
        
		startBG = this.add.image(0, 0, 'titlescreen');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
		// this.style = { font: "36px Minnie", fill: "#ffffff", boundsAlignH: "center", boundsAlignV: "middle" };
		this.style = { font: "36px Minnie", fill: "#ffffff" };
		// startPrompt = this.add.text(0, 0,'Нажмите чтобы начать!', this.style);
		startPrompt = this.add.text(this.world.centerX-230, this.world.centerY+180,'Нажмите чтобы начать!', this.style);
		startPrompt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		// startPrompt.aligh = "center";
	    // startPrompt.setTextBounds(0, 0, 540, 960);

	},

	startGame: function (pointer) {
        // this.ding.play();
		this.state.start('Game');
	}


};

