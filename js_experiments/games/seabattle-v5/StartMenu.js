BattleSea.StartMenu = function(game) {
    this.startBG;
    this.startPrompt;
    this.ding;
    this.style;
}

BattleSea.StartMenu.prototype = {
	
	create: function () {
        this.ding = this.add.audio('select_audio');
        
		startBG = this.add.image(0, 0, 'titlescreen');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);

		this.style = { font: "84px Minnie", fill: "#ffffff" };

		startPrompt = this.add.text(this.world.centerX-550, this.world.centerY+250,'Нажмите чтобы начать!', this.style);
		startPrompt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);


	},

	startGame: function (pointer) {
        this.ding.play();
		this.state.start('Game');
	}


};

