import React from 'react'
import { Flex } from 'antd-mobile'
import PropTypes from 'prop-types'

const _Flex = ({ full = false, inline = false, children, style = {}, ...rest }) => {
    const groupStyle = {
        overflow: 'inherit',
        ...style,
    }

    if (full) groupStyle.width = '100%'
    if (inline) groupStyle.display = 'inline-flex'

    return (
        <Flex style={groupStyle} {...rest}>
            {children}
        </Flex>
    )
}

_Flex.Item = ({ full = false, children, style, ...rest }) => (
    <Flex.Item style={full ? { width: '100%', ...style } : style} {...rest}>
        {children}
    </Flex.Item>
)

_Flex.propTypes = {
    full: PropTypes.bool,
    inline: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.any,
}

_Flex.Item.propTypes = {
    full: PropTypes.bool,
    style: PropTypes.object,
    children: PropTypes.any,
}

export default _Flex
