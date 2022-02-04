class Obstacle{
	constructor(type, x, y, width, height, speed){
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
		this.speed = speed;
		this.type = type;
	}
	
	update(){
		this.x += this.speed * gameSpeed;
		if (this.speed >0){
			if (this.x > canvas.width + this.width){
				this.x = 0 - this.width;
			}
		}
		else{
			if(this.x < -this.width){
				this.x= canvas.width
			}
		}
	}
}
class Car extends Obstacle{
	constructor(type, x, y, width, height, speed){
		super(type, x,y,width,height,speed );
		this.frameX = 0; 
		this.frameY = Math.floor(Math.random()*3); 
	}
	draw(){
		// ctx3.fillRect(this.x, this.y, this.width, this.height);
		ctx3.drawImage(cars, this.frameX* 160 , this.frameY*80 , 160, 80, this.x, this.y-13, this.width, this.height+30);
	}
	update(){
		this.x += this.speed * gameSpeed;
		if (this.speed >0){
			if (this.x > canvas.width + this.width){
				this.x = 0 - this.width;
				this.frameY = Math.floor(Math.random()*3);  // take another random car from spritesheet
			}
		}
		else{
			this.frameX = 1;
			if(this.x < -this.width){
				this.x= canvas.width;
				this.frameY = Math.floor(Math.random()*3);  // take another random car from spritesheet
			}
		}
	}
}

class Log extends Obstacle{
	constructor(type, x, y, width, height, speed){
		super(type, x,y,width,height,speed );
	}
	draw(){
		// ctx3.fillRect(this.x, this.y, this.width, this.height);
		ctx3.drawImage(log, 0 ,0 , 160, 80, this.x, this.y- 20, this.width, this.height +40);
	}
}

class Turtle extends Obstacle{
	constructor(type, x, y, width, height, speed){
		super(type, x,y,width,height,speed );
		this.frameX = 0;
		this.frameY = 0;
		this.randomize = Math.floor(Math.random()*30+30); 
	}
	draw(){
		// ctx3.fillStyle = "green";
		// ctx3.fillRect(this.x, this.y, this.width, this.height);
		if (frame % this.randomize == 0){
			if(this.frameX >=1) this.frameX = 0;
			else this.frameX ++;
		}
		ctx1.drawImage(turtles, this.frameX*70 ,this.frameY*70 , 70, 70, this.x, this.y, this.width, this.height);
	}
}

function initObstacles(){
	
	for (let i = 0; i< 3; i++){
		if (i < 2){
		// lane 1
		let x = i*350;
		carsArray.push(new Car('car', x, canvas.height - grid*2 -20, grid*2, grid, 1));
		
		// lane 2
		x = i*300;
		carsArray.push(new Car('car', x, canvas.height - grid*3 -20, grid*2, grid, -2));
		
		// lane 3
		x = i*400;
		carsArray.push(new Car('car', x, canvas.height - grid*4 -20, grid*3, grid, 2));
		
		// lane 4
		x = i*400;
		logsArray.push(new Log('log', x, canvas.height - grid*5 -20, grid*2, grid, -2));
		}
		// lane 5
		x = i*200;
		logsArray.push(new Turtle('turtle', x, canvas.height - grid*6 -20, grid, grid, 1));
	}
}

function handleObstacles(){
	for (let i= 0; i < carsArray.length; i++){
		carsArray[i].update();
		carsArray[i].draw();
		if (collision(frogger, carsArray[i])){//collision with carsArray
			ctx4.drawImage(collisions,
							0,
							100, 
							100, 
							100, 
							frogger.x, 
							frogger.y, 
							100, 
							100)
			resetGame();
		}
	}
	frogger.safe = false;
	for (let i= 0; i < logsArray.length; i++){
		logsArray[i].update();
		logsArray[i].draw();
		if (frogger.y > 100 && frogger.y < 250){
			// 
			if (collision(frogger, logsArray[i])){//collision with logsArray
				frogger.safe = true;
				//wenn zu weit links/rechts muss frosch herunter rutschen
				frogger.x += logsArray[i].speed;
			}
		}
	}
	if (frogger.y > 100 && frogger.y < 250 && frogger.safe == false) {
			ctx4.drawImage(collisions,
							0,
							0, 
							100, 
							100, 
							frogger.x, 
							frogger.y, 
							100, 
							100)
			resetGame();
			}	
	
}
initObstacles();
