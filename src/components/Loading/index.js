import React from 'react'
import ReactDOM from 'react-dom'
import { Flex } from 'antd-mobile'
import CSS from './index.module.css'
import BaseLoading from '../BaseLoading'
import BaseComponent from '../../base/BaseComponent'

// 参数 visible

export default class Loading extends BaseComponent {
    render() {
        return ReactDOM.createPortal(
            <React.Fragment>
                <Flex justify='center' className={`${CSS.loading}${this.props.visible ? '' : ` ${CSS.hide}`}`}>
                    {/* <div className={CSS.loadingBox}> */}
                    <BaseLoading />
                    {/* </div> */}
                </Flex>
            </React.Fragment>,
            document.getElementById('app'),
        )
    }
}
