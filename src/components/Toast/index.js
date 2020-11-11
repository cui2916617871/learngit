import { Toast } from 'antd-mobile'

const toast = (msg = '', msgTime = 0, callback = () => {}) => {
    Toast.info(msg, !msgTime ? 2.5 : 3.5, callback, false)
}

export default toast
