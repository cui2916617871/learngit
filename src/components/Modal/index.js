import React from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd-mobile'

const _Modal = ({ children, ...rest }) => {
    return <Modal {...rest}>{children}</Modal>
}

_Modal.propTypes = {
    children: PropTypes.any,
}

_Modal.Item.propTypes = {
    children: PropTypes.any,
}

export default _Modal
