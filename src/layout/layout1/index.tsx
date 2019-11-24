import React from 'react'
import {
    Link,
} from "react-router-dom"
import Left from './left'
import Right from './right'
import CreateRouter from '../../pages/createRouter'
import { routesLayout1 } from '../../pages/config'
import Login from '../../pages/login'
import { Menu } from 'antd';

export default (props: any = {}) => {
    if (!props.login) {
        return <Login onLogin={props.onLogin} />
    }
    return <div style={{ height: '100%', display: 'flex' }}>
        <Left>
            <Menu>
                <Menu.Item key="1">
                    <Link to="/page1">page1</Link>
                </Menu.Item>
                <Menu.Item key="2">
                    <Link to="/page2">page2</Link>
                </Menu.Item>
                <Menu.Item key="3">
                    <Link to="/page3">page3</Link>
                </Menu.Item>
            </Menu>
        </Left>
        <Right>
            <CreateRouter routes={routesLayout1} />
        </Right>
    </div>
}