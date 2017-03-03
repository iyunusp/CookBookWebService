var diff=10;
var x1=400,y1=0;
var x2=400,y2=0;
var tg= 1;

function setup(){
	createCanvas(400,400);
	console.log('A*');
}
function draw(){
	
	background('#33b5e5');
	line(this.x1,this.y1,this.x2,this.y2)
	if(tg%2===1){
		if(this.x1===0 && this.y1===400){
			this.tg++;
		}
		if(this.x1>0 && this.y2<400)	{
			this.x1-=diff;
			this.y2+=diff;
		}else if(this.y1>=0 && this.x2<=400){
			this.y1+=diff;
			this.x2-=diff;
		}
	}else if(tg%2===0){
		if(this.x1===400 && this.y1===0){
			this.tg++;
			//noLoop();
		}
		if(this.y1>0 && this.x2<400){
			this.y1-=diff;
			this.x2+=diff;
		}else if(this.x1>=0 && this.y2<=400)	{
			this.x1+=diff;
			this.y2-=diff;
		}
	}
	//console.log('x1= '+x1+'y1= '+y1);
	//console.log('length '+abs(sqrt(sq(x2-x1)+sq(y2-y1))))
}