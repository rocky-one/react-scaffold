import Base, { Config } from '../base'

export default class GetUser extends Base {
    constructor(option: Config) {
        super(option)
        this.initConfig({
            url: '/apiPath1/getGoodsDetail',
            method: 'get'
        })
    }
    // 根据每个接口 处理数据 格式... 
    handleData(data: any){
        // 获取安全数据, 保证组件获取的时候不会出错
        data.list = this.getDataAttr(data,'list', [])
        data.list2 = this.getDataAttr(data,'list2', [])

        // 处理成组件需要的数据格式
        data.list.forEach((item:any,i:number)=>{
            item.name = `${item.name}${i}`
        })

        return data
    }
    // isSuccess(result){
        
    // }
}