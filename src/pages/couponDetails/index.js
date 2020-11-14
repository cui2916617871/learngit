import React from 'react'
import BasePage from '@base/BasePage'
import { Header, Toast } from '../../components'
import Loading from '@components/Loading'
import PageEnhance from '@vendor/PageEnhance'
import { UtilDevice } from '@iskytrip/sdk'
import CSS from './index.module.scss'
import ProductCoupon from '../component/coupon'
import { GetCouponDetailInfo, postCouponVerify } from '@src/api'
@PageEnhance
class ShopScreen extends BasePage {
    constructor(props) {
        super(props)
        // this._hideLoadingPage = true // ??
        this.state = {
            isWechat: UtilDevice.isWechat(),
            detailData: {
                title: '扫码验券',
            },
            isLoading: false,
            qrCode: '4KXLMF',
            qrCodeType: '1',
            serviceOrgId: '90003657',

            objectInfo: {
                couponCode: '12312345',
                couponCodeId: 0,
                couponDesc: '优惠券描述',
                couponId: 0,
                couponName: '优惠券名字',
                discountAmountStr: '0',
                discountOdds: '无条件',
                discountUnit: '折',
                useTimeStr: '2020-02-02',
                validTimeStr: '2020-02-02 - 20200913',
                qrCodeStatus: 20,
                storeName: '黄焖鸡米饭',
            },
        }
    }
    api = {
        getCouponDetailInfo: new GetCouponDetailInfo(),
        postCouponVerify: new postCouponVerify(),
    }
    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 生命周期 */
    async pageAppear() {
        console.log(111)
        const self = this
        this.hideLoadingPage()
        self.getDetailData(false)
    }
    dataLoading(isLoading) {
        this.setState({
            isLoading,
        })
    }

    getDetailData(isRepeatPost) {
        // const self = this
        const { qrCode, qrCodeType, serviceOrgId } = this.state
        this.api.getCouponDetailInfo.setParams({
            qrCode,
            qrCodeType,
            serviceOrgId,
        })
        this.api.getCouponDetailInfo
            .execute()
            .then(function(result) {
                console.log(result)
                if (result.resultCode === '0') {
                    this.setState({
                        objectInfo: result.resultData,
                    })
                }
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    async componentDidMount() {
        console.log('did mount')
    }
    async couponVerify() {
        var self = this
        self.dataLoading(true)
        const { qrCode, qrCodeType, serviceOrgId } = this.state
        // getCodeDetailInfo.setParams({
        //     qrCode,
        //     qrCodeType,
        //     serviceOrgId
        // })

        const { resultCode } = await this.api.postCouponVerify
            .setParams({
                qrCode,
                qrCodeType,
                serviceOrgId,
            })
            .execute()
        if (+resultCode === 0) {
            //成功
            Toast('取消关注成功')
        } else {
            //失败
            Toast('取消关注失败')
        }
        // getCodeDetailInfo.execute()
        //     .then(function(result) {
        //         self.dataLoading(false)
        //         console.log(JSON.stringify(result))
        //         // alert(JSON.stringify(result))
        //     })
        //     .catch(function(error) {
        //         self.dataLoading(false)
        //         console.error(error)
        //     })
    }
    // 返回 event
    handleBack = () => this.back()
    render() {
        const {
            qrCodeStatus,
            couponCode,
            couponName,
            discountAmountStr,
            discountOdds,
            discountUnit,
            useTimeStr,
            validTimeStr,
            storeName,
            couponDesc,
        } = this.state.objectInfo
        const ProductCouponData = {
            couponCode,
            discountAmountStr,
            discountOdds,
            discountUnit,
            couponName,
            validTimeStr,
            qrCodeStatus,
        }
        return (
            <div>
                <Loading visible={this.state.isLoading} />
                {this.state.isWechat ? null : (
                    <Header leftFunc={this.handleBack} title={this.state.detailData.title} bg='#f5f5f5' />
                )}
                <div className={CSS.shopContainer}>
                    {qrCodeStatus === 20 ? (
                        <div className={CSS.isVerification}>
                            <p>已核销</p>
                            {useTimeStr ? <span>核销日期：{useTimeStr}</span> : null}
                        </div>
                    ) : null}
                    <ProductCoupon object={ProductCouponData} />

                    <div className={CSS.bottomTicket}>
                        <div className={CSS.bottomTicketTitle}>{storeName}</div>
                        <div className={CSS.bottomTicketContent}>
                            <div className={CSS.couponDescription}>
                                <div className={CSS.descTitle}>优惠描述</div>
                                <p className={CSS.descDetails}>{couponDesc}</p>
                            </div>
                        </div>
                    </div>
                </div>
                {qrCodeStatus === 10 ? (
                    <div className={CSS.buttonSection}>
                        <p className={CSS.buttonSectionC5} onClick={this.couponVerify.bind(this)}>
                            确认核销
                        </p>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default ShopScreen
