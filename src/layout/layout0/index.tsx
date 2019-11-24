import React from 'react'
import CreateRouter from '../../pages/createRouter'
import {routesLayout0} from '../../pages/config'

export default (props) => {
    return <div>
        <CreateRouter {...props} routes={routesLayout0} />
    </div>
}