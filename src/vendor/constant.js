import { BaseEnv } from '@iskytrip/sdk'
import { env } from '@src/env.config'

const baseEnvModel = new BaseEnv()
baseEnvModel.setEnv(env)
/**
 * @desc 当前环境的BaseEnv实例
 */
export { baseEnvModel }

/**
 * @description navBar头部高度
 */
export const HEADER_HEIGHT = 44

/**
 * @desc 骨架屏主色
 * @type {string}
 * @exports {string}
 */
export const SKELETON_MAIN_COLOR = '#F0F2F5'
