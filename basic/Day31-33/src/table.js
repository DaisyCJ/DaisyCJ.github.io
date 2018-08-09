	var table = document.querySelector('#table-wrapper');
	
	//更新表格中的数据
	function updateTable(items) {
		var data = "";
		table.innerHTML = "";

		//添加表头
		if(getTypeNumber(items,"region")==1 && getTypeNumber(items,"product")>1) {
			data += "<table><thead><tr class='head'><th>地区</th><th>商品</th>";
		}
		else data += "<table><thead><tr class='head'><th>商品</th><th>地区</th>";
		for(var i=1; i<=12; i++) {
			data += "<th>" + i + "月</th>";
		}
		data += "</tr></thead>";

		//添加数据
		data += "<tbody>";
		//当前商品名
		var product;
		for(var i=0; i<items.length; i++) {
			data += "<tr class='normal'>"
			var tr = [];
			//添加商品，相同商品只显示一次
			if(product != items[i].product) {
				product = items[i].product;
				tr.push("<th rowspan='"+getOneTypeNum(product, items)+"'>" + items[i].product + "</th>");
			}
			//添加地区
			if(getTypeNumber(items,"region")==1 && getTypeNumber(items,"product")!=1){
				if(i==0){
					tr.push("<th rowspan='"+items.length+"'>" + items[i].region + "</th>");
					tr.reverse();
				}
			} else {
				tr.push("<th>" + items[i].region + "</th>");
			}
			//添加每月销售
			for(var e of items[i].sale) {
				tr.push("<td>" + e + "</td>");
			}
			data += tr.join("") + "</tr>";
		}
		data += "</tbody></table>";
		table.innerHTML = data;
	}

	//获取表格的全部信息，返回列表（数组对象）
	function getTableData() {
		var items = filterItems();
		//获取全部产品月销量
		var lists = table.getElementsByTagName("tr");
		var datas = [];
		for(var i=1; i<lists.length; i++) {
		 	datas.push(getYearData(lists[i]));
		}
		//更新每个产品月销量
		items.forEach((ele, index) => {
			ele.sale = datas[index];
		})
		return items;
	}

	//获取一个地区产品一年的销量（一行）
	function getYearData(item) {
		var data = [];
		var tds = item.getElementsByTagName("td");
		for(var j=0; j<tds.length; j++) {
			data.push(Number(tds[j].textContent));
		}
		return data;
	}

	table.onclick = function(e) {
		var target = e.target;
		if(target.nodeName.toLowerCase() == "td" && target.parentNode.getAttribute("class")=="normal") {
			var string = "<input type='text' value='" + e.target.innerHTML + "'>" +
			"<button class='setting' onclick='changeDate(this.previousSibling)'>✔</button>"+
			"<button class='setting' onclick='cancel(this.parentNode.firstChild)'>✘</button>";
			target.innerHTML = string;
			target.firstChild.focus();
			target.firstChild.select();
			target.firstChild.onkeyup = function(e) {
				if(e.keyCode == 13) {
					changeData(e.target);
				}
				else if (e.keyCode == 27) {
					cancel(e.target);
				}
			}
			target.firstChild.onblur = function(e) {
				changeData(e.target);
			};
		}
	}
	function changeData(node) {
		var value = node.value;
		if(isNaN(value)) {
			alert("请正确输入");
		} else {
			node.parentNode.innerHTML = value;
		}
	}
	function cancel(node) {
		var value = node.value;
		node.parentNode.innerHTML = value;
	}
	//给鼠标选中行添加事件
	table.onmouseover = function(e) {
		//重置样式
		var lastFocusTr = document.querySelectorAll(".focus-tr");
		if(lastFocusTr) {
			lastFocusTr.forEach((ele) => {
				ele.setAttribute("class", "normal");
			});
		}
		if(e.target.nodeName.toLowerCase() == "td" && e.target.parentNode.getAttribute("class")=="normal") {
			//给事件对象行添加新样式
			var tds = e.target.parentNode.getElementsByTagName("td");
			for(var i=0; i<tds.length; i++) {
			 	tds[i].setAttribute("class", "focus-tr");
			}
			e.target.setAttribute("class", "focus-tr focus-td");
			//更新图表
			lineChart.clearLine();
			lineChart.initData([getYearData(e.target.parentNode)]);
			lineChart.drawChart();

			barChart.clearLine();
			barChart.initData(getYearData(e.target.parentNode));
			barChart.drawChart();
		}
	}
	//鼠标移开表格，折线图显示全部数据
	table.onmouseout = function() {
		var lists = table.getElementsByTagName("tr");
		var datas = [];
		for(var i=1; i<lists.length; i++) {
		 	datas.push(getYearData(lists[i]));
		}
		lineChart.clearLine();
		lineChart.initData(datas);
		lineChart.drawChart();
	}


