import Vue from 'vue'
import App from './App.vue'
import VSelect from 'vue-select'
import VTooltip from 'v-tooltip'

Vue.config.productionTip = false

Vue.component('VSelect', VSelect);
Vue.use(VTooltip);

Array.prototype.pushUnique = function (val) {
  if (this.indexOf(val) == -1) {
    this.push(val);
    return true;
  }
  return false;
}

new Vue({
  render: h => h(App),
}).$mount('#app')