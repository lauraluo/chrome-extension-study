
chrome.runtime.onConnect.addListener(function(port){
	if(port.name == "一通電話"){
	    port.onMessage.addListener(function(response) {
	        console.log(response);
		    switch (response.msg) {
		        case "請問羅拉拉在嗎":
		            port.postMessage({ msg: "是的，他在" });
		            break;
		        case "請問王小明在嗎":
		            port.postMessage({ msg: "不，他不在" });
		            break;
	        	default:
		            port.postMessage({ msg: "好的" });
                	port.disconnect();
		            break;
		    }
	    });		
	}
});

