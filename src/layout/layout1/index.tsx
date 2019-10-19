import React from 'react'
import {
    Link,
} from "react-router-dom"
import Left from './left'
import Right from './right'
import CreateRouter from '../../pages/createRouter'
import { routesLayout1 } from '../../pages/config'

export default (props: any = {}) => {
    return <div>
        <Left>
            <div>
                <Link to="/page1">page1</Link>
                <Link to="/page2">page2</Link>
                <Link to="/page3">page3</Link>
            </div>
        </Left>
        <Right>
            <CreateRouter routes={routesLayout1} />
        </Right>
    </div>
}