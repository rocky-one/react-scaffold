import React from 'react'
import {
    Switch,
    Route,
} from 'react-router-dom'
import { RouteInterface } from './config'

export default function CreateRouter(wprops: any) {
    return <Switch>
        {wprops.routes.map((route: RouteInterface) => (
            <Route
                key={route.path}
                path={route.path}
                render={props => (
                    <route.component {...wprops} {...props} routes={route.routes} />
                )}
            />
        ))}
    </Switch>
}