import React, { Component } from 'react';
import { Modal, Input, Select, Row, Col, Table, Divider, message } from 'antd';
import { queryString } from '../utils/common';
import api from '../request/api';
import httpAxios from '../request/httpAxios';
import SubmitTask from '../components/process/page/submit';
import { getTaskInfo, closeModal, setLogin } from './common';
import './WB_List.less';
export default class WBSubmit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceId: '',
            nodeId: '',
            taskId: props.taskId,
            submitVis: props.visible,
            submitFormInfo: {},// 提交任务的参数
            submitFormActivityInfo: {},// 提交任务执行活动参数
            sourceType: props.type// 门户跳转 还是 工作簿跳转( undefined) 门户（ platform）
        }
        this.formInfo = {};
    }
    componentWillMount() {
        setLogin();
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.taskId != this.props.taskId) {
            return true;
        }
        if (nextProps.visible != this.props.visible) {
            return true;
        }
        return false;
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            submitVis: nextProps.visible,
            sourceType: nextProps.type,
        })
    }
    componentDidMount() {
        let taskId = this.state.taskId,
            _this = this;
        if (this.state.sourceType) {
            const tempUrl = window.location.href.substr(window.location.href.indexOf('?'));
            taskId = queryString(tempUrl).taskId
        }
        if (this.state.sourceType) {
            this.setState({
                submitVis: true
            })
        }
        getTaskInfo(taskId, (data) => {
            if (data && data.length == 0) return;
            const { templateId, nodeId, instanceId } = data[0];
            // _this.setState({
            //     instanceId,
            //     nodeId,
            //     taskId
            // })
            // 获取执行活动列表
            httpAxios(api.process.getActivity, {
                templateId,
                nodeId: nodeId
            }).then(res => {
                if (res.success) {
                    const activityData = res.value;
                    _this.setState({
                        instanceId,
                        nodeId,
                        taskId,
                        activityData: _this.getHasParamsActivity(activityData),
                        submitFormActivityInfo: activityData && activityData.length > 0 ? _this.getDefaultActivityInfo(activityData) : []
                    })
                }
            })
        })
    }
    // 获取有参数的执行活动
    getHasParamsActivity = (data) => {
        if (!data) return [];
        return data.filter(item => {
            const activityParamList = item.activityParamList;
            return activityParamList && activityParamList.length > 0;
        })
    }
    // 获取默认执行活动参数信息
    getDefaultActivityInfo = (data) => {
        let res = [];
        data.map(item => {
            const { id, name, type } = item;
            let activityParamList = [],
                tempData = item.activityParamList;
            if (tempData) {
                tempData.map(paramList => {
                    const { paramName, paramValue } = paramList;
                    activityParamList.push({
                        paramName,
                        paramValue
                    })
                })
                res.push({
                    id,
                    name,
                    type,
                    activityParamList
                })
            }
        })
        return res;
    }

    submitOkEvent = () => {
        const param = new FormData();
        // todo
        const { instanceId, nodeId, taskId } = this.state,
            { desc, file } = this.formInfo,
            // submitFormActivityInfo = this.state.submitFormActivityInfo,
            submitFormActivityInfo = this.formInfo.submitTask,
            submitTask = {
                instanceId,
                nodeId,
                taskId,
                submitDesc: desc,
            };
        if (submitFormActivityInfo && submitFormActivityInfo.length > 0) {
            submitTask["activityList"] = submitFormActivityInfo
        }
        param.append('submitTask', JSON.stringify(submitTask));
        param.append('file', file);
        if (!instanceId && !nodeId && !taskId) {
            // 多维库是不是蹦了
            message.error('没有获取到任务信息！');
            return;
        }
        httpAxios(api.process.submitTask, param).then(res => {
            if (res.success) {
                message.success('提交成功！');
                this.closeSubmitModal("success");
            }
        })

    }
    submitCancelEvent = () => {
        this.closeSubmitModal("cancel");
    }
    closeSubmitModal = (type) => {
        if (this.state.sourceType) {
            closeModal(type=="success"?"提交成功！":undefined);
            this.props.handleSubmitModalCancel(type);
        } else {
            // 工作簿列表页面提交 
            this.setState({
                submitVis: false
            });
            this.formInfo = {};
            this.props.handleSubmitModalCancel(type);// success 提交成功需要更新工作簿列表内任务状态
        }
    }
    // 提交 获取提交信息
    getFormInfo = (data) => {
        this.formInfo = data;
        // this.setState({
        //     submitFormInfo: data,
        //     submitFormActivityInfo: data.submitTask
        // })
    }
    render() {
        return (
            <Modal
                maskClosable={false}
                destroyOnClose
                wrapClassName={this.state.sourceType?"C1Modal":""}
                closable={false}
                title="提交"
                width={620}
                style={{maxWidth:"100%"}}
                okText='确定'
                cancelText='取消'
                visible={this.state.submitVis}
                onOk={this.submitOkEvent.bind(this)}
                onCancel={this.submitCancelEvent.bind(this, 'iFlowChartCancel')}
            >
                <SubmitTask fn={this.getFormInfo} data={this.state.activityData} paramData={this.state.submitFormActivityInfo} />
            </Modal>
        )
    }
}