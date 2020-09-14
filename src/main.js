import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "roboto-fontface/css/roboto/roboto-fontface.css";
import "@mdi/font/css/materialdesignicons.css";
import compareVersions from "compare-versions";
import semver from "semver";
import ViaCep from "vue-viacep";
import browserDetect from "vue-browser-detect-plugin";
import { getIPs, getIPv4, getIPv6 } from "webrtc-ips";

Vue.use(browserDetect);
Vue.use(ViaCep);

Object.defineProperty(Vue.prototype, "$getIPs", {
  value: getIPs
});

Object.defineProperty(Vue.prototype, "$getIPv4", {
  value: getIPv4
});

Object.defineProperty(Vue.prototype, "$getIPv6", {
  value: getIPv6
});

Object.defineProperty(Vue.prototype, "$compareVersions", {
  value: compareVersions
});

Object.defineProperty(Vue.prototype, "$semver", {
  value: semver
});

Object.filter = (obj, predicate) =>
  Object.fromEntries(Object.entries(obj).filter(predicate));

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
