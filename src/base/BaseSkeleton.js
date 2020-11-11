/**
 * @description 骨架屏基类
 * @brief 内部定义动画实现，子类只需重写此父类的render方法，暴露给子类visible, flashBounce两个属性
 * @summary 每个页面需自己定制
 * @author qiujie@iskytrip.com

/** offcial */
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { SKELETON_MAIN_COLOR } from '../vendor/constant'

export default class BaseSkeleton extends React.Component {
    static propTypes = {
        visible: PropTypes.bool,
    }

    static defaultProps = {
        visible: true,
    }

    constructor(props) {
        super(props)

        this.opacity = 0.4
        this.duration = 800
        this.state = {
            visible: props.visible,
            // flashBounce: new Animated.Value(1),
        }

        this.startAnimated(this.opacity)
    }

    static getDerivedStateFromProps(props, state) {
        if (props.visible !== state.visible) {
            // if (props.visible) {
            //     this.state.flashBounce.setValue(1)
            //     this.startAnimated(this.opacity)
            // }

            return { ...state, visible: props.visible }
        }

        return state
    }

    startAnimated(opacityNumber) {
        //     Animated.timing(this.state.flashBounce, {
        //         easing: Easing.easeIn,
        //         toValue: opacityNumber,
        //         duration: this.duration,
        //     }).start(() => {
        //         this.state.visible && this.startAnimated(opacityNumber === 1 ? this.opacity : 1)
        //     })
    }

    render() {
        // 子类实现
        return null
    }
}

const FlashBounceProps = {
    context: PropTypes.element,
    className: PropTypes.string,
    style: PropTypes.object,
}

class FlashBounce extends React.PureComponent<FlashBounceProps> {
    render() {
        const { context, style, className, ...rest } = this.props
        return <div style={style} className={`${className}`} {...rest} />
    }
}
BaseSkeleton.FlashBounce = styled(FlashBounce)`
    opacity: 1;
    animation-fill-mode: both;
    background-color: ${SKELETON_MAIN_COLOR};
    animation: bounce ${props => props.context.duration * 2}ms ease-in 0s infinite normal both;

    @keyframes bounce {
        0% {
            opacity: 1;
        }
        50% {
            opacity: 0.3;
        }
        100% {
            opacity: 1;
        }
    }
`
