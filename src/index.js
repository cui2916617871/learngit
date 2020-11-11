import React from 'react'
import Routes from './routers'
import ReactDOM from 'react-dom'
import * as Sentry from '@sentry/browser'
import * as Integrations from '@sentry/integrations'
import { Bridge, SDK } from '@iskytrip/sdk'
import { env } from './env.config'
// import { UtilUser, } from './utils'
// 全局CSS样式
import './index.css'
// Markdown 文件展示
import './style/markdown.css'

const envConfig = require('./env.config.js')
const isSentry = require('../project.config.js').isSentry

SDK.init()

// const promiseFinally = require("promise.prototype.finally");
// promiseFinally.shim()

if (isSentry === env || isSentry === true) {
    Sentry.init({
        environment: envConfig.env,
        // release: envConfig.commit,
        dsn: 'http://e6eda0230a7f40c49b398033313dadf5@sentry.iskytrip.ivelly.com:8881/2',
        integrations: [new Integrations.RewriteFrames(), new Integrations.ExtraErrorData({ depth: 6 })],
    })
}
// 解决键盘弹出后挡表单的问题
Bridge.closeAndroidKeyboard(({ height, status }) => {
    if (
        status === 1 &&
        (document.activeElement.tagName.toUpperCase() === 'INPUT' ||
            document.activeElement.tagName.toUpperCase() === 'TEXTAREA')
    ) {
        window.setTimeout(() => {
            // const scrollTop = document.activeElement.getBoundingClientRect().top
            // const scrollTop = (window.screen.availHeight - (height / devicePixelRatio)) / 2
            // // debugger
            // if (scrollTop > 0) {
            //     document.body.style.transform = `translateY(-${scrollTop}px)`
            // }
            if ('scrollIntoView' in document.activeElement) {
                document.activeElement.scrollIntoView()
            } else {
                document.activeElement.scrollIntoViewIfNeeded()
            }
        }, 50)
    }
})

ReactDOM.render(<Routes />, document.getElementById('app'))
