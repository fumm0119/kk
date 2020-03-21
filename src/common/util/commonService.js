import ajax from './ajaxMobile';
import $ from 'jquery';

export default {

  /**
   * 获取加密公钥
   */
  getRsaPublicKey() {
    return ajax.get('/exchangeApi/common/rsa/publickey', {
      data: {
        r: Math.random()
      }
    });
  },

  /**
   * 登录是否需要图形验证码
   *
   */
  needCaptha(param = {}, header = {}) {
    return ajax.get('/exchangeApi/user/need-captha', {
      data: param,
      header: header
    })
  },

  /**
   * 获取图形验证码
   * @returns {string}
   */
  getCode(param = {}) {

    let deferred = $.Deferred();
    if (window.app.DEBUG === true && window.location.port === '8000') {
      $.ajax({
        url: '/exchangeApi/captchar/code?randomKey=' + param.randomKey,
        type: 'POST',
        dataType: 'JSON',
        contentType: 'application/json; charset=UTF-8',
        success: function (rep) {
          deferred.resolveWith(this, [rep]);
        },
        error: function (xhr, type) {
          deferred.resolveWith(this, [xhr.responseText]);
        }
      });
    } else {
      let rep = '/exchangeApi/captchar/code?randomKey=' + param.randomKey;
      deferred.resolveWith(this, [rep]);
    }

    return deferred.promise();

  },

  login(param = {}, header) {
    return ajax.post('/exchangeApi/user/login', {
      data: param,
      header: header
    });
  },



}
