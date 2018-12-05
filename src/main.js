// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
// import NProgress from 'nprogress';
import _ from 'lodash';

require('@/utils/utilities');
// require('lightbox2');
require("babel-polyfill"); // Enable promises on IE11 etc

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue({});
axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};
axios.defaults.withCredentials = true;
global._ = _;
// global.NProgress = NProgress;
global.axios = axios;
global.base_url = location.hostname == 'localhost' ? 'https:///' : '';
global.endpoints = require('@/config/endpoints');


new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});
