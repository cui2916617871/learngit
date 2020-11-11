import BaseModel from '../../base/BaseModel'

const ENV = require('../../env.config').env
let jsonBaseUrl =
    ENV.toLowerCase() === 'prod'
        ? 'https://static.iskytrip.com/inAirport' //生产
        : 'http://192.168.1.114:60104/airport/airport' //测试

// let jsonBaseUrl = 'http://localhost:3000'

export class GetJsonArticleDetail extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode, key } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/article/${key}.json`
        this.desc = '获取在机场信息详情json'
    }
    dataformat = t => t
}
export class GetJsonBusDetail extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode, busId } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/busDetail/${busId}.json`
        this.desc = '获取在机场地面公交详情json'
    }
    dataformat = t => t
}
export class GetJsonBusList extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/bus/bus.json`
        this.desc = '获取在机场地面公交列表son'
    }
    dataformat = t => t
}
export class GetJsonCoachList extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/farbus/farbus.json`
        this.desc = '获取在机场长途客运json'
    }
    dataformat = t => t
}
export class GetJsonCxfDetail extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/cxf/cxf.json`
        this.desc = '获取在机场磁悬浮详情json'
    }
    dataformat = t => t
}
export class GetJsonRailDetail extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode, l, d } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/line/l${l}d${d}.json`
        this.desc = '获取在机场轨道交通详情json'
    }
    dataformat = t => t
}
export class GetJsonRailList extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/rail/rail.json`
        this.desc = '获取在机场轨道交通列表json'
    }
    dataformat = t => t
}
export class GetJsonShuttleBusList extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/shuttleBus/shuttleBus.json`
        this.desc = '获取在机场摆渡车列表json'
    }
    dataformat = t => t
}
export class GetJsonTaxi extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/taxi/taxi.json`
        this.desc = '获取在机场出租车信息json'
    }
    dataformat = t => t
}
export class GetJsonPhoneList extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/phone/phoneV2.json`
        this.desc = '获取在机场常用电话静态json'
    }
    dataformat = t => t
}
export class GetJsonLuggageStorage extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/luggageStorage/luggageStorage.json`
        this.desc = '获取在机场行李寄存静态json'
    }
    dataformat = t => t
}

export class GetJsonCheckIn extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfoT/checkIn.json`
        this.desc = '获取在机场值机静态json'
    }
    dataformat = t => t
}

export class GetJsonNotesForOut extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/notesForOut/index.json`
        this.desc = '获取在机场出境海关须知静态json'
    }
    dataformat = t => t
}

export class GetJsonNotesForIn extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/notesForIn/index.json`
        this.desc = '获取在机场出境海关须知静态json'
    }
    dataformat = t => t
}

export class GetJsonTipsForIn extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/tipsForIn.json`
        this.desc = '获取在机场入境须知静态json'
    }
    dataformat = t => t
}

export class GetJsonVisa extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/visa.json`
        this.desc = '获取在机场签证静态json'
    }
    dataformat = t => t
}

export class GetJsonAirportActivities extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/airportActivities/index.json`
        this.desc = '获取在机场机场活动静态json'
    }
    dataformat = t => t
}

export class GetJsonTransitCounter extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/transitCounter.json`
        this.desc = '获取在机场中转柜台静态json'
    }
    dataformat = t => t
}

export class GetJsonRebates extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/rebates.json`
        this.desc = '获取在机场退税静态json'
    }
    dataformat = t => t
}

export class GetJsonBaggageShipping extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/baggageShipping.json`
        this.desc = '获取在机场退税静态json'
    }
    dataformat = t => t
}

export class GetJsonSecurityCheck extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfoT/securityCheck.json`
        this.desc = '获取在机场退税静态json'
    }
    dataformat = t => t
}

export class GetJsonServiceFacilities extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/serviceFacilities/index.json`
        this.desc = '获取在机场服务设施静态json'
    }
    dataformat = t => t
}

export class GetJsonLineInfo extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/lineInfo.json`
        this.desc = '获取在机场排队信息静态json'
    }
    dataformat = t => t
}

export class GetJsonLostAndFound extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/lostAndFound.json`
        this.desc = '获取在机场失物招领静态json'
    }
    dataformat = t => t
}

export class GetJsonCarRental extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/carRental.json`
        this.desc = '获取在机场车辆租赁静态json'
    }
    dataformat = t => t
}

export class GetJsonPublicTransport extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/publicTransport.json`
        this.desc = '获取在机场车辆租赁静态json'
    }
    dataformat = t => t
}

export class GetJsonAirportHotel extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/airportHotel.json`
        this.desc = '获取在机场机场酒店静态json'
    }
    dataformat = t => t
}

export class GetJsonWifi extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/wifi.json`
        this.desc = '获取在机场wifi静态json'
    }
    dataformat = t => t
}

export class GetJsonParkingLot extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfo/parkingLot.json`
        this.desc = '获取在机场wifi静态json'
    }
    dataformat = t => t
}

export class GetJsonLounge extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/lounge/index.json`
        this.desc = '获取在机场休息室静态json'
    }
    dataformat = t => t
}

export class GetJsonSpecialPassengers extends BaseModel {
    constructor(props = {}) {
        super(props)
        const { airportCode } = props
        this.method = 'get'
        this.url = `${jsonBaseUrl}/${airportCode.toLowerCase()}/istanbulInfoT/specialPassengers.json`
        this.desc = '获取在机场特殊旅客静态json'
    }
    dataformat = t => t
}

export class GetJsonSunriseCoupon extends BaseModel {
    constructor(props = {}) {
        super(props)
        this.method = 'get'
        this.url = `https://publicdev.oss-cn-beijing.aliyuncs.com/webConfig/sunrise/rules.json`
        this.desc = '优选会员权益券'
    }
    dataformat = t => t
}
