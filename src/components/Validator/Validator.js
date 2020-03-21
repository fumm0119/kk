import {ATTRS, ERROR_TIPS} from './contants';
import validators from './util';
import $ from 'jquery';
import _ from 'lodash';
function Validator(form, scope, rules) {
  if (!rules) {
    throw new Error('[validator] The rules is must !');
  }

  this.form = form;
  this.name = form.getAttribute('name');
  this.scope = scope;
  this.fields = null;
  this.initRules(rules);
  this.initInputState();
}

Validator.prototype.initRules = function (rules) {
  let that = this;
  rules.$valid = false; // 标识表单是否通过验证
  rules.$checkAll = function () {
    return that.revalidate();
  };
  rules.$reload = function () {
    that.fields = that.form.querySelectorAll('input[name], textarea[name], select[name]');
    that.initInputState();
  };
  this.rules = rules;
};
/**
 * 初始化所有input状态
 */
Validator.prototype.initInputState = function () {
  let that = this;
  let initObj = {
    $valid: true,
    $touched: false
  };
  //console.log(this.getFields());
  $.map(this.getFields(), (elem, index) => {
    let attrName = elem.getAttribute('name');
    // console.log(attrName);
    //console.log(this.rules);
    let scopeInput = this.scope[this.name][attrName];
    let ruleObj = this.rules[attrName];
    if (ruleObj) {
      $.extend(ruleObj, initObj);
      doRight(elem, ruleObj.tip);
      ruleObj.$setRight = function (rightMsg) {
        if (rightMsg === undefined) {
          doRight(elem, ruleObj.tip || '');
        } else {
          doRight(elem, rightMsg);
        }
      };
      ruleObj.$setHighlight = function () {
        let $elem = $(elem);
        $elem.addClass('fn-input-highlight');
        setTimeout(() => {
          $elem.removeClass('fn-input-highlight');
        }, 500);
      };
      ruleObj.$setError = function (errorMsg) {
        doError(elem, '', errorMsg);
      };
      ruleObj.$check = function () {
        that.validate(elem, true);
      };
    }

    let $elem = $(elem);
    $elem.off('blur');
    $elem.off('focus');
    $elem.blur(() => {
      this.validate(elem, false);
    });
    $elem.focus(() => {
      if (ruleObj) {
        doRight(elem, ruleObj.tip);
      }
    });
  });
};

Validator.prototype.getFields = function () {
  if (!this.fields) {
    this.fields = this.form.querySelectorAll('input[name], textarea[name], select[name]');
  }

  if (this.fields.length === 0) {
    throw new Error('The validate fields is empty !');
  }

  return this.fields;
};

function doRight(element, tip) {
  let $elem = $(element);

  //旧版本
  if ($elem.hasClass('fn-input-error') === true) {
    $elem.removeClass('fn-input-error');
  }

  //新版本提示
  if ($elem.parent().parent().hasClass('weui-cell_warn') === true) {
    $elem.parent().parent().removeClass('weui-cell_warn');
  }



  let $tip_origin = $elem.next('.ui-tip');
  if (!$tip_origin[0]) {
    $tip_origin = $elem.closest('label').next('.ui-tip');
  }
  $tip_origin.html(`<span class="text">${tip || ''}</span>`);


  let $tip = $elem.parent().next('.weui-cell__error').find('.float-tip');
  if (!$tip[0]) {
    $tip = $elem.closest('label').next('.weui-cell__error').find('.float-tip');
  }
  $tip.html(`<span class="text">${tip || ''}</span>`);



}

function doError(element, attr, tip) {
  let $elem = $(element);

  if ($elem.is(':hidden') === true) {   //?测试
    if ($elem.prev('select[name]')[0]) {
      $elem.prev('select[name]').addClass('fn-input-error');
    }
  } else {
    //原来提示
    if ($elem.hasClass('fn-input-error') === false) {
      $elem.addClass('fn-input-error');
    }
    //更新版提示
    if($elem.parent().parent().hasClass('weui-cell_warn') === false) {
      $elem.parent().parent().addClass('weui-cell_warn')
    }

  }

  //原来代码错误提示
  let $tip_origin = $elem.next('.ui-tip');
  if (!$tip_origin[0]) {
    $tip_origin = $elem.closest('label').next('.ui-tip');
  }
  $tip_origin.html(`<span class="error">${tip || ERROR_TIPS[attr]}</span>`);
  //更新版错误提示

  let $tip = $elem.parent().next('.weui-cell__error').find('.float-tip');
  if (!$tip[0]) {
    $tip = $elem.closest('label').next('.weui-cell__error').find('.float-tip');
  }
  $tip.html(`<span class="error">${tip || ERROR_TIPS[attr]}</span>`);
}

