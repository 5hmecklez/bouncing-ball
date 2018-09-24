//SERVER: python -m SimpleHTTPServer 8080





let ballRad;

let hellooooo;

class Ball {

	constructor(x, y) {
		this.w = random(ballRad / 2, ballRad + ballRad / 2);
		this.h = this.w;
		this.x = x; //random(this.w/2, width-(this.w/2));
		this.y = y; //random(this.h/2, height-(this.h/2));
		this.xspeed = 2;
		this.yspeed = 2;
		this.xdirection = undefined;
		this.ydirection = undefined;
		this.speedMultiplier = 0;
		this.r = random(0, 255);
		this.g = random(0, 255);
		this.b = random(0, 255);
	}
	update() {
		this.x += this.xspeed * this.xdirection;
		this.y += this.yspeed * this.ydirection;
	}
	showBall() {
		fill(this.r, this.g, this.b);
		ellipse(this.x, this.y, this.w, this.h);
	}
	randRGB() {
		this.r = random(0, 255);
		this.g = random(0, 255);
		this.b = random(0, 255);
	}
	checkX() {
		if (this.x + (this.w / 2) >= width || this.x - (this.w / 2) <= 0) {
			this.hitWall();
			//switch x direction
			this.xdirection = -this.xdirection;
			//if it is on the right, then move it a little to the left
			//otherwise, move it just outside the left
			if (this.x > width / 2) {
				this.x = width - (this.w / 2);
			} else {
				this.x = this.w / 2;
			}
		}
	}
	checkY() {
		if (this.y - (this.h / 2) <= 0 || this.y + (this.h / 2) >= height) {
			this.hitWall();
			//switch y direction
			this.ydirection = -this.ydirection;
			//if it is on the bottom, move it a little bit up
			//otherwise, move it just outside the top
			if (this.y > height / 2) {
				this.y = height - (this.h / 2);
			} else {
				this.y = this.h / 2;
			}
		}
	}
	hitWall() {
		//add multiplier
		this.xspeed += this.speedMultiplier;
		this.yspeed += this.speedMultiplier;
		//randomize color
		this.randRGB();
		//randomize size
		this.w = random(ballRad / 2, ballRad + ballRad / 2);
		this.h = this.w;
	}
	setRandDirection() {
		let _ = random(-1, 1);
		if (_ < 0) {
			this.xdirection = -1;
		} else {
			this.xdirection = 1;
		}
		_ = random(-1, 1);
		if (_ < 0) {
			this.ydirection = -1;
		} else {
			this.ydirection = 1;
		}
	}
}

let balls = [];

function createBall() {
	let newBall = new Ball(mouseX, mouseY);
	newBall.setRandDirection();
	balls.push(newBall);
	print('Number of balls: ' + balls.length);
}

function mousePressed() {
	createBall();
}

function mouseDragged() {
	createBall();
}

function setup() {
	createCanvas(600, 450);

	//set ballRad equal to smaller of width and height (both are p5 vars) * 0.1
	if (width >= height) {
		ballRad = height * 0.12;
	} else {
		ballRad = width * 0.12;
	}

}

function draw() {
	background(0, 100, 100);
	if (balls.length !== 0) {
		for (let ball of balls) {
			ball.showBall();
			ball.update();
			ball.checkX();
			ball.checkY();
		}
	}
}