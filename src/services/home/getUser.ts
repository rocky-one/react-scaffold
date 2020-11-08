import request from '../index'
import api from '../api'

const getUser = async (params: any) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                data: [1,2,3]
            })
        }, 3000)
    })
    return request.get(api.getUser, params)
}

export default getUser