import React from 'react'
import Layout0 from './layout0/index'
import Layout1 from './layout1'

export default (props: any = {}) => {
    if (props.type === 'layout0') {
        return <Layout0 {...props} />
    }

    return <Layout1 {...props} />
}