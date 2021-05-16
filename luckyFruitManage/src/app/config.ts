import { projectType, systemType } from './typeDef';

const IS_DEBUG = process.env.NODE_ENV !== 'production';
export const REMOTE_URL = IS_DEBUG ? 'http://gameim.ngrok.loliyu.com' : 'http://api.xiliaohongbao.net';
export const BASE_URL = '';
export const PROJECT_TYPE = projectType.COMMON;
export const SYSTEM_TYPE = systemType.ALL;
export default module.exports;
