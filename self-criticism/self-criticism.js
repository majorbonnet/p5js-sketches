const palette = ['#da4343', "#000", "#999"]
const needles = [];
const numberOfNeedles = 200;
const needleSpeed = 0.1
let floor1 = null;

function setup() {
	createCanvas(windowWidth, windowHeight);
	floor1 = new Floor();

	for (let i = 0; i < numberOfNeedles; i++) {
		needles.push(new Needle(i, floor1));
	}
}

function draw() {
	background("#fcfcdd");
	
	for (const needle of needles) {
		needle.update();
		needle.draw();
	}
	
	floor1.update();
	floor1.draw();
}

function Floor() {
	const myHeight = Math.ceil(random(windowHeight * 0.55, windowHeight * 0.75));
	let needlePricks = 0;
	let throbChange = 0;
	let colorChanges = 0;
	let throbLength = 1;
	
	let throbbingFor = 0;
	let throbs = 0;
	let prickedSinceLastUpdate = false;
	
	this.height = myHeight;
	
	this.addNeedlePrick = function() {
		needlePricks++;
		prickedSinceLastUpdate = true;
	}
	
	this.update = function() {
		if (needlePricks > 0 && needlePricks < numberOfNeedles) {
			throbbingFor++;
			
			if (throbbingFor / 60 > throbLength) {
				throbbingFor = 0;
				
				if (throbChange === 0) {
					if (throbLength <= 0.25 && colorChanges < 3) {
						colorChanges++;
					}
					
					throbChange = 150 + (25 * colorChanges);
				} else {
					throbChange = 0;	
				}
				
				throbs++;
				
				if (throbs > 3) {
					throbs = 0;
					throbLength = throbLength - 0.25 <= 0.25 ? 0.25 : throbLength - 0.25;
				}
			}
		} else if (needlePricks > 0) {
			throbChange = 150 + (25 * colorChanges);
		}
		
		prickedSinceLastUpdate = false;
	}
	
	this.draw = function() {
		strokeWeight(2);
		
		const col = color(palette[0]);
		col.setAlpha(throbChange);
		
		stroke(palette[0]);
		fill(col);
		
		rect(0, myHeight, windowWidth, windowWidth - myHeight);
	}
}

function Needle(index, myFloor) {
	const weight = random(10, 50);
	const noiseDirection = random(1) > 0.5;
	const xPos = (windowWidth / numberOfNeedles) * (index + 1) + (noise(windowWidth / numberOfNeedles * (index + 1)) * 10 * (noiseDirection ? -1 : 1));
	const length = random(40, 80);
	const velocity = Math.floor(weight / 10 + length / 10);
	const col = palette[Math.floor(random(0, palette.length))];
	
	let top = random(-200, 150);
	let hasPricked = false;
	let frames = 0;
	
	this.update = function() {
		if (hasPricked) return;

		if (top + length === myFloor.height) {
			top = myFloor.height - length + velocity;
			myFloor.addNeedlePrick();
			hasPricked = true;
		} else {
			top += velocity * needleSpeed;

			if (top + length >= myFloor.height) {
				top = myFloor.height - length;
			}
		}
	}
	
	this.draw = function() {
		strokeWeight(weight / 10);
		stroke(col);
		
		push();
		translate(xPos, top);
		line(0, 0, 0, length);
		pop();
	}
}