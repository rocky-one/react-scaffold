import React from 'react'
import CreateRouter from '../../pages/createRouter'
import {routesLoginLayout} from '../../pages/config'

export default (props) => {
    return <div>
        <CreateRouter {...props} routes={routesLoginLayout} />
    </div>
}