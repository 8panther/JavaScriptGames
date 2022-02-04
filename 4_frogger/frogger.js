const scale = 5;

class Frogger{
	constructor(){
		this.spriteWidth = 250;
		this.spriteHeight = 250;
		this.width = this.spriteWidth/scale;
		this.height = this.spriteHeight/scale;
		this.x = canvas.width/2 - this.width/2;
		this.y = canvas.height - this.height - 40;
		this.moving = false;
		this.safe = false;
		this.frameX = 0;
		this.frameY = 0;
		this.framecount = 0;
	}
	update(){
		if (this.framecount > 0){
		this.framecount --
		}
		else this.frameX = 0;
		
		if (keys[38]) { // up
			if (this.moving === false){
				this.y -= grid;
				this.moving = true;
				
				this.frameY = 0;
				// this.frameX = 1;
				
			}
		} 
		if (keys[40]) { // down
			if (this.moving === false && this.y < canvas.height -this.height *2){
				this.y += grid;
				this.moving = true;
				this.frameY = 3;
			}
		} 
		if (keys[37]) { // left
			if (this.moving === false && this.x > this.width  ){
				this.x -= grid;
				this.moving = true;
				this.frameY = 2;
			}
		} 
		if (keys[39]) { // right
			if (this.moving === false && this.x < canvas.width - this.width *2  ){
				this.x += grid;
				this.moving = true;
				this.frameY = 1;
			}
		} 
		
		
		if (this.y < 0){
			scored()
		}
		
		// if(this.frameX >= 1) this.frameX = 0
		// else this.frameX++
	}
	draw(){
		ctx3.fillStyle = 'green';
		// ctx3.fillRect(this.x, this.y, this.width, this.height);
		ctx3.drawImage(froggerSprite,
						this.frameX* this.spriteWidth,
						this.frameY* this.spriteHeight,
						250,
						250,
						this.x-this.width/2,
						this.y-this.width/2,
						this.width* 2,
						this.height* 2);
	}
	jump(){
		createParticles();
		console.log('jump');
		this.framecount = 10;
		
		if (this.moving === false) this.frameX = 1;
		
		// else if(this.frameX === 1) this.frameX = 0;
	}
}

const frogger = new Frogger();

