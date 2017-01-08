(function(exports) {
	//API兼容處理
    exports.URL = exports.URL || exports.webkitURL;

    exports.requestAnimationFrame = exports.requestAnimationFrame ||
        exports.webkitRequestAnimationFrame || exports.mozRequestAnimationFrame ||
        exports.msRequestAnimationFrame || exports.oRequestAnimationFrame;

    exports.cancelAnimationFrame = exports.cancelAnimationFrame ||
        exports.webkitCancelAnimationFrame || exports.mozCancelAnimationFrame ||
        exports.msCancelAnimationFrame || exports.oCancelAnimationFrame;


    navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia || navigator.mozGetUserMedia ||
        navigator.msGetUserMedia;


    var isRecoding = false;
    //預覽影片，使用原始的dom物件操作
    var video = document.getElementById('video');
    var videoWidth = 600;
    var videoHeight = 400;
    video.autoplay = true;
    video.height = videoHeight;
    video.width = videoWidth;

	//取得原始的dom物件，以便使用download api
    var downloadlink = document.getElementById('downloadBtn');

    //畫面展示需要，使用jquery dom 
    var dRecordBtn = $('#recodBtn');
    var dStopBtn = $('#stopBtn').hide();
    var dDownloadBtn = $('#downloadBtn').hide();
    


    //錄制畫面用的canvas
    var canvas = document.getElementById('canvas');
    canvas.height = videoHeight;
    canvas.width = videoWidth;
    //準備用來存放 requestAnimationFrame 的id 以便在停止時取消Canvas的截錄繪制
    var rafId = null; 
    //準備畢來存放，cnavas的錄制相關的物件
    var cStream = null;
    var recorder = null;
    var chunks = [];
    //串流的來源
    var sourceTrack = null;

    //開始錄制的邏輯
    function record(stream) {
    	//將live區塊的影片來源跟串流接上。
        video.src = URL.createObjectURL(stream);
        shareStream = stream;

        var ctx = canvas.getContext('2d');
        sourceTrack = stream.getTracks()[0];


        function drawVideoFrame(time) {
            rafId = requestAnimationFrame(drawVideoFrame);
            ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
        };
        //開始截取畫面並把requestAnimationFrame的id儲存起來以便控制

        cStream = canvas.captureStream(30);
        recorder = new MediaRecorder(cStream);
        rafId = requestAnimationFrame(drawVideoFrame);
        recorder.start();
        recorder.ondataavailable = function(e) {
            //saveChunks
            chunks.push(e.data);
        };
    };

    //處理停止的邏輯
    function stopRecord() {
        //停止影片串流的來源
        sourceTrack.stop();
        //停止Canvas錄制畫面
        recorder.onstop = exportPreview;
        recorder.stop();
        //停止請求requestAnimationFrame
        cancelAnimationFrame(rafId);
    };



    function exportPreview() {
        //顯示下載按鈕
        dDownloadBtn.show();
        //影片輸出
        var blob = new Blob(chunks);
        var vidURL = URL.createObjectURL(blob);
        var vid = document.createElement('video');
        vid.controls = true;
        vid.src = vidURL;
        vid.onend = function() {
            URL.revokeObjectURL(vidURL);
        };
        $('#resultWrap').append(vid);
        //指定下載格式，這一部份還要再處理XD，我今天時間不夠
        downloadlink.download = 'capture.mpeg';
        downloadlink.href = vidURL;

    };

    //取得串流失敗的錯誤處理
    function getUserMediaError(error) {
        console.log('navigator.webkitGetUserMedia() errot: ', error);
    };


    //按下開始錄制鈕
    dRecordBtn.click(function() {
        if (!isRecoding) {
            isRecoding = true;
            dRecordBtn.hide();
            dStopBtn.show();

            //設定可以選擇媒體來源，以便開始處理串流
            captureRequestID = chrome.desktopCapture.chooseDesktopMedia(["screen", "window", "tab"], function(streamId) {
                var audioConstraint = {
                    mandatory: {
                        chromeMediaSource: 'desktop',
                        chromeMediaSourceId: streamId
                    }
                };
                //使用 Navigator.getUserMedia拿到串流並開始處理
                navigator.getUserMedia({
                    audio: audioConstraint,
                    video: {
                        mandatory: {
                            chromeMediaSource: 'desktop',
                            chromeMediaSourceId: streamId,
                            maxWidth: screen.width,
                            maxHeight: screen.height
                        }
                    }
                }, record, getUserMediaError);
            });
        }
    });
    //按下停止錄制鈕
    dStopBtn.click(function() {
        if (isRecoding) {
        	//處理停止事件
            stopRecord();
            //處理UI
            isRecoding = false;
            dRecordBtn.show();
            dStopBtn.hide();

        }
    });
})(window);
