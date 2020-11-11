import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BaseComponent from '../../base/BaseComponent'

import './index.less'

class Button extends BaseComponent {
    static propTypes = {
        onPress: PropTypes.func,
        style: PropTypes.object,
        disabled: PropTypes.bool,
        disabledStyle: PropTypes.object,
        placeholder: PropTypes.string,
        placeholderStyle: PropTypes.object,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }

    static defaultProps = {
        style: {},
        value: '',
        disabledStyle: {},
        placeholderStyle: {},
    }

    static defaultProps = {
        disabled: false,
        onPress: () => {},
    }

    render() {
        const {
            className = '',
            disabled,
            disabledStyle,
            onPress,
            children,
            style,
            placeholder,
            placeholderStyle,
            value,
            ...props
        } = this.props
        const relatedDisabledStyle = {
            ...style,
            ...(disabled ? disabledStyle : {}),
        }
        const relatedPlaceholderStyle = {
            ...style,
            ...(value === '' ? placeholderStyle : {}),
        }
        const mergeStyle = { ...relatedDisabledStyle, ...relatedPlaceholderStyle }

        return (
            <button
                onTouchStart={() => {}}
                disabled={disabled}
                onClick={e => {
                    onPress && onPress(e)
                    e.stopPropagation()
                }}
                className={`btn-component ${value !== '' ? 'solid-btn' : 'hollow-btn'} ${className}`}
                style={mergeStyle}
                {...props}
            >
                {value === '' ? placeholder : value || children}
            </button>
        )
    }
}

export default styled(Button)`
    &:active {
        opacity: 0.7;
    }
`
