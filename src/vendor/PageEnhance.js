import React from 'react'
import { UtilDevice, Bridge } from '@iskytrip/sdk'
import { LoadingPage } from '../components'

export default WrappedComponent => {
    class PageEnhance extends WrappedComponent {
        constructor(props) {
            super(props)
            console.log('this._query', this._query)
            this.state = {
                ...(this.state || {}),
                _hideLoadingPage: !!(this._query || {}).hideLoadingPage || !!this._hideLoadingPage,
                // _nativeLoading: !!(this._query || {}).nativeLoading || false
            }
        }

        /** life cycle start */
        UNSAFE_componentWillMount() {
            // if (this.state._nativeLoading) {
            //     this.setState({
            //         _hideLoadingPage: true,
            //     })
            // }

            super.UNSAFE_componentWillMount && super.UNSAFE_componentWillMount()
        }

        /**
         * @description 非app环境唤起pageAppear
         * @summary 防止子类重写父类方法，因此放pageEnhance
         * @abstract
         * @memberof PageEnhance
         */
        componentDidMount() {
            if (UtilDevice.isApp()) {
                Bridge.appBanRightGestures(this._banRightGestures, res => {})
                UtilDevice.setSignalBarColor(this._signalBarColorIsDark, res => {})
            }

            if (this._hideLoadingPage) this.hideLoadingPage && this.hideLoadingPage()
            else this.showLoadingPage && this.showLoadingPage()

            this.pageAppear && this.pageAppear()
            super.componentDidMount && super.componentDidMount()
        }

        /**
         * @description 非app环境唤起pageDisAppear
         * @summary 防止子类重写父类方法，因此放pageEnhance
         * @abstract
         * @memberof PageEnhance
         */
        componentWillUnmount() {
            this.pageDisAppear && this.pageDisAppear()
            super.componentWillUnmount && super.componentWillUnmount()
        }
        /** life cycle end */

        /** custom func start */
        showLoadingPage = () => {
            Bridge.airportLoading(true)
            this.setState({ _hideLoadingPage: false })
        }

        hideLoadingPage = () => {
            Bridge.airportLoading()
            this.setState({ _hideLoadingPage: true })
        }
        /** custom func end */

        render() {
            const { _hideLoadingPage } = this.state

            return (
                <>
                    <LoadingPage visible={!_hideLoadingPage} />
                    {/* <WrappedComponent
                        {...this.props}
                    /> */}
                    {super.render && super.render()}
                </>
            )
        }
        /** life cycle end */
    }

    PageEnhance.displayName = WrappedComponent.displayName || WrappedComponent.name || 'Enhance'
    return PageEnhance
}
