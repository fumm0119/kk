import $ from 'jquery';
import cookie from './cookie'
import './codeMap';
import {LANG, LOCAL} from './lang';

const DEFAULT_BROKER_ID = 10003;

const DEFAULT_TYPE = 'POST';
const DEFAULT_TIMEOUT = 30000;

let TIP_EXCEPTION = 'Network exception, please try again later.';
if (LANG === LOCAL.cn) {
  TIP_EXCEPTION = '网络异常,请稍后重试！';
} else if (LANG === LOCAL.es) {
  TIP_EXCEPTION = 'Excepción de red, por favor inténtelo de nuevo más tarde';
} else if (LANG === LOCAL.hk) {
  TIP_EXCEPTION = '網絡異常，請稍後重試';
}

const LOGIN_LIST = [
  'assets',
  'deposit',
  'withdraw',
  'account',
  'new-address'
];

function getBrokerId() {
  let brokerId = window.localStorage.getItem('brokerId');
  return brokerId || DEFAULT_BROKER_ID;
}

function doLogin() {
  // 清理cookiei
  cookie.remove('LOGIN_TOKEN', {path: '/'});
  window.localStorage.removeItem('account-no');
  window.localStorage.removeItem('risk-tip');

  if (window.app && window.app.DEBUG === true) {
    console.warn('No Login');
  } else {

    let item;
    let from = window.encodeURIComponent(window.location.href);
    for (let i = 0, len = LOGIN_LIST.length; i < len; i++) {
      item = LOGIN_LIST[i];
      if (window.location.hash.indexOf(item) >= 0) {
        window.location.href = '.#/signin?from=' + from;
        break;
      }
    }
  }
}

function doException(xhr, showError) {
  console.log('【' + TIP_EXCEPTION + '】*************** ', JSON.stringify(xhr), ' ***************');
  if (showError === true) {
    window.error(TIP_EXCEPTION);
  }
}

function doResult(rep, deferred) {
  if (rep.code === window.CODE.SUCCESS) {
    deferred.resolveWith(this, [rep]);
    return;
  } else if (rep.code === window.CODE.NO_LOGIN.CODE) {
    doLogin();
    deferred.resolveWith(this, [rep]);
    return;
  } else if (rep.code === window.CODE.REQUEST_ERROR.CODE) {
    if (LANG === LOCAL.cn) {
      window.error(window.CODE.REQUEST_ERROR.cn);
      deferred.rejectWith(this, [window.CODE.REQUEST_ERROR.cn]);
    } else if (LANG === LOCAL.us) {
      window.error(window.CODE.REQUEST_ERROR.us);
      deferred.rejectWith(this, [window.CODE.REQUEST_ERROR.us]);
    } else if (LANG === LOCAL.es) {
      window.error(window.CODE.REQUEST_ERROR.es);
      deferred.rejectWith(this, [window.CODE.REQUEST_ERROR.es]);
    } else if (LANG === LOCAL.hk) {
      window.error(window.CODE.REQUEST_ERROR.hk);
      deferred.rejectWith(this, [window.CODE.REQUEST_ERROR.hk]);
    }
    return;
  } else if (rep.code === window.CODE.SERVER_ERROR.CODE) {
    if (LANG === LOCAL.cn) {
      window.error(window.CODE.SERVER_ERROR.cn);
      deferred.rejectWith(this, [window.CODE.SERVER_ERROR.cn]);
    } else if (LANG === LOCAL.us) {
      window.error(window.CODE.SERVER_ERROR.us);
      deferred.rejectWith(this, [window.CODE.SERVER_ERROR.us]);
    } else if (LANG === LOCAL.es) {
      window.error(window.CODE.SERVER_ERROR.es);
      deferred.rejectWith(this, [window.CODE.SERVER_ERROR.es]);
    } else if (LANG === LOCAL.hk) {
      window.error(window.CODE.SERVER_ERROR.hk);
      deferred.rejectWith(this, [window.CODE.SERVER_ERROR.hk]);
    }
    return;
  } else if (rep.code === window.CODE.NO_PERMISSION.CODE || rep.code === window.CODE.TOKEN_INVALID.CODE || rep.code === window.CODE.RISK_CONTROL.CODE) {
    doLogin();
    return;
    // if (LANG === LOCAL.cn) {
    //     window.error(window.CODE.NO_PERMISSION.cn);
    //     deferred.rejectWith(this, [window.CODE.SERVER_ERROR.cn]);
    // }else if (LANG === LOCAL.us){
    //     window.error(window.CODE.NO_PERMISSION.us);
    //     deferred.rejectWith(this, [window.CODE.SERVER_ERROR.us]);
    // } else if (LANG === LOCAL.es) {
    //     window.error(window.CODE.NO_PERMISSION.es);
    //     deferred.rejectWith(this, [window.CODE.SERVER_ERROR.es]);
    // }else if (LANG === LOCAL.hk) {
    //     window.error(window.CODE.NO_PERMISSION.hk);
    //     deferred.rejectWith(this, [window.CODE.SERVER_ERROR.hk]);
    // }
    // return;
  }
  // 非常规接口会走这儿
  deferred.resolveWith(this, [rep]);
}

