function animate(){
	ctx1.clearRect(0,0, canvas.width, canvas.height);
	ctx2.clearRect(0,0, canvas.width, canvas.height);
	ctx3.clearRect(0,0, canvas.width, canvas.height);
	ctx4.clearRect(0,0, canvas.width, canvas.height);
	
	ctx2.drawImage(background_lvl2, 0, 0, canvas.width, canvas.height);
	handleParticles();
	handleObstacles();
	frogger.draw();
	frogger.update();
	handleScoreBoard();
	
	ctx4.drawImage(grass, 0, 0, canvas.width, canvas.height);
	frame++;
	requestAnimationFrame(animate);
}

animate();

function scored(){
	score ++;
	gameSpeed += 0.05;
	frogger.x = canvas3.width/2 - frogger.width/2;
	frogger.y = canvas3.height - frogger.height - 40;
}
function resetGame(){
	collisionsCount ++;
	score = 0;
	gameSpeed = 1;
	frogger.x = canvas3.width/2 - frogger.width/2;
	frogger.y = canvas3.height - frogger.height - 40;
}


function handleScoreBoard(){
	ctx4.fillStyle = 'black';
	ctx4.strokeStyle = 'black';
	
	ctx4.font = '15px Verdana';
	ctx4.strokeText('Score', 265, 15);
	
	ctx4.font = '60px Verdana';
	ctx4.fillText(score, 270, 65);
	
	ctx4.font = '15px Verdana';
	ctx4.strokeText('Collisions: ' + collisionsCount, 10, 175);
	ctx4.strokeText('Game Speed: ' + gameSpeed.toFixed(1), 10, 195);
	
}

//collision detection between two rectangles
function collision(first, second){
	return !(first.x + first.width < second.x || 		// first obj completely left of second obj
			first.x > second.x + second.width || 		// first obj completely left of second obj
			first.y + first.height < second.y ||		// first obj completely above second obj
			first.y > second.y + second.height);		// first obj completely below second obj
}


//event listeners

// const keys = {
	// ArrowUp: false,
	// ArrowDown: false,
	// ArrowRight: false,
	// ArrowLeft: false,
// };

window.addEventListener('keydown', function(e){
	key = [];
	keys[e.keyCode] = true;
	if(keys[37] || keys[38] || keys[39] || keys[40]){
		frogger.jump();
	}
});

window.addEventListener('keyup', function(e){
	delete keys[e.keyCode];
	frogger.moving = false;
});
// window.addEventListener('keydown', function(e){
	// keys[e.key] = true;
	// if (keys["ArrowDown"] === true || keys["ArrowLeft"] === true || keys["ArrowRight"] === true || keys["ArrowUp"] === true){
		// frogger.jump();
	// }
// });

// window.addEventListener('keyup', function(e){
	// keys[e.key] = false;

	// // keys.splice(keys.filter((_, index) => index != e.key));	// filter out the indexOf e.key to splice it ( faster than just using keys.splice(indexOf(e.key))?!
// });