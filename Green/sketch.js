/*
 * Julia Liszka
 * Creative Programming II
 * Final Project
 * 
 * GREEN
 */


p5.disableFriendlyErrors = true;

let points = [];
let c1, c2;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
	c1 = color(9, 77, 146);
	c2 = color(195, 247, 78);
	randomSeed(100);
}

function draw() {
	let test = dist(width/2-100, height/2+20, width/2, height/2);
	console.log(test);

	background(104, 182, 132);

	let gridSize = 207;
	mySquare(gridSize, 10);
	let ctr = 0;
	let change = 0;
	distort();
	for (let j=-1*gridSize; j<=height+gridSize; j+=gridSize*1.1) {
		ctr = change;
		for (let i=-1*gridSize; i<=width+gridSize; i+=gridSize*1.1) {
			create(i, j);
			if (ctr%4 == 0) {
				spiral(i-gridSize/2, j-gridSize/2, 35, 5, -10, gridSize);
			}
			ctr++;
			fill(149, 224, 108);
			circle(i-gridSize/2, j-gridSize/2, 99);
			fill(195, 247, 58);
			circle(i-gridSize/2, j-gridSize/2, 33);
		}
		if (change == 0) {
			change = 1;
		}
		else {
			change = 0;
		}
	}

	img = distortImage();
	img.resize(width, height);
	image(img, 0, 0);

	fill(9, 77, 146, 50);
	stroke(9, 77, 146);
	strokeWeight(0.8);
	circle(width/2, height/2, 600);
}

function distortImage() {
	let output = createImage(width, height);
	loadPixels();
	output.loadPixels();

	for (let y=0; y<height; y++) {
		for (let x=0; x<width; x++) {      

			let a = 110;
			let tempX = 0.9*int(x+a*cos(x/y*PI));
			let tempY = 0.9*int(y+a*cos(y/x*PI));

			let px = get(tempX, tempY);
			if (dist(x, y, width/2, height/2) > 300) {
				output.set(x, y, px);
			}

		}
	}
	output.updatePixels();
	return output;
}

function dist(x0, y0, x1, y1) {
	let a = (x0-x1)^2;
	let b =(y0-y1)^2
	return integer(sqrt(a + b));
}

function spiral(centerX, centerY, deg, spread, startR, endR) {
	let angle = map(deg, -180, 180, -1*PI, PI);
	let radius = startR;
	let theta = 0;
	let x = 0;
	let y = 0;

	push();

	translate(centerX, centerY);

	noFill();
	if (random() < 0.25) {
		stroke(9, 77, 146);
	}
	else {
		stroke(28, 16, 24);
	}
	strokeWeight(12);

	beginShape();
	while (radius <= endR) {
		radius += spread;
		theta += angle;
		x = radius*cos(theta);
		y = radius*sin(theta);
		curveVertex(x, y);
	}
	endShape();

	pop();
}

function mySquare(s, n) {

	// s = side length
	// n = nummber of points
	// n/s = points per side

	for (let j=0; j<4; j++) {
		for (let i=0; i<=s; i+=s/n) {
			let p;
			if (j == 0) {
				p = createVector(i, 0);
			}
			else if (j == 1) {
				p = createVector(s, i);
			}
			else if (j == 2) {
				p = createVector(s-i, s);
			}
			else {
				p = createVector(0, s-i);
			}
			points.push(p);
		}
	}

	return points;
}

function distort() {
	for (let i=0; i<points.length; i++){
		let x = points[i].x;
		let y = map(points[i].y, 0, height, 10, height-10);
		points[i].x = x + 40* cos(i*PI);
		points[i].y = y + 40* cos(i*PI);
	}
}

function create(x, y) {
	let cHelper = map(-2.1*x+1.2*y, 0, -2.1*width+1.2*height, 0, 1);
	let c = lerpColor(c1, c2, cHelper);
	fill(c);
	noStroke();

	push();
	translate(x, y);
	rotate(PI);

	beginShape();
	for (let i=0; i<points.length; i++) {
		curveVertex(points[i].x, points[i].y);
	}
	endShape(CLOSE);

	pop();
}
