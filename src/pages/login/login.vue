<template>
  <div class="login-page">
    <m-header>登陆</m-header>
    <scroll class="top-page">
      <validator :rules="rules" :parent="_self">
        <form class="m-form-login" name="form" action="javascript:;">
          <div class="weui-cells weui-cells_form">
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label fz14">
                  邮箱
                </label>
              </div>
              <div class="weui-cell__bd">
                <input v-model="form.account"
                       name="account"
                       class="weui-input"
                       type="text"
                       autocomplete="off"
                       placeholder="请输入邮箱账号"
                       @blur="blurAccount()"
                />
                <div class="ui-tip"></div>
              </div>
            </div>
            <div class="weui-cell">
              <div class="weui-cell__hd">
                <label class="weui-label fz14">
                  密码
                </label>
              </div>
              <div class="weui-cell__bd">
                <input v-model="form.password"
                       name="password"
                       class="weui-input"
                       type="password"
                       autocomplete="off"
                       placeholder="请输入登陆密码"/>
                <div class="ui-tip"></div>
              </div>
            </div>
            <div class="weui-cell weui-cell_vcode" v-if="needImgCode === true">
              <div class="weui-cell__hd"><label class="weui-label">验证码</label></div>
              <div class="weui-cell__bd">
                <input class="weui-input"
                       placeholder="请输入图形验证码"
                       type="text"
                       maxlength="6"
                       autocomplete="off"
                       v-model="form.code"
                       name="code"
                >
                <div class="ui-tip"></div>
              </div>
              <div class="weui-cell__ft">
                <img :src="imgCodeSrc" @click="changeImgCode()" class="img" height="50" width="120">
              </div>
            </div>
          </div>
        </form>
        <div class="btn-wrapper mt30">
          <button class="btn-submit" @click.stop.prevent="submit">登陆</button>
        </div>

      </validator>
    </scroll>

  </div>
</template>

