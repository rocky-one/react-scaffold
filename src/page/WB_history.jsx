import React, { Component } from 'react';
import { Modal, message } from 'antd';
import api from '../request/api';
import httpAxios from '../request/httpAxios';
import { getTaskInfo, closeModal, setLogin } from './common';
import HistoryRecord from '@/components/process/content/executeContent/historyRecord';
import { queryString } from '../utils/common';
import './WB_List.less'
export default class WBHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            historyVis: props.visible,
            sourceType: props.type,// 门户跳转 还是 工作簿跳转( undefined)
            instanceId: props.instanceId
        }
    }
    componentWillMount() {
        setLogin();
    }
    componentWillReceiveProps(nextProps) {
        if (this.state.sourceType) {
            const instanceId = queryString(window.location.href).instanceId;
            this.setState({
                historyVis: nextProps.visible,
                sourceType: nextProps.type,// 门户跳转 还是 工作簿跳转( undefined)
                instanceId
            })
        } else {
            this.setState({
                historyVis: nextProps.visible,
                sourceType: nextProps.type,// 门户跳转 还是 工作簿跳转( undefined)
                instanceId: nextProps.instanceId
            })
        }
    }
    componentDidMount() {
        const instanceId = queryString(window.location.href).instanceId;
        this.setState({
            instanceId
        })
    }
    historyOkEvent = () => {
        this.closeHistoryModal();
    }
    historyOkCancel = () => {
        this.closeHistoryModal();
    }
    closeHistoryModal = () => {
        if (this.state.sourceType) {
            closeModal();
        } else {
            this.setState({
                historyVis: false
            }, () => {
                this.props.fn && this.props.fn();
            })
        }
    }
    render() {
        return (
            <Modal
                wrapClassName={this.state.sourceType?"C1Modal noFooter":""}
                maskClosable={false}
                closable={this.state.sourceType?false:true}
                destroyOnClose
                title="历史"
                width={620}
                style={{maxWidth:"100%"}}
                okText='确定'
                cancelText='取消'
                visible={this.state.historyVis}
                onOk={this.historyOkEvent.bind(this)}
                onCancel={this.historyOkCancel.bind(this)}
                footer={null}
            >
                <HistoryRecord instanceId={this.state.instanceId} instanceObj={{ id: this.state.instanceId }} byUser />
            </Modal>
        )
    }
}
