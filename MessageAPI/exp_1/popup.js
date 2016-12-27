document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButtonEvent = document.getElementById("button1");
    var dButtonContent = document.getElementById("button2");

    //點擊按鈕，向事件腳本發送訊息
    dButtonEvent.addEventListener('click', function(e) {
        chrome.runtime.sendMessage({ content: "你好，此訊息來自彈出視窗腳本" }, function(response) {
            console.log(response);
        });
    });

    //點擊按鈕，向內容腳本發送訊息
    dButtonContent.addEventListener('click', function(e) {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { content: "你好，此訊息來自彈出視窗腳本" }, function(response) {
                console.log(response);
            });
        });
    });

});
