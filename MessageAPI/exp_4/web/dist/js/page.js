var dButton = document.getElementById("button");
var extensionID = "ampdcffgccbnfionpljcpncpcjfbhbag";

//點擊按鈕，向擴充功能A發動訊息
dButton.addEventListener('click', function(e) {

    console.log("click");

    chrome.runtime.sendMessage(
        extensionID, 
        { name: "切換頁面按鈕" },
        function(response) {
            console.log(response);
        });

});


