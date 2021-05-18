/*
 * Julia Liszka
 * Creative Programming II
 * Final Project
 * 
 * Orange
 */


p5.disableFriendlyErrors = true;

let points = [];
let c1, c2;

let noisePos = 0;     // "position" in the Perlin noise
let noiseInc = 0.01;

function setup() {
	createCanvas(windowWidth, windowHeight);
	noLoop();
	c1 = color(166, 58, 80);
	c2 = color(255, 252, 49);
	randomSeed(100);
}

function draw() {
	let test = dist(width/2-100, height/2+20, width/2, height/2);
	

	background(87, 74, 66);

	let gridSize = 100;
	mySquare(gridSize, 10);
	let ctr = 0;
	let change = 0;
	distort();
	for (let j=-1*gridSize; j<=height+gridSize; j+=gridSize*1.1) {
		ctr = change;
		for (let i=-1*gridSize; i<=width+gridSize; i+=gridSize*1.1) {
			create(i, j);
			if (ctr%4 == 0) {
				spiral(i-gridSize/2, j-gridSize/2, 45, 2, 10, gridSize);
			}
			ctr++;
			fill(243, 110, 43);
			square(i-gridSize/2, j-gridSize/2, 99);
			fill(255, 173, 72);
			square(i-gridSize/2, j-gridSize/2, 33);
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

	fill(255, 252, 49, 50);
	stroke(255, 252, 49);
	strokeWeight(0.8);
	circle(width/2, height/2, 600);
}

function distortImage() {
	console.log("enter");
	let output = createImage(width, height);
	loadPixels();
	output.loadPixels();

	for (let y=0; y<height; y++) {
		for (let x=0; x<width; x++) {      

			let a = 10;
			

			let tempX = int(x + (x-width/2)*noise(noisePos)/a);
			let tempY = int(y + (y-height/2)*noise(noisePos)/a);

			let px = get(tempX, tempY);
			if (dist(x, y, width/2, height/2) > 300) {
				output.set(x, y, px);
			}
			noisePos += noiseInc;
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
		stroke(166, 58, 80);
	}
	else {
		stroke(67, 74, 66);
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
