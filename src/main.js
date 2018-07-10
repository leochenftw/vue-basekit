// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from 'axios';
import NProgress from 'nprogress';

require('lightbox2');

Vue.config.productionTip        =   false;
Vue.prototype.$bus              =   new Vue({});
axios.defaults.headers.common   =   {
                                        'X-Requested-With'  :   'XMLHttpRequest'
                                    };
global.NProgress                =   NProgress;
global.axios                    =   axios;
global.base_url                 =   location.hostname == 'localhost' ? 'https://sgl.leochen.co.nz' : '';
global.base_prefix              =   location.hostname == 'localhost' ? '/#' : '/!/#';

new Vue({
el: '#app',
router,
components: { App },
template: '<App/>'
})
