import React, { useState } from 'react'
import { createContainer } from 'unstated-next'
// 这里作为共享的数据
// 分别在CountChild CountChild2中使用
function useCount() {
    let [count, setCount] = useState(-0)
    let decrement = () => setCount(count - 1)
    let increment = () => setCount(count + 1)

    return { count, setCount, decrement, increment }
}

const Counter = createContainer(useCount)

export default function Count() {
    return (
        <Counter.Provider>
            <CountChild />
            <CountChild2 />
        </Counter.Provider>
    )
}
function CountChild(){
    let counter = Counter.useContainer()
    return (
        <div>
            <button onClick={counter.decrement}>-</button>
            <p>You clicked {counter.count} times</p>
            <button onClick={counter.increment}>+</button>
        </div>
    )
}
function CountChild2(){
    let counter = Counter.useContainer()
    return (
        <div>
            <p>You clicked {counter.count} times2</p>
        </div>
    )
}