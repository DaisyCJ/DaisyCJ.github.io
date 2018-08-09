 	function genCheckBox(select, items) {
		select.innerHTML += "<label for='" +select.id+ "all'>全部</label>"+
		"<input type='checkbox' style='visibility: hidden' checkbox-type='all' value='all' id='" +select.id+ "all'>";
		for(var i=0; i<items.length; i++) {
			var checkbox = document.createElement("input");
		 	var text = document.createElement("label");
		 	checkbox.value = items[i].value;
			checkbox.setAttribute("checkbox-type", "item");
			checkbox.setAttribute("type", "checkbox");
			checkbox.setAttribute("id", select.id+i);
			text.setAttribute("for", select.id+i);
			text.innerHTML = items[i].text;
			select.appendChild(text);
			select.appendChild(checkbox);
			checkbox.style.cssText = "visibility: hidden";
		}
		select.onclick = function(e) {
			if(e.target.type == "checkbox") {
				var checkboxs = document.querySelectorAll("#"+select.id+" [type='checkbox']");
				var type = e.target.getAttribute("checkbox-type");
				if(type == "all") {
					for(var ele of select.childNodes) {
						ele.checked = e.target.checked;
					}
				}
				else {
					var checkNum = document.querySelectorAll("#"+select.id+" [checkbox-type='item']:checked");
					checkboxs[0].checked = false;
					if(checkNum.length==0) e.target.checked = true;
					if(checkNum.length==3) checkboxs[0].checked = true;
				}
				for(var i=0; i<checkboxs.length; i++) {
					if(checkboxs[i].checked) {
						checkboxs[i].previousSibling.setAttribute("class", "choose");
					} else{
						checkboxs[i].previousSibling.setAttribute("class", "not-choose");
					}
				}
				//每次更改条件保存hash
				//location.hash = getCondition();
				var conditions = getCondition();
				history.pushState({condition:conditions}, "");
				console.log(history.state.condition);
				updateTable(filterItems());
			}
		}
	}
