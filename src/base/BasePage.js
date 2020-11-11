import React from 'react'
import { UtilDevice, Bridge } from '@iskytrip/sdk'
import { Enhance } from '../vendor/enhance'

/**
 * @description 页面基类 业务页面继承时，需要重写生命周期的时候，需要执行父类方法
 * @example
 *      componentDidMount(){
 *          super.componentDidMount && super.componentDidMount()
 *          // do something
 *      }
 * @class BasePage
 * @extends {React.Component}
 */
@Enhance
class BasePage extends React.PureComponent {
    constructor(props) {
        super(props)
        //页面名
        this._pageName = ''

        // this._signalBarColorIsDark = false

        // this._hideLoadingPage = false

        // this._banRightGestures = false

        //添加bridge监听事件
        this.addBridgeListener()
    }

    /**
     * @description bridge回调
     * @memberof BasePage
     */
    addBridgeListener() {
        Bridge.pageAppear(() => {
            // this.showLoadingPage()
            //页面出现
            if (UtilDevice.isApp()) {
                this.pageAppear && this.pageAppear()
            }
            // 设置状态栏颜色,透明色
            Bridge.appSetSignalBarBackgroundColor('#00000000', result => {})
        })

        Bridge.pageDisAppear(() => {
            //页面消失
            if (UtilDevice.isApp()) {
                this.pageDisAppear && this.pageDisAppear()
            }
        })

        Bridge.pageGetBackParams(() => {
            if (UtilDevice.isApp()) {
                this.pageGetBackParams && this.pageGetBackParams()
            }
        })
    }

    /**
     * @description 获取信号栏高度
     * @abstract
     * @param {int} height
     * @memberof BasePage
     */
    getSignalBarHeight(height) {}

    /**
     * @description 获取信号栏+导航栏高度
     * @abstract
     * @param {int} height
     * @memberof BasePage
     */
    getWholeNavBarHeight(height) {}

    /** life cycle start */
    render() {
        return <></>
    }
    /** life cycle end */
}

// export default Enhance(PageEnhance(BasePage))
export default BasePage
