
var rule = {
    //條件
    conditions: [
        new chrome.declarativeContent.PageStateMatcher({
            //url的匹配指定
            pageUrl: { 
                hostEquals: 'www.facebook.com/', 
                path
                schemes: ['https','http']
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
        chrome.declarativeContent.onPageChanged.addRules([rule]);
    });
});
