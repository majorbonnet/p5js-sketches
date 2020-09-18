const blockSize = 30;
const palette = ["#FCAAAA", "#FFFFFF", "#FC7777", "#FC77FC", "#7777Fc", "#FCBB55"]
let flowers = [];
let clouds = [];
let pg = null;

let isWind = false;
let windTime = 0;
let windFrameCount = 0;
let forceBloom = 0;

function setup() {
	createCanvas(windowWidth, windowHeight);
	const numberOfFlowers = Math.floor(random(20, 50));
	const numberOfClouds = Math.floor(random(200, 300));
	pg = createGraphics(windowWidth, windowHeight);
	// todo: noise function to scatter stems
	for (let i = 0; i < numberOfFlowers; i++) {	
		flowers.push(getFlower(i));
	}
	
	for (let i = 0; i < numberOfClouds; i++) {
		clouds.push(getCloud());
	}
}

function draw() {
	let backgroundFactor = mouseX / windowWidth;
	
	
	pg.background(175 * backgroundFactor, 175 * backgroundFactor, 255 * backgroundFactor);
	for (let i = 0; i < clouds.length; i++) {
		clouds[i].render();
	}
	
	if (!isWind && random(0, 1000) > 990) {
			isWind = true;
			windTime = Math.floor(random(5, 10));
	}
	
	if (isWind) {
		windFrameCount++;
		
		if (windFrameCount > 60 * windTime) {
			windFrameCount = 0;
			isWind = false;
		} else {
			pg.push();
		}
	}
	
	for (let i = 0; i < flowers.length; i++) {
		flowers[i].tryGrow();
	}
	
	if (isWind) {
		pg.pop();
	}
	
	image(pg, 0, 0, windowWidth, windowHeight);
}


function getCloud() {
	let xNoise = 0;
	let yNoise = 0;
	let currentYNoise = 0;
	let yNoiseStep = 2;
	
	let yNoiseFrameCount = 0;

	let xPos = Math.ceil(random(-blockSize, windowWidth + blockSize));
	let yPos = Math.ceil(random(blockSize, windowHeight * 0.25));
	let transparency = Math.floor(random(200, 250));
	
	return {
		render: function() {	
			xNoise = random(100) > 80 ? Math.floor(random(0, 2)) : 0;
			
			if (yNoiseFrameCount === 0) {
				yNoise = random(100) > 90 ? Math.floor(random(0, 20)) : 0;		
				yNoiseFrameCount = 1;
			} else {
				if (yNoiseFrameCount > 1500) {
					if (currentYNoise > 0) {
						currentYNoise -= yNoiseStep;
					} else {
						yNoiseFrameCount = 0;
					}
				}
				else {
					yNoiseFrameCount++;

					if (currentYNoise < yNoise && yNoiseFrameCount % 60 == 0) {
						currentYNoise += yNoiseStep;	
					}
				}
			}
		
			xPos += xNoise;
			
			if (xPos > windowWidth + blockSize) {
				xPos = -blockSize;	
			}
			
			pg.push();
			pg.translate(xPos, yPos + yNoise);
			pg.stroke(255, 255, 255);
			pg.fill(255, 255, 255, transparency);
			pg.quad(0, 0, 10, 30, 30, 15, 25, 5);
			pg.pop();		
		}
	};
}

