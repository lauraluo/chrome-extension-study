
import Vue from 'vue'
import App from './App.vue'

Vue.config.silent = true;

var initDom = document.createElement("div");
initDom.id = "extensionUIwrap";

document.getElementsByTagName("body")[0].appendChild(initDom);

new Vue({
  el: '#extensionUIwrap',
  render: h => h(App)
})