<script>
  import lib from '../../common/util/lib';
  import Validator from '../../components/Validator/main';
  import {REG_EMAIL, REG_LOGPWD} from '../../common/util/constants'
  import MHeader from "../../components/m-header/m-header";
  import Scroll from "../../components/scroll/scroll";
  import commonService from '../../common/util/commonService'

  export default {
    name: "login",
    components: {Scroll, MHeader, Validator},
    data() {
      return {
        form: {
          account: '',
          password: '',
          code:''
        },
        rules: {
          account: {
            tip: '',
            required: true,
            requiredTip: '邮箱不能为空',
            pattern: REG_EMAIL,
            patternTip: window.CODE.EMAIL['cn']
          },
          password: {
            required: true,
            requiredTip: '密码不能为空',
            minlength: 6,
            minlengthTip: '密码长度在6-20位字符之间',
            maxlength: 20,
            maxlengthTip: '密码长度在6-20位字符之间',
            pattern: REG_LOGPWD,
            patternTip: '格式错误'
          },
          code: {}
        },
        needImgCode: false,
        imgCodeSrc: '',

        isRequesting: false,

        randomKey: ''   // 发送图形验证码需要的动态时间参数
      }
    },
    created() {
      this.changeImgCode();
    },
    methods: {
      /**
       * 手机号失去焦点
       */
      blurAccount() {
        this.rules.account.$check();
        if (this.rules.account.$valid === true) {
          commonService.needCaptha({
            userName: this.form.account
          }, {}).done(rep => {
            if (rep.code === window.CODE.SUCCESS) {
              this._hideCode();
            } else if (rep.code === window.CODE.HAS_NO_REGISTER_MOBILE.CODE) {
              this.rules.account.$setError(window.CODE.HAS_NO_REGISTER_MOBILE[this.$i18n.locale]);
            } else if (rep.code === window.CODE.NO_CAPTCHA.CODE) {
              if (rep.data && rep.data.num && rep.data.num < 10) {
                this._showCode();
              } else if (rep.data && rep.data.num && rep.data.num >= 10) {
                this.rules.account.$setError(window.CODE.ACCOUNT_LOCK_MOBILE[this.$i18n.locale]);
              }
            } else {
              window.error(rep.msg);
            }
          });
        }
      },
      changeImgCode() {
        this.randomKey = new Date().getTime();
        commonService.getCode({
          randomKey: this.randomKey
        }).done(rep => {
          this.imgCodeSrc = rep;
        });
      },
      _hideCode() {
        this.needImgCode = false;
        if (this.rules.code) {
          setTimeout(() => {
            delete this.rules.code;
            this.rules.$reload();
          }, 0);
        }
      },

      _showCode() {
        this.needImgCode = true;
        this.changeImgCode();
        setTimeout(() => {
          this.rules.code = {
            required: true,
            requiredTip: this.$t('common.captchaRequireTip')
          };
          this.rules.$reload();
        }, 0);
      },

      submit() {
        if (this.rules.$checkAll() === false) {
          return;
        }
        let header;

        // 不需要图形验证码
        if (this.needImgCode === false) {
          header = {
            'account-no': this.form.account,
            'login-password': lib.toEncrypt(this.form.password)
          };
          this.isRequesting = true;
          commonService.login({}, header).done(rep => {
            if (rep.code === window.CODE.SUCCESS) {
              lib.doLogin(rep.data.token, rep.data);
              if (rep.data.authLevel === 'LEVEL1') {
                lib.setAuthLevel1(rep.data.uid);
              } else if (rep.data.authLevel === 'LEVEL2') {
                lib.setAuthLevel2(rep.data.uid);
              } else {
                lib.removeAuth(rep.data.uid);
              }
            } else if (rep.code === window.CODE.HAS_NO_REGISTER.CODE) {
              this.rules.account.$setError(window.CODE.HAS_NO_REGISTER[this.$i18n.locale]);
            } else if (rep.code === window.CODE.NO_CAPTCHA.CODE) {
              this._showCode();
            } else if (rep.code === window.CODE.ACCOUNT_LOCK_MOBILE.CODE) {
              this.rules.password.$setError(window.CODE.ACCOUNT_LOCK_MOBILE[this.$i18n.locale]);
            } else if(rep.code === window.CODE.LOGIN_PWD.CODE) {
              this.rules.password.$setError(window.CODE.LOGIN_PWD[this.$i18n.locale]);
              if (rep.code === window.CODE.LOGIN_PWD.CODE && rep.data && rep.data.num === 3) {
                this._showCode();
                return;
              }
              if (rep.data && +rep.data.needVerCode === 1) {
                this._showCode();
              }
            } else {
              this.$toast(rep.msg);
            }
          }).always(rep => {
            this.isRequesting = false;
          });
        } else {
          // 需要图形验证码
          // 校验验证码

          header = {
            'account-no': this.form.account,
            'login-password': lib.toEncrypt(this.form.password),
            'captchar-code': lib.toEncrypt(this.form.code),
            'captchar-no': this.randomKey
          };

          this.isRequesting = true;
          commonService.login({}, header).done(rep => {
            if (rep.code === window.CODE.SUCCESS) {
              lib.doLogin(rep.data.token, rep.data);
              if (rep.data.authLevel === 'LEVEL1') {
                lib.setAuthLevel1(rep.data.uid);
              } else if (rep.data.authLevel === 'LEVEL2') {
                lib.setAuthLevel2(rep.data.uid);
              } else {
                lib.removeAuth(rep.data.uid);
              }
            } else {
              this.isRequesting = false;
              setTimeout(() => {
                if (rep.code === window.CODE.LOGIN_PWD.CODE && rep.data && rep.data.num && rep.data.num <= 10) {
                  this.changeImgCode();
                  let num = +rep.data.num;
                  if (num >= 5) {
                    if (num === 10) {
                      this.rules.password.$setError(window.CODE.ACCOUNT_LOCK_MOBILE[this.$i18n.locale]);
                    } else {
                      this.rules.password.$setError(this.$t('common.IncorrectTip', {num: 10 - num}));
                    }
                  } else if (num < 5) {
                    this.rules.password.$setError(window.CODE.LOGIN_PWD[this.$i18n.locale]);
                  }
                } else if (rep.code === window.CODE.HAS_NO_REGISTER.CODE) {
                  this.rules.account.$setError(window.CODE.HAS_NO_REGISTER[this.$i18n.locale]);
                } else if (rep.code === window.CODE.LOGIN_PWD.CODE) {
                  this.changeImgCode();
                  this.rules.password.$setError(window.CODE.LOGIN_PWD[this.$i18n.locale]);
                } else if (rep.code === window.CODE.LOGIN_PWD_FORMAT.CODE) {
                  this.rules.password.$setError(window.CODE.LOGIN_PWD_FORMAT[this.$i18n.locale]);
                } else if (rep.code === window.CODE.CAPTCHA.CODE) {
                  this.changeImgCode();
                  this.rules.code.$setError(window.CODE.CAPTCHA[this.$i18n.locale]);
                } else if (rep.code === window.CODE.CAPTCHA_INVALID.CODE) {
                  this.rules.code.$setError(window.CODE.CAPTCHA_INVALID[this.$i18n.locale]);
                } else if (rep.code === window.CODE.ACCOUNT_LOCK_MOBILE.CODE) {
                  this.rules.password.$setError(window.CODE.ACCOUNT_LOCK_MOBILE[this.$i18n.locale]);
                } else {
                  window.error(rep.msg);
                }
              }, 0);
            }
          }).always(rep => {

          });
        }

      }

    }
  }
</script>

<style scoped lang="scss">

</style>
