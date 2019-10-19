import React from 'react'
export default (props) => {
    console.log(props,333)
    return <div onClick={props.onLogin}>登录</div>
}