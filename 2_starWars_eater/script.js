const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

// load images
const images = {};
images.playerSprite = new Image();
images.playerSprite.src = 'chewie.png';

images.background = new Image();
images.background.src = "background.png";

images.npcs = { }
images.npcs.astromech1Sprite = new Image();
images.npcs.astromech1Sprite.src = "astromechdroid.png";

images.npcs.astromech2Sprite = new Image();
images.npcs.astromech2Sprite.src = "astromechdroid2.png";

images.npcs.c3poSprite = new Image();
images.npcs.c3poSprite.src = "protocoldroid1.png";

images.npcs.rebelpilot = new Image();
images.npcs.rebelpilot.src = "rebelpilot.png";

images.enemies = { }
images.enemies.tuskenraider = new Image();
images.enemies.tuskenraider.src = "tuskenraider.png";

images.enemies.yuuzhenvong = new Image();
images.enemies.yuuzhenvong.src = "yuuzhenvong.png";

images.enemies.darthmaul = new Image();
images.enemies.darthmaul.src = "darthmaul.png";

const scale = 1;
let gameSpeed = 1;

const goalX = 20;
const goalY = 100;

const npcs = [];
const enemies = [];

let npcsRescued = 0;
let npcsLost = 0;
let enemiesEaten = 0;

const flightRadius = 100;

const keys = {
	ArrowUp: false,
	ArrowDown: false,
	ArrowRight: false,
	ArrowLeft: false,
};

class Character{
	constructor(x,y){
		this.x =  x;
		this.y = y;
		this.frameX = 0;
		this.frameY = 0;
	}
}

class Player extends Character{
	constructor(x,y,frameX, frameY){
		super(x,y,frameX, frameY);
		this.sprite = "playerSprite";
		this.spriteWidth = 40;
		this.spriteHeight = 72;
		this.width = this.spriteWidth / scale;
		this.height = this.spriteHeight / scale;
		this.speed = 10;
		this.moving = false;
		
	}
	draw(){
		// ctx.fillRect(this.x, this.y, this.width, this.height);
		ctx.drawImage(	images[this.sprite],
						this.spriteWidth * this.frameX, 
						this.spriteHeight * this.frameY, 
						this.spriteWidth, 
						this.spriteHeight, 
						this.x, 
						this.y -20, 
						this.width , 
						this.height +20 );
	}
	moveUpdate(){
		if (keys["ArrowDown"] === true && this.y < canvas.height - this.height){
			this.frameY = 0;
			this.y += this.speed*gameSpeed;
			this.moving = true;
		}	
		if (keys["ArrowLeft"] === true && this.x > 0){
			this.frameY = 1;
			this.x -= this.speed*gameSpeed;
			this.moving = true;
		
		}
		if (keys["ArrowRight"] === true && this.x < canvas.width - this.width){
				this.frameY = 2;
				this.x += this.speed*gameSpeed;
				this.moving = true;
		}
		
		if (keys["ArrowUp"] === true && this.y > 50){
			this.frameY = 3;
			this.y -= this.speed*gameSpeed;
			this.moving = true;
		}
		
	}

	handlePlayerFrame(){
		if (this.frameX < 3 && player.moving) {
			this.frameX++
		}
		else{
			this.frameX = 0;
		}
	}
}

class Npc extends Character{
	constructor(x,y,frameX, frameY){
		super(x,y,frameX, frameY);
		
		this.speed = 1.5;
		this.alive = true;
		// grab a random image from the images.npcs object:
		this.sprite = Object.keys(images.npcs)[Math.floor(Math.random()* Object.keys(images.npcs).length)];
		this.spriteWidth = images.npcs[this.sprite].width / 4; // 4 pictures per row
		this.spriteHeight = images.npcs[this.sprite].height/ 4; // 4 pictures per column
		this.width = this.spriteWidth / scale * 1.5; //npc pictures are smaller than the player pic..
		this.height = this.spriteHeight / scale * 1.5;
		}
		
	draw(){
			//ctx.fillRect(this.x, this.y, this.width, this.height);
			ctx.drawImage(images.npcs[this.sprite],
			this.spriteWidth * this.frameX, 
			this.spriteHeight * this.frameY, 
			this.spriteWidth, 
			this.spriteHeight, 
			this.x, 
			this.y, 
			this.width , 
			this.height); 
	}
	NpcMoveUpdate(){
		this.y -= this.speed*gameSpeed;
		if (this.y < goalY){
			npcsRescued += 1;
			this.alive = false;
			
		}
	}
	handleNpcFrame(){
		if (this.frameX < 3) {
			this.frameX++
		}
		else{
			this.frameX = 0;
		}
	}
}

class Enemy extends Character{
	constructor(frameX, frameY){
		super(frameX, frameY);
		
		// grab a random image from the images.enemies object:
		this.sprite = Object.keys(images.enemies)[Math.floor(Math.random()* Object.keys(images.enemies).length)]
		this.spriteWidth = images.enemies[this.sprite].width / 4; // 4 pictures per row
		this.spriteHeight = images.enemies[this.sprite].height/ 4; // 4 pictures per column
		this.width = this.spriteWidth / scale * 1.5; //enemy pictures are smaller than the player pic..
		this.height = this.spriteHeight / scale * 1.5;
		
		this.x = canvas.width;
		this.y = Math.random() * (canvas.height - this.height -50) + 50;
		this.speed = 6;
		this.alive = true;
		this.direction = 'left';
		}
		
