
let CODE = {

  SUCCESS: '100200',

  // 接口通用错误
  REQUEST_ERROR: {
    CODE: '100100',
    cn: '传入字段校验错误',
    us: 'Invalid request',
    es: 'Solicitud no válida',
    hk: '傳入字段校驗錯誤'
  },
  SERVER_ERROR: {
    CODE: '100103',
    cn: '服务不可用',
    us: 'Server Error',
    es: 'Error del servidor',
    hk: '服務不可用'
  },
  NO_LOGIN: {
    CODE: '105101',
    cn: '未登录',
    us: 'No Login',
    es: 'No Login',
    hk: '未登錄'
  },

  TOKEN_INVALID: {
    CODE: '105108',
    cn: 'TOKEN已失效',
    us: 'Token Invalid',
    es: 'Token inválido',
    hk: 'TOKEN已失效'
  },
  RISK_CONTROL: {//风控
    CODE: '100109',
    cn:'',
    us:'',
    es:'',
    hk:''
  },


  // EXIT_ALIPAY: {
  //     CODE: '113100',
  //     cn: '您已经添加了该支付宝账号'
  // },
  // EXTI_BANK: {
  //     CODE: '113101',
  //     cn: '您已经绑定了该银行卡'
  // },
  EXIT_COIN_ADDRESS: {
    CODE: '113102',
    cn: '该地址已经存在',
    us: 'This address has already existed.',
    es: 'Esta dirección ya ha existido ',
    hk: '該地址已經存在'
  },
  INVALID_COIN_ADDREESS: {
    CODE: '113103',
    cn: '地址格式错误',
    us: 'Incorrect address. Please enter correct address for your asset security.',
    es: 'Dirección incorrecta. Introduzca la dirección correcta para la seguridad de su activo.',
    hk: '地址格式錯誤'
  },
  // NO_EXIT_OKPAY: {
  //     CODE: '113111',
  //     cn: 'OkPay账号不存在',
  //     us: 'This OKPAY account doesn’t exist.'
  // },
  // EXIT_OKPAY: {
  //     CODE: '113112',
  //     cn: 'OkPay账号已经存在',
  //     us: 'This OKPAY account has already existed.'
  // },


  NO_PERMISSION: {
    CODE: '105102',
    cn: '账号无权限',
    us: 'No permission',
    es: 'No hay permiso',
    hk: '賬號無權限'
  },
  ACCOUNT_LOCK: {
    CODE: '105100',
    cn: '您的帐号已经锁定，请重置您的登录密码</a>',
    us: 'Your account has been locked. Please reset your login password</a>.',
    es: 'Su cuenta ha sido bloqueada.Por favor reajuste su contraseña de login</a>',
    hk: '您的賬號已經鎖定，請重置您的登錄密碼</a>'
  },
  ACCOUNT_LOCK_MOBILE: {
    CODE: '105100',
    cn: '您的帐号已经锁定，请重置您的登录密码</a>',
    us: 'Your account has been locked. Please reset your login password</a>.',
    es: 'Su cuenta ha sido bloqueada.Por favor reajuste su contraseña de login</a>',
    hk: '您的賬號已經鎖定，請重置您的登錄密碼</a>'
  },

  NO_CAPTCHA: {
    CODE: '105104',
    cn: '请输入图形验证码',
    us: 'Please enter captcha code.',
    es: 'Por favor introduzca el código captcha.',
    hk: '請輸入圖形驗證碼'
  },

  CAPTCHA: {
    CODE: '109102',
    cn: '图形验证码错误，请重新输入',
    us: 'Incorrect captcha. Please retry.',
    es: 'Incorrecto CAPTCHA. Por favor vuelva a intentarlo.',
    hk: '圖形驗證碼錯誤，請重新輸入'
  },

  CAPTCHA_INVALID: {
    CODE: '109105',
    cn: '图形验证码已失效，请重新获取',
    us: 'Invalid captcha. Please retry.',
    es: 'Captcha no válido. Por favor reintentar.',
    hk: '圖形驗證碼已失效，請重新輸入'
  },

  // PHONE: {
  //     CODE: '104106',
  //     cn: '请输入正确的手机号码',
  //     us: 'Incorrect cellphone number format.',
  //     es: ''
  // },
  // PHONE_NOT_SUPPORT: {
  //     CODE: '104107',
  //     cn: '手机号不支持',
  //     us: 'This cellphone number is not supported.',
  //     es: ''
  // },


  EMAIL: {
    CODE: '104112',
    cn: '邮箱格式错误，请重新输入',
    us: 'Please enter the correct email address.',
    es: 'Por favor ingrese la dirección de correo electrónico correcta.',
    hk: '郵箱格式錯誤，請重新輸入'
  },
  EMAIL_PHONE: {
    CODE: '104112',
    cn: '账号格式错误，请重新输入',
    us: 'Please enter the correct email address or phone number.',
    es: 'Por favor ingrese la dirección de correo electrónico correcta.',
    hk: '賬號格式錯誤，請重新輸入'
  },

  GOOGLE_CODE: {
    CODE: '104121',
    cn: '请输入正确的谷歌验证码',
    us: 'Please enter the correct Google verification code.',
    es: 'Por favor escriba correctamente el Código de verificación de Google. ',
    hk: '請輸入正確的谷歌驗證碼'
  },

  IDENTIFY: {
    CODE: '109100',
    cn: '请输入正确的验证码',
    us: 'Please enter the correct verification code.',
    es: 'Por favor introduzca el código de verificación correcto. ',
    hk: '請輸入正確的驗證碼'
  },

  IDENTIFY_INVALID: {
    CODE: '109104',
    cn: '验证码已失效，请重新获取',
    us: 'Invalid verification code. Please retry.',
    es: 'Código de verificación no válido. Por favor vuelva a intentarlo.',
    hk: '驗證碼已失效，請重新獲取'
  },

  // IDENTIFY_EMAIL: {
  //     CODE: 109101,
  //     cn: '请输入正确的邮箱验证码',
  //     us: 'Please enter the correct email address'
  // },
  IDENTIFY_HAS_SEND: {
    CODE: '109103',
    cn: '验证码已发送',
    us: 'An email containing your verification code has been sent.',
    es: 'Se ha enviado un correo electrónico que contiene su código de verificación.',
    hk: '驗證碼已發送'
  },


  LOGIN_PWD: {
    CODE: '104103',
    cn: '密码错误，请重新输入',
    us: 'Please enter correct password.',
    es: 'Introduzca la dirección de correo o la contraseña correctas.',
    hk: '密碼錯誤，請重新輸入'
  },
  LOGIN_PWD_FORMAT: {
    CODE: '104104',
    cn: '邮箱号或密码错误，请重新输入',
    us: 'Please enter correct email address or password.',
    es: 'Introduzca la dirección de correo electrónico o la contraseña correctas.',
    hk: '郵箱或密碼錯誤，請重新輸入'
  },
  LOGIN_PWD_NOT_EQUAL: {
    CODE: '104105',
    cn: '2次密码输入不一致',
    us: `Password confirmation doesn't match Password.`,
    es: 'La confirmación de contraseña no coincide con la contraseña.',
    hk: '2次密碼輸入不一致'
  },
  // 在修改登录密码时使用
  LOGIN_PWD_ORIGIN: {
    CODE: '104114',
    cn: '原密码输入错误',
    us: 'Incorrect origin login password.',
    es: 'Incorrecta origen contraseña de inicio de sesión.',
    hk: '原密碼輸入錯誤'
  },


  HAS_NO_REGISTER: {
    CODE: '104102',
    cn: '该账户尚未注册，请先注册',
    us: 'This account no has not been signed up. Please change another one.',
    es: 'Esta dirección de correo electrónico no se ha registrado. Por favor, cambia otra',
    hk: '該郵賬戶未註冊,请先注册'
  },
  HAS_NO_REGISTER_MOBILE: {
    CODE: '104102',
    cn: '该邮箱尚未注册，请先注册',
    us: 'This email address has not been signed up. Please change another one.',
    es: 'Esta dirección de correo electrónico no se ha registrado. Por favor, cambia otra',
    hk: '該郵箱尚未註冊，请先注册'
  },

  HAS_REGISTER: {
    CODE: '104100',
    cn: '该邮箱已注册，请直接登录',
    us: 'This email has been signed up.',
    es: 'Este email ha sido registrado.',
    hk: '該郵箱已註冊，請直接登錄'
  },
  REGISTER_MORE_TIMES: {
    CODE: '104125',
    cn: '注册过于频繁，请稍后再试',
    us: 'Your registration is too frequent, please try again later.',
    es: 'Su registro es demasiado frecuente, por favor inténtelo de nuevo más tarde.',
    hk: '註冊過於頻繁，請稍後再試'
  },


  NO_AUTH: {
    CODE: '104109',
    cn: '请您先完成实名认证',
    us: 'No Authentication',
    es: 'Sin autenticación',
    hk: '請您先完成實名認證'
  },
  AUTH_ERROR: {
    CODE: '104110',
    cn: '身份信息有误，请重新输入',
    us: 'Incorrect verification information.',
    es: 'Información de verificación incorrecta.',
    hk: '身份信息有誤，請重新輸入'
  },


  PAY_PWD: {
    CODE: '104108',
    cn: '资金密码错误，请重新输入',
    us: 'Please enter correct asset password.',
    es: 'Introduzca la contraseña de activo correcta',
    hk: '資金密碼錯誤，請重新輸入'
  },
  PAY_PWD_FORMAT: {
    CODE: '104113',
    cn: '资金密码格式错误',
    us: 'Please enter correct asset password.',
    es: 'Introduzca la contraseña de activo correcta',
    hk: '資金密碼格式錯誤'
  },
  PAY_PWD_LOCK: {
    CODE: '105103',
    cn: '为保证您的资产安全，您的资金密码已被锁定，请重置密码',
    us: 'Your asset password has been locked. Please reset your asset password.',
    es: 'Su contraseña de activos ha sido bloqueada. Por favor, restablezca su contraseña de activos.',
    hk: '為保證您的資產安全，您的資金密碼已被鎖定，請重置密碼'
  },

  /*
   身份证错误 104111
   果仁不足 107100
   货币不足 107101
   每日转出金额操过限制 107102
   单笔最大转出金额 107103
   单笔最少转入金额 107104
   */
  ID_CARD_ERROR: {
    CODE: '104111',
    cn: '证件信息校验错误',
    us: 'Incorrect passport number.',
    es: 'Número de pasaporte incorrecto.',
    hk: '证件信息校驗錯誤'
  },

  /*
   该单已经撮合成功 102100
   该单已经取消 102101
   */
  ORDER_BIND_HAS_SUCCESS: {
    CODE: '101103',
    cn: '该订单已成交',
    us: 'The order has been completed.',
    es: 'La orden ha sido completada.',
    hk: '該訂單已成交'
  },
  ORDER_CANCEL: {
    CODE: '101104',
    cn: '该订单已撤销',
    us: 'The order has been canceled.',
    es: 'La orden ha sido cancelada.',
    hk: '該訂單已撤銷'
  },

  /*
   充值与提现相关——

   货币不足 107101
   每日转出金额操过限制 107102
   单笔最大转出金额 107103
   单笔最少转入金额 107104
   */
  CURRENCY_NOT_ENOUGH: {
    CODE: '114101',
    cn: '人民币余额不足',
    us: 'Insufficient Balance',
    es: 'Balance insuficiente',
    hk: '人民幣餘額不足'
  },
  COIN_ASSERT_LESS: {
    CODE: '114100',
    cn: '余额不足', // 这段提示没有用上
    us: 'Insufficient Balance',
    es: 'Balance insuficiente',
    hk: '餘額不足'
  },
  /*
   转账果仁确认状态错误：107107
   转账人民币确认状态错误：107108
   */
  AUTH_RESUBMIT: {
    CODE: '110001',
    cn: '审核中，请勿重复提交申请',
    us: 'Please do not resubmit',
    es: 'Por favor no vuelva a enviar',
    hk: '審核中，請勿重複提交申請'
  },


  // ======================== 后端控制 begin ========================
  /*
   挂单超出最高挂单金额 101108: 提示信息具体内容由后端控制
   挂单低于挂单金额 101110: 提示信息具体内容由后端控制
   */
  LIMIT_BUY_MAX: {
    CODE: '101108',
    cn: '当前允许最高限价买单价格: xxxx',
    us: '',
    es: ''
  },

  LIMIT_SELL_MIN: {
    CODE: '101110',
    cn: '当前允许最低限价卖单价格: xxxx',
    us: '',
    es: ''
  },

  LIMIT_DRAWOUT_MAX: {
    CODE: '107102',
    cn: '单日转出金额不得超过50000元',
    us: 'Withdrawal amount can\'t be more than 30,000 USD per day.',
    es: ''
  },
  LIMIT_ONE_DRAWOUT_MAX_CURRENCY: {
    CODE: '107103',
    cn: '单笔转出金额最大为50000元',
    us: 'Withdrawal amount can\'t be more than 5,000 USD at one time.',
    es: ''
  },
  LIMIT_ONE_DRAWOUT_MIN_CURRENCY: {
    CODE: '107104',
    cn: '单笔转出金额最小为10元',
    us: 'Withdrawal amount can\'t be less than 5 USD at one time.',
    es: ''
  },
  LIMIT_ONE_DRAWOUT_MAX_GOP: {
    CODE: '107105',
    cn: '单笔转出金额最大为5000元',
    us: 'USD withdrawal amount can\'t be more than 5,000 USD at one time.',
    es: ''
  },
  LIMIT_ONE_DRAWOUT_MIN_GOP: {
    CODE: '107106',
    cn: '单笔转出金额最小为5元',
    us: 'USD withdrawal amount can\'t be less than 5 USD at one time.',
    es: ''
  },
  // ======================== 后端控制 end ========================

  // C2C
  ADVERT_HAS_INVALID: {
    CODE: '115123',
    cn: '',
    us: 'USD withdrawal amount can\'t be less than 5 USD at one time.',
    es: '',
    hk: '該廣告已過期'
  },

  ADVERT_HAS_USED: {
    CODE: '115100',
    cn: '',
    us: 'USD withdrawal amount can\'t be less than 5 USD at one time.',
    es: '',
    hk: '該廣告已被購買'
  },

  NO_NICKNAME: {
    CODE: '115106',
    cn: '',
    us: '',
    es: '',
    hk: '用戶未設置暱稱'
  },

  NO_PHONE: {
    CODE: '115107',
    cn: '用户未设置手机号',
    us: '',
    es: '',
    hk: '用戶未設置手機號'
  },


  TRADE_NOT_OPEN: {
    CODE: '102103',
    cn: '交易暂未开放',
    us: 'This trading pair is temporarily un-available',
    es: '',
    hk: '交易暫未開放'
  },

  TRADE_CLOSE: {
    CODE: '102104',
    cn: '交易已关闭',
    us: 'This trading pair is closed',
    es: '',
    hk: '交易已關閉'
  }


};

window.CODE = CODE;

export default CODE;
