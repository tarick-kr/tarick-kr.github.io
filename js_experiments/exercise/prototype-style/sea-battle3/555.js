

// Constants............................................................

	// Constants are listed in alphabetical order from here on out

	BACKGROUND_VELOCITY = 42,

	STARTING_BACKGROUND_VELOCITY = 0,

	STARTING_BACKGROUND_OFFSET = 0,


// Images............................................................

	background  = new Image(),

// Time..............................................................

	lastAnimationFrameTime = 0,
	lastFpsUpdateTime = 0,
	fps = 60,

// Translation offsets...............................................

	backgroundOffset = STARTING_BACKGROUND_OFFSET,


// Velocities........................................................

	bgVelocity = STARTING_BACKGROUND_VELOCITY,


// ---------------------------- FUNCTIONS ------------------------------ 

// Drawing..............................................................

function draw() {
	setOffsets(); //+++
	drawBackground(); //+++
}

function setOffsets() {
	setBackgroundOffset(); //+++
}

function setBackgroundOffset() {
	var offset = backgroundOffset + bgVelocity/fps;

	if (offset > 0 && offset < background.width) {
		backgroundOffset = offset;
	}
	else {
		backgroundOffset = 0;
	}
}

function drawBackground() {
	context.translate(-backgroundOffset, 0);

	// Initially onscreen:
	context.drawImage(background, 0, 0);

	// Initially offscreen:
	context.drawImage(background, background.width, 0);

	context.translate(backgroundOffset, 0);
}

function calculateFps(now) {
	var fps = 1000 / (now - lastAnimationFrameTime);
	lastAnimationFrameTime = now;

	if (now - lastFpsUpdateTime > 1000) {
		lastFpsUpdateTime = now;
		// fpsElement.innerHTML = fps.toFixed(0) + ' fps';
	}
	return fps; 
}

function turnLeft() {
   bgVelocity = -BACKGROUND_VELOCITY;
}

function turnRight() {
   bgVelocity = BACKGROUND_VELOCITY;
}
   
// Animation............................................................

function animate(now) { 
   fps = calculateFps(now); //+++
   draw(); //+++
   requestNextAnimationFrame(animate); //+++
}

// ------------------------- INITIALIZATION ----------------------------

function initializeImages() {
   background.src = 'backgroundSea.png';

   background.onload = function (e) {
      startGame(); //+++
   };
}

function startGame() {
   window.requestNextAnimationFrame(animate); //+++
}

// Launch game.........................................................

initializeImages(); //+++

setTimeout( function (e) {
   turnRight(); //+++
}, 1000);