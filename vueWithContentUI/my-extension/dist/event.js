chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message.name);
    
    switch (message.name) {
        case "開啟頁面按鈕":
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                console.log(tabs);
                chrome.pageAction.show(tabs[0].id);
            });
            break;
        case "關閉頁面按鈕":
            chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
                console.log(tabs);
                chrome.pageAction.hide(tabs[0].id);
            });
            break;
        default:
            break;
    }



    sendResponse("來自事件腳本的回覆：處理已送出");

});
