import { useEffect, useState } from 'react'

const useRequest = (fetch: any, dependencies = []) => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        fetch().then((res: any) => {
            setData(res)
        }).finally(() => {
            setLoading(false)
        })
    }, dependencies)

    return {
        data,
        loading
    }
}
export default useRequest
