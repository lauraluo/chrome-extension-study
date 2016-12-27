chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    sendResponse({content: "來自事件腳本的回覆"});
});