	draw(){
			//ctx.fillRect(this.x, this.y, this.width, this.height);
			// ctx.beginPath();
			// ctx.arc(this.x+this.width/2, this.y+this.height/2, this.height/2, 0, Math.PI * 2);
			// ctx.stroke();
			ctx.drawImage(images.enemies[this.sprite],
			this.spriteWidth * this.frameX, 
			this.spriteHeight * this.frameY, 
			this.spriteWidth, 
			this.spriteHeight, 
			this.x, 
			this.y, 
			this.width , 
			this.height ); 
	}
	enemyMoveUpdate(){
		switch(this.direction){
			case 'left':
				this.frameY = 1;
				this.x -= this.speed*gameSpeed;
				break;
			case 'right':
				this.frameY = 2;
				this.x += this.speed*gameSpeed;
				break;
			case 'up':
				this.frameY = 3;
				this.y -= this.speed*gameSpeed;
				break;
		}
		
		if (this.x < 0 + this.width){
			this.alive = false;
		}
	}
	handleEnemyFrame(){
		if (this.frameX < 3) {
			this.frameX++
		}
		else{
			this.frameX = 0;
		}
	}
}

const player = new Player(150,150);


//collision detection between two rectangles
function collision(first, second){
	return !(first.x + first.width < second.x || 		// first obj completely left of second obj
			first.x > second.x + second.width || 		// first obj completely left of second obj
			first.y + first.height < second.y ||		// first obj completely above second obj
			first.y > second.y + second.height);		// first obj completely below second obj
}



//animation loop:
let fps, fpsInterval, startTime, now, then, elapsed;

let frameCount = 0;
let npcSpawnInterval = Math.floor(Math.random()*30)+80; // spawns new npc every 80 -110 frames

let enemiesSpawnInterval = Math.floor(Math.random()*30)+30; // spawns new enemies every 30 - 60 frames

function initNpcs(){
	if (frameCount%npcSpawnInterval == 0 ){
		npcs.push(new Npc(Math.random()* 80, canvas.height- 100));
		npcs[npcs.length-1].frameY = 3; // npcs always move 'up'
		npcSpawnInterval = Math.floor(Math.random()*30)+80;
	}
}

function handleNpcs(){
	for ( let i = 0; i < npcs.length; i++){
		npcs[i].NpcMoveUpdate();
		npcs[i].handleNpcFrame();
		npcs[i].draw();
		
		if (npcs[i].alive == false){
			npcs.splice(i,1);
			i--;
		}
	}
}

function initEnemies(){
	if (frameCount%enemiesSpawnInterval == 0 ){
		enemies.push(new Enemy());
		enemiesSpawnInterval = Math.floor(Math.random()*30)+30;
	}
	//if (enemies.length <1)enemies.push(new Enemy());
}

function handleEnemies(){
	for ( let i = 0; i < enemies.length; i++){
		enemies[i].enemyMoveUpdate();
		enemies[i].handleEnemyFrame();
		enemies[i].draw();
		
		for (let j = 0; j < npcs.length; j++){
			
			if (collision(enemies[i], npcs[j])){
				npcs[j].alive = false;
				npcsLost++;
				// collision image
			}	
		}
			
		if (collision(player, enemies[i])){
			enemies[i].alive = false;
			enemiesEaten++;
			//collision image
		}
			
		if (enemies[i].alive == false){
			enemies.splice(i,1);
			i--;
			console.log(enemies);
		}
	}
}

function handleScoreBoard(){
	ctx.fillStyle = 'black';
	ctx.strokeStyle = 'black';
	ctx.font = '30px Verdana';
	ctx.fillText('Eaten: ' + enemiesEaten, 650, 30);
	ctx.fillText('Saved: ' + npcsRescued, 650, 60);
	ctx.fillText('Lost: ' + npcsLost, 650, 90);
	ctx.font = '15px Verdana';
	ctx.fillText('Game Speed: ' + gameSpeed.toFixed(1), 650, 120);
	
}

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
	if(elapsed > fpsInterval){
		then = now -(elapsed % fpsInterval);
		frameCount++;
		
		ctx.clearRect(0,0, canvas.width, canvas.height);
		ctx.drawImage(images.background, 0, 0, canvas.width, canvas.height);

		initNpcs();
		handleNpcs();
		
		initEnemies();
		handleEnemies();
		
		//animate player
		player.moveUpdate();
		player.handlePlayerFrame();
		player.draw();
		
		handleScoreBoard();
		if (enemiesEaten%100 == 0 && enemiesEaten >0) {
			gameSpeed = gameSpeed*1.1 
		}
	}
}
startAnimating(20);


window.addEventListener('keydown', function(e){
	keys[e.key] = true;
	player.moving = true;
	 // console.log(keys);
});

window.addEventListener('keyup', function(e){
	keys[e.key] = false;
		player.moving = false;
	// keys.splice(keys.filter((_, index) => index != e.key));	// filter out the indexOf e.key to splice it ( faster than just using keys.splice(indexOf(e.key))?!
	// console.log(keys);
	
});