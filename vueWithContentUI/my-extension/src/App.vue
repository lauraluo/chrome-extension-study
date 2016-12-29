<template>
    <div class="contentUI" ref="contentUI">
        <!-- 展開時的畫面 -->

        <!-- vue的動畫組件宣告方式，會跟v-if連動 -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <!-- v-if 設定區塊顯示的邏輯是根據  data.toggle 這裡的內容會在切換的是後出現或消失 -->
            <div class="contentUI__open-content" v-if="toggle">
                <h1>擴充功能範例</h1>
                <h2>使用vue打造內容UI，並且與擴充功能溝通</h2>
                <p>按下按鈕向事件腳本發送訊息</p>
                <div>
                    <!-- v-on:click 綁定點擊事件會執行 開啟 及 關閉 頁面按鈕 方法 -->
                    <a class="contentUI__button" href="#" v-on:click="turnOnThePageAction">開啟頁面按鈕</a>
                    <a class="contentUI__button" href="#" v-on:click="turnOffThePageAction">關閉頁面按鈕</a>
                </div>
                <h2>切換內容UI的長相</h2>
                <p>啟用頁面按鈕後，按下單出視窗的按鈕也能切換長相</p>
                <!-- v-on:click  綁定點擊事件會執行長相的切換 -->
                <a class="contentUI__button" href="#" v-on:click="switchView">切換長相</a>
            </div>
        </transition>

        <!-- 關閉時的畫面 -->
         


       <!-- vue的動畫組件宣告方式，會跟v-if連動 -->
        <transition name="custom-classes-transition" enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
          <!-- v-if 設定區塊顯示的邏輯是根據  data.toggle 這裡的內容會在切換的是後出現或消失 -->
          <div class="contentUI__close-content" v-if="!toggle">
            <!-- v-on:click  綁定點擊事件會執行長相的切換 -->
            <a class="contentUI__button" href="#" v-on:click="switchView">切換長相</a>           
          </div>
        <transition>        
    </div>
</template>


<script>
export default {
  name: 'contentUI',
  data () {
    return {
      toggle: 'false'
    }
  },
  watch: {
    toggle: function(val){
      console.log('toggleSwitch');  
    }  
  },
  methods: {
    switchView: function(callback){
      this.toggle = !this.toggle;

      if(callback && typeof callback == 'function'){
        callback();
      }
    },
    turnOnThePageAction: function(){
      chrome.runtime.sendMessage({ name: "開啟頁面按鈕" },function(response) {
        console.log(response);
      });
    },
    turnOffThePageAction: function(){

      chrome.runtime.sendMessage({ name: "關閉頁面按鈕" },function(response) {
        console.log(response);
      });
    }
  },
  mounted: function(){
    var _this = this;

    chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
      _this.switchView.call(_this, function(){
        sendResponse("操作完成")
      });
    });

  }
}
</script>

<style scoped>
.contentUI__open-content {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  position: fixed;
  padding: 40px;
  right: 0;
  top:0;
  width: 250px;
  z-index: 9999;
  background: #fff;
  height: 100vw;
  min-height: 800px;
  box-shadow: 0 0 30px 5px rgba(0,0,0,0.3);
}

.contentUI__close-content {
  position: fixed;
  right: 10px;
  top:100px;
  z-index: 9999; 

}

.contentUI  h1, .contentUI  h2 {
  font-weight: normal;
}

.contentUI__button {
  display: inline-block;
  box-sizing: border-box;
  background-color: #4fc08d;
  border: 1px solid #4fc08d;
  margin: 15px 20px;
  padding: 15px 20px;s
  font-size: 16px;
  color: #fff;
  width: 150px;
  text-align: center;
  vertical-align: middle;
  color: #fff;
  border-radius: 6px;
  text-decoration: none;
}

.contentUI__button:hover {
  text-decoration: none;
  background: #00bd68;
}

.contentUI__button:active,.contentUI__button:visited {
  color: #fff;
}

</style>
