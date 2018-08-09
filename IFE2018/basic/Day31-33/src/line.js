var myCanvas = document.querySelector("#lineChart");

var lineChart = {
	data : new Array(),
	width : 280,
	height : 280,
	xWidth : 280,
	yWidth : 280,
	axisColor : "#5b7da3",
	pointRadius : 3,
	pointColor: "#5b7da3",
	lineWidth: 2,
	lineColor: "#000",
	betweenX: 20,
	maxData : 0,
	risk : 0,

	initData : function(data) {
		this.data = data;
		this.getMaxData();
		this.risk = (this.yWidth-20)/this.maxData;
	},
	drawChart : function() {
		var ctx = myCanvas.getContext("2d");
		var x = 10, y=0;
		var lastX = x, lastY = y;
		for(var i=0; i<this.data.length; i++) {
			this.lineColor = "rgb("+ Math.floor(i*10+10) + ", "+ Math.floor(i*20+10) + " ,"+ Math.floor(255-i*20) + ")";
			for(var j=0; j<this.data[i].length; j++) {
				x += this.betweenX;
				y = this.height - this.data[i][j] * this.risk;
				ctx.beginPath();

				ctx.fillStyle = this.pointColor;
				ctx.arc(x, y, this.pointRadius, 0, Math.PI*2, true);
				ctx.fill();
				if(j>0) {
					ctx.beginPath();
					ctx.moveTo(lastX, lastY)
					ctx.strokeStyle = this.lineColor;
					ctx.lineTo(x, y);
					ctx.stroke();
				}
				lastY = y;
				lastX = x;
			}
			x = 10;
		}
	},
	drawAxis : function() {
		if(myCanvas.getContext) {
			var ctx = myCanvas.getContext("2d");
			ctx.beginPath();
			ctx.strokeStyle = this.axisColor;
			ctx.moveTo(10, 10);
			ctx.lineTo(10, 10+this.yWidth);
			ctx.lineTo(10+this.xWidth, 10+this.yWidth);
			ctx.moveTo(this.xWidth,this.yWidth);
			ctx.lineTo(10+this.xWidth, 10+this.yWidth);
			ctx.lineTo(this.xWidth, 20+this.yWidth);
			ctx.moveTo(0, 20);
			ctx.lineTo(10, 10);
			ctx.lineTo(20, 20);
			ctx.stroke();
		}
	},
	getMaxData : function() {
		for(var i=0; i<this.data.length; i++) {
			for(var j=0; j<this.data[i].length; j++) {
				if(this.data[i][j] > this.maxData) {
					this.maxData = this.data[i][j];
				}
			}
		};
	},
	clearLine: function() {
		// var ctx = myCanvas.getContext("2d");
		// ctx.clearRect(0,0, 300, 300);
		myCanvas.height = myCanvas.height;
		this.drawAxis();
	}
}
