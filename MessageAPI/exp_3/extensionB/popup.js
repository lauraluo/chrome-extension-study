document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButton = document.getElementById("button");
    var extensionID = "fhggngpimllbngfbjdbiplgmhdppiiop";

    //點擊按鈕，自擴充功能A發動訊息
    dButton.addEventListener('click', function(e) {

        console.log("click");

        chrome.runtime.sendMessage(
            extensionID, 
            { name: "切換頁面按鈕" },
            { includeTlsChannelId: true },
            function(response) {
                console.log(response);
            });

    });


});
