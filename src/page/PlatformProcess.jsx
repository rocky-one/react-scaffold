import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TreeSelect, Button, message, Modal } from 'antd';
import InstanceFlowChart from '../components/process/content/executeContent/instanceFlowChart'
import { queryString } from '../utils/common';
import { getTaskInfo, closeModal, setLogin } from './common'
// import httpAxios from '../request/httpAxios';
// import api from '../request/api';
import './WB_List.less';
export default class PlatformProcess extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            instanceFlowScreen: [],
            sourceType: 'platform',// 门户跳转 还是 工作簿跳转( undefined)
            taskId: props.taskId
        }
    }
    componentWillMount() {
        setLogin();
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            sourceType: nextProps.type,// 门户跳转 还是 工作簿跳转( undefined)
            taskId: nextProps.taskId
        })
    }
    componentDidMount() {
        let taskId = queryString(window.location.href).taskId;
        // if (this.state.sourceType) {
        //     taskId = queryString(window.location.href).taskId;
        // }
        // const setObj = (data) => {

        // }
        getTaskInfo(taskId, (data) => {
            if (data && data.length == 0) return;
            this.setState({
                instanceId: data[0].instanceId,
                templateId: data[0].templateId,
                taskId: taskId,
            })
        })
    }
    handleOk = () => {
        this.closeModal();
    }
    handleCancel = () => {
        this.closeModal();
    }
    closeModal = (mes) => {
        if (this.state.sourceType) {
            closeModal(mes,this);
            // let orgin = decodeURIComponent(queryString(window.location.href).orgin);
            // let url = orgin = "/#/closeTask?msg=" + encodeURI(mes);
            // window.location.href = url;
        } else {
            this.setState({
                visible: false
            })
        }
    }
    instanceFlowScreen = (value) => {
        this.setState({
            instanceFlowScreen: value
        })
    }
    render() {
        return (
            <div>
                <Modal
                    title="流程"
                    destroyOnClose
                    wrapClassName='C1Modal'
                    maskClosable={false}
                    style={{maxWidth:"100%"}}
                    closable={false}
                    okText='确定'
                    cancelText='取消'
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={620}
                    bodyStyle={{
                        overflow: 'auto',
                    }}
                >
                    <InstanceFlowChart
                        flowType
                        instanceObj={{
                            templateId: this.state.templateId,
                            id: this.state.instanceId// 实例id
                        }}
                        bodyStyle={
                            {
                                height:"calc(100% - 55px)"
                            }
                        }
                        getInstanceFlowScreen={this.instanceFlowScreen}
                        instanceFlowScreen={this.state.instanceFlowScreen}// 数组 筛选 
                    />
                </Modal>
            </div>
        )
    }
}
// PlatformProcess.prototype.context = 
PlatformProcess.contextTypes={
    router: PropTypes.object.isRequired
}