function stringifyHeader(param) {
  let results = [];
  if ($.isEmptyObject(param) === true) {
    return '';
  }
  $.map(param, (value, key) => {
    let valueTemp = window.encodeURIComponent(value);
    results.push(`${key}=${valueTemp}`);
  });
  return results.join(',');
}

function getAuthHeader(param) {
  let headers = {
    'accept-language': LANG
  };
  let token = cookie.get('LOGIN_TOKEN');
  let auth = {};
  if (token) {
    auth.token = token;
  }

  if (param.header && $.isEmptyObject(param.header) === false) {
    auth = $.extend(auth, param.header);
  }
  if ($.isEmptyObject(auth) === false) {
    headers.authorization = stringifyHeader(auth);
  }
  return headers;
}

export default {
  /**
   * 发送请求get
   * @param path
   * @param param
   * @param showError
   */
  get(path, param = {}, showError = true) {
    param.data = $.extend(param.data, {
     // brokerId: getBrokerId(),
      random: Math.random()
    });
    if (param.data.isBrokerId === false){
      param.data.brokerId = '';
      delete param.data['brokerId'];
      delete param.data['isBrokerId'];
    }

    let deferred = $.Deferred();

    let headers = getAuthHeader(param);

    let a = $.ajax({
      url: (param.baseUri || '') + path,
      data: $.param(param.data),
      type: 'GET',
      headers: headers,
      contentType: 'application/json; charset=UTF-8',
      async: param.async !== false,
      dataType: 'JSON',
      timeout: param.timeout || DEFAULT_TIMEOUT,
      beforeSend() {
       // window.loading();
      },
      success(rep) {
        doResult(rep, deferred);
        // console.table(a.responseText)
      },
      error(xhr, type) {
        deferred.rejectWith(this, [TIP_EXCEPTION]);
        doException(xhr, showError);
      },
      complete() {
      //  window.unloading();
      }
    });

    return deferred.promise();
  },

  /**
   * 发送请求post
   * @param path
   * @param param
   * @param showError
   * @returns {*}
   */
  post(path, param, showError = true) {

    param.data = $.extend(param.data, {
     // brokerId: getBrokerId(),
      random: Math.random()
    });
    if (param.data.isBrokerId === false){
      param.data.brokerId = '';
      delete param.data['brokerId'];
      delete param.data['isBrokerId'];
    }

    let deferred = $.Deferred();

    let headers = getAuthHeader(param);

    $.ajax({
      url: (param.baseUri || '') + path,
      data: JSON.stringify(param.data),
      type: 'POST',
      dataType: 'JSON',
      headers: headers,
      contentType: 'application/json; charset=UTF-8',
      async: param.async !== false,
      timeout: param.timeout || DEFAULT_TIMEOUT,
      beforeSend() {
       // window.loading();
      },
      success(rep) {
        doResult(rep, deferred);
      },
      error(xhr, type) {
        deferred.rejectWith(this, [TIP_EXCEPTION]);
        doException(xhr, showError);
      },
      complete() {
       // window.unloading();
      }
    });

    return deferred.promise();
  }

};
