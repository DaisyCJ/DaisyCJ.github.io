	//根据选择条件筛选数据
	function filterItems() {
		var items = [];
		var condition = getCondition();
		//筛选数据
		for(var e of sourceData) {
			if(condition.indexOf(e.region)>=0 && 
				condition.indexOf(e.product)>=0) {
				items.push(e);
			}
		}
		return items;
	}
	function getCondition() {
		var condition = [];
		//获取选择条件
		var regionAndProduct = document.querySelectorAll(".select [checkbox-type='item']:checked");
		regionAndProduct.forEach(e => {condition.push(e.value);});
		
		return condition;
	}
	//获取数据中某一商品（地区）的数量
	function getOneTypeNum(product, items) {
		var num=0;
		for(var i=0; i<items.length; i++) {
			if(items[i].product == product) num++;
		}
		return num;
	}

	//获取数据中商品（地区）的种类数量
	function getTypeNumber(items, type) {
		var types = [];
		items.forEach((ele) => {
			if(types.indexOf(ele[type])<0) {
				types.push(ele[type]);
			}
		})
		return types.length;
	}