Validator.prototype.validate = function (element, strict = true) {
  //console.log(element);
  let attrName = element.getAttribute('name');
  // console.log(attrName);
  let attrType = element.getAttribute('type');
  // console.log(this.scope);
  let value = this.scope[this.name][attrName];
  let ruleInputObj = this.rules[attrName];
  let valid = true;

  if (ruleInputObj) {
    for (let i = 0, len = ATTRS.length; i < len; i++) {
      let attr = ATTRS[i];
      if (ruleInputObj[attr] !== undefined) {
        ruleInputObj.$touched = true;

        // 只要是非严格模式, 内容如果为'', 那么校验通过
        if (strict === false && value === '') {
          ruleInputObj.$valid = false;
          doRight(element, ruleInputObj.tip || '');
        } else {
          if (attr === 'required') {
            valid = validators.required(value);
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.requiredTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'number') {
            valid = validators.number(value);
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.numberTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'min') {
            if (!ruleInputObj.required && value === '') {
              valid = true;
            } else {
              valid = validators.min(value, ruleInputObj.min);
            }
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.minTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'max') {
            valid = validators.max(value, ruleInputObj.max);
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.maxTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'minlength') {
            valid = validators.minlength(value, ruleInputObj.minlength);
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.minlengthTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'maxlength') {
            valid = validators.maxlength(value, ruleInputObj.maxlength);
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.maxlengthTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'pattern') {
            if (!ruleInputObj.required && value === '') {
              valid = true;
            } else {
              if (_.isRegExp(ruleInputObj.pattern) === true || typeof(ruleInputObj.pattern) === 'string') {
                valid = validators.pattern(value, ruleInputObj.pattern);
              } else {
                for (let j = 0, len = ruleInputObj.pattern.length; j < len; j++) {
                  let p = ruleInputObj.pattern[j];

                  if ($.isArray(p) === false) {
                    valid = validators.pattern(value, p);
                  } else {
                    let isAllOk = true;
                    for (let k = 0, len = p.length; k < len; k++) {
                      let isSubValid = validators.pattern(value, p[k]);
                      if (isSubValid === true) {
                        continue;
                      } else {
                        isAllOk = false;
                        break;
                      }
                    }
                    if (isAllOk === true) {
                      valid = true;
                    } else {
                      valid = false;
                    }
                  }
                  if (valid === true) {
                    break;
                  }
                }
              }
            }
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.patternTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
          if (attr === 'equalTo') {
            if (value === this.scope[this.name][ruleInputObj.equalTo]) {
              valid = true;
            } else {
              valid = false;
            }
            ruleInputObj.$valid = valid;
            if (valid === false && ruleInputObj.$touched === true) {
              doError(element, attr, ruleInputObj.equalToTip);
              break;
            } else {
              doRight(element, ruleInputObj.tip || '');
            }
          }
        }
      }
    }
  }

  // this.rules.$valid = valid;

};

/**
 * 检验表单正确性
 * @returns {boolean}
 */
Validator.prototype.checkFormValid = function () {
  let ruleInputObj;
  let isValid = true;
  for (let key in this.rules) {
    ruleInputObj = this.rules[key];
    if (ruleInputObj.$valid === false) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

/**
 * 校验整个表单
 */
Validator.prototype.revalidate = function () {
  $.map(this.getFields(), (elem, index) => {
    this.validate(elem, true);
  });
  return this.checkFormValid();
};

Validator.prototype.handleError = function () {

};

// Validator.prototype.register = function() {
//     let scope = $.extend({}, this.scope[this.name]);
//
//     // 初始化要知道表单是否有效
//     // scope.valid = this.form.checkValidity();
//     // scope.invalid = !scope.valid;
//
//     this.getFields().forEach(function(el) {
//         if (!el.getAttribute('name')) {
//             return;
//         }
//
//         scope[el.getAttribute('name')] = this.validate(el);
//
//     });
//
//     this.scope[this.name] = scope;
// };

export default Validator;
