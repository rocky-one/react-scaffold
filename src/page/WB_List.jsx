import React, { Component } from 'react';
import { Tree, Button, message, Icon, Modal, Tooltip } from 'antd';
import './WB_List.less'
import { isRegExp } from 'util';
import httpAxios from '../request/httpAxios';
import api from '../request/api';
// import { queryString } from '../utils/common';
import WB_lock from './WB_lock';
// import SubmitTask from '../components/process/page/submit';
import { getTaskInfo } from './common';
import WB_submit from './WB_submit';
import WBRejectTask from './WB_reject';
import Attachment from './Attachment';
// import HistoryRecord from '../components/process/content/executeContent/historyRecord';
import HistoryModal from './WB_history'
import InstanceFlowChart from '../components/process/content/executeContent/instanceFlowChart';
import EventEmitter from '../utils/events';
import './WB_List.less';

const TreeNode = Tree.TreeNode;
export default class WorkBookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceId: props.instanceId,
            nodeId: props.nodeId,
            taskId: props.taskId,
            workbookId: props.workbookId,
            instanceName: props.instanceName,
            nodeName: props.nodeName,
            // taskType: props.taskType,// complete 已完成  to_do 代办
            treeData: props.treeData || [],
            lockModalVis: false,// 锁定表单展示
            submitVis: false,// 提交模态框
            rejectVis: false,// 退回模态框
            attachmentVis: false,// 附件模态框
            historyVis: false,// 历史模态框
            floatChartVis: false,// 流程图模态框个
            instruState: true,// 说明
            instanceFlowScreen: [],// 流程图筛选条件
            visible: true,// 工作簿是否展示
            selectedKeys: [],//选中的树节点ID集合
        }
    }
    componentDidMount() {
        getTaskInfo(this.state.taskId, (data) => {
            const { instanceId, nodeId, nodeName, instanceName, workbookId, workbookDesc, focused, templateId, nodeStatus, taskStatus, hasChild } = data[0];
            this.setState({
                instanceId,
                nodeId,
                nodeName,
                instanceName,
                workbookId,
                workbookDesc,
                focused,
                templateId,
                nodeStatus,
                taskStatus,
                hasChild
            })
            // 获取任务中的工作簿信息
            httpAxios(api.process.getTaskWorkbook, {
                instanceId: data[0].instanceId,
                nodeId: data[0].nodeId
            }).then(res => {
                if (res.success && res.value && res.value.length > 0) {
                    this.setState({
                        treeData: res.value,
                        selectedKeys: [String(res.value[0].id)]
                    })
                    EventEmitter.emit('setSelectedWorkbookItemTask', res.value[0]);
                }
            })
        });

    }

    // componentDidUpdate() {
    //     if (this.state.treeData.length !== 0 && this.state.treeData[0].id === Number(this.state.selectedKeys[0])) {
    //         EventEmitter.emit('setSelectedWorkbookItemTask', this.state.treeData[0]);
    //     }
    // }

    titleCom = (props) => {
        const tempState = props.obj.workbookStatus,
            { taskStatus } = this.state,
            operBtnState = taskStatus == "open" || taskStatus == "reject" || taskStatus == "berejected" ? 'inlineBlock' : 'none';
        return (
            <span style={{ width: '100%' }}>
                <span></span>
                <Tooltip title={props.obj.name}><span>{props.obj.name.length < 17 ? props.obj.name : props.obj.name.slice(1,17)+ '...'}</span></Tooltip>
                <span
                    style={{ display: operBtnState, float: 'right', fontSize: '12px', color: '#0096FA' }}
                    onClick={this.handleTreeNodeClick.bind(this, props.obj)}
                >
                    {tempState == 'open' ? '锁定' : '解锁'}
                </span>
            </span>
        )
    }

    // 树节点 点击事件
    handleTreeNodeClick = (obj) => {
        const type = obj.workbookStatus;
        // type finish 锁定   open未锁定
        if (type == 'open') {
            // 锁定 模态框
            this.setState({
                lockModalVis: true,
                workbookId: obj.id
            })
        } else {
            // todo 解锁 
            const { instanceId, nodeId, taskId, workbookId } = this.state;
            httpAxios(api.process.unLockWorkbook, {
                instanceId,
                nodeId,
                taskId,
                workbookId: obj.id
            }).then(res => {
                if (res.success) {
                    message.success('解锁成功！');
                    this.updateWBData(obj.id, "unLock");
                }
            })
        }
    }
    closeLockModal = () => {
        this.setState({
            rejectVis: false,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
            historyVis: false,
            floatChartVis: false
        })
    }

    renderTreeNodes = (data) => {
        if (!data || data.length == 0) return null;
        return data.map(item => {
            return (
                <TreeNode key={item.id} title={(<this.titleCom obj={item} type={this.state.taskType} />)}></TreeNode>
            )
        })
    }
    // 选中树节点
    handleSelNode = (selectedKeys, obj) => {
        this.setState({
            selectedKeys: selectedKeys
        });
        EventEmitter.emit('setSelectedWorkbookItemTask', obj.node.props.title.props.obj);
    }
    // 提交 
    handleSubmitEvent = () => {
        this.setState({
            submitVis: true
        })
    }
    // 退回
    handleRejectEvent = () => {
        this.setState({
            rejectVis: true,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
            historyVis: false,
            floatChartVis: false
        })
    }

    // 附件
    attachmentEvent = () => {
        this.setState({
            attachmentVis: true,
            historyVis: false,
            floatChartVis: false
        })
    }
    // 历史
    historyEvent = () => {
        this.setState({
            historyVis: true,
            attachmentVis: false,
            floatChartVis: false
        })
    }

    closeHistoryModal = () => {
        this.setState({
            historyVis: false,
            rejectVis: false,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
            floatChartVis: false
        })
    }
    // 流程图 
    floatChartEvent = () => {
        this.setState({
            floatChartVis: true,
            historyVis: false,
            rejectVis: false,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
        })
    }
    // 流程图 确定事件
    floatChartOkEvent = () => {
        this.closeFloatChartModal();
    }
    floatChartCancelEvent = () => {
        this.closeFloatChartModal();
    }
    closeFloatChartModal = () => {
        this.setState({
            floatChartVis: false,
            historyVis: false,
            rejectVis: false,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
        })
    }
    // 说明
    instruEvent = () => {
        this.setState({
            instruState: !this.state.instruState,
            floatChartVis: false,
            historyVis: false,
            rejectVis: false,
            lockModalVis: false,
            submitVis: false,
            attachmentVis: false,
        })
    }
    // 流程图 筛选
    instanceFlowScreen = (value) => {
        this.setState({
            instanceFlowScreen: value
        })
    }
    // 查看 工作簿列表
    handleLookWBList = () => {
        this.setState({
            visible: !this.state.visible,
            historyVis: false,
            attachmentVis: false,
        })
    }
    handleSubmitModalCancel = (type) => {
        if (type == "success") {// type 存在则说明是工作簿列页面提交，success提交成功需要更新任务状态（更新任务操作按钮“提交”-->“撤回”）
            this.setState({
                submitVis: false,
                floatChartVis: false,
                historyVis: false,
                rejectVis: false,
                lockModalVis: false,
                attachmentVis: false,
                taskStatus: "finish",
                nodeStatus: "finish"
            })
            const { onUpdateWorkbookState } = this.props;
            onUpdateWorkbookState && onUpdateWorkbookState();
        } else {
            this.setState({
                submitVis: false,
                floatChartVis: false,
                historyVis: false,
                rejectVis: false,
                lockModalVis: false,
                attachmentVis: false,
            })
        }
    }
    // 撤回
    handleRecallEvent = () => {
        const { instanceId, nodeStatus, nodeId, taskId } = this.state,
            _this = this;
        let rejectSuccess = (fn) => {
            message.success("撤销成功");
            fn && fn();
        }
        if (nodeStatus == 'reject') {// 已退回里面的撤回
            httpAxios(api.process.cancelRejectedTask, {
                instanceId,
                fromNodeId: nodeId
            }).then(res => {
                if (res.success) {
                    // location.reload();
                    rejectSuccess(() => {
                        _this.setState({
                            taskStatus: "open",
                            nodeStatus: "open",
                            rendering: new Date().getTime()
                        })
                    });
                }
            })
        } else {
            httpAxios(api.process.cancelTask, {
                instanceId,
                nodeId,
                taskId
            }).then(res => {
                if (res.success) {
                    rejectSuccess(() => {
                        location.reload();
                        _this.setState({
                            taskStatus: "open",
                            nodeStatus: "open",
                            rendering: new Date().getTime()
                        })
                    });
                }
            })
        }
    }
    // 退回成功回调
    rejectTaskSuccess = (type) => {
        if(type=="success"){
            this.setState({
                taskStatus: "reject",
                nodeStatus: "reject",
                rejectVis: false
            })
        }else{
            this.setState({
                rejectVis: false
            })
        }
    }
    // 关闭附件
    closeAttachment = () => {
        this.setState({
            attachmentVis: false
        })
    }
    updateWBData = (workbookId, type) => {
        this.state.treeData.filter(item => {
            if (item.id == workbookId) {
                item.workbookStatus = type == "lock" ? "finish" : "open";
            }
        });
        this.setState({
            treeData: this.state.treeData,
            // lockModalVis:false
        }, () => {
            console.log(workbookId);
            const { onUpdateWorkbookState } = this.props;
            onUpdateWorkbookState && onUpdateWorkbookState(workbookId);
        })
    }
    render() {
        // 退回：nodeStatus状态是open 并且hasChild 为true
        // 提交: taskStatus 状态是open或者是berejected
        // 撤回：taskStatus状态是finish
        // nodestatus不为reject，taskstatus为finish，显示撤销；如果nodestatus为reject，也显示撤销，此时撤销的是已退回任务
        let rejectSty = "none",
            submitSty = "none",
            recallSty = 'none';
        const { taskStatus, nodeStatus, hasChild } = this.state;
        if (taskStatus == "finish" || taskStatus == "reject") {
            recallSty = "inline-block";
        }
        if (nodeStatus == "open" && hasChild) {
            rejectSty = "inline-block";
        }
        if (taskStatus == "open") {
            submitSty = "inline-block";
        }
        // taskStatus berejected
        if (taskStatus == "berejected") {// 被退回
            submitSty = "inline-block";
        }
        return (
            <div className='wbList'>
                <div className='wbList-props-btn' onClick={this.handleLookWBList.bind(this)}>
                    <div>
                        <i className={`icon font_family ${!this.state.visible ? 'icon-s-call-out' : 'icon-s-pack-up'}`}></i>
                    </div>
                </div>

                <div className='wb--right' style={{ display: this.state.visible ? 'flex' : 'none' }}>
                    <div>
                        <span className='wb--right_instanceName wb--right_name'>{this.state.instanceName + '-'}</span>
                        <span className='wb--right_nodeName  wb--right_name'>{this.state.nodeName}</span>
                        <textarea readOnly UNSELECTABLE ='on' style={{ display: this.state.instruState ? 'inline-block' : 'none', margin: '10px 0 0 0' }} value={this.state.workbookDesc}></textarea>
                        <p style={{ marginTop: '11px' }}>
                            <Tooltip title="任务说明"><i className='icon iconfont-c1 icon-create-a-copy fIcon btnIcon' onClick={this.instruEvent.bind(this)} ></i></Tooltip>
                            <Tooltip title="查看附件"><i className='icon iconfont-c1 icon-executionlink btnIcon' onClick={this.attachmentEvent}></i></Tooltip>
                            <Tooltip title="查看历史"><i className='icon iconfont icon-calendar btnIcon' onClick={this.historyEvent}></i></Tooltip>
                            <Tooltip title="流程图"><i className='icon iconfont-c1 icon-Workbook-Process icon-Group3 title_icons look' onClick={this.floatChartEvent} ></i></Tooltip>
                            <span style={{ float: 'right', cursor: 'pointer' }}>
                                {/**
                                退回：nodeStatus状态是open 并且hasChild 为true
                                提交: taskStatus状态是open
                                撤回：taskStatus状态是finish
                            */}
                                <span style={{ display: rejectSty, color: '#1E88E5', marginRight: '15px' }} onClick={this.handleRejectEvent}>退回</span>
                                <span style={{ display: submitSty, color: '#1E88E5' }} onClick={this.handleSubmitEvent}>提交</span>
                                <span style={{ display: recallSty, color: '#1E88E5' }} onClick={this.handleRecallEvent}>撤回</span>
                            </span>
                        </p>
                    </div>
                    <div className='wb--rightTree'>
                        <Tree
                            key={this.state.rendering}
                            onSelect={this.handleSelNode}
                            selectedKeys={this.state.selectedKeys}
                        >
                            {this.renderTreeNodes(this.state.treeData)}
                        </Tree>
                    </div>
                    <WB_lock update={this.updateWBData} colseModal={this.closeLockModal} visible={this.state.lockModalVis} instanceId={this.state.instanceId} nodeId={this.state.nodeId} taskId={this.state.taskId} workbookId={this.state.workbookId} />
                    <Attachment visible={this.state.attachmentVis} instanceId={this.state.instanceId} nodeId={this.state.nodeId} closeModal={this.closeAttachment} />
                    <Modal
                        title="流程"
                        destroyOnClose
                        maskClosable={false}
                        closable={false}
                        okText='确定'
                        cancelText='取消'
                        visible={this.state.floatChartVis}
                        onOk={this.floatChartOkEvent}
                        onCancel={this.floatChartCancelEvent}
                        width={620}
                        bodyStyle={{
                            overflow: 'auto'
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
                                    height: "calc(100% - 55px)"
                                }
                            }
                            getInstanceFlowScreen={this.instanceFlowScreen}
                            instanceFlowScreen={this.state.instanceFlowScreen}// 数组 筛选 
                        />
                    </Modal>
                    <HistoryModal visible={this.state.historyVis} instanceId={this.state.instanceId} fn={this.closeHistoryModal} />
                    <WB_submit visible={this.state.submitVis} taskId={this.state.taskId} handleSubmitModalCancel={this.handleSubmitModalCancel} />
                    {/** type 门户跳转必填*/}
                    <WBRejectTask visible={this.state.rejectVis} taskId={this.state.taskId} rejectCb={this.rejectTaskSuccess} />
                </div>
            </div>

        )
    }
}
