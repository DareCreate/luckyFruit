// import { system, inWechatBrowser } from '@/app/helps';

// 判断是哪个系统
const system = () => {
  const u = window.navigator.userAgent;
  const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // g
  const isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
  let useSystem;
  if (isAndroid) {
    useSystem = 'Android';
  } else if (isIOS) {
    useSystem = 'IOS';
  } else {
    useSystem = 'PC';
  }
  return useSystem;
};

export const inPc = system() === 'PC';
export const inPhone = system() !== 'PC';
export const inIos = system() === 'IOS';
// export const inWechat = inWechatBrowser();
// export const inNativeApp = ua.indexOf('Html5Plus') > -1; //  && ua.indexOf('StreamApp') === -1
export default module.exports;
