BattleSea.StartMenu = function(game) {
    this.startBG;
    this.titleSub;
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

        titleSub = this.add.sprite(this.world.centerX, this.world.centerY-50, 'titleSubmarine');
        titleSub.anchor.setTo(0.5, 0.5);
        titleSub.animations.add('move', [0,1,2,3,4,5,6,7,8], 40, true);
        titleSub.animations.play('move');

		this.style = { font: "84px Minnie", fill: "#ffffff" };

		startPrompt = this.add.text(this.world.centerX-550, this.world.centerY+250,'Нажмите чтобы начать!', this.style);
		startPrompt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);


	},

	startGame: function (pointer) {
        this.ding.play();
		this.state.start('Game');
	}


};

