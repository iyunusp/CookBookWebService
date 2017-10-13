function Perceptron(){
	this.weight=[random(2)-1,random(2)-1,random(2)-1];//b w1 w2
	this.output=false;
	this.epoch=0;
	this.min1=999;
	this.max1=0;
	this.min2=999;
	this.max2=0;
	this.errHistory=[];
}
Perceptron.prototype.normalize =function(data, min,max){
	return (data-min)/(max-min);
}
Perceptron.prototype.compute= function(dist, speed){
	if(this.max2<speed) this.max2=speed;
	dist=this.normalize(dist,this.min1,this.max1);
	speed=this.normalize(speed,this.min2,this.max2);
	let summer= (1*this.weight[0])+(dist*this.weight[1])+(speed*this.weight[2]);
	if(summer>=0) return true;
	else return false;
}
Perceptron.prototype.train =function(dataTrain){
	console.log(dataTrain);
	//let linecanvas=createCanvas(800,300);
	//linecanvas.parent('line');
	//linecanvas.fill(0);
	//linecanvas.background(255);
	for(let i=0;i<dataTrain.length;i++){
		if(dataTrain[i][0]<this.min1)this.min1=dataTrain[i][0];
		if(dataTrain[i][1]<this.min2)this.min2=dataTrain[i][1];
		if(dataTrain[i][0]>this.max1)this.max1=dataTrain[i][0];
		if(dataTrain[i][1]>this.max2)this.max2=dataTrain[i][1];
	}
	for(let i=0;i<dataTrain.length;i++){
		dataTrain[i][0]=this.normalize(dataTrain[i][0],this.min1,this.max1);
		dataTrain[i][1]=this.normalize(dataTrain[i][1],this.min2,this.max2);
	}
	for(let iter=0;iter<20*dataTrain.length;iter++){
		let correct=0;
		for(let i=0; i<dataTrain.length;i++){
			let summer=(1*this.weight[0])+(dataTrain[i][0]*this.weight[1])+(dataTrain[i][1]*this.weight[2]);
			if(summer>=0) this.output=true;
			if(this.output==dataTrain[i][2]){
				correct++;
			}else if(dataTrain[i][2]){
				this.weight=[this.weight[0]+1,
							this.weight[1]+dataTrain[i][0],
							this.weight[2]+dataTrain[i][1]];
			}else if(this.output){
				this.weight=[this.weight[0]-1,
							this.weight[1]-dataTrain[i][0],
							this.weight[2]-dataTrain[i][1]];
			}
			//fill(0);
			//linecanvas.line(0,300*(this.weight[0]/this.weight[2]),800*(this.weight[0]/this.weight[1],0));
			this.output=false;
		}
		let errRate=((dataTrain.length-correct)/dataTrain.length);
		this.errHistory.push(errRate);
		if(correct==dataTrain.length /*|| errRate<=0.005*/){
			console.log("succes with "+(this.epoch-1)+"epoch");
			break;
		}
		this.epoch++;
	}
	console.log("current value "+(this.epoch-1)+"epoch");
	console.log(this.errHistory);
	//console.log(this.weight)
}