/**
 * @file
 * @auth
 * @date 2016/11/28
 */

import Validator from './Validator';
import Vue from 'vue';

/**
 * @example
 <validator>
 <form class="form" name="loginForm">
 <div class="field">
 <label>Username:</label>
 <input type="text" name="userName" v-model="userName" required minlength="3">
 <div class="tip" v-show="loginForm.userName.valid === true">这里是有效信息</div>
 <div class="tip" v-show="loginForm.userName.valid === false">请输入用户名</div>
 </div>
 <div class="field">
 <label>Password:</label>
 <input type="password" name="password" v-model="password" minlength="6">
 <div class="tip" v-show="loginForm.password.invalid === true">{{loginForm.password.tip}}</div>
 <div class="tip" v-show="loginForm.password.invalid === false">{{loginForm.password.okTip}}</div>
 </div>
 </form>
 </validator>
 */
export default Vue.extend({
  name: 'validator',
  template: '<div class="comp-validator"><slot></slot></div>',
  props: {
    rules: {
      type: Object
    },
    parent: {
      type: Object
    }
  },
  beforeMount() {
    // if (!this.$el) return;
    // let self = this;
    // this.$el.querySelectorAll('form[name]').forEach(function(form) {
    //     let validator = new Validator(form, self);
    //     validator.register();
    // });
  },
  mounted() {
    let formElem = this.$el.querySelector("form");
    let formName = formElem.getAttribute('name');
    if (this.parent) {
      new Validator(formElem, this.parent, this.rules);
    } else {
      new Validator(formElem, this.$parent, this.rules);
    }
    // new Validator(formElem, this.$parent, this.rules);

    // validator.revalidate();

    // this.$parent.$watch(formName, _.debounce(function() {
    //     console.log('validator watch begin ...');
    //     validator.revalidate();
    // }, 50), {deep: true});

    // this.$parent.$watch(formName, () => {
    //     validator.handleError();
    // }, {deep: true});
  }
});
