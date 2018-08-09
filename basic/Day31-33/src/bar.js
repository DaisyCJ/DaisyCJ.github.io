var content = document.querySelector("#barChart");

var barChart = {
	data : new Array(),
	width : 280,
	height : 280,
	xWidth : 280,
	yWidth : 280,
	colWidth : 10,
	axisColor : "#5b7da3",
	colColor : "#a8bfde",
	betweenX: 20,
	maxData : 0,
	risk : 0,

	initData : function(data) {
		this.data = data;
		this.getMaxData();
		this.risk = (this.yWidth-20)/this.maxData;
	},
	drawAxis : function() {
		var text = "";
		text += '<polyline points="280 300 290 290 280 280" stroke="' +this.axisColor+ '" fill="transparent"/>'+
			'<polyline points="10 10 10 ' +
				 (this.xWidth+10) + ' ' + (this.xWidth+10) + ' ' + (this.yWidth+10) +
			 	 '" stroke="' +this.axisColor+ '" fill="transparent"/>'+
			'<polyline points="0 20 10 10 20 20" stroke="' +this.axisColor+ '" fill="transparent"/>';
		content.innerHTML = text;
	},
	drawChart : function() {
		var text = "";
		var x = 10, y;
		for(var i=0; i<this.data.length; i++) {
			x += this.betweenX;
			y = this.yWidth - this.data[i] * this.risk + 10;
			text += '<rect x="'+ x +'" y="'+ y +
				'" width="'+ this.colWidth +'" height="'+ this.data[i]*this.risk +
				'" fill="' + this.axisColor + '"/>';
		}
		content.innerHTML += text;
	},
	getMaxData : function() {
		this.maxData = this.data[0];
		for(var i=0; i<this.data.length; i++) {
			if(this.data[i] > this.maxData) {
				this.maxData = this.data[i];
			}
		}
	},
	clearLine: function() {
		content.innerHTML = "";
		this.drawAxis();
	}
}