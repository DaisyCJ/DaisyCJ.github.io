	var regionSelect = document.querySelector('#region-select');
	var productSelect = document.querySelector('#product-select');
	var saveBtn = document.querySelector('#save-data-btn');

	// var sourceData = makeRequest();
	// updateTable(sourceData);

	//初始化checkbox
	genCheckBox(regionSelect, [{
		value: "华东",
		text: "华东"
	},{
		value: "华南",
		text: "华南"
	},{
		value: "华北",
		text: "华北"
	}]);

	genCheckBox(productSelect, [{
		value: "手机",
		text: "手机"
	},{
		value: "笔记本",
		text: "笔记本"
	},{
		value: "智能音箱",
		text: "智能音箱"
	}]);
	
	//检查hash
	// if(location.hash) {
	// 	var condition = decodeURI(location.hash).slice(1).split(",");
	// 	for(var i=0; i<condition.length; i++) {
	// 		var checkbox = document.querySelector("input[value='"+condition[i]+"']");
	// 		if(checkbox) {
	// 			checkbox.click();
	// 		}
	// 	}
	// }
	if(history.pushState) {
		history.state = "";
		window.addEventListener("popstate", fnHashTrigger);
	}

	//优先显示本地存储的数据，没有则根据筛选条件显示
	var data = JSON.parse(localStorage.data);
	if(data) {
		setChecked(data);
		updateTable(filterItems());
	}

	saveBtn.onclick = function() {
	//	var value = getTableData();
		var value = getCondition();
		localStorage.data = JSON.stringify(value);
	}


	function fnHashTrigger(e) {
		var condition = e.state.condition || null;
		setChecked(condition);
		updateTable(filterItems());
	}

	function setChecked(condition) {
		var checkbox = document.querySelectorAll("input[type='checkbox']");
		checkbox.forEach((e) => {
			e.checked = false;
			e.previousSibling.setAttribute("class", "not-choose");
		})
		for(var i=0; i<condition.length; i++) {
			checkbox = document.querySelector("input[value='"+condition[i]+"']");
			if(checkbox) {
				checkbox.checked = true;
				checkbox.previousSibling.setAttribute("class", "choose");
			}
		}
	}