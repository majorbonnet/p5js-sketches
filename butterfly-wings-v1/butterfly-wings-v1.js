const stepSize = 30;

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(245, 245, 220);
}

function draw() {
	clear();
	noStroke();
	let points = generatePoints();
	fill(50, 50, 50, 100);
	ellipse(windowWidth / 2, windowHeight / 2, stepSize * 4, windowHeight - (stepSize * 3))
	drawWingsOutline(points);
	drawWingsInterior(points);
	
	fill(255, 255, 255, 175);
	let leftPoints = points.leftPoints.upperEdge.concat(points.leftPoints.side, points.leftPoints.lowerEdge);
	let rightPoints = points.rightPoints.upperEdge.concat(points.rightPoints.side, points.rightPoints.lowerEdge);
	for (let i = 0; i < leftPoints.length; i++) {
		circleSize = random(5, stepSize);
		
		circle(leftPoints[i].x, leftPoints[i].y, circleSize);
		circle(rightPoints[i].x, rightPoints[i].y, circleSize);
	}
	

	frameRate(0.5);
}

function drawWingsInterior(points) {
	fill(200, 150, 0, 100);
	const totalPoints = points.leftPoints.upperEdge.length + points.leftPoints.side.length + points.leftPoints.lowerEdge.length;
	const break1 = Math.floor(random(1, totalPoints / 2));
	const break2 = Math.floor(random(break1, totalPoints));
	
	let firstPoint = null;
	
	let totalCount = 0;
	beginShape();
	vertex(windowWidth / 2, windowHeight / 2);
	curveVertex(points.leftPoints.upperEdge[0].x, points.leftPoints.upperEdge[0].y);
	firstPoint = points.leftPoints.upperEdge[0];

	for (let i = 0; i < points.leftPoints.upperEdge.length; i++) {
		curveVertex(
			points.leftPoints.upperEdge[i].x, 
			points.leftPoints.upperEdge[i].y
		);
		
		totalCount++;
		
		if (totalCount === break1 || totalCount === break2){
			curveVertex((firstPoint.x + points.leftPoints.upperEdge[i].x) / 2 + 20, (firstPoint.y + points.leftPoints.upperEdge[i].y) / 2 + 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = i == points.leftPoints.upperEdge.length - 1 ? points.leftPoints.side[0] : points.leftPoints.upperEdge[i + 1];		
			endShape();
			beginShape();
		}
	}
	curveVertex(
			points.leftPoints.side[0].x, 
			points.leftPoints.side[0].y
	);
	totalCount++;

	if (totalCount == break1 || totalCount == break2){
		curveVertex((firstPoint.x + points.leftPoints.side[0].x) / 2 + 20, (firstPoint.y + points.leftPoints.side[0].y) / 2 + 20)
		curveVertex(firstPoint.x, firstPoint.y);
		firstPoint = points.leftPoints.side[1];
		
		endShape();
		beginShape();
	}
	for (let i = 1; i < points.leftPoints.side.length - 1; i++) {
		curveVertex(
			points.leftPoints.side[i].x, 
			points.leftPoints.side[i].y
		);
		
		totalCount++;

		if (totalCount == break1 || totalCount == break2){
			curveVertex((firstPoint.x + points.leftPoints.side[i].x) / 2 + 20, (firstPoint.y + points.leftPoints.side[i].y) / 2 + 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = points.leftPoints.side[i + 1];
			endShape();
			beginShape();
		}
	}
	curveVertex(
			points.leftPoints.side[points.leftPoints.side.length - 1].x, 
			points.leftPoints.side[points.leftPoints.side.length - 1].y
	);
	totalCount++;

	if (totalCount == break1 || totalCount == break2){
		curveVertex((firstPoint.x + points.leftPoints.side[points.leftPoints.side.length - 1].x) / 2 + 20, (firstPoint.y + points.leftPoints.side[points.leftPoints.side.length - 1].y) / 2 + 20)
		curveVertex(firstPoint.x, firstPoint.y);
		firstPoint = points.leftPoints.lowerEdge[0]
		endShape();
		beginShape();
	}
	for (let i = 0; i < points.leftPoints.lowerEdge.length - 1; i++) {
		curveVertex(
			points.leftPoints.lowerEdge[i].x, 
			points.leftPoints.lowerEdge[i].y
		);
		
		totalCount++;

		if (totalCount == break1 || totalCount == break2){
			curveVertex((firstPoint.x + points.leftPoints.lowerEdge[i].x) / 2 + 20, (firstPoint.y + points.leftPoints.lowerEdge[i].y) / 2 - 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = points.leftPoints.lowerEdge[i + 1];
			endShape();
			beginShape();
		}
	}
	curveVertex(
		points.leftPoints.lowerEdge[points.leftPoints.lowerEdge.length - 1].x, 
		points.leftPoints.lowerEdge[points.leftPoints.lowerEdge.length - 1].y
	);
	curveVertex((firstPoint.x + windowWidth / 2) / 2 + 20, (firstPoint.y + windowHeight / 2) / 2 - 20)
	vertex(windowWidth / 2, windowHeight / 2);
	endShape();
	
	totalCount = 0;
	beginShape();
	vertex(windowWidth / 2, windowHeight / 2);
	curveVertex(points.rightPoints.upperEdge[0].x, points.rightPoints.upperEdge[0].y);
	firstPoint = points.rightPoints.upperEdge[0];
	for (let i = 0; i < points.rightPoints.upperEdge.length; i++) {
		curveVertex(
			points.rightPoints.upperEdge[i].x, 
			points.rightPoints.upperEdge[i].y
		);
		
		totalCount++;

		if (totalCount == break1 || totalCount == break2){
			curveVertex((firstPoint.x + points.rightPoints.upperEdge[i].x) / 2 - 20, (firstPoint.y + points.rightPoints.upperEdge[i].y) / 2 + 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = i == points.rightPoints.upperEdge.length - 1 ? points.rightPoints.side[0] : points.rightPoints.upperEdge[i + 1];
			endShape();
			beginShape();
		}
	}
	curveVertex(
		points.rightPoints.side[0].x, 
		points.rightPoints.side[0].y
	);
	
	totalCount++;

	if (totalCount == break1 || totalCount == break2){
		curveVertex((firstPoint.x + points.rightPoints.side[0].x) / 2 - 20, (firstPoint.y + points.rightPoints.side[0].y) / 2 + 20)
		curveVertex(firstPoint.x, firstPoint.y);
		firstPoint = points.rightPoints.side[1];
		endShape();
		beginShape();
	}
	
	for (let i = 1; i < points.rightPoints.side.length - 1; i++) {
		curveVertex(
			points.rightPoints.side[i].x, 
			points.rightPoints.side[i].y
		);
		
		totalCount++;

		if (totalCount == break1 || totalCount == break2){
			curveVertex((firstPoint.x + points.rightPoints.side[i].x) / 2 - 20, (firstPoint.y + points.rightPoints.side[i].y) / 2 + 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = points.rightPoints.side[i + 1];
			endShape();
			beginShape();
		}
	}
	curveVertex(
		points.rightPoints.side[points.rightPoints.side.length - 1].x, 
		points.rightPoints.side[points.rightPoints.side.length - 1].y
	);	
	totalCount++;

	if (totalCount == break1 || totalCount == break2){
		curveVertex((firstPoint.x + points.rightPoints.side[points.rightPoints.side.length - 1].x) / 2 - 20, (firstPoint.y + points.rightPoints.side[points.rightPoints.side.length - 1].y) / 2 + 20)
		curveVertex(firstPoint.x, firstPoint.y);
		firstPoint = points.rightPoints.lowerEdge[0]
		endShape();
		beginShape();
	}
	for (let i = 0; i < points.rightPoints.lowerEdge.length - 1; i++) {
		curveVertex(
			points.rightPoints.lowerEdge[i].x, 
			points.rightPoints.lowerEdge[i].y
		);
		
		totalCount++;

		if (totalCount == break1 || totalCount == break2){
			curveVertex((firstPoint.x + points.rightPoints.lowerEdge[i].x) / 2 - 20, (firstPoint.y + points.rightPoints.lowerEdge[i].y) / 2 - 20)
			curveVertex(firstPoint.x, firstPoint.y);
			firstPoint = points.rightPoints.lowerEdge[i + 1]
			endShape();
			beginShape();
		}
	}
	curveVertex(
		points.rightPoints.lowerEdge[points.rightPoints.lowerEdge.length - 1].x, 
		points.rightPoints.lowerEdge[points.rightPoints.lowerEdge.length - 1].y
	);
	curveVertex((firstPoint.x + windowWidth / 2) / 2 + 20, (firstPoint.y + windowHeight / 2) / 2 - 20)
	vertex(windowWidth / 2, windowHeight / 2);
	endShape();
}

function drawWingsOutline(points) {
		fill(100, 100, 100, 150);
	beginShape();
	vertex(windowWidth / 2, windowHeight / 2);
	curveVertex(points.leftPoints.upperEdge[0].x + stepSize, points.leftPoints.upperEdge[0].y - stepSize);	
	for (let i = 0; i < points.leftPoints.upperEdge.length; i++) {
		curveVertex(
			points.leftPoints.upperEdge[i].x, 
			points.leftPoints.upperEdge[i].y - stepSize* 1.5
		);
	}
	curveVertex(
			points.leftPoints.side[0].x - stepSize* 1.5, 
			points.leftPoints.side[0].y - stepSize* 1.5
	);
	for (let i = 1; i < points.leftPoints.side.length - 1; i++) {
		curveVertex(
			points.leftPoints.side[i].x - stepSize * 1.5, 
			points.leftPoints.side[i].y
		);
	}
	curveVertex(
			points.leftPoints.side[points.leftPoints.side.length - 1].x - stepSize * 1.5, 
			points.leftPoints.side[points.leftPoints.side.length - 1].y + stepSize * 1.5
	);
	for (let i = 0; i < points.leftPoints.lowerEdge.length; i++) {
		curveVertex(
			points.leftPoints.lowerEdge[i].x, 
			points.leftPoints.lowerEdge[i].y + stepSize * 1.5
		);
	}
	curveVertex(
		points.leftPoints.lowerEdge[points.leftPoints.lowerEdge.length - 1].x + stepSize * 1.5, 
		points.leftPoints.lowerEdge[points.leftPoints.lowerEdge.length - 1].y + stepSize * 1.5
	);
	vertex(windowWidth / 2, windowHeight / 2);
	endShape();
	
	beginShape();
	vertex(windowWidth / 2, windowHeight / 2);
	curveVertex(points.rightPoints.upperEdge[0].x - stepSize, points.rightPoints.upperEdge[0].y - stepSize);
	for (let i = 0; i < points.rightPoints.upperEdge.length; i++) {
		curveVertex(
			points.rightPoints.upperEdge[i].x, 
			points.rightPoints.upperEdge[i].y - stepSize* 1.5
		);
	}
	curveVertex(
		points.rightPoints.side[0].x + stepSize* 1.5, 
		points.rightPoints.side[0].y - stepSize* 1.5
	);	
	for (let i = 1; i < points.rightPoints.side.length - 1; i++) {
		curveVertex(
			points.rightPoints.side[i].x + stepSize* 1.5, 
			points.rightPoints.side[i].y
		);
	}
	curveVertex(
		points.rightPoints.side[points.rightPoints.side.length - 1].x + stepSize* 1.5, 
		points.rightPoints.side[points.rightPoints.side.length - 1].y + stepSize* 1.5
	);	
	for (let i = 0; i < points.rightPoints.lowerEdge.length; i++) {
		curveVertex(
			points.rightPoints.lowerEdge[i].x, 
			points.rightPoints.lowerEdge[i].y + stepSize
		);
	}
	curveVertex(
		points.rightPoints.lowerEdge[points.rightPoints.lowerEdge.length - 1].x - stepSize* 1.5, 
		points.rightPoints.lowerEdge[points.rightPoints.lowerEdge.length - 1].y + stepSize* 1.5
	);
	vertex(windowWidth / 2, windowHeight / 2);
	endShape();
}

function generatePoints() {
	let points = {
		leftPoints: {
			upperEdge: [],
			side: [],
			lowerEdge: []
		},
		rightPoints: {
			upperEdge: [],
			side: [],
			lowerEdge: []
		}
	}
	
	let factor = -10;
	let curveSize = random(10, 100);
	let noiseFactor = sin(factor) * curveSize
	
	let circleSize = 20;
	let xPos1 = Math.floor(windowWidth / 2 - stepSize);
	let xPos2 = Math.ceil(windowWidth / 2 + stepSize);
	
	// upper wing edges
	for (let i = windowHeight/2 - stepSize; i > stepSize * 3; i -= stepSize) {
		points.leftPoints.upperEdge.push(new Point(xPos1, i - abs(noiseFactor)));
		points.rightPoints.upperEdge.push(new Point(xPos2, i - abs(noiseFactor)));

		xPos1 += -stepSize;
		xPos2 += stepSize;
		factor += 20 / (windowHeight / 20);
		noiseFactor = sin(factor) * curveSize
	}
	
	// wing sides
	factor = -10;
	for (let i = stepSize * 3; i < windowHeight - stepSize * 3; i += stepSize) {
		points.leftPoints.side.push(new Point(Math.floor(windowWidth * 0.25 - noiseFactor), i));
		points.rightPoints.side.push(new Point(Math.ceil(windowWidth * 0.75 + noiseFactor), i));
		
		factor += 20 / (windowHeight / 20);
		noiseFactor = sin(factor) * curveSize
	}
	
	factor = -10;
	for (let i = windowHeight - stepSize * 3; i > windowHeight/2 + stepSize; i -= stepSize) {
		points.leftPoints.lowerEdge.push(new Point(xPos1, i + abs(noiseFactor)));
		points.rightPoints.lowerEdge.push(new Point(xPos2, i + abs(noiseFactor)));

		xPos1 += stepSize;
		xPos2 += -stepSize;
		factor += 20 / (windowHeight / 20);
		noiseFactor = sin(factor) * curveSize
	}	
	
	return points;
}

function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();

  if (axis === Y_AXIS) {
    // Top to bottom gradient
    for (let i = y; i <= y + h; i++) {
      let inter = map(i, y, y + h, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(x, i, x + w, i);
    }
  } else if (axis === X_AXIS) {
    // Left to right gradient
    for (let i = x; i <= x + w; i++) {
      let inter = map(i, x, x + w, 0, 1);
      let c = lerpColor(c1, c2, inter);
      stroke(c);
      line(i, y, i, y + h);
    }
  }
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}