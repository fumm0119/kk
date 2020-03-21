

const CH = 'zh-CN';
const EN = 'en-US';
const ES = 'es-ES';
const HK = 'zh-HK';

let lang = CH;
//
// let href = window.location.href;
// if (href.indexOf('xiaojian.me') >= 0 || href.indexOf('bicooo.com') >= 0  ) {
//     lang = CH;
// } else if (href.indexOf('ourdax') >= 0 || href.indexOf('goopal.com') >= 0 || href.indexOf('localhost') >= 0 || href.indexOf('gpdax.com') >= 0 ) {
//     lang = EN;
// }

let hrefLang,
    path = window.location.pathname;

hrefLang = path.split('/')[1];

const local = {
    cn: CH,
    us: EN,
    es: ES,
    hk: HK
};

if (hrefLang === 'cn') {
    lang = CH;
} else if (hrefLang === 'us') {
    lang = EN;
} else if (hrefLang === 'es') {
    lang = ES;
} else if (hrefLang === 'hk') {
    lang = HK;
}

// 这里计算精度
let precision = 4;
// 如果是境外项目, 精度是4位小数
// 如果是境内项目, 精度是3位小数
// if (lang === CH) {
//     precision = 4;
// } else if (lang === EN) {
//     precision = 4;
// } else if( lang === ES) {
//     precision = 4;
// } else if( lang === HK) {
//     precision = 4;
// }

export const PRECISION = precision;

export const LOCAL = local;
export const LANG = lang;

