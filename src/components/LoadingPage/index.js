import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import BaseLoading from '../BaseLoading'

const LoadingPage = ({ visible = true, className }) => {
    return (
        <div className={className} style={!visible ? { display: 'none' } : {}}>
            <BaseLoading />
        </div>
    )
}

LoadingPage.propTypes = {
    visible: PropTypes.bool,
    className: PropTypes.any,
}

export default styled(LoadingPage)`
    z-index: 9999;
    position: fixed;
    background: #fff;
    width: 100% !important;
    height: 100vh !important;
    display: flex;
    justify-content: center;
    align-items: center;
`
