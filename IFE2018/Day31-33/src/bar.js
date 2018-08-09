var content = document.querySelector("#barChart");

var barChart = {
	data : new Array(),
	width : 480,
	height : 380,
	xWidth : 480,
	yWidth : 380,
	colWidth : 10,
	axisColor : "#5b7da3",
	colColor : ["#a8bfde","#5A6E88","#87B6F6","#A9A99B","#F1E3BD","#A097C5","#798B72","#CDD7EC","#31373A"],
	betweenX: 20,
	maxData : 0,
	risk : 0,

	initData : function(data) {
		this.data = data;
	},
	drawAxis : function() {
		var text = "";
		text += '<polyline points="30 10 30 ' + (this.yWidth+10) + ' ' + (this.xWidth+20) + ' ' + (this.yWidth+10) +
			 	 '" stroke="' +this.axisColor+ '" fill="transparent"/>';
		content.innerHTML = text;
	},
	drawTextOnAxis : function() {
		var maxNum = Math.ceil(this.maxData/100) * 100;
		var curNum, yPos;

		var text = "";
		for(var i=1; i<=5; i++){
			curNum = maxNum/5 * i;
			yPos = 390 - 380/5*i;
			text += "<line x1='20' x2='30' y1='"+yPos+"' y2='"+yPos+"' stroke='"+this.axisColor+"'/>"
			text += "<text x='" + 0 + "' y='"+(yPos+5)+ "' style='font-family:Verdana;font-size:10;'>"+curNum+"</text>";
		}
		for(var i=0; i<12; i++) {
			text += "<line x1='"+(59+this.betweenX*i)+"' x2='"+(59+this.betweenX*i)+"' y1='395' y2='390' stroke='"+this.axisColor+"'/>"
			text += "<text x='" +(50+this.betweenX*i)+ "' y='410' style='font-family:Verdana;font-size:10;'>"+((i+1)+"月")+"</text>";
		}
		content.innerHTML+=text;
	},
	drawChart : function() {
		this.getMaxData();
		this.risk = (this.yWidth-20)/this.maxData;
		this.drawAxis();
		this.drawTextOnAxis();

		var text = "";
		var x = 45, y = 0;
		this.colWidth = 28;
		this.betweenX = 38;
		for(let i=0; i<this.data.length; i++) {
			for(let j=0; j<this.data[i].length; j++) {
				
				y = this.yWidth - this.data[i][j] * this.risk + 10;
				text += '<rect x="'+ x +'" y="'+ y +
					'" width="'+ this.colWidth/this.data.length +'" height="'+ this.data[i][j]*this.risk +
					'" fill="' + this.colColor[i] + '"/>';
				x += this.betweenX;
			}
			x = this.colWidth/this.data.length * (i+1) + 45;
		}
		content.innerHTML += text;
	},
	getMaxData : function() {
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
		content.innerHTML = "";
	}
}