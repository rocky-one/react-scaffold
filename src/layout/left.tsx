import React from 'react'
import './style/layout1.less' 
import style from './style/layout1.less'

export default (props: any) => {
    return <div className={style.left}>
        {props.children}
    </div>
}