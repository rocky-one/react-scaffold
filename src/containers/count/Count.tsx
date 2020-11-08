import React, { useState } from 'react'
import {CountContainer} from '../../store/count'

export default function Count(props: any) {
    console.log(props,3)
    return (
        <div>
            <CountContainer.Provider>
                <CountChild />
                <CountChild2 />
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
