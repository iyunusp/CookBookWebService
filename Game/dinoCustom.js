let WIDTH = 800, HEIGHT = 300;
let w=WIDTH-20,h=HEIGHT-80;
let canvas;
let isPause=false, createNew=false, isGameOver=false;
let obstacles=[];
let isJumping=false, isDown=false;
let speedLevel=5, speedTreshold=500;
let playerJumpStrength=6;
let playerY=HEIGHT-40, playerX=40, playerWidth=30;
let playerYDefault=playerY;
let scoreText=0;
let dataTrain=[];
let perceptron;
let isAI=false;
function setup(){
  canvas=createCanvas(WIDTH, HEIGHT);
  canvas.parent('canvas-here');
  textSize(32);
  perceptron= new Perceptron();
  obstacles.push( new Obstacle(w,h));
}
function jump(){
  if(isJumping){
	playerY-=playerJumpStrength;
  }else if(isDown ){
	playerY+=playerJumpStrength;
  }
  if(playerY<105 && isJumping){
	  isJumping=false;
	  isDown=true;
  }else if(playerY>playerYDefault && isDown){
	  isDown=false;
  }
}
	
	
function checkGameOver(){
  if((playerX+playerWidth/2)>obstacles[0].x 
  && (playerY+playerWidth/2) > obstacles[0].y) {
	isPause=true;
	isGameOver=true;
	obstacles=[];
	if(!isAI)perceptron.train(dataTrain);
	return true;
  }
  else return false;
}
function plotTrain(){
  for(let i =0;i<dataTrain.length && !isAI;i++){
	if(dataTrain[i][2]){
	  fill(0);
	  ellipse(dataTrain[i][0]*1.75,dataTrain[i][1]*15,4);
	  noFill()
	}else{
	  ellipse(dataTrain[i][0]*1.75,dataTrain[i][1]*15,4);
	}
  }
}
function draw(){
  background(225);
  text(scoreText,32,32)
  if(isAI && !isGameOver){
	let distance=obstacles[0].x-(playerX+playerWidth/2);
	if(!isJumping && !isDown && perceptron.compute(distance,speedLevel)){
      isJumping=true;
	}
  }
  
  if(isGameOver) {
	  text("    GAME OVER\nAI will take over",250,120);
	  return;
  }
  jump();
  if(checkGameOver())return;
  //game over
  
  ellipse(playerX , playerY, playerWidth);//player
  for(let i=0;i<obstacles.length;i++){ 
    obstacles[i].show();
    if(!isPause && obstacles[i].x>0){	
      obstacles[i].move(speedLevel);
    }
    if(obstacles[i].x<=WIDTH-(450+random(250)) && obstacles[i].canSpawn && !createNew){
		obstacles[i].canSpawn=false;
		createNew=true;
	}	
  }
  if(scoreText%(65+floor(random(20)))==0 && (playerY>=playerYDefault)){
	  let distance=obstacles[0].x-(playerX+playerWidth/2);
	  //console.log(distance);
	  if(!isAI)dataTrain.push([distance,speedLevel,false]);
  }
  plotTrain();
  if(obstacles[0].x<=0 && !isPause) {
	  obstacles.shift();
  }
  if(createNew){
	  obstacles.push( new Obstacle(w,h));
	  createNew=false;
  }
  scoreText++;
  if(scoreText%speedTreshold==0){
	  speedLevel*=1.125;
  }
  
}
function touchStarted(){
  if(isGameOver && isPause){
	obstacles.push( new Obstacle(w,h));
	isGameOver=false;
	isPause=false;
	scoreText=0;
	speedLevel=5;
	isAI=true;
  }else{
    if(isPause){
      isPause=false;
    }
	if(!isJumping && !isDown){
      isJumping=true;
	  let distance=obstacles[0].x-(playerX+playerWidth/2);
	  //console.log(distance);
	  if(!isAI)dataTrain.push([distance,speedLevel,true]);
	}
  }
}
function keyPressed(){
  if(isGameOver && isPause && keyCode==32){
	obstacles.push( new Obstacle(w,h));
	isGameOver=false;
	isPause=false;
	scoreText=0;
	speedLevel=5;
	isAI=true;
  }else if(keyCode==38 || keyCode==32){
    if(isPause){
      isPause=false;
    }
	if(!isJumping && !isDown){
      isJumping=true;
	  let distance=obstacles[0].x-(playerX+playerWidth/2);
	  //console.log(distance);
	  if(!isAI)dataTrain.push([distance,speedLevel,true]);
	}
  }else if(keyCode==40 && !isJumping && !isDown){
	playerY=HEIGHT-20;
  }
}
function keyReleased(){
	if(keyCode==40 && !isJumping && !isDown){
		playerY=HEIGHT-40;
	}
}
