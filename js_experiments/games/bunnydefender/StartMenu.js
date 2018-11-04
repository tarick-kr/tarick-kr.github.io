BunnyDefender.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
    this.ding;
    this.style;
}

BunnyDefender.StartMenu.prototype = {
	
	create: function () {
        this.ding = this.add.audio('select_audio');
        
		startBG = this.add.image(0, 0, 'titlescreen');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
		this.style = { font: "bold 32px Roboto", fill: "#ffffff" };
		startPrompt = this.add.text(this.world.centerX-180, this.world.centerY+180,'Нажмите чтобы начать!', this.style);
		startPrompt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
		startPrompt.aligh = "center";

		// startPrompt = this.add.bitmapText(this.world.centerX-155, this.world.centerY+180, 'minnie', 'Нажмите чтобы начать! ', 24);
	},

	startGame: function (pointer) {
        this.ding.play();
		this.state.start('Game');
	}
};

