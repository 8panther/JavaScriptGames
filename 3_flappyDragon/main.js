

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// canvas.height = 600;
// canvas.width = 400;

let spacePressed = false;
let angle = 0;
let hue = 0 ;
let frameNumber = 0;
let running = true;

let score = 0;
let gameSpeed = 5;


let gradient = ctx.createLinearGradient(0,0,0,70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');
// function animate() {
	// ctx.clearRect(0,0, canvas.width, canvas.height);
	// ctx.fillRect(10,10,100,50);	
	// requestAnimationFrame(animate);
// }

const background = new Image();
background.src = 'background.jpg';


const BG ={
	x1: 0,
	x2: canvas.width,
	y:0,
	width: canvas.width,
	height: canvas.height,
}

function handleBackground(){
	if(BG.x1 <= -BG.width + gameSpeed) BG.x1 = BG.width;
	else BG.x1 -= gameSpeed;
	if (BG.x2 <= -BG.width + gameSpeed) BG.x2 = BG.width;
	else (BG.x2 -= gameSpeed);
	ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
	ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}


let fps, fpsInterval, startTime, now, then, elapsed;

function startAnimating(fps){
	fpsInterval = 1000/fps;
	then = Date.now();
	startTime = then;
	animate();
}

function animate(){
	requestAnimationFrame(animate);
	now = Date.now();
	elapsed = now - then;
	if(elapsed > fpsInterval && running == true){
		then = now -(elapsed % fpsInterval);
		
		// "animations":
		ctx.clearRect(0,0, canvas.width, canvas.height);
		
		handleBackground();
		handleObstacles();
		handleParticles();
		bird.update();
		ctx.fillStyle = gradient;
		ctx.font = '90px Georgia';
		ctx.strokeText(score, 450, 70);
		ctx.fillText(score, 450, 70 );
		
		// handleCollisions();
		if (handleCollisions()) {
			running = false;
		}
		else{
			angle+= 0.5	;	
			hue++;
			frameNumber++;
		}
		
	}
}

startAnimating(30);



window.addEventListener('keydown', function(e){
	// console.log(e.code);
	if (e.code === 'Space'){
		bird.flap();
		spacePressed = true;
	}
});

window.addEventListener('keyup', function(e){
	if (e.code === 'Space'){
		spacePressed = false;
	}
		// player.moving = false;
	// keys.splice(keys.filter((_, index) => index != e.key));	// filter out the indexOf e.key to splice it ( faster than just using keys.splice(indexOf(e.key))?!
	// console.log(keys);
	
});

const bang = new Image();
bang.src = 'bang.png';


function handleCollisions(){
	for ( let i = 0; i < obstaclesArray.length; i++){
		if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width &&
			bird.x + bird.width > obstaclesArray[i].x &&
			((bird.y < 0 + obstaclesArray[i].ceil && bird.y + bird.height > 0) ||
			(bird.y > canvas.height - obstaclesArray[i].bottom && bird.y + bird.height < canvas.height))){
				// collision detected
				ctx.drawImage(bang, bird.x, bird.y, 50, 50);
				ctx.font = "25px Georgia";
				ctx.fillStyle = 'black';
				ctx.fillText('Game Over, your score is ' + score, 160, canvas.height/2 -12);
				return true;
			}
	}
} 



window.addEventListener('rezise', function(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});