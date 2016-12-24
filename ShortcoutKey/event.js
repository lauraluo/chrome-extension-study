var rule = {
    //條件
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            //url的匹配指定
            pageUrl: { 
                hostEquals: 'www.google.com.tw', 
                schemes: ['https']
            }
        })
    ],
    //動作：啟用頁面按鈕
    actions: [new chrome.declarativeContent.ShowPageAction()]
};


//刪除規則，並重新註冊
chrome.runtime.onInstalled.addListener(function(details) {
    //移除所有舊規則
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
        //註開新規則
        console.log('remove completed!');
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
});

var toggleBg = false;

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    if(command == "switch-fb-bg" && toggleBg){
		chrome.tabs.executeScript({
		    code: 'document.body.style.backgroundColor="red"'
		}); 

		toggleBg = !toggleBg;	
    }
    else if (command == "switch-fb-bg" && !toggleBg) {
		chrome.tabs.executeScript({
		    code: 'document.body.style.backgroundColor="black"'
		}); 
    	toggleBg = !toggleBg;	
    }
});
