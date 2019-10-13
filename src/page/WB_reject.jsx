import React, { Component } from 'react';
import { Modal, message } from 'antd';
import api from '../request/api';
import httpAxios from '../request/httpAxios';
import RejectTask from '../components/process/page/reject';
import { getTaskInfo, closeModal, setLogin } from './common'
import { queryString } from '../utils/common';
import './WB_List.less'
export default class WBRejectTask extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rejectVis: props.visible,
            sourceType: props.type,// 门户跳转 还是 工作簿跳转( undefined)
            taskId: props.taskId
        }
    }
    componentWillMount() {
        setLogin();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            rejectVis: nextProps.visible,
            sourceType: nextProps.type,// 门户跳转 还是 工作簿跳转( undefined)
            taskId: nextProps.taskId
        })
    }
    componentDidMount() {
        let taskId = this.state.taskId;
        if (this.state.sourceType) {
            taskId = queryString(window.location.href).taskId
        }
        getTaskInfo(taskId, (data) => {
            if (data.length > 0) {
                this.setState({
                    instanceId: data[0].instanceId,
                    nodeId: data[0].nodeId,
                    taskId: taskId,
                })
            }
        })
    }
    rejectOkEvent = () => {
        const tempParam = Object.assign(this.state.rejectData, { instanceId: this.state.instanceId, fromNodeId: this.state.nodeId });
        if (tempParam.instanceId && tempParam.fromNodeId && tempParam.toNodeId) {
            httpAxios(api.process.rejectTask, tempParam).then(res => {
                if (res.success) {
                    message.success('退回成功！');
                    this.closeRejecModal("success");
                }
            })

        }
    }
    rejectCancelEvent = () => {
        this.closeRejecModal();
    }
    closeRejecModal = (type) => {
        this.setState({
            rejectVis: false
        })
        if (this.state.sourceType) {// 门户跳转需要调用门户提供的关闭modal方法
            closeModal(type == "success" ? "退回成功！" : null);
        }else {
            //  退回成功，关闭弹窗并且修改节点任务状态，否则，只关闭状态
            this.props.rejectCb && this.props.rejectCb(type);
        }
    }
    getRejectTaskData = (data) => {
        this.setState({
            rejectData: data
        })
    }
    render() {
        return (
            <Modal
                wrapClassName={this.state.sourceType ? "C1Modal" : ""}
                maskClosable={false}
                closable={false}
                destroyOnClose
                title="退回"
                width={620}
                style={{ maxWidth: "100%" }}
                okText='确定'
                cancelText='取消'
                visible={this.state.rejectVis}
                onOk={this.rejectOkEvent.bind(this)}
                onCancel={this.rejectCancelEvent.bind(this, 'iFlowChartCancel')}
            >   {
                    this.state.nodeId ? <RejectTask data={{
                        id: this.state.nodeId,// nodeId
                        instanceId: this.state.instanceId// 实例id
                    }}
                        fn={this.getRejectTaskData}
                    /> : null
                }
            </Modal>
        )
    }
}
