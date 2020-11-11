import { Toast } from 'antd-mobile'
import { Bridge, UtilCommon, UtilDevice, UtilEmitter } from '@iskytrip/sdk'

import { HEADER_HEIGHT } from '../constant'

/**
 * @description 是否获取了过信号栏高度
 */
let _isGetSignalBarHeight = false

/**
 * @description 存储信号栏高度
 */
let signalBarHeight = 0

export default class Impl {
    /**
     * @description 获取url的search里的某个key
     * @memberof BasePage
     */
    static urlQuery = UtilCommon.urlQuery

    /**
     * @description 获取go方法跳转的第二个参数
     * @memberof BasePage
     */
    static _query = JSON.parse(decodeURIComponent(Impl.urlQuery('data') || '') || Impl.urlQuery())

    /**
     * @description 头部高度（头部）
     * @memberof BasePage
     */
    static _headerHeight = HEADER_HEIGHT

    /**
     * @description 普通跳转（新开webview）
     * @param {string} path
     * @param {object} params 暂时将参数拼接到url里
     * @param {boolean} [isShutNow=false] 是否关闭当前页
     * @memberof BasePage
     */
    static go(path, params, isShutNow = false) {
        const paramsStr = encodeURIComponent(JSON.stringify(params))
        const url = `${path.indexOf('http') > -1 ? '' : window.location.origin}${path}${
            params ? (path.indexOf('?') > -1 ? '&' : '?') + `data=${paramsStr}` : ''
        }`

        if (UtilDevice.isApp()) {
            Bridge.appOpenWebView(url, params, isShutNow)
        } else {
            window.location.href = url
        }
    }

    /**
     * @description 跳转原生登录页
     * @memberof BasePage
     */
    static goLogin() {
        if (UtilDevice.isApp()) {
            Bridge.appOpenPage('login')
        } else {
            Impl.go('/login', {
                formUrl: encodeURIComponent(window.location.href),
            })
        }
    }

    /**
     * @description 跳转原生
     * @memberof BasePage
     */
    static jump(path, params) {
        Bridge.appOpenPage(path, params)
    }

    /**
     * @description 通用跳转
     * @brief 前端不判断端，交由原生判断
     *      目前三种，webview页、原生页、rn页 -- 20200722
     * @param {string} path
     */
    static commonGoURL(path) {
        let url = path
        if (UtilDevice.isApp()) {
            //在app里
            return Bridge.publicJump(url)
        } else if (UtilDevice.isWechat() || UtilDevice.isAlipayClient()) {
            if (path.startsWith('/pages')) {
                if (UtilDevice.isWechat()) {
                    return wx.miniProgram.navigateTo({ url: path })
                } else if (UtilDevice.isAlipayClient()) {
                    return my.navigateTo({ url: path })
                }
            } else if (!path.startsWith('http')) {
                url = `${window.location.origin}/${path}`
                if (UtilDevice.isWechat()) {
                    return wx.miniProgram.navigateTo({
                        url: `/pages/webview/webview?url=${encodeURIComponent(url)}`,
                    })
                } else if (UtilDevice.isAlipayClient()) {
                    return my.navigateTo({
                        url: `/pages/webview/webview?url=${encodeURIComponent(url)}`,
                    })
                }
            }
        } else {
            window.location.href = `/${path}`
        }
    }

    /**
     * @description 页面返回
     * @summary type： 1 - 多层webview回退  2 - 单个webview回退
     * @memberof BasePage
     */
    static back(params, delta = 1, type = 1) {
        if (UtilDevice.isApp() && type !== 2) {
            Bridge.appViewBack(delta, params)
        } else {
            window.history.back(-1)
        }
    }

    /**
     * @description 设置页面标题
     * @summary title：string
     * @memberof BasePage
     */
    static setWindowTitle(title) {
        document.title = title
    }

    /**
     * @description 获取页面信号栏高度
     * @memberof BasePage
     */
    static async _getSignalBarHeight() {
        if (UtilDevice.isApp()) {
            if (!_isGetSignalBarHeight) {
                _isGetSignalBarHeight = true
                signalBarHeight = await Impl._appGetSignalBarHeight()
                UtilEmitter.emit('signalBarHeight', signalBarHeight)
            } else {
                if (signalBarHeight) UtilEmitter.emit('signalBarHeight', signalBarHeight)
            }
        } else {
            UtilEmitter.emit('signalBarHeight', signalBarHeight)
        }
    }

    static _appGetSignalBarHeight() {
        return new Promise(resolve => {
            if (Impl._query.signalBarHeight) {
                resolve(+Impl._query.signalBarHeight)
            } else {
                Bridge.appGetSignalBarHeight(height => {
                    resolve(height)
                })
            }
        })
    }

    /**
     * @description 获取导航栏高度
     * @returns {int}
     * @memberof BasePage
     */
    static getNavBarHeight() {
        return Impl._headerHeight
    }

    static share(params) {
        console.log('share', params)
        if (!UtilDevice.isApp()) {
            return Toast.info('当前环境不支持分享，请至App分享', 1.5)
        }
        Bridge.appOpenPage('share', params)
    }
}
