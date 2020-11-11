let prd = true

const url = !prd ? 'http://192.168.1.122:50102/api' : 'https://gateway.iskytrip.com/api'

module.exports = {
    serviceHotelOrder: url + '/hotelorderservice', //20102
    serviceHotelProduct: url + '/hotelproduct', //20101
    serviceTransferOrder: url + '/transferorderservice', //20202
    serviceTransferProduct: url + '/transferproductservice', //20201
    serviceTransferFlight: url + '/transferflightservice', //20204
    serviceHoliday: url + '/baseproduct', //20106
    serviceCountryProvince: url + '/basicinf', //20401
    serviceFlight: url + '/flightproduct', //20904
    serviceCommonly: url + '/user', //10101
    urlPrefix: 'https://static.iskytrip.com/webappresource/hotel', // static 静态资源目录
    serverPrefix: '', // node server 链接
    hybridDebug: false,
    vendor: 'iskytrip_app',
    useLocalService: false,
    getJsUseNum: false,
    isHotelHMS: '06:00:00',
    openLogServer: false,
    isSentry: 'prod', // 可指定环境 或者 true全环境 dev test1 test2 prod true
}
