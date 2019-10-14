import React from 'react'
import Login from './login'
import Page1 from './page1'
import Page2_1 from './page2/page2_1'
import Page2 from './page2'
import Page3 from './page3'

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
