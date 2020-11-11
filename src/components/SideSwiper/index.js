import React from 'react'
import propTypes from 'prop-types'
import BaseComponent from '../../base/BaseComponent'

import CSS from './index.module.css'

export default class SideSwiper extends BaseComponent {
    static propTypes = {
        main: propTypes.any.isRequired,
        side: propTypes.any.isRequired,
        mainStyle: propTypes.object,
        sideStyle: propTypes.object,
        resetPos: propTypes.bool,
    }

    static defaultProps = {
        mainStyle: {},
        sideStyle: {},
        resetPos: false,
    }

    constructor(props) {
        super(props)
        this.state = {
            position: 0,
            sideShowed: false,
            transition: false,
        }
    }
    componentDidMount() {
        this.mainWidth = Math.ceil(Number.parseFloat(window.getComputedStyle(this.refs.main).width))
        this.sideWidth = Math.ceil(Number.parseFloat(window.getComputedStyle(this.refs.side).width))
    }

    static getDerivedStateFromProps(props, state) {
        return props.resetPos
            ? {
                  ...state,
                  position: 0,
              }
            : state
    }

    touchStart = e => {
        this.touchStartX = e.touches[0].clientX
        this.setState({
            transition: false,
        })
        e.stopPropagation && e.stopPropagation()
    }
    touchMove = e => {
        let diffX = e.touches[0].clientX - this.touchStartX
        let position
        if (this.state.sideShowed) {
            position = diffX - this.sideWidth
        } else {
            position = diffX
        }
        if (position > 0) {
            this.setState({
                position: 0,
            })
        } else if (position < -this.sideWidth) {
            this.setState({
                position: -this.sideWidth,
            })
        } else {
            this.setState({
                position: position,
            })
        }
        e.stopPropagation && e.stopPropagation()
    }
    touchEnd = e => {
        let position = this.state.position
        if (position < -0.5 * this.sideWidth) {
            this.setState({
                position: -this.sideWidth,
                transition: true,
                sideShowed: true,
            })
        } else {
            this.setState({
                position: 0,
                transition: true,
                sideShowed: false,
            })
        }
        e.stopPropagation && e.stopPropagation()
    }
    render() {
        const { mainStyle, sideStyle } = this.props

        return (
            <div className={CSS.sideSwiper} style={{ ...this.props.style, width: this.mainWidth }}>
                <div
                    className={`${CSS.sideSwiperContainer} ${this.state.transition ? CSS.swiperTransition : ''}`}
                    style={{
                        transform: 'translateX(' + this.state.position + 'px)',
                        ...mainStyle,
                    }}
                >
                    <div
                        className={CSS.main}
                        ref='main'
                        onTouchStart={this.touchStart}
                        onTouchMove={this.touchMove}
                        onTouchEnd={this.touchEnd}
                    >
                        {' '}
                        {this.props.main}
                    </div>
                    <div className={CSS.side} ref='side' style={{ ...sideStyle }}>
                        {this.props.side}
                    </div>
                </div>
            </div>
        )
    }
}
