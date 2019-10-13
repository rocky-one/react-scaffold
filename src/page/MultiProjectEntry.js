/**
 * Created by ZhangLynn on 2018/8/9
 **/
import React, { Component } from 'react';
import api from "../request/api";
import { message } from 'antd';
import httpAxios from "../request/httpAxios";
import goIcon from '../images/go3x.png'
import folder from '../images/folder.png'
import './MultiProjectEntry.less'
export default class MultiProjectEntry extends Component {
    constructor(props){
        super(props);
        this.state = {
            projectList: []
        };
        this.token = ''
    }

    getQueryStringHash(name) {
        let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        if(window.location.hash.indexOf("?") < 0){
            return null;
        }
        let r = window.location.hash.split("?")[1].match(reg);
        if (r != null) return decodeURIComponent(r[2]);
        return null;
    }

    /**
     * 获取指定的URL参数值
     * URL:http://www.quwan.com/index?name=tyler
     * 参数：paramName URL参数
     * 调用方法:getParam("name")
     * 返回值:tyler
     */
    getParam =() => {
        var qs = window.location.search.substr(1), // 获取url中"?"符后的字串
            args = {}, // 保存参数数据的对象
            items = qs.length ? qs.split("&") : [], // 取得每一个参数项,
            item = null,
            len = items.length;

        for(var i = 0; i < len; i++) {
            item = items[i].split("=");
            var name = decodeURIComponent(item[0]),
                value = decodeURIComponent(item[1]);
            if(name) {
                args[name] = value;
            }
        }
        return args;

    }
    getToken = () => {
        let url = window.location.href;
        //url 中带#号用location.hash取参数,否则用location.search取参数
        if(url.indexOf('#')){
            if(this.getQueryStringHash('TOKEN')){
                this.token = this.getQueryStringHash('TOKEN');
            }
        }else{
            if (this.getParam()['TOKEN']) {
                this.token = this.getParam()['TOKEN']
            }
        }
    }
    componentDidMount() {
        // 使用路由跳转
        // 获取token 使用session传递
        httpAxios(api.projects).then(res => {
            if (res.success === true) {
                this.setState({
                    projectList: res.value
                })
            } else {
                message.error(res.message)
            }
        })

    }
    goToProcess = (projectName) => {
         const urlParams = {
            project: projectName,
            token: this.token
        }
        sessionStorage.setItem('urlLogin', JSON.stringify(urlParams));
        const url = window.location.href.replace('multiProjects', 'process');
        window.location.href = url;

    }
    render() {
        let colorSet = [
            {start:'#62BDFF',end:'#0081D6'},
            {start:'#F8D97A',end:'#E5B627'},
            {start:'#ACD878',end:'#5AA700'},
            {start:'#9483FD',end:'#745FD0'},
            {start:'#7F8AAA',end:'#3A5E99'},
            {start:'#E08390',end:'#D95D69'},
            {start:'#83EEFD',end:'#16CCDC'},
            {start:'#52D2BE',end:'#06A68F'},
        ]
        return (
            <div className='multi-entry-container'>
                {
                    this.state.projectList.map((item,index) => {
                        // let colorIndex = index%8;
                        let colorIndex = 0; //使用1种颜色
                        let imgStyle = `linear-gradient(44deg, ${colorSet[colorIndex].start} 0%, ${colorSet[colorIndex].end} 100%)`;
                        let boxShadowStyle = `0 3px 6px 0 ${colorSet[colorIndex].start}`
                        return(
                            <div
                                key={item.code}
                                className='multi-entry-container__item'
                                style={{
                                    backgroundImage:imgStyle,
                                    boxShadow:boxShadowStyle,
                                    }} onClick={this.goToProcess.bind(this, item.name)}>
                                <div className='multi-entry-container__projectname'>{item.name}</div>
                                <span className='multi-entry-container__projectlable'>前往查看</span>
                                <img src={goIcon} alt=""
                                        className='multi-entry-container__arrow'
                                />
                                <span className='multi-entry-container__folder'><img src={folder} alt="" /></span>
                            </div>
                        )}
                    )
                }
                {/* {
                    test.map((item,index)=>{
                        let colorIndex = index%8;
                        let imgStyle = `linear-gradient(44deg, ${colorSet[colorIndex].start} 0%, ${colorSet[colorIndex].end} 100%)`;
                        let boxShadowStyle = `0 3px 6px 0 ${colorSet[colorIndex].start}`
                        return(
                            <div key={item.id} className={style.item}
                                style={{
                                    backgroundImage:imgStyle,
                                    boxShadow:boxShadowStyle,
                                    }} onClick={() => {window.location.href=`${this.state.planUrl}&project=${item.code}`}}>
                                <div className={style.projectname}>{item.name}</div>
                                <span className={style.projectlable}>前往查看</span>
                                <img src={goIcon} alt=""
                                        className={style.arrow}
                                />
                                <span className={style.folder}><img src={folder} alt="" /></span>
                            </div>
                        )
                    })
                } */}
            </div>

        )
    }
}

