/**
 * Created by lei_sun on 2019/8/1.
 */
import React from 'react'
import Style from './index.less'
import PropTypes from 'prop-types'
import BaseComponent from '../../base/BaseComponent'

import { Iconfont, IconCodeEmum } from '../../components'

import { HEADER_HEIGHT } from '../../vendor/constant'

/*
    props:
    1. title: the title of Header
    2. leftIcon, leftIconStyle, leftFunc
    3. rightIcon, rightIconStyle, rightFunc
    4. children  <Header>{children}</Header>
    5. backParams:
 */

class Header extends BaseComponent {
    static propTypes = {
        bg: PropTypes.string,
        opacity: PropTypes.number,
        leftIcon: PropTypes.string,
        backParams: PropTypes.object,
    }

    static defaultProps = {
        opacity: 1,
        bg: '#fff',
        backParams: {},
        leftIcon: IconCodeEmum.BACK,
    }

    constructor(props) {
        super(props)
        const { title, leftFunc, rightIcon, rightFunc, children, visible = true } = this.props

        this.state = {
            signalBarHeight: 0,
            title: title || '',
            leftFunc: leftFunc,
            rightIcon: rightIcon || '',
            rightFunc: rightFunc,
            body: children,
            opacity: this.props.opacity,
            headerPaddingTop: visible ? HEADER_HEIGHT : 0,
            visible,
            renderRightView: this.props.renderRightView || this._setRenderRightView.bind(this),
        }
    }

    /**
     * @override
     */
    getSignalBarHeight(height) {
        this.setState({
            signalBarHeight: height,
            headerPaddingTop: this.state.headerPaddingTop + height,
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        //console.log('getDerivedStateFromProps', nextProps, prevState)

        if (nextProps.title !== prevState.title || nextProps.children !== prevState.body) {
            return {
                ...prevState,
                title: nextProps.title,
                body: nextProps.children,
            }
        }
        return null
    }

    doLeft() {
        const { leftFunc } = this.state
        leftFunc ? leftFunc() : this.back(this.props.backParams)
    }

    doRight() {
        const { rightFunc } = this.state
        rightFunc && rightFunc()
    }

    setNavBarOpacity(value) {
        this.setState({
            opacity: value,
        })
    }

    setRenderRightView(renderRightView) {
        this.setState({
            renderRightView: renderRightView,
        })
    }

    _setRenderRightView() {
        const { rightIcon } = this.state
        const { rightIconStyle, rightContent, rightContentStyle } = this.props

        return rightIcon || rightContent ? (
            <div className='component-header-right'>
                {rightIcon ? (
                    <Iconfont
                        onPress={() => this.doRight()}
                        font={rightIcon}
                        style={{
                            fontSize: '.48rem',
                            ...rightIconStyle,
                        }}
                    />
                ) : null}
                {rightContent ? (
                    <div onClick={() => this.doRight()} style={{ ...rightContentStyle }}>
                        {rightContent}
                    </div>
                ) : null}
            </div>
        ) : (
            <div className='component-header-right' />
        )
    }

    render() {
        const { bg, leftIcon, leftIconStyle, titleStyle } = this.props
        const { opacity, headerPaddingTop, signalBarHeight, title, visible } = this.state

        let background = bg
        if (bg === undefined || bg === null || bg === '') {
            background = 'white'
        }

        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: Style }} />
                <div className='component-header' style={{ height: `${headerPaddingTop}px`, opacity }}>
                    {visible ? (
                        <div
                            className='component-header-area'
                            style={{
                                paddingTop: `${signalBarHeight}px`,
                                background: background,
                            }}
                        >
                            <div className='component-header-top'>
                                <div className='component-header-bar' style={{ height: `${HEADER_HEIGHT}px` }}>
                                    <div className='component-header-left'>
                                        <Iconfont
                                            onPress={() => this.doLeft()}
                                            font={leftIcon}
                                            style={{
                                                fontSize: '24px',
                                                ...leftIconStyle,
                                            }}
                                        />
                                    </div>
                                    <div
                                        className='component-header-center'
                                        style={{
                                            ...titleStyle,
                                        }}
                                    >
                                        {title}
                                    </div>
                                    {this.state.renderRightView
                                        ? this.state.renderRightView()
                                        : this._setRenderRightView()}
                                </div>
                            </div>
                        </div>
                    ) : null}
                </div>
            </React.Fragment>
        )
    }
}

export default Header
