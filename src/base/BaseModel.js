import { BaseModel, UtilDevice } from '@iskytrip/sdk'

import { env } from '../env.config'
import * as Sentry from '@sentry/browser'
import { isSentry } from '../../project.config'
import { baseEnvModel } from '@src/vendor/constant'

import { Toast, Alert } from '@components/index'

export default class WebAppBaseModel extends BaseModel {
    constructor(props = {}) {
        super({
            env: baseEnvModel,
            ...props,
        })
    }

    /**
     * @param {Error} err
     * @override
     * @memberof WebAppBaseModel
     */
    handleResponseErrorInResponseInterceptors(err) {
        this._handlerWithSentry(err)
    }

    /**
     * @param {Error} err
     * @override
     * @memberof WebAppBaseModel
     */
    errorInExecute(err) {
        this._handlerWithSentry(err)
    }

    /**
     * @description 上报sentry
     * @private
     * @param {error} err
     * @memberof WebAppBaseModel
     */
    _handlerWithSentry(err) {
        if (isSentry === env || isSentry === true) {
            Sentry.withScope(scope => {
                scope.setExtras(this)
                Sentry.captureException(err)
            })
        }
    }

    /**
     * @override
     * @param {Response} json
     * @returns {Response}
     */
    dataformat(json) {
        // super.dataformat(json)
        if (+json.resultCode === 10102001) {
            Alert('', json.errMsg, [
                {
                    text: '知道了',
                    style: {
                        fontSize: '.28rem',
                        color: 'rgba(255,195,0,1)',
                        fontFamily: 'PingFangSC-Regular,PingFang SC',
                    },
                },
            ])
        } else if (+json.resultCode !== 0 && +json.resultCode !== 20001) {
            // 20001 注册日上用户
            Toast(json.errMsg)
        }
        return json
    }

    /**
     * @override
     * @param {AxiosResponse} response
     * @returns {void}
     */
    handleResponseDataInResponseInterceptors(response) {
        super.handleResponseDataInResponseInterceptors(response)

        const result = response.data || {}

        if (!UtilDevice.isApp() && result.resultCode && result.resultCode === '-5') {
            window.location.href = `${window.location.origin}/login?data=${encodeURIComponent(
                JSON.stringify({
                    formUrl: encodeURIComponent(window.location.href),
                }),
            )}`
        }
    }
}
