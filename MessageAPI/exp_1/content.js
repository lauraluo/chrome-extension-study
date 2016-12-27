console.log("內容腳本注入");

var toggleBg = true;

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    console.log(sender);
    sendResponse({ content: "來自內容腳本的回覆" });
    if (toggleBg) {
        document.body.style.backgroundColor = "red";
        toggleBg = !toggleBg;

    } else {
        document.body.style.backgroundColor = "black";
        toggleBg = !toggleBg;
    }
});



