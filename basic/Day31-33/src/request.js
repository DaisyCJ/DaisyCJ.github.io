	var httpRequest;

	function makeRequest() {
		httpRequest = new XMLHttpRequest();
		if(!httpRequest) {
			alert("cannot create an XMLHttp");
			return false;
		}
		httpRequest.onreadystatechange = getSourceData;
		httpRequest.open("GET", "data.php");
		httpRequest.send();
	}

	function getSourceData() {
		if(httpRequest.readyState === XMLHttpRequest.DONE) {
			if(httpRequest.status === 200) {
				alert(httpRequest.responseText);
				//处理数据，table显示数据
				//return items
			} else {
				alert("request error");
			}
		}
	}