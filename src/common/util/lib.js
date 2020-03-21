import JSEncrypt from 'jsencrypt';
import commonService from './commonService'
import cookie from './cookie'
import parseUrl from './parseUrl'
import {REG_URL} from './constants'

let encrypt = new JSEncrypt();

export default {
  /**
   * 初始化后端公钥
   */
  initEncrypt() {
    commonService.getRsaPublicKey().done(rep => {
      if (rep.code === window.CODE.SUCCESS) {
        encrypt.setPublicKey(rep.data.pem);
      } else {
        window.error(rep.msg);
      }
    });
  },

  /**
   * 进行加密
   * @param value
   */
  toEncrypt(value) {
    return encrypt.encrypt(value);
  },

  /**
   * 做登录之后的处理
   */
  doLogin(token, userData) {
    cookie.set('LOGIN_TOKEN', token, {
      path: '/',
      expires: 8     // 默认一个小时
    });
    window.localStorage.setItem('account-no', userData.userAccount);
    window.localStorage.setItem('account-uid', userData.uid);
    window.localStorage.setItem('account-cell', userData.cell);

    if (userData.mobile) {
      window.localStorage.setItem('verify-account', userData.mobile);     // 手机
    } else {
      window.localStorage.setItem('verify-account', userData.userAccount);    // 邮箱
    }


    goPage();

    function goPage() {
      let query = parseUrl();
      let to = window.decodeURIComponent(query.from);
      let href = window.location.href;
      if (href.indexOf('localhost') >= 0) {
        if (to && to != 'undefined') {
          window.location.href = to;
        } else {
          window.location.href = '/index.html#/account';
        }
      } else {
        if (REG_URL.test(to) === true) {
          window.location.href = to;
        } else {
          window.location.href = '/index.html#/account';
        }
      }
    }

  },

  /**
   * 登出
   * config.to    要去跳转的页面
   */
  doLogout(config) {
    cookie.remove('LOGIN_TOKEN', {
      path: '/'
    });
    window.localStorage.removeItem('account-no');
    window.localStorage.removeItem('verify-account');
    window.localStorage.removeItem('account-cell');

    let href = './index.html';
    if (config && config.to) {
      href = config.to;
    }

    window.location.href = href;
  },

  setAuthLevel1(uid) {
    return window.localStorage.setItem('HAS_AUTH_' + uid, '1');
  },

  setAuthLevel2(uid) {
    return window.localStorage.setItem('HAS_AUTH_' + uid, '2');
  },

  removeAuth(uid) {
    window.localStorage.removeItem('HAS_AUTH_' + uid);
  },
}

