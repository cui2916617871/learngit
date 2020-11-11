import React from 'react'
import { Enhance } from '../vendor/enhance'

@Enhance
class BaseComponent extends React.PureComponent {
    /**
     * @description 获取信号栏高度
     * @abstract
     * @param {int} height
     * @memberof BaseComponent
     */
    getSignalBarHeight(height) {}

    /**
     * @description 获取信号栏+导航栏高度
     * @abstract
     * @param {int} height
     * @memberof BaseComponent
     */
    getWholeNavBarHeight(height) {}

    /** life cycle start */
    /** life cycle end */
}

export default BaseComponent
