chrome.runtime.onInstalled.addListener(function() {
    chrome.tabs.create({
        url: "preview.html"
    }, function(tab) {
        console.log('window open');
    });
});
