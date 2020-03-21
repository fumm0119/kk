import './Toast.scss';

import Vue from 'vue';
import html from './Toast.html';

$('body').append(html);

const TIMEOUT = 2500;
const TIMEOUT_ERROR = 4000;

let vm = new Vue({
  el: '#compToast',
  components: {},
  data() {
    return {
      timeId: null,
      $Toastmodule: null,
      isShow: false,
      isShowInTop: false,
      classObj: {},
      transition: 'fade',
      type: 'warning',
      content: '',
      timeout: TIMEOUT,
      callback() {
      }
    };
  },
  mounted() {
    this.$Toastmodule = $(this.$refs.Toastmodule);
  },
  methods: {
    show() {
      this.isShow = true;
      if (this.timeId) {
        window.clearTimeout(this.timeId);
      }
      // 不消失
      if (this.timeout === -1) {
        return;
      }
      this.timeId = setTimeout(() => {
        this.hide();
        if (typeof this.callback === 'function') {
          this.callback();
        }
      }, this.timeout);
    },
    hide() {
      this.isShow = false;
    }
  }
});

let toast = function (msgOrConfig, callback, timeout) {

  let config = {};

  if (typeof msgOrConfig === 'string') {
    config.content = msgOrConfig;
    config.callback = callback;
    config.timeout = timeout;
  } else {
    config = msgOrConfig;
    if (config.type === 'error' && !config.timeout) {
      config.timeout = TIMEOUT_ERROR;
    }
  }

  let option = $.extend({}, {
    transition: config.transition || 'fade',
    type: config.type || 'warning',
    content: config.content,
    timeout: config.timeout || TIMEOUT,
    callback: config.callback
  });

  $.map(option, (value, key) => {
    vm[key] = value;
  });
  vm.show();
};

window.toast = toast;

window.error = function (msgOrConfig, callback, timeout) {
  let config = {};
  if (typeof msgOrConfig === 'string') {
    config.type = 'error';
    config.content = msgOrConfig;
    if (config.callback != 'undefined' ){
      config.callback = callback;
    }

    config.timeout = timeout || TIMEOUT_ERROR;
  } else {
    config = $.extend({
      type: 'error'
    }, msgOrConfig);
  }
  toast(config);
};

/**
 * confirm
 * @param config
 * @returns {*}
 */
export default toast;