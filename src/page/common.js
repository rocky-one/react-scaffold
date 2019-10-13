import api from '../request/api';
import httpAxios from '../request/httpAxios';
import { queryString } from '../utils/common';
export let getTaskInfo = (taskId, cb) => {
    httpAxios(api.process.getTasks, { taskId }).then(res => {
        if (res.success) {
            if (res.value) {
                cb && cb(res.value)
            }
        }
    })
}
export let closeModal = (mes, that) => {
    const tempUrl = window.location.href.substr(window.location.href.indexOf('?'));
    let orgin = decodeURIComponent(queryString(tempUrl).origin);
    let url = '';
    if (mes) {
        url = orgin += "/#/closeTask?msg=" + encodeURI(mes);
    } else {
        url = orgin += "/#/closeTask";
    }
    window.location.href = url;
}
export let getQuerString = () => {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);//search,查询？后面的参数，并匹配正则
    if (r != null) return unescape(r[2]); return null;
}
export let setLogin = () => {
    // const urlParams = getQuerString(),
    const tempUrl = window.location.href.substr(window.location.href.indexOf('?'));
    const urlParams = queryString(tempUrl),
        token = urlParams.TOKEN;
    if (!token) return;
    sessionStorage.setItem('login', true);
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('urlLogin', JSON.stringify(urlParams));
}