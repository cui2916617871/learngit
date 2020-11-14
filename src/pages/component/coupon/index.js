import React from 'react'
import PropTypes from 'prop-types'
import CSS from './index.module.scss'

import iconLocation from '@assets/image/verified.png'

class ProductUseProcess extends React.Component {
    render() {
        console.log(this.props)
        const { object } = this.props

        console.log({ object })
        const {
            couponCode,
            discountAmountStr,
            discountOdds,
            discountUnit,
            couponName,
            validTimeStr,
            qrCodeStatus,
        } = object
        return (
            <div className={CSS.topTicket}>
                <p className={CSS.ball}>
                    <b></b>
                    <b></b>
                </p>
                {qrCodeStatus !== 10 ? <img className={CSS.sectionTitleIcon} src={iconLocation} alt='' /> : null}
                <p className={CSS.firstLine}>
                    <label className='bold'>券码：</label>
                    <span className='bold'>{couponCode}</span>
                </p>
                <div className={CSS.topDiscount}>
                    <p className={qrCodeStatus !== 10 ? CSS.active : ''}>
                        <span>
                            <b>{discountAmountStr}</b>
                            <b>{discountUnit}</b>
                        </span>
                        <span>{discountOdds ? discountOdds : ''}</span>
                    </p>
                    <p>
                        <span>折扣券</span>
                        <span className='bold'>{couponName}</span>
                        <span>{validTimeStr}</span>
                    </p>
                </div>
            </div>
        )
    }
}

ProductUseProcess.propTypes = {
    object: PropTypes.object,
}

export default ProductUseProcess
