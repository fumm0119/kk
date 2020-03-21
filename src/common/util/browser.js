/**
 * 环境检测
 *
 */
const IOS_REG = /os/i;
const IPHONE = /iphone/i;
const IPAD = /ipad/i;
const ANDROID_REG = /android/i;
const ANDROID_MOBILE = /android.*?mobile/i;
const OPENCOURSE_APP_REG = /(OpenCourse|vopen)/i;

let userAgent = navigator.userAgent;

let isIOS = function () {
    return IOS_REG.test(userAgent);
};
let isAndroid = function () {
    return ANDROID_REG.test(userAgent);
};
let isSafari = function () {
    return /Safari/i.test(userAgent);
};
let isAndroidMobile = function () {
    return ANDROID_MOBILE.test(userAgent);
};
let isAndroidPad = function () {
    return isAndroid() && !isAndroidMobile();
};
let isOpenApp = function () {
    return OPENCOURSE_APP_REG.test(userAgent);
};
let isMobile = function () {
    return isAndroid() || isIOS();
};
let isIPhone = function () {
    return IPHONE.test(userAgent);
};
let isIPad = function () {
    return IPAD.test(userAgent);
};
let isQQBrowser = function () {
    return userAgent.indexOf('mqqbrowser') > -1;
};
let isWechat = function () {
    return /MicroMessenger/i.test(userAgent);
};
let isWeibo = function () {
    return userAgent.indexOf('weibo') > -1;
};
let getAndroidVersion = function () {
    if (isAndroid()) {
        let matched = userAgent.match(/Android (\d+).(\d+)/i);
        if (matched && matched[1]) {
            return matched[1];
        }
    }
    return -1;
};
let getIOSVersion = function () {
    if (isIOS()) {
        let matched = userAgent.match(/os (\d+)_(\d)+/i);
        if (matched && matched[1]) {
            return matched[1];
        }
    }
    return -1;
};
let isYixin = function () {
    return /YiXin/i.test(userAgent);
};
let isQQ = function () {
    return /QQ\//i.test(userAgent);
};
let getYiXinVersion = function () {
    let isYiXin = navigator.userAgent.match(/YiXin\/(\d{4})/i);
    let yixinVersion = (isYiXin && isYiXin[1]) || 0;
    return yixinVersion;
};

export default {
    isIOS,
    isOpenApp,
    isAndroidMobile,
    isAndroidPad,
    isIPhone,
    isIPad,
    isMobile,
    isAndroid,
    isWeibo,
    isSafari,
    isYixin,
    isQQ,
    getIOSVersion,
    getYiXinVersion,
    isQQBrowser,
    isWechat
};