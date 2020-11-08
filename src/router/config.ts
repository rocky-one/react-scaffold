import React from 'react'
import loadable from '@loadable/component'
// @ts-ignore
const Login = loadable(() => import('../pages/login'))
// @ts-ignore
const Page1 = loadable(() => import('../pages/page1'))
// @ts-ignore
const Page2_1 = loadable(() => import(/* webpackChunkName: "page2_1" */ '../pages/page2/page2_1'))
// @ts-ignore
const Page2 = loadable(() => import('../pages/page2'))
// @ts-ignore
const Page3 = loadable(() => import('../pages/page3'))

export interface RouteInterface {
    path: string,
    component: React.ComponentType,
    routes?: Array<RouteInterface>,
}

export const routesLayout1 = [
    {
        path: '/login',
        component: Login,
    },
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
