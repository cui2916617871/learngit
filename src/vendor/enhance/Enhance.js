/**
 * @desc 实现useEnhance 未验证
 */
import React from 'react'
import PropTypes from 'prop-types'
import Impl from './implement'
import { UtilEmitter } from '@iskytrip/sdk'

const Enhance = WrappedComponent => {
    class Enhance extends WrappedComponent {
        static propTypes = {
            className: PropTypes.string,
            style: PropTypes.object,
        }

        static defaultProps = {
            className: '',
            style: {},
        }

        constructor(props) {
            super(props)
            this.state = {
                ...(this.state || {}),
                _info: null,
                _error: false, //捕获错误信息
            }

            this.signalBarHeightListener = UtilEmitter.addListener('signalBarHeight', _signalBarHeight => {
                setTimeout(() => {
                    this.getSignalBarHeight && this.getSignalBarHeight(_signalBarHeight)
                    this.getWholeNavBarHeight && this.getWholeNavBarHeight(_signalBarHeight + Impl._headerHeight)
                }, 0)
                UtilEmitter.removeListener(this.signalBarHeightListener)
            })

            Impl._getSignalBarHeight()
        }

        urlQuery = Impl.urlQuery

        /**
         * @description 获取go方法跳转的第二个参数
         * @memberof BasePage
         */
        _query = Impl._query

        /** life cycle start */
        componentDidCatch(error, info) {
            console.error('componentDidCatch', error, info)
            this.setState({ _error: error, _info: info })
            super.componentDidCatch && super.componentDidCatch(error, info)
        }

        render() {
            if (this.state._error) {
                return (
                    <>
                        <h1>Error: {this.state._error.toString()}</h1>
                        <h1>Error: {this.state._info.toString()}</h1>
                    </>
                )
            } else {
                return super.render && super.render()
            }
        }
        /** life cycle end */

        /** custom func start */
        go = Impl.go

        goLogin = Impl.goLogin

        jump = Impl.jump

        commonGoURL = Impl.commonGoURL

        back = Impl.back

        setWindowTitle = Impl.setWindowTitle

        getNavBarHeight = Impl.getNavBarHeight

        share = Impl.share
        /** custom func end */
    }

    Enhance.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Enhance'
    return Enhance
}

export default Enhance
