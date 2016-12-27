document.addEventListener('DOMContentLoaded', function(dcle) {
    var dButtonConnect1 = document.getElementById("button1");
    var dButtonConnect2 = document.getElementById("button2");


    var port = chrome.runtime.connect({ name: "一通電話" });

    port.onMessage.addListener(function(response) {
        console.log(response);
        switch (response.msg) {
            case "是的，他在":
                port.postMessage({ msg: "請幫我把電話她" });
                break;
            case "不，他不在":
                port.postMessage({ msg: "請幫我留言給他，留言是XXXXXX" });
                port.disconnect();
                break;
            default:
                break;
        }
    });


    dButtonConnect1.addEventListener('click', function(event) {
        port.postMessage({ msg: "請問羅拉拉在嗎" });
    });

    dButtonConnect2.addEventListener('click', function(event) {
        port.postMessage({ msg: "請問王小明在嗎" });
    });

});
