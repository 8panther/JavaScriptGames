playerSprite = new Image();

// playerSprite.src = 'robotball_spritesheet.png';
playerSprite.src = 'dragon_spritesheet.png';

class Bird{
	constructor(){
		this.x =  150;
		this.y = 200;
		this.vy = 0;
		// Robotball:
		// this.originalWidth = 411; 
		// this.originalHeight = 524;
		
		// Dragon:
		this.originalWidth = 941; 
		this.originalHeight = 680;
		
		this.width = this.originalWidth/10;
		this.height = this.originalHeight/10;
		this.weight = 1;
		this.frameX = 0;
	}
	draw(){
		// ctx.fillRect(this.x, this.y, this.width, this.height);
		// 
		// ctx.translate(this.x*2 +this.width,0);
		// ctx.scale(-1,1);
		// ctx.setTransform(-1, 0, 0, 1, 0, 0); 
		ctx.drawImage(playerSprite,
						this.originalWidth * this.frameX, 
						0, 
						this.originalWidth, 
						this.originalHeight, 
						this.x, 
						this.y, 
						this.width, 
						this.height);
		// ctx.setTransform(1,0,0,1,0,0);
	}
	update(){
		let curve = Math.sin(angle) * 20;
		if (this.y > canvas.height - (this.height*2) + curve){
			this.y = canvas.height - (this.height*2) + curve;
			this.vy = 0;
		} else {			
			this.vy += this.weight;
			this.y += this.vy;
		}
		if (this.y < 0 + this.height + curve){
			this.y = 0 + this.height + curve;
			this.vy = 0;
		}
		if (spacePressed && this.y > (this.height * 3)){
			this.flap();
		}
		// if (this.frameX < 15){
		if (this.frameX < 3){
			this.frameX += 1;
		}
		else{
			this.frameX = 0;
		}
		this.draw();
	}  
	
	flap(){
		this.vy -= 2;
	}
}

const bird = new Bird();




// ctx.drawImage(playerSprite,
				// this.width * this.frameX, 
				// this.height * this.frameY, 
				// this.width, 
				// this.height, 
				// this.x, 
				// this.y, 
				// this.width , 
				// this.height *2);

