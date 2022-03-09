const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


// load images
const images = {};
images.player = new Image();
images.player.src = 'character.png';

// const characterActions  = ['up', 'top right', 'right', 'down right', 'down', 'jump'];
const characterActions  = ['up', 'right', 'left', 'jump', 'down right'];

const characters = [];
const numberOfCharacters = 10;

class Character {
	constructor(){
		this.width = 103.0625;
		this.height = 113.125;
		this.frameX = 3;
		
		this.x = Math.random()*canvas.width;
		this.y = Math.random()*canvas.height;
		this.speed = (Math.random() * 1.5) + 5.5;
		this.action = characterActions[Math.floor(Math.random() * characterActions.length)];
		
		if (this.action === 'up'){
			this.frameY = 0;
			this.minFrame = 3
			this.maxFrame = 15
		}
		else if(this.action === 'right'){
			this.frameY = 3;
			this.minFrame = 3
			this.maxFrame = 13
		}
		else if(this.action === 'jump'){
			this.frameY = 7;
			this.minFrame = 0
			this.maxFrame = 9
		}
		else if(this.action === 'down right'){
			this.frameY = 4;
			this.minFrame = 4
			this.maxFrame = 15
		}
	}
	draw(){
		drawSprite(images.player,
				this.width * this.frameX, 
				this.height * this.frameY, 
				this.width, 
				this.height, 
				this.x, 
				this.y, 
				this.width, 
				this.height);
				
		if (this.frameX < this.maxFrame) {
			this.frameX++
		}
		else{ this.frameX = this.minFrame;}
	}
	update(){
		switch (this.action){
			case 'right':
				if (this.x < canvas.width + this.width) {
					this.x += this.speed;
				}
				else {
					this.x = 0 - this.width;
					this.y = Math.random() * (canvas.height - this.height);
				}
				break;
			case 'up':
				if (this.y < (0 - this.height)) {
					this.y = canvas.height + this.height;
					this.x = Math.random() * canvas.width;
				}
				else{
					this.y -= this.speed;;
				}
				break;
			// }
			case 'down right':
				if (this.y > (canvas.height + this.height) && this.x > this.width + canvas.width) {
					this.y = 0 - this.height;
					this.x = Math.random() * canvas.width/2;
				}
				else{
					this.y += this.speed;
					this.x += this.speed;
				}
		}
	}
}



for (let i = 0; i< numberOfCharacters; i++){
	characters.push(new Character());
}
// const playerWidth = 103.0625;
// const playerHeight = 113.125;

// let playerFrameX = 3;	// defines the position of the picture on the spreadsheet
// let playerFrameY = 3;

// let playerX = 0;
// let playerY = 0;
// const playerSpeed = 6;

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH){ // s == Source Image; d == Destination Canvas
	ctx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}


function animate(){
	ctx.clearRect(0,0, canvas.width, canvas.height);
	for(let c of characters){
	c.draw();
	c.update();
	}
}

window.onload = setInterval(animate, 1000/30);

window.addEventListener('rezise', function(){
	canvas.height = window.innerHeight;
	canvas.width = window.innerWidth;
});