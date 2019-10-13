import React, { Component } from 'react';
import { Modal } from 'antd';
import { queryString } from '../utils/common';
import { getTaskInfo, closeModal,setLogin } from './common'
import './WB_List.less'
// import api from '../request/api';
// import httpAxios from '../request/httpAxios';
// import RejectTask from '../components/process/page/reject';
export default class TaskInstru extends Component {
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
        let taskId = this.state.taskId;
        if (!this.state.sourceType) {
            taskId = queryString(window.location.href).taskId
        }

        getTaskInfo(taskId, (data) => {
            this.setState({
                msg: data[0].workbookDesc
            })
        })
    }

    okEvent = () => {
        this.closeModal();
    }
    cancelEvent = () => {
        this.closeModal();
    }
    closeModal = () => {
        closeModal()
        // let orgin = decodeURIComponent(queryString(window.location.href).orgin);
        // let url = orgin = "/#/closeTask?msg=" + encodeURI(mes);
        // window.location.href = url;
    }
    render() {
        return (
            <Modal
                maskClosable={false}
                destroyOnClose
                closable={false}
                wrapClassName='C1Modal'
                title="任务说明"
                width={620}
                style={{ maxWidth: "100%" }}
                okText='确定'
                cancelText='取消'
                visible={this.state.visible}
                onOk={this.okEvent.bind(this)}
                onCancel={this.cancelEvent.bind(this)}
            >
                <span>{this.state.msg}</span>
            </Modal>
        )
    }
}