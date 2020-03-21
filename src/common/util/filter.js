
import BigNumber from 'bignumber.js';
import bigdecimal from "bigdecimal";
import {PRECISION} from './lang';

//修正乘法的精度问题
let accMul = function (arg1, arg2) {
  let m = 0, s1 = arg1.toString(), s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length
  } catch (e) {
  }
  try {
    m += s2.split(".")[1].length
  } catch (e) {
  }
  return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m);
};

/**
 * 保留小数位
 * @param name
 * @param str
 * @param length
 * @returns {string}
 */
let fix = function (name, str, length) {
  str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
  length = isNaN(parseInt(length)) ? PRECISION : parseInt(length);
  let pow = Math.pow(10, length);
  //修正小数乘一个整数出小数的情况,乘完之后再进行四舍五入取0位小数
  return ((Math[name](accMul(str, pow))) / pow).toFixed(length);
};

export default {
  abs(str) { // 绝对值
    str = isNaN(parseFloat(str)) ? 0 : parseFloat(str);
    return Math.abs(str);
  },
  fix(str, length) { // 四舍五入后保留多少位小数
    return fix('round', str, length);
  },
  floorFix(str, length) { // 去尾后保留多少位小数
    return fix('floor', str, length);
    // return this.floorFixPrice(str, length);
  },
  floorFixPrice(str, length) {
    // 计算小数精度不准确的问题
    // 如0.230022200000001 => 0.2300002
    str = isNaN(parseFloat(str)) ? 0 : parseFloat(str).toFixed(length);
    length = isNaN(parseInt(length)) ? PRECISION : parseInt(length);
    return tool(str, length);

    function tool(number, precision) {
      let num = Math.pow(10, precision);
      let price = new BigNumber(number).mul(num).floor().div(num);
      // console.log('the price is:' + price);
      price = new bigdecimal.BigDecimal('' + price).toPlainString();
      // console.log('the last price is:' + price);
      // console.log('floorFixPrice is: ' + price);
      return formatZeroSuffix(price, precision);
    }

    /**
     * 补零
     * @param num
     * @param len
     * @returns {*}
     */
    function formatZeroSuffix(num, len) {
      let arrs = (num + '').split('.');

      let d = arrs[1];
      let l;

      // 没有小数点
      if (d === undefined) {
        if (len === 0) {
          return num;
        } else {
          return num + '.' + getZeros(len, 0);
        }
      } else if (d === '') {  // 最后一位是小数点
        return num + getZeros(len, 0);
      } else {
        l = d.length;
        return num + getZeros(len, l);
      }

      function getZeros(len, l) {
        let zeros = '';
        for (let i = 0; i < len - l; i++) {
          zeros = zeros + '0';
        }
        return zeros;
      }
    }
  },
  ceilFix(str, length, isGop) { // 向上进一后保留多少位小数 最后一个参数默认就是两位，true为果仁数设置为三位
    if (str === 0 || (str + '').indexOf('.') < 0) {
      return (isGop === undefined ? (str + '.00') : (str + '.000'));
    }
    return ((str + '').split('.')[1].length && (str + '').split('.')[1].length === (length ? length : 2)) ? parseFloat(str) : fix('ceil', parseFloat(str), length);
  },
  tail(str, length) { // 尾数
    str = typeof str !== 'string' ? '' : parseFloat(str);
    length = isNaN(parseInt(length)) ? 4 : Math.abs(parseInt(length));
    return str.substr(-length);
  },
  omit(str, length, replace) { // 省略
    let l = 5; // 默认保留长度
    length = isNaN(parseInt(length)) ? l : parseInt(length); //没传length isNaN()返回true
    return str.length > length ? (str.substring(0, length) + (replace || '...')) : str;
  },
  phone(str) { // 手机省略
    let phoneReg = /^((13[0-9])|(14[0-9])|(15[0-9])|(17[0-9])|(18[0-9]))\d{8}$/;
    return phoneReg.test(str) ? String(str).substr(0, 3) + '****' + String(str).substr(-4) : str;
  },
  email(str) {
    if (!str) {
      return '';
    }
    let idx = str.indexOf('@');
    let passedStr = str.substring(2, idx);
    return str.replace(passedStr, '****');
  },



};