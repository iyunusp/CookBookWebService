const WIDTH = 800, HEIGHT = 300;
const w=WIDTH-20,h=HEIGHT-80;
let canvas;
let isPause=false, createNew=false, isGameOver=false;
let obstacles=[];
let isJumping=false, isDown=false;
let speedLevel=5;
const playerWidth=50;
let playerY=HEIGHT-playerWidth;
const speedTreshold=500,speedRate=1.125;
const playerX=40,playerYDefault=playerY,playerJumpStrength=6;
const img=[];
let scoreText=0,humanScore=0;
let dataTrain=[];
let perceptron;
let isAI=false;
let imgS=true;
let imgC=0;
function setup(){
  canvas=createCanvas(WIDTH, HEIGHT);
  canvas.parent('canvas-here');
  textSize(32);
  perceptron= new Perceptron(3,0.15,0);
  obstacles.push( new Obstacle(w,h));
  img1=loadImage("Game/dino1.png");
  img2=loadImage("Game/dino2.png");
  
  img.push(img1);
  img.push(img2);
}
function jump(){
  if(isJumping) playerY-=playerJumpStrength;
  else if(isDown ) playerY+=playerJumpStrength;
  if(playerY<105 && isJumping){
      isJumping=false;
      isDown=true;
  }else if(playerY>=playerYDefault && isDown) isDown=false;
}
function checkGameOver(){
  if((playerX+playerWidth/2)>obstacles[0].x 
  && (playerY+playerWidth/2) > obstacles[0].y) {
    isPause=true;
    isGameOver=true;
    obstacles=[];
    if(!isAI){
      perceptron.train(dataTrain,10000);
      humanScore=scoreText;
    }
    return true;
  }
  else return false;
}
function plotTrain(){
  for(var i =0;i<dataTrain.length && !isAI;i++){
    if(dataTrain[i][3])fill(0);
    ellipse(dataTrain[i][0]*1.75,dataTrain[i][1]*15,dataTrain[i][2]/6);
    noFill();
  }
}
function getDistance(index){return obstacles[index].x-(playerX+playerWidth/2);}
function draw(){
  background(225);
  text(scoreText,32,32)
  text("Human : "+humanScore,575,50);
  if(isGameOver) {
    text("    GAME OVER\nAI will take over",250,120);
    return;
  }else if(isPause){
    text("GAME is Paused\nClick to continue",250,120);
    return;
  }
  if(isAI && !isGameOver){
    let data=[getDistance(0),speedLevel,obstacles[0].w];
    if(!isJumping && !isDown && perceptron.compute(data)) isJumping=true;
  }
  jump();
  if(checkGameOver())return;
  image(img[imgS ? 0:1],playerX , playerY);//player
  if((imgC++)%20==0)imgS=!imgS;
  for(var i=0;i<obstacles.length;i++){ 
    obstacles[i].show();
    if(!isPause && obstacles[i].x>0) obstacles[i].move(speedLevel);
    if(obstacles[i].x<=WIDTH-(450+random(50*speedLevel)) && obstacles[i].canSpawn && !createNew){
        obstacles[i].canSpawn=false;
        createNew=true;
    }    
  }
  if(scoreText%(65+floor(random(20)))==0 && (playerY>=playerYDefault)){
      if(!isAI)dataTrain.push([getDistance(0),speedLevel,obstacles[0].w,false]);
  }
  plotTrain();
  if(obstacles[0].x<=0 && !isPause) obstacles.shift();
  if(createNew){
      obstacles.push( new Obstacle(w,h));
      createNew=false;
  }
  scoreText++;
  if(scoreText%speedTreshold==0) speedLevel*=speedRate;//levelup
}
function AITakeOver(){
  obstacles.push( new Obstacle(w,h));
  isGameOver=false;
  isPause=false;
  scoreText=0;
  speedLevel=5;
  isAI=true;
}
function touchStarted(){
  if(isGameOver && isPause) AITakeOver();
  else{
    if(isPause) isPause=false;
    else if(!isJumping && !isDown && !isAI){
      isJumping=true;
      if(!isAI)dataTrain.push([getDistance(0),speedLevel,obstacles[0].w,true]);
    }
  }
  return false;        
}
function keyPressed(){
  if(isGameOver && isPause && keyCode==32) AITakeOver();
  else if(keyCode==38 || keyCode==32){
    if(!isJumping && !isDown && !isAI){
      isJumping=true;
      if(!isAI)dataTrain.push([getDistance(0),speedLevel,obstacles[0].w,true]);
    }
  }else if(keyCode==40 && !isJumping && !isDown) playerY=HEIGHT-25;
}
function keyReleased(){ if(keyCode==40 && !isJumping && !isDown) playerY=HEIGHT-50;}
window.onresize = function () {isPause=true};