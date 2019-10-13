import React, { Component } from 'react';
import { Tree, Button, message, Icon } from 'antd';
import Workbook from '../containers/workbook/Workbook';
import WB_lock from './WB_lock'

const TreeNode = Tree.TreeNode;
class WorkBookList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            instanceName: props.instanceName,
            nodeName: props.nodeName,
            taskType: props.taskType
        }
    }

    titleCom = (name, wb_state) => {
        return (
            <span style={{ width: '100%' }}>
                <span></span>
                <span>{name}</span>
                <span onClick={this.handleTreeNodeClick()}>{wb_state}</span>
            </span>
        )
    }

    // 树节点 点击事件
    handleTreeNodeClick = () => {
        // todo 解锁 锁定
    }

    renderTreeNodes = (data) => {
        if (data && data.length == 0) return null;
        return data.map(item => {
            let TitelCom = this.titleCom(item.name, item.state);
            return (
                <TreeNode title={<TitelCom />} key={item.id}></TreeNode>
            )
        })
    }
    render() {
        return (
            <div className='wb--right'>
                <span className='wb--right'>{this.pops.instanceName}</span>
                <span>{this.pops.nodeName}</span>
                <textarea readOnly>{this.props.instructions}</textarea>
                <p>
                    <Icon type="file" theme="outlined" />
                    <Icon type="link" theme="outlined" />
                    <Icon type="menu-fold" theme="outlined" />
                    <Icon type="share-alt" theme="outlined" />
                    <Button type="primary" style={{ display: this.props.taskType == 'complete' ? 'none' : 'inline-block' }}>退回</Button>
                    <Button type="primary" style={{ display: this.props.taskType == 'complete' ? 'none' : 'inline-block' }}>提交</Button>
                    <Button type="primary" style={{ display: this.props.taskType == 'complete' ? 'inline-block' : 'none' }}>撤回</Button>
                </p>
                <div className='wb--rightTree'>
                    <Tree>
                        {this.renderTreeNodes(this.state.treeData)}
                    </Tree>
                </div>
            </div>
        )
    }
}
export default class WorkBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            workbookData: [],
            selWorkBookId: '',
            taskType: 'complete'// 完成or 待办任务 complete to_do
        }

    }
    componentDidMount() {
        // todo 查询实例名称  节点名称
        // todo 查询 工作簿信息
        // todo 设置工作簿id
        // if(workbookData.lenth){

        // }

    }
    // initRightCom = () => {
    //     if (!selWorkBookId && workbookData.length > 0) {

    //     }
    // }
    render() {
        reutrn(
            <div>
                <Workbook
                    selectedWorkbookItem={{ id: '11111' }}
                    
                />
                <WB_lock visible={this.state} />
            </div>
        )
    }
}