document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButton = document.getElementById("button");
    //注意擴充功能A的ID在開始狀態是會變的，如果你要在你的地端跑這個範例
    //請自行在擴充功能管理頁面查看ID
    //一旦正式發佈你的擴充功能，你可以得到一組固定ID
    var extensionID = "fhggngpimllbngfbjdbiplgmhdppiiop";

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


});
