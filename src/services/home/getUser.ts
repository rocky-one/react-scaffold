import request from '../index'
import api from '../api'

const getUser = (params?: any) => {
    return request(api.getUser, 'get', params)
}

export default getUser