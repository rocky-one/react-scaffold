import React from 'react'
import loadable from '@loadable/component'
const Login = loadable(() => import('./login'))
const Page1 = loadable(() => import('./page1'))
const Page2_1 = loadable(() => import(/* webpackChunkName: "page2_1" */ './page2/page2_1'))
const Page2 = loadable(() => import('./page2'))
const Page3 = loadable(() => import('./page3'))

export interface RouteInterface {
    path: string,
    component: React.ComponentType,
    routes?: Array<RouteInterface>,
}

// 针对不同的布局有不同的路由配置
export const routesLoginLayout = [
    {
        path: '/login',
        component: Login,
    },
]

export const routesLayout1 = [
    {
        path: '/page1',
        component: Page1,
    },
    {
        path: '/page2',
        component: Page2,
        routes: [
            {
                path: '/page2/page2_1',
                component: Page2_1,
            },
        ]
    },
    {
        path: '/page3',
        component: Page3,
    },
]
