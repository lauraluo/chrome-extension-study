//指定比對的url：不允許片段表達式 
//例如： *://*.google.com.tw/* 作為查詢字串不被接受因為host是一個片段表達式
var urlPattern = '*://www.google.com.tw/*';


//利用 tabs.query api 查找畫面上的所有tab
function queryTabsAndShowPageActions(queryObject) {
    chrome.tabs.query(queryObject,
        function(tabs) {
            if (tabs && tabs.length > 0) {
                for (var i = 0; i < tabs.length; i++) {
                    //在加載完畢的tab上，使用chrome.pageAction.show 啟用按鈕
                    if (tabs[i].status === "complete") chrome.pageAction.show(tabs[i].id);
                }
            }
        }
    );
}



//第一次的初始化：extension初次載入時
chrome.runtime.onInstalled.addListener(function() {
    queryTabsAndShowPageActions({
        "active": false,
        "currentWindow": true,
        "url": urlPattern
    });
});
//每次tab有變動，檢查現在這個current tab是否在指定的 url pattern底下
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    queryTabsAndShowPageActions({
        "active": true,
        "currentWindow": true,
        "url": urlPattern
    });
});

