export default {
  required: function (value) {
    if (typeof value !== 'string') {
      value = value + '';
    }
    return value.length > 0 ? true : false;
  },
  // email: function (value, multiple) {
  //     return emailRegExp.test(value);
  // },
  number: function (value) {
    return !isNaN(value);
  },
  // url: function (value) {
  //     return urlRegExp.test(value);
  // },
  minlength: function (value, length) {
    return value.length >= length;
  },
  maxlength: function (value, length) {
    return length >= value.length;
  },
  pattern: function (value, pattern) {
    var patternRegExp;
    if (typeof pattern === 'string') {
      patternRegExp = new RegExp('^' + pattern + '$');
    } else {
      patternRegExp = pattern;
    }
    return patternRegExp.test(value);
  },
  min: function (value, min) {
    if (value === 0) {
      return value * 1 > min * 1;
    } else {
      return value * 1 >= min * 1;
    }

  },
  max: function (value, max) {
    return max * 1 >= value * 1;
  }
};

