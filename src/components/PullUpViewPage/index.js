import React from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

// 参数 visible

const PullUpViewPage = ({ bg = '#F7F8F9', className, visible = false, children }) => {
    return ReactDOM.createPortal(
        <div
            className={`${className} page`}
            style={{
                background: bg,
                transform: `translateY(${visible ? '0' : '100vh'})`,
            }}
        >
            {children}
        </div>,
        document.getElementById('app'),
    )
}

export default styled(PullUpViewPage)`
    top: 0;
    left: 0;
    width: 100%;
    z-index: 101;
    display: block;
    position: fixed !important;
    transition: all 0.3s ease 0s;
`
