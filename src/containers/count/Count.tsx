import React, { useState } from 'react'
import {CountContainer} from '../../store/count'
import useRequest from '../../hooks/useRequest'

export default function Count(props: any) {
    return (
        <div>
            <CountContainer.Provider>
                <CountChild />
                <CountChild2 />
                <CountChild3 />
            </CountContainer.Provider>
        </div>
        
    )
}
function CountChild(){
    let counter = CountContainer.useContainer()
    return (
        <div>
            <button onClick={counter.decrement}>-</button>
            <p>You clicked {counter.count} times</p>
            <button onClick={counter.increment}>+</button>
        </div>
    )
}
function CountChild2(){
    let counter = CountContainer.useContainer()
    return (
        <div>
            <div>{counter.value}</div>
            <p>You clicked {counter.count} times2</p>
        </div>
    )
}
function CountChild3() {
    return (
        <div>
            rxjsAjax
        </div>
    )
}