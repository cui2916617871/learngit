import React from 'react'
import BasePage from '@base/BasePage'
import Header from '@components/Header'
// import Loading from '@components/Loading'
import PageEnhance from '@vendor/PageEnhance'
import { UtilDevice } from '@iskytrip/sdk'
import CSS from './index.module.scss'
import iconLocation from '@assets/icon/icon-location.png'
import { GetCouponDetailInfo, postCouponVerify } from '@src/api'
@PageEnhance
class ShopScreen extends BasePage {
    constructor(props) {
        super(props)
        // let a = trans('优惠券')
        // console.log(a);
        this._hideLoadingPage = true // ??
        this.state = {
            isWechat: UtilDevice.isWechat(),
            detailData: {
                title: '扫码验券',
            },

            qrCode: '4KXLMF',
            qrCodeType: '1',
            serviceOrgId: '90003657',

            objectInfo: {
                qrCodeStatus: 20,
                writeOffTime: 2020 - 10 - 21,
                code: 2313202154,
                validDate: 2020 - 10 - 21 - 2020 - 10 - 25,
                productName: '产品名称',
                address: '上海市红桥区',
                linker: '催催催',
                linkMobile: 13945454,
            },
        }
    }

    api = {
        getCouponDetailInfo: new GetCouponDetailInfo(),
        postCouponVerify: new postCouponVerify(),
    }

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
            })
            .catch(function(error) {
                console.log(error)
            })
    }

    async componentDidMount() {
        console.log('did mount')
    }

    // 返回 event
    handleBack = () => this.back()

    render() {
        const {
            qrCodeStatus,
            writeOffTime,
            code,
            validDate,
            productName,
            address,
            linker,
            linkMobile,
        } = this.state.objectInfo
        return (
            <div>
                {this.state.isWechat ? null : (
                    <Header leftFunc={this.handleBack} title={this.state.detailData.title} bg='#f5f5f5' />
                )}
                <div className={CSS.shopContainer}>
                    {qrCodeStatus === 20 ? (
                        <div className={CSS.isVerification}>
                            <p>已核销</p>
                            <span>核销日期：{writeOffTime}</span>
                        </div>
                    ) : null}
                    <div className={CSS.bottomTicket}>
                        <div className={CSS.bottomTicketTitle}>优惠券码名称 {code}</div>
                        <div className={CSS.bottomTicketContent}>
                            <div className={CSS.descDetails}>
                                <div>使用有效期：2020.02.20-2020.0331</div>
                                <div>订单号: {validDate}</div>
                            </div>
                        </div>
                    </div>

                    <div className={CSS.bottomTicket}>
                        <div className={CSS.bottomTicketContentTe}>
                            <div className={CSS.infoTitle}>{productName}</div>

                            <div className={CSS.locationCon}>
                                <div className={CSS.sectionLeft}>
                                    <img className={CSS.sectionTitleIcon} src={iconLocation} alt='' />
                                </div>
                                <div className={CSS.sectionRight}>
                                    <p className={CSS.sectionRightT}>{address}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={CSS.bottomTicket}>
                        <div className={CSS.bottomTicketContentTe}>
                            <div className={CSS.infoTitle}>使用人员信息</div>
                            <div className={CSS.infoItem}>
                                <label>姓名</label>
                                <span>{linker}</span>
                            </div>
                            <div className={CSS.infoItem}>
                                <label>手机号</label>
                                <span>{linkMobile}</span>
                            </div>
                        </div>
                    </div>
                    <div className={CSS.tip}>来源：在机场</div>
                </div>
                {qrCodeStatus === 10 ? (
                    <div className={CSS.buttonSection}>
                        <p className={CSS.buttonSectionC5}>确认核销</p>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default ShopScreen
