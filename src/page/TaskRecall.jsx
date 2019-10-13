import React, { Component } from 'react';
import { Modal, message } from 'antd';
import { queryString } from '../utils/common';
import { getTaskInfo, closeModal, setLogin } from './common'
import './WB_List.less'
import httpAxios from '../request/httpAxios';
import api from '../request/api';
// import httpAxios from '../request/httpAxios';
// import RejectTask from '../components/process/page/reject';
export default class TaskRecall extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true
        }
    }
    componentWillMount() {
        setLogin();
    }
    componentDidMount() {
        let taskId = this.state.taskId,
            tempObj = queryString(window.location.href);
        sessionStorage.setItem('token', tempObj.TOKEN);
        if (!this.state.sourceType) {
            taskId = tempObj.taskId
        }
        getTaskInfo(taskId, (data) => {
            this.setState({
                msg: data[0].workbookDesc,
                instanceId: data[0].instanceId,
                nodeId: data[0].nodeId,
                taskId,
                nodeStatus: data[0].nodeStatus,
                fromNodeId: tempObj.fromNodeId
            })
        })
    }

    okEvent = () => {
        const { instanceId, nodeId, taskId, nodeStatus, fromNodeId } = this.state;
        const _this = this;
        if (nodeStatus == 'reject') {
            httpAxios(api.process.cancelRejectedTask, {
                instanceId,
                fromNodeId
            }).then(res => {
                if (res.success) {
                    _this.cancelEvent(true)
                }
            })
        } else {
            httpAxios(api.process.cancelTask, {
                instanceId,
                nodeId,
                taskId
            }).then(res => {
                if (res.success) {
                    _this.cancelEvent(true)
                }
            })
        }
    }
    cancelEvent = (type) => {
        this.closeModal(type?"撤回成功！":undefined);
    }
    closeModal = () => {
        closeModal();
    }
    render() {
        return (
            <Modal
                wrapClassName={this.state.sourceType ? "C1Modal" : ""}
                maskClosable={false}
                destroyOnClose
                closable={false}
                wrapClassName='C1Modal'
                title="撤回任务"
                width={620}
                style={{ maxWidth: "100%" }}
                okText='确定'
                cancelText='取消'
                visible={this.state.visible}
                onOk={this.okEvent.bind(this)}
                onCancel={this.cancelEvent.bind(this,false)}
            >
                <span>是否撤回此任务？</span>
            </Modal>
        )
    }
}