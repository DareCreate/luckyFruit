export const IS_DEBUG = true; // process.env.NODE_ENV !== 'production'
/** 外网访问地址 */
export const WEB_REMOTE_URL = IS_DEBUG ? 'http://gameim.ngrok.loliyu.com' : window.location.origin;
