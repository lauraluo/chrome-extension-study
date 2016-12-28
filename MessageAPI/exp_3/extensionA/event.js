var toggle = false;
//可以列出禁止防問的黑名單ID
var blockList = [];

chrome.runtime.onMessageExternal.addListener(function(message, sender, sendResponse) {
    console.log(sender);

    //如果訪問在黑名單，就不作任何動作
    if (blockList.indexOf(sender.id) != -1) {
        return;
    }

    if (message.name != "切換頁面按鈕") {
        return;
    }

    //如果按鈕是啟用的狀態則開，否則關
    if (!toggle) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.pageAction.show(tabs[0].id);
            toggle = !toggle;
        });
    } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.pageAction.hide(tabs[0].id);
            toggle = !toggle;

        });
    }

    sendResponse("來自擴充功能A的訊息：操作完成");

});
