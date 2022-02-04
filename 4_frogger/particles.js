class Particle{
	constructor(x,y){
		this.x = x;
		this.y = y;
		this.radius = Math.random()*20 +1;
		this.opacity = 1;
		this.directionX = Math.random() - 0.5;
		this.directionY = Math.random() - 0.5;
	}
	draw(){
		ctx3.fillStyle = 'rgba(150,150,150,' + this.opacity +')';
		ctx3.beginPath();
		ctx3.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx3.fill();
		ctx3.closePath();
	}
	
	update(){
		this.x += this.directionX;
		this.y += this.directionY;
		if(this.opacity > 0.1){
			this.opacity -= Math.random() * 0.1;
		}
		if (this.radius > 0.15){
			this.radius -= 0.14;
		}
		if (this.opacity > 0.1){
			this.opacity -= 0.9;
		}
	}
	drawRipple(){
		ctx1.strokeStyle = 'rgba(150,150,150,' + this.opacity +')';
		ctx1.beginPath();
		ctx1.arc(this.x, this.y, this.radius, 0, Math.PI*2);
		ctx1.stroke();
		ctx1.closePath();
	}
	ripple(){
		if (this.radius < 50){
			this.radius += 0.7;
			this.x -= 0.03;
			this.y -= 0.03;
		}
		if(this.opacity > 0){
			this.opacity -= 0.02;
		}
	}
}

function createParticles(){
	// ( if ( (((keys[37] || keys[38] || keys[39] || keys[40]))) && frogger.y > 250 && particlesArray.length < maxParticles+10)
	if ( frogger.y > 250 && particlesArray.length < maxParticles+10){
		for (let i = 0 ; i< 50; i++){	
			particlesArray.unshift(new Particle(frogger.x + frogger.width/2, frogger.y +frogger.height/2))
			// console.log(particlesArray.length);
		}
	}
	// water ripples
	if ( frogger.y < 250 && frogger.y > 100){
		for (let i = 0 ; i< 20; i++){	
			ripplesArray.unshift(new Particle(frogger.x + frogger.width/2, frogger.y +frogger.height/2))
		}
	}
}

function handleParticles(){
	for (let i = 0; i< particlesArray.length -1; i++){
		particlesArray[i].update();
		particlesArray[i].draw();
	}
	if (particlesArray.length > maxParticles){
		// console.log(particlesArray.length);
		for (let i = 0 ; i < 30; i++){
			particlesArray.pop();
		}
	}
	
	// water ripples
	for (let i = 0; i< ripplesArray.length -1; i++){
		ripplesArray[i].ripple();
		ripplesArray[i].drawRipple();
	}
	if (ripplesArray.length > 20){
		for (let i = 0 ; i < 5; i++){
			ripplesArray.pop();
		}
	}
	
}
	