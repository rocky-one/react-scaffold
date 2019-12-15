import axios from 'axios'
//待完善 1. 错误上报 2.mock数据 3.聚合接口 promise.all 
// 4.graphQL对接 5.webSQL储存不常变化的数据同时数据量大的情况

interface Result {
    state: number,
    data: any,
    error: any
}
export interface Config {
    url: string,
    method: string,
    data?: any,
    params?: any,
}
export default class Base {
    constructor(option: Config) {
        this.initResult()
        this.config = {
            url: '',
            method: 'get'
        }
        // 如果有option说明从外部new 的时候有新的url 等配置, 这样可以灵活配置
        if (option) {
            this.initConfig(option)
        }
    }
    config: Config
    result: Result
    db: any
    initResult = () => {
        this.result = {
            state: null,
            data: null,
            error: null
        }
    }
    initConfig = (config: Config) => {
        let newConfig: Config = {
            url: config.url,
            method: config.method,
        }

        return newConfig
    }
    mergeConfig = (config: Config, params: any) => {
        if (config.method === 'get') {
            config.params = params
        } else {
            config.data = params
        }

        return config
    }
    handleData(data: any) {
        return data
    }
    handleError = (result: any) => {
        // 错误处理
        // 可统一弹出错误提示
        // 错误上报 sentry.js 平台
        // demo captureException('authFail',result.error,this.options)
        return {
            errorCode: result.respCode,
            errorMsg: result.errorMsg || '出错了'
        }
    }
    isSuccess(result: any) {

    }
    // 数据安全性
    getDataAttr(data: any, path: any, defaultValue: any) {
        if (data) {
            return (
                (!Array.isArray(path)
                    ? path
                        .replace(/\[/g, '.')
                        .replace(/\]/g, '')
                        .split('.')
                    : path
                ).reduce((o: any, k: string) => (o || {})[k], data) || defaultValue
            )
        } else {
            return defaultValue
        }
    }
    async fetch(params: any, cache: boolean = false) {
        // 是否使用缓存
        if(cache && this.result.data){
            return Promise.resolve(this.result.data)
        }
        return new Promise((resolve: any) => {

            return axios(this.mergeConfig(this.config, params)).then((res) => {
                const result = res.data
                if (result.success) {
                    this.result.data = this.handleData(result)
                    resolve(this.result.data)
                } else {
                    this.result.error = this.handleError(result)
                    resolve(this.result.error)
                }
            }).catch((err) => {
                this.result.error = {
                    errorCode: 500,
                    errorMsg: '网络请求失败!'
                }
                //发送一条错误记录
                // captureException('netWorkError',res,this.options)
                resolve(this.result.error)
            })
        })
    }
    // async connect(params){
    //     return new Promise((resolve)=>{
    //         this.db = this.db || new Database()
    //         this.db.isExists(this.options.url).then(res=>{
    //             //数据库已经存在，返回结果
    //             resolve({
    //                 result : {
    //                     state:'success',
    //                     data:this.db
    //                 }
    //             })
    //         }).catch(e=>{
    //             //数据库不存在，请求接口并处理数据，然后存入数据库
    //             let res = await this.fetch(params)
    //             if(res.result.state == 'success'){
    //                 for(let i in res.result.data){
    //                   //创建表并存储数据    
    //                   this.db.create(i,data[i])
    //                 }
    //                 resolve({
    //                     result : {
    //                         state:'success',
    //                         data:this.db
    //                     }
    //                 })
    //             }else {
    //               resolve(res)  
    //             }
    //         })
    //     })
    // }
}