document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButton = document.getElementById("button");

    dButton.addEventListener('click', function(ce) {
        //使用Chrome API往啟視窗
        chrome.windows.create({ "url": "https://github.com/lauraluo" });
    });
});
