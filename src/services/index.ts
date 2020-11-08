import axios from 'axios'

export default {
    get: (url: string, params: any) => axios.get(url, params),
    post: (url: string, params: any) => axios.post(url, params)
}