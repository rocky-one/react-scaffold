import { useState } from 'react'
import { createContainer } from 'unstated-next'
import { interval } from 'rxjs'
import { useObservable } from 'rxjs-hooks'

// 这里作为共享的数据
function useCount() {
    let [count, setCount] = useState(-0)
    let decrement = () => setCount(count - 1)
    let increment = () => setCount(count + 1)
    let value = useObservable(() => interval(1000), 0)
    return { count, setCount, value, decrement, increment }
}

export const CountContainer = createContainer(useCount)