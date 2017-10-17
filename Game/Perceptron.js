function Perceptron(input,learningRate=1,maxErr=0){
	this.inputSize=input;
	this.weight=this.initArray(input+1,random(2)-1);//w1..wn b
	this.learningRate=learningRate;
	this.maxErr=maxErr;
	this.epoch=0;
	this.min=this.initArray(input,999);
	this.max=this.initArray(input,0);//change to 0
	this.errHistory=[];
}
Perceptron.prototype.initArray = function(size,value){
	let i=0,arr=[];
	arr.length=size;
	while(i<size)arr[i++]=value;
	return arr;
}
Perceptron.prototype.summer = function(data){//this function receive single data
	let sum=0;
	for(var i=0;i<this.inputSize;i++)
		sum+=(data[i]*this.weight[i]);
	sum+=this.weight[this.inputSize];//for bias
	return sum;
}
Perceptron.prototype.normalize =function(num, min,max){//range(0,1)
	return (num-min)/(max-min);
}
Perceptron.prototype.reAdjustWeight = function(data,targetAnswer){//this function receive single data
	for(var i=0;i<this.inputSize;i++)
		this.weight[i]+=(this.learningRate*targetAnswer*data[i]);
	this.weight[this.inputSize]+=(this.learningRate*targetAnswer);//for bias
}
Perceptron.prototype.compute= function(data){//this function receive single data
	for(var i=0;i<this.inputSize;i++){
		//if(this.max[i]<data[i])this.max[i]=data[i];//i think it's useless
		data[i]=this.normalize(data[i],this.min[i],this.max[i]);
	}
	let summer= this.summer(data);
	if(summer>=0) return true;
	else return false;
}
Perceptron.prototype.train =function(dataTrain, maxIter){//this function receive multiple data
	console.log(dataTrain);
	for(var i=0;i<dataTrain.length;i++){//assign the min and max value
		for(var j=0;j<this.inputSize;j++){
			if(dataTrain[i][j]<this.min[j])this.min[j]=dataTrain[i][j];
			if(dataTrain[i][j]>this.max[j])this.max[j]=dataTrain[i][j];
		}
	}
	for(var i=0;i<dataTrain.length;i++)
		for(var j=0;j<this.inputSize;j++)
			dataTrain[i][j]=this.normalize(dataTrain[i][j],this.min[j],this.max[j]);
	for(var iter=0;iter<maxIter;iter++){
		let correct=0;
		for(var i=0; i<dataTrain.length;i++){
			let output=false;
			let summer=this.summer(dataTrain[i]);
			if(summer>=0) output=true;
			if(output==dataTrain[i][this.inputSize]) //target and actual are the same
				correct++;
			else if(dataTrain[i][this.inputSize])//target is true but actual is false
				this.reAdjustWeight(dataTrain[i],1);
			else if(output)//target is false but actual is true
				this.reAdjustWeight(dataTrain[i],-1);
			output=false;
		}
		let errRate=((dataTrain.length-correct)/dataTrain.length);
		this.errHistory.push(errRate);//push to array for monitoring, delete later
		this.epoch++;
		if(errRate==0 || errRate<=this.maxErr){
			console.log("succes with "+(this.epoch-1)+"epoch");
			break;
		}
	}
	console.log("train finish with "+this.errHistory[this.errHistory.length-1]+"% error rate");
}
