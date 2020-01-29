import Vue from 'vue'
import Router from 'vue-router'
// import ErrorPage from '@/components/pages/ErrorPage'
import Base from '@/components/pages/Base'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        // {
        //     path: '/403',
        //     name: '403',
        //     component: ErrorPage
        // },
        // {
        //     path: '/404',
        //     name: '404',
        //     component: ErrorPage
        // },
        {
            path: '*',
            name: 'Base',
            component: Base
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})
