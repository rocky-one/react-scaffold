import React, { Component } from 'react';
import { Modal, Input, Select, Row, Col, message } from 'antd';
import InputFile from '../components/common/inputFile/InputFile';
import { callbackify } from 'util';
import httpAxios from '../request/httpAxios';
import api from '../request/api'
const { TextArea } = Input;
const Option = Select.Option;
export default class WB_lock extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mailNotifier: [],// 邮件通知人
            visible: props.visible,
            instanceId: props.instanceId,
            nodeId: props.nodeId,
            taskId: props.taskId,
            workbookId: props.workbookId
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            visible: nextProps.visible,
            instanceId: nextProps.instanceId,
            nodeId: nextProps.nodeId,
            taskId: nextProps.taskId,
            workbookId: nextProps.workbookId
        })
    }
    componentDidMount() {
        this.setState({
            mailNotifier: [{ id: '1', text: '1' }, { id: '2', text: '2' }, { id: '3', text: '3' }]
        })
        //todo 获取邮件通知人
        httpAxios(api.process.getEmailNotifyUsers).then(res => {
            if (res.success) {
                if (res.value) {
                    this.setState({
                        mailNotifier: res.value
                    })
                }
            }
        })
    }

    handleChange = (value) => {
        this.userIds = value;
    }
    renderOptins = () => {
        return this.state.mailNotifier.map(item => {
            return <Option value={item.id} key={item.id}>{item.text+'('+item.loginName+')'}</Option>
        })
    }
    getFile = (obj) => {
        // 获取  附件对象
        this.fileObj = obj;
    }
    getDescCont = (e) => {
        this.descCon = e.target.value;
    }
    handleOk = () => {
        // 锁定表单
        const param = new FormData();
        const { instanceId, nodeId, taskId, workbookId } = this.state
        param.append('file', this.fileObj);
        param.append('submitWorkbook', JSON.stringify({
            instanceId,
            nodeId,
            taskId,
            workbookId,
            submitDesc: this.descCon,
            userIds: this.userIds
        }));
        if (!instanceId && !nodeId & !taskId && !workbookId) return;
        httpAxios(api.process.lockWorkbook, param).then(res => {
            if (res.success) {
                message.success('锁定成功！');
                this.props.update(workbookId, "lock");
            }
        })
        this.closeModal();
    }
    handleCancel = () => {
        this.closeModal();
    }
    closeModal = () => {
        const { colseModal } = this.props;
        colseModal && colseModal();
        // this.setState({
        //     visible: false
        // })
    }
    render() {
        const labelStyle = {
            display: 'inline-block',
            width: '100%',
            textAlign: 'right'
        }

        const blockStyle = {
            display: 'inlineBlock',
            width: 'calc("100% – 80px")'
        }

        return (
            <Modal
                title="锁定"
                destroyOnClose
                maskClosable={false}
                okText='锁定'
                cancelText='取消'
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Row>
                    <Col span={4}><label style={labelStyle}>描述：</label></Col>
                    <Col span={20}><TextArea rows={4} onChange={this.getDescCont} /></Col>
                </Row>
                <br />
                <Row>
                    <Col span={4}><label style={labelStyle}>附件：</label></Col>
                    <Col span={20}><InputFile getFile={this.getFile} width='100%' /></Col>
                </Row>
                <br />
                <Row>
                    <Col span={4}><label style={labelStyle}>邮件通知：</label></Col>
                    <Col span={20}>
                        <Select mode="multiple" onChange={this.handleChange} style={{ width: '100%' }}>
                            {this.renderOptins()}
                        </Select>
                    </Col>
                </Row>
            </Modal>
        )
    }
}