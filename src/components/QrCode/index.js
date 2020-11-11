import React from 'react'
import CSS from './index.module.css'
import QRCodeImg from 'qrcode.react'
import BaseComponent from '../../base/BaseComponent'
import { UtilCommon } from '@iskytrip/sdk'

// value
// size
// bgColor
// fgColor
// level
// iconSize
// iconUrl

export default class QrCode extends BaseComponent {
    render() {
        let size = this.props.size || 400
        let iconSize = this.props.iconSize || 80
        let imageSettings = this.props.iconUrl
            ? {
                  src: this.props.iconUrl,
                  height: UtilCommon.rem2px(iconSize / 100),
                  width: UtilCommon.rem2px(iconSize / 100),
              }
            : null
        return (
            <div
                className={CSS.qrCode}
                style={{
                    width: UtilCommon.rem2px(size / 100),
                    height: UtilCommon.rem2px(size / 100),
                    excavate: true,
                    display: 'inline-block',
                }}
            >
                <QRCodeImg
                    value={this.props.value || ''}
                    size={UtilCommon.rem2px(size / 100)}
                    bgColor={this.props.bgColor || '#FFFFFF'}
                    fgColor={this.props.fgColor || '#000000'}
                    level={this.props.level || 'M'}
                    imageSettings={imageSettings}
                />
            </div>
        )
    }
}
