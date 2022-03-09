const obstaclesArray = [];



class Obstacle{
	constructor(){
		this.ceil = Math.random() * canvas.height/3 + 20;
		this.bottom = Math.random() * canvas.height/3 + 20;
		this.x = canvas.width;
		this.width = 20;
		this.color = 'hsla(' + hue + ', 100%, 50%, 1 )';
		this.counted = false;
	}
	draw(){
		ctx.fillStyle = this.color;
		// top obstactle:
		ctx.fillRect(this.x, 0, this.width, this.ceil);
		//bottom obstactle
		ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
	}	
	update(){
		this.x -= gameSpeed;
		if (!this.counted && this.x < bird.x){
			score++;
			this.counted= true;
		}
		this.draw();
	}
}


function handleObstacles(){
	if (frameNumber%150 === 0) {
		obstaclesArray.unshift(new Obstacle);
	}
	
	for (i = 0; i < obstaclesArray.length; i++){
		obstaclesArray[i].update();
	}
	// if more than 200 , remove 20
	if ( obstaclesArray.length > 20){
		
		obstaclesArray.pop(obstaclesArray[0]);
		
	}
}