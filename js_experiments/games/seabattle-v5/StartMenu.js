BattleSea.StartMenu = function(game) {
    this.startBG;
    this.titleSub;
    this.startPrompt;
    this.ding;
    this.style;
    this.bubblesgroup;
    this.totalBubbles;
    this.buildBubblesAll;
    this.totalBubblesAll;
    this.startMenu;
}

BattleSea.StartMenu.prototype = {
	
	create: function () {
        this.startMenu = true;
        this.ding = this.add.audio('select_audio');
        
		startBG = this.add.image(0, 0, 'titlescreen');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);

        titleSub = this.add.sprite(this.world.centerX, this.world.centerY-50, 'titleSubmarine');
        titleSub.anchor.setTo(0.5, 0.5);
        titleSub.animations.add('move', [0,1,2,3,4,5,6,7,8], 50, true);
        titleSub.animations.play('move');

		this.style = { font: "84px Minnie", fill: "#ffffff" };
		startPrompt = this.add.text(this.world.centerX-550, this.world.centerY+250,'Нажмите чтобы начать!', this.style);
		startPrompt.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);

		this.totalBubbles = 200;
		this.totalBubblesAll = 50;
		this.buildBubbles();
		this.buildBubblesAll();

	},

	buildBubblesAll: function() {
        this.bubblesAllgroup = this.add.group();
        
        for(var i=0; i<this.totalBubblesAll; i++) {
            var bubble = this.bubblesgroup.create(this.rnd.integerInRange(20, this.world.width-20), this.rnd.integerInRange(0, this.world.height-50), 'bubble');
            var scale = this.rnd.realInRange(0.1, 0.4);
            bubble.scale.x = scale;
            bubble.scale.y = scale;
            bubble.anchor.x = 0.5;
            bubble.anchor.y = 0.5;
            this.physics.enable(bubble, Phaser.Physics.ARCADE);
            bubble.enableBody = true;
            bubble.body.velocity.y = this.rnd.integerInRange(-200, -100);
            bubble.checkWorldBounds = true;
            bubble.events.onOutOfBounds.add(this.resetBubbleYAll, this);
        }
	},

    buildBubbles: function() {
        this.bubblesgroup = this.add.group();
        
        for(var i=0; i<this.totalBubbles; i++) {
            var bubble = this.bubblesgroup.create(this.rnd.integerInRange(100, 150), this.rnd.integerInRange(0, this.world.height-50), 'bubble');
            var scale = this.rnd.realInRange(0.05, 0.2);
            bubble.scale.x = scale;
            bubble.scale.y = scale;
            bubble.anchor.x = 0.5;
            bubble.anchor.y = 0.5;
            // this.bX = this.bubble.x;
            this.physics.enable(bubble, Phaser.Physics.ARCADE);
            bubble.enableBody = true;
            bubble.body.velocity.y = this.rnd.integerInRange(-400, -80);
            // bubble.body.velocity.x = this.rnd.integerInRange(-50, 50);
            // bubble.reversBubbleX;
            bubble.checkWorldBounds = true;
            bubble.events.onOutOfBounds.add(this.resetBubbleY, this);
        }
    },

    // reversBubbleX: function(bubble) {
    // 	if(bubble.x >= 50) {

    // 	}
    // },

    resetBubbleY: function(bubble) {
        if(bubble.y < this.world.height) {
            this.respawnBubbleY(bubble);   
        }
    },

    resetBubbleYAll: function(bubble) {
        if(bubble.y < this.world.height) {
            this.respawnBubbleYAll(bubble);   
        }
    },
    
    respawnBubbleY: function(bubble) {
    	if(this.startMenu == true){
	        bubble.reset(this.rnd.integerInRange(100, 150), this.world.height-50);
	        bubble.body.velocity.y = this.rnd.integerInRange(-400, -80);
        }
    },

    respawnBubbleYAll: function(bubble) {
    	if(this.startMenu == true){
	        bubble.reset(this.rnd.integerInRange(20, this.world.width-20), this.world.height-50);
	        bubble.body.velocity.y = this.rnd.integerInRange(-200, -50);
        }
    },

	startGame: function (pointer) {
        this.ding.play();
		this.state.start('Game');
	}

};

