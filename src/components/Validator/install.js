/**
 * @file
 * @auth
 * @date 2016/11/28
 */

import Validator from './Validator';

export default {
  install: function (Vue, options) {
    Vue.mixin({
      beforeMount: function () {
        if (!this.$el) return;
        var self = this;
        this.$el.querySelectorAll('form[name]').forEach(function (form) {
          let validator = new Validator(form, self);
          validator.register();
        });
      }
    });

    Vue.component('validator', {
      name: 'validator',
      template: '<div class="comp-validator"><slot></slot></div>',
      mounted: function () {
        let validator = new Validator(this.$el.querySelector("form"), this.$parent);
        validator.revalidate();
        validator.ignoreNextDigest = false;
        this.$parent.$watch('$data', _.debounce(function () {
          if (validator.ignoreNextDigest) {
            return validator.ignoreNextDigest = false;
          }
          validator.revalidate();
        }, 50), {deep: true});
      }
    });
  }
};