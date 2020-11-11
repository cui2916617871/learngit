import React from 'react'
import Lottie from 'react-lottie'
import BaseComponent from '../../base/BaseComponent'

const LoadingJson = require('./loadingback.json')

export default class BaseLoading extends BaseComponent {
    render() {
        const defaultOptions = {
            loop: true,
            autoplay: true,
            animationData: LoadingJson,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice',
            },
        }

        return <Lottie options={defaultOptions} width={90} height={90} />
    }
}
