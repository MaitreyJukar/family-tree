import Vue from 'vue'
import App from './App.vue'
import VSelect from 'vue-select'

Vue.config.productionTip = false

Vue.component('VSelect', VSelect);

Array.prototype.pushUnique = function () {
  for (let i = 0; i < arguments.length; i++) {
    if (this.indexOf(arguments[i]) == -1) {
      this.push(arguments[i]);
    }
  }
  return this.length;
}

new Vue({
  render: h => h(App),
}).$mount('#app')