import Vue from 'vue'
import Router from 'vue-router'
import Homepage from '@/components/pages/Homepage'
import ErrorPage from '@/components/pages/ErrorPage'
import Page from '@/components/pages/Page'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Homepage',
            component: Homepage
        },
        {
            path: '/403',
            name: '403',
            component: ErrorPage
        },
        {
            path: '*',
            name: '403',
            component: ErrorPage
        }
    ],
    scrollBehavior (to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
})
