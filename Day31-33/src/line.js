var myCanvas = document.querySelector("#lineChart");

var lineChart = {
	data : new Array(),
	width : 480,
	height : 380,
	xWidth : 480,
	yWidth : 380,
	axisColor : "#5b7da3",
	pointRadius : 3,
	pointColor: "#5b7da3",
	lineWidth: 2,
	lineColor: ["#a8bfde","#5A6E88","#87B6F6","#A9A99B","#F1E3BD","#A097C5","#798B72","#CDD7EC","#31373A","#515A6D","#4E6AA8"],
	betweenX: 37,
	maxData : 0,
	risk : 0,

	initData : function(data) {
		this.data = data;
	},
	drawChart : function() {
		this.setMaxData();
		this.risk = (this.yWidth-20)/this.maxData;
		this.drawAxis();
		this.drawTextOnAxis();

		var ctx = myCanvas.getContext("2d");
		var x = 50, y=0;
		var lastX = x, lastY = y;
		for(var i=0; i<this.data.length; i++) {
			for(var j=0; j<this.data[i].length; j++) {
				y = this.height - this.data[i][j] * this.risk;
				if(j>0) {
					ctx.beginPath();
					ctx.moveTo(lastX, lastY);
					ctx.strokeStyle = this.lineColor[i];
					ctx.lineWidth = this.lineWidth;
					ctx.lineTo(x, y);
					ctx.stroke();
				}
				ctx.beginPath();

				ctx.fillStyle = this.lineColor[i];
				ctx.arc(x, y, this.pointRadius, 0, Math.PI*2, true);
				ctx.fill();
				lastY = y;
				lastX = x;
				x += this.betweenX;
			}
			x = 50;
		}
	},
	drawAxis : function() {
		if(myCanvas.getContext) {
			var ctx = myCanvas.getContext("2d");
			ctx.beginPath();
			ctx.strokeStyle = this.axisColor;
			ctx.moveTo(30, 10);
			ctx.lineTo(30, 10+this.yWidth);
			ctx.lineTo(40+this.xWidth, 10+this.yWidth);
			ctx.stroke();
		}
	},
	drawTextOnAxis : function() {
		var ctx = myCanvas.getContext("2d");
		var maxNum = Math.ceil(this.maxData/100) * 100;
		var curNum, yPos;

		ctx.beginPath();
		for(var i=1; i<=5; i++){
			curNum = maxNum/5 * i;
			yPos = 390 - 380/5*i
			ctx.moveTo(20, yPos);
			ctx.lineTo(30, yPos);
			ctx.font = "10px Verdana";
			ctx.fillText(curNum, 0, yPos+5);
		}
		for(var i=0; i<12; i++) {
			ctx.moveTo(60+this.betweenX*i, 395);
			ctx.lineTo(60+this.betweenX*i, 390);
			ctx.font = "12px Verdana";
			ctx.fillText((i+1)+"月", 50+this.betweenX*i, 410);
		}
		strokeStyle = this.lineColor;
		ctx.stroke();
	},
	setMaxData : function() {
		this.maxData = 0;
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
	}
}