function getFlower(i) {
	let xPos = noise(i * 10) * (windowWidth - (blockSize * 2)) + blockSize * 2;
	let petalColor = color(palette[Math.floor(random(0, palette.length))]);
	let top = windowHeight - blockSize;
	let isFullGrown = false;
	let isFlowering = false;
	let flowerSteps = 0;
	let totalFlowerSteps = Math.floor(random(7,12));
	let steps = 0;
	let leaves = [];
	
	return {
		isFullGrown: isFullGrown,
		tryGrow: function() {
			if (forceBloom > 0 && !isFullGrown && !isFlowering) {
				isFlowering = true;
				forceBloom--;
			}
			
			if (isFullGrown) {
				pg.push();
				pg.translate(xPos, top);
				drawStem(top, leaves);
				pg.pop();
				
				pg.push();
				pg.translate(xPos, top);
				if (flowerSteps > 0) {
					drawFlower(flowerSteps, totalFlowerSteps, petalColor);
				} else {
					drawBud();	
				}
				pg.pop();				
			} else if (isFlowering) {
				if (random(0, 10) > 7) {
					flowerSteps++;
				}
			
				pg.push();
				pg.translate(xPos, top);
				drawStem(top, leaves);
				drawFlower(flowerSteps, totalFlowerSteps, petalColor);
				pg.pop();
				
				if (flowerSteps == totalFlowerSteps) {
					isFlowering = false;
					isFullGrown = true;
				}
			} else if (steps > 150 && random(10) > 9.95) {
				isFlowering = true;
				isFullGrown = false;
				
				flowerSteps++;
				pg.push();
				pg.translate(xPos, top)
				drawStem(top, leaves);
				drawFlower(flowerSteps, totalFlowerSteps, petalColor);
				pg.pop();
			} else {
				let hasGrown = false;
				if (random(0, 10) > 6){
					top -= random(1,3);
					hasGrown = true;
				}
				
				pg.push();
				pg.translate(xPos, top);
				drawBud();
				pg.pop();
				
				pg.push();
				pg.translate(xPos, top);
				drawStem(top, leaves);
				pg.pop();
	
				isFullGrown = hasGrown && (random(0, 10) > 9.99 || top < blockSize * 4);
				
				if (isFullGrown && steps > 250) {
						isFlowering = true;
						flowerSteps++;
						isFullGrown = false;
				}
				
				if (!isFullGrown) {
					let addLeaf = random(0, 1000) > 999;
				  let isOnLeft = random(50) > 25;
				
					if (addLeaf) {
							leaves.push({y: top, isOnLeft: isOnLeft });
					}	
				}
				
				steps++;
			}
		}
	}
}

function drawLeftLeaf(yPos){
	pg.push();
	pg.stroke(5, 175, 5);
	pg.fill(15, 200, 15);
	pg.translate(-blockSize, yPos);
	pg.triangle(0, -3, blockSize + 12, blockSize / 2, blockSize + 12, blockSize);
	pg.pop();
}

function drawRightLeaf(yPos) {
	pg.push();
	pg.stroke(5, 175, 5);
	pg.fill(15, 200, 15);
	pg.translate(blockSize, yPos);
	pg.triangle(blockSize, -3, 0, blockSize, 0, blockSize / 2);	
	pg.pop();
}

function drawFlower(flowerSteps, totalFlowerSteps, petalColor) {
		pg.fill(petalColor);
		pg.stroke(200, 50, 50);
		
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 + 10, 
			(blockSize / 2 - 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 - 10
		);
	
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 + 10, 
			(blockSize / 2 - 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 - 10
		);
	
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 - 10, 
			(blockSize / 2 - 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 + 10
		);
	
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 - 10, 
			(blockSize / 2 - 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 10) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 100) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 + 10
		);
		
		// top petal
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 + 10, 
			(blockSize / 2 - 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 + 10
		);
		
		// bottom petal
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 + 10, 
			(blockSize / 2 - 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 + 10
		);
	
		// left petal
		pg.bezier(
			blockSize / 2 - 10, 
			blockSize / 2 - 10, 
			(blockSize / 2 - 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 - 10, 
			blockSize / 2 + 10
		);
	
		// right petal
		pg.bezier(
			blockSize / 2 + 10, 
			blockSize / 2 - 10, 
			(blockSize / 2 + 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 - 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 80) * ((1 / totalFlowerSteps) * flowerSteps), 
			(blockSize / 2 + 50) * ((1 / totalFlowerSteps) * flowerSteps), 
			blockSize / 2 + 10, 
			blockSize / 2 + 10
		);

		pg.stroke(100, 100, 20);
		pg.fill(200, 200, 100, 200);
		pg.circle(blockSize / 2, blockSize / 2, blockSize);
}

// todo: better stems
function drawStem(top, leaves){
	pg.stroke(5, 175, 5);
	pg.fill(15, 200, 15);
		
	pg.rect(12, 0, blockSize - 12, windowHeight);
	
	for (let i = 0; i < leaves.length; i++) {
		if (leaves[i].isOnLeft) {
			drawLeftLeaf(leaves[i].y - top);
		} else {
			drawRightLeaf(leaves[i].y - top);
		}
	}
}

function drawBud(){
	pg.stroke(5, 175, 5);
	pg.fill(15, 255, 15);
	pg.triangle(12, 0, Math.floor(blockSize / 2), -blockSize, blockSize - 3, 0);
}

function mouseClicked(){
	forceBloom++;
}