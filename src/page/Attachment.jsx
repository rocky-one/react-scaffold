import React, { Component } from 'react';
import { Modal, Input, Select, Row, Col, Table, Divider, message } from 'antd';
import { downLoadEvent } from '../utils/common';
import api from '../request/api';
import httpAxios from '../request/httpAxios';
const confirm = Modal.confirm;
const data = [
    // {
    //     "fileName": "科目ZH.xlsx",
    //     "name": "f1",
    //     "id": 100505,
    //     "userName": "超级管理员",
    //     "type": "taskForm",
    //     "isDel": true,
    //     "fileId": "1005004370561534406350600"
    // },
    // {
    //     "fileName": "科目ZH.xlsx",
    //     "name": "f1",
    //     "id": 100505,
    //     "userName": "超级管理员",
    //     "type": "taskForm",
    //     "isDel": false,
    //     "fileId": "1005004370561534406350600"
    // },
]
export default class Attachment extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: props.visible,
            instanceId: props.instanceId,
            nodeId: props.nodeId,
            data: data,
            currentPage: 0,
            total: 0
        }
        this.operTextStyle = {
            color: '#1890ff',
            cursor: 'pointer',
        }
        this.columns = [{
            title: '附件',
            dataIndex: 'fileName',
            key: 'fileName',
            width: 100
        }, {
            title: '所属环节',
            dataIndex: 'name',
            key: 'name',
            width: 100
        }, {
            title: '上传用户',
            dataIndex: 'userName',
            key: 'userName',
            width: 100
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 100,
            render: (text, record) => (
                <span>
                    <span style={this.operTextStyle} onClick={this.downloadAttac.bind(this, record.fileId)}>下载</span>
                    <Divider type="vertical" />
                    <span onClick={this.delAttac.bind(this, record)} className={!record.isDel ? 'disabled ' : ''} style={{ color: !record.isDel ? '#ccc' : '#1890ff', cursor: !record.isDel ? 'not-allowed' : 'pointer' }}>删除</span>
                </span>
            )
        }]
    }
    componentWillReceiveProps(nextProps) {
        this.setData();
        this.setState({
            visible: nextProps.visible,
            instanceId: nextProps.instanceId,
            nodeId: nextProps.nodeId,
        })
    }
    componentDidMount() {
        this.setData();
    }
    setData = (currentPage) => {
        const { instanceId, nodeId } = this.state;
        if (instanceId && nodeId) {
            httpAxios(api.process.getTaskFile, {
                instanceId,
                nodeId,
                currentPage: currentPage || 0
            }).then(res => {
                if (res.success) {
                    const tempValue = res.value;
                    if (tempValue) {
                        this.setState({
                            total: res.value.rowCount,
                            data: tempValue.resultList
                        })
                    }
                }
            })
        }
    }
    downloadAttac = (fileId) => {
        downLoadEvent(api.process.downloadTaskFile.url, { fileId })
    }
    delAttac = (obj) => {
        if (!obj.isDel) return;
        const _this = this;
        confirm({
            title: '删除附件',
            content: '确认要删除此附件吗？',
            okType: 'danger',
            onOk() {
                const { type, id, fileId, fileName } = obj;
                httpAxios(api.process.deleteTaskFile, {
                    type,
                    id,
                    fileId,
                    fileName
                }).then(res => {
                    if (res.success) {
                        message.success('删除成功！');
                        _this.setData(_this.state.current);
                    }
                })
            },
            okText: '删除',
            cancelText: '取消',
        });
    }
    handleCancelEvent = () => {
        this.setState({
            visible: false
        }, () => {
            this.props.closeModal();
        })
    }
    handleTableChange = (pagination) => {
        const { current } = pagination;
        this.setState({
            currentPage: current
        })
        this.setData(current);
    }
    render() {
        return (
            <div>
                <Modal
                    title="附件"
                    destroyOnClose
                    maskClosable={false}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={this.handleCancelEvent}
                >
                    <Table
                        bordered
                        pagination={{
                            current: this.state.currentPage,
                            total: this.state.total
                        }}
                        dataSource={this.state.data}
                        columns={this.columns}
                        scroll={{ y: 240 }}
                        onChange={this.handleTableChange}
                    />
                </Modal>
            </div>
        )
    }
}