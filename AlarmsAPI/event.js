var msg = "Hello World!";
var count = 0;
var alarmInfo = {
	//1分鐘之後開始(該值至少大於1) 
	delayInMinutes: 1, 
	//與上方等同的寫法是 
	//when : Date.now() + 6000,
	//開始後每一分鐘執行一次(該值至少大於1) 
	periodInMinutes : 1 
};

//每次加載就清空定時器
chrome.alarms.clearAll();

chrome.alarms.onAlarm.addListener(function(alarm) {
	//計算定時器觸發次數
	console.log("onAlarm-" + ++count);
});
//創造定時器
chrome.alarms.create('testAlarm',alarmInfo);
