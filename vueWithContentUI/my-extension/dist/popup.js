document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButtonContent = document.getElementById("button");

    //點擊按鈕，向內容腳本發送訊息
    dButtonContent.addEventListener('click', function(e) {
        console.log('click');
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { content: "你好，此訊息來自彈出視窗腳本" }, function(response) {
                console.log(response);
            });
        });
    });

});
