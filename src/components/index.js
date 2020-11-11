const { UtilDevice, Bridge } = require('@iskytrip/sdk')

const Compontents = {
    get Toast() {
        if (UtilDevice.isApp()) {
            return Bridge.appToast
        } else {
            const module = require('./Toast')
            return module && module.__esModule ? module.default : module
        }
    },
    get Flex() {
        const module = require('./Flex')
        return module && module.__esModule ? module.default : module
    },
    get Alert() {
        const module = require('./Alert')
        return module && module.__esModule ? module.default : module
    },
    get Modal() {
        const module = require('./Modal')
        return module && module.__esModule ? module.default : module
    },
    get Tabs() {
        const module = require('./Tabs')
        return module && module.__esModule ? module.default : module
    },
    get Header() {
        const module = require('./Header')
        return module && module.__esModule ? module.default : module
    },
    get Button() {
        const module = require('./Button')
        return module && module.__esModule ? module.default : module
    },
    get Inputer() {
        const module = require('./Inputer')
        return module && module.__esModule ? module.default : module
    },
    get Loading() {
        const module = require('./Loading')
        return module && module.__esModule ? module.default : module
    },
    get QrCode() {
        const module = require('./QrCode')
        return module && module.__esModule ? module.default : module
    },
    get Stepper() {
        const module = require('./Stepper')
        return module && module.__esModule ? module.default : module
    },
    get Iconfont() {
        const module = require('./Iconfont')
        return module && module.__esModule ? module.default : module
    },
    get TextInput() {
        const module = require('./TextInput')
        return module && module.__esModule ? module.default : module
    },
    get SideSwiper() {
        const module = require('./SideSwiper')
        return module && module.__esModule ? module.default : module
    },
    get LoadingPage() {
        const module = require('./LoadingPage')
        return module && module.__esModule ? module.default : module
    },
    get IconCodeEmum() {
        const module = require('./Iconfont/iconCodeEmum')
        return module && module.__esModule ? module.default : module
    },
    get PullUpViewPage() {
        const module = require('./PullUpViewPage')
        return module && module.__esModule ? module.default : module
    },
}

module.exports = Compontents
