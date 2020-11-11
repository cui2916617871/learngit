/**
 * Example:
 * IconCodeEmum = {
    TIP: '\ue65f',  // '&#xe65f;'(iconfont) -> '\ue65f'(Unicode)
 * }
 * <IconFont font={IconCodeEmum.TIP} />
 */

import React from 'react'
import PropTypes from 'prop-types'
import BaseComponent from '../../base/BaseComponent'

export default class Iconfont extends BaseComponent {
    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        onPress: PropTypes.func,
        family: PropTypes.string,
        font: PropTypes.string.isRequired,
    }

    static defaultProps = {
        font: '',
        className: '',
        style: {},
        onPress: () => {},
        family: 'iconfont', //默认用iskytrip字体， 可传其他字体
    }

    render() {
        const { className, family, font, style, onPress } = this.props
        return (
            <span
                className={`${className} ${family} ${font}`}
                style={{ /* fontFamily: family,  */ ...style }}
                onClick={onPress}
            />
        )
    }
}
