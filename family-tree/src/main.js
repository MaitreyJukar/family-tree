import Vue from 'vue'
import App from './App.vue'
import SortedTablePlugin from "vue-sorted-table";

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
Vue.use(SortedTablePlugin);