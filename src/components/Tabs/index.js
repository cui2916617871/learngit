import React from 'react'
import Style from './index.less'
import PropTypes from 'prop-types'
import { UtilCommon, _ } from '@iskytrip/sdk'
import BaseComponent from '../../base/BaseComponent'

import { Flex } from 'antd-mobile'

/**
 * 标签页
 * props:
 * 1. data: array 格式为 [{ label: 'tab名称', isClick: 是否可点击}]
 * 2. gradient: boolean tab底栏阴影控制项，true展现，false不展现，默认不展示
 * 3. type: string Tabs展示风格，defalult/card 默认为default
 *
 * methods:
 * tabClick: 向父级回调selected值
 * _handleModifySelected：供父级组件调用，通过ref手动修改selected值
 *
 * <Tabs data={data} tabClick={...} gradient={true} type='card'></Tabs>
 */

class Tabs extends BaseComponent {
    static propTypes = {
        textStyle: PropTypes.object,
        isActivePointer: PropTypes.bool,
        activeTextStyle: PropTypes.object,
        tabContainerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    }

    static defaultProps = {
        textStyle: {},
        activeTextStyle: {},
        isActivePointer: true,
        tabContainerStyle: {},
    }

    constructor(props) {
        super(props)
        const { data, gradient, type, selected } = this.props
        this.imgUrlList = {
            selected: '/static/images/airportcar/home/selected.png',
        }
        this.state = {
            data: data || [],
            selected: selected || 0,
            gradient: gradient || false,
            type: (type && type === 'card' && 'card') || 'default',
        }
    }

    static getDerivedStateFromProps(nextProps) {
        return {
            data: nextProps.data,
            selected: nextProps.selected,
        }
    }

    _tabClick(tab, index) {
        // const { selected } = this.state;

        if (!tab.isClick /* || selected == index */) {
            return
        }
        this.props.tabClick(index)

        this.setState({
            selected: index,
        })
    }

    /**
     * 供外部手动修改选中项
     */
    _handleModifySelected(index) {
        this.setState({
            selected: index,
        })
    }

    /**
     * model-default
     */
    produceDefaultModel() {
        const { textStyle, isActivePointer, tabContainerStyle, activeTextStyle } = this.props
        const { data, selected } = this.state

        return (
            <div className='tabs-box-default'>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            style={_.isObject(tabContainerStyle) ? tabContainerStyle : tabContainerStyle[index]}
                            className={selected === index ? 'tab-pane selected' : 'tab-pane'}
                            onClick={() => this._tabClick(item, index)}
                        >
                            <Flex
                                style={{
                                    ...textStyle,
                                    ...(selected === index ? activeTextStyle : {}),
                                    borderBottom: isActivePointer ? '2px solid #FFC100' : 'none',
                                }}
                                className='text'
                            >
                                {item.label}
                            </Flex>
                        </div>
                    )
                })}
            </div>
        )
    }

    /**
     * model-card
     */
    produceCardModel() {
        const { textStyle } = this.props
        const { data, selected } = this.state

        return (
            <div className='tabs-box-card'>
                {data.map((item, index) => {
                    return (
                        <div
                            key={index}
                            onClick={() => this._tabClick(item, index)}
                            className={
                                +selected === +index
                                    ? `index ${+index === 0 ? 'inside' : 'outside'} search-tab`
                                    : `${+index === 0 ? 'inside' : 'outside'} search-tab`
                            }
                        >
                            <span style={textStyle}>{item.label}</span>
                            <img
                                alt='selected'
                                className={+index === 0 ? 'inside-index' : 'outside-index'}
                                src={UtilCommon.jointImgUrl(this.imgUrlList, 'selected')}
                            ></img>
                        </div>
                    )
                })}
            </div>
        )
    }

    /**
     * model-gradient
     */
    produceGradient() {
        return <div className='tabs-gradient'></div>
    }

    render() {
        const { style = {} } = this.props
        const { gradient, type } = this.state

        return (
            <React.Fragment>
                <style dangerouslySetInnerHTML={{ __html: Style }}></style>
                <div className='component-tabs' style={style}>
                    {type !== 'card' ? this.produceDefaultModel() : ''}
                    {type === 'card' ? this.produceCardModel() : ''}
                    {gradient ? this.produceGradient() : ''}
                </div>
            </React.Fragment>
        )
    }
}

export default Tabs
