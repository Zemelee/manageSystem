import Vue from 'vue'
import vueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import NotFound from '@/components/NotFound.vue'

Vue.use(vueRouter)

const routes = [
    {
        path: '/',
        component: Login,
        hidden: true,
        name:'login',
        redirect: '/login',
    },
    { path: '/login',name:'登录页', component: Login, hidden: true },
    { path: '*', name: 'NotFound', component: NotFound, hidden: true },
    {
        path: '/home',
        name: '学生管理',
        iconClass: 'fa fa-user',
        component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/home/student',
                name: '学生列表',
                iconClass: 'fa fa-list',
                component: () => import('@/components/students/StudentsList.vue'),
            },
            {
                path: '/home/info',
                name: '信息列表',
                iconClass: 'fa fa-list-alt',
                component: () => import('@/components/students/InfoList.vue'),
            },
            {
                path: 'infos',
                name: '信息管理',
                iconClass: 'fa fa-list-alt',
                component: () => import('@/components/students/InfoLists.vue'),
            },
            {
                path: '/home/work',
                name: '作业列表',
                iconClass: 'fa fa-list-ul',
                component: () => import('@/components/students/WorkList.vue'),
            },
            {
                path: '/home/works',
                name: '作业管理',
                iconClass: 'fa fa-th-list',
                component: () => import('@/components/students/WorkMent.vue'),
            }
        ]
    },
    {
        path: '/home',
        name: '数据分析',
        iconClass: 'fa fa-bar-chart',
        component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/home/dataview',
                name: '数据概述',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/DataView.vue'),
            },
            {
                path: '/home/mapview',
                name: '地图概述',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/MapView.vue'),
            },
            {
                path: '/home/travelmap',
                name: '旅游地图',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/TravelMap.vue'),
            },
            {
                path: '/home/scoremap',
                name: '分数地图',
                iconClass: 'fa fa-line-chart',
                component: () => import('@/components/dataAnalysis/ScoreMap.vue'),
            },
        ]
    },
    {
        path: '/home',
        name: '用户中心',
        iconClass: 'fa fa-user',
        component: () => import('@/components/Home.vue'),
        children: [
            {
                path: '/home/users',
                name: '权限管理',
                iconClass: 'fa fa-user',
                component: () => import('@/components/user/User.vue'),
            },
        ]
    },

]


const router = new vueRouter({
    routes,
})

export default router