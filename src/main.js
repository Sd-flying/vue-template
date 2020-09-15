import Vue from "vue";
import App from "./App.vue";
import router from "./router/";
import store from "./store/";

// 适配flex
import '@/common/flexible.js';

// 引入全局css
import './assets/scss/buttons.scss';
import './assets/scss/screen-style.scss';

//配置element
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "@/styles/index.scss"; // global css

//引入echart
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

// 全局引用DataV
import dataV from '@jiaminghi/data-view';
Vue.use(dataV);

// 按需引入vue-awesome图标
import Icon from 'vue-awesome/components/Icon';
import 'vue-awesome/icons/chart-bar.js';
import 'vue-awesome/icons/chart-area.js';
import 'vue-awesome/icons/chart-pie.js';
import 'vue-awesome/icons/chart-line.js';
import 'vue-awesome/icons/align-left.js';

// 全局注册图标
Vue.component('icon', Icon);


Vue.use(ElementUI);
Vue.config.productionTip = false;

import "./permission";
import "../mock"; //mock.js

import serviceManger from "@/service/index"; //请求服务的所有代码
Vue.prototype.$serviceManger = serviceManger; //其中$xx为新命的名。全局引入

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
