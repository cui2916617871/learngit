/**
 * Created by guolongfei on 2019/10/9.
 * 不要删除,留着测试用
 */
import React from 'react'
import BasePage from '@base/BasePage'
import { Loading } from '@src/components'


class Test extends BasePage {
    constructor(props) {
        super(props)
        this._hideLoadingPage = true
        this.state = {
            isLoading: false,
            isShowCity: false,
            title:  "常居城市",
            options: [],
            index: 0,
            level: 1,
            province: {},
            city: {},
        }
    }

    componentDidMount() {}

    componentWillUnmount() {}

    hiddenAlert() {
        this.setState({
            isShowCity: false,
        })
    }

    /* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 工具 */
    dataLoading(isLoading) {
        this.setState({
            isLoading,
        })
    }

    render() {
        return (
            <div>
                <Loading visible={this.state.isLoading} />
                <video
                    style={{ width: '100vw', height: '100vh', backgroundColor: 'black' }}
                    controls
                    autoPlay
                    x5-video-player-type='h5'
                    x5-video-player-fullscreen='true'
                    x5-video-orientation='portraint'
                    playsinline='true'
                    webkit-playsinline='true'
                >
                    <source
                        src='https://static.iskytrip.com/activity/springfestival_20200115/image/video.mp4'
                        type='video/mp4'
                    />
                    您的浏览器不支持HTML5 video标签。
                </video>
            </div>
        )
    }
}

export default Test
