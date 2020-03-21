export const REG_EMAIL = /@([a-zA-Z0-9]+[_|\_|\.\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/; //邮箱校验
export const REG_LOGPWD=/(?!^[0-9]{6,20}$)^[0-9A-Za-z\u0021-\u007e]{6,20}$/;  //登陆密码校验
export const REG_PAYPWD=/(?!^[0-9]{8,20}$)^[0-9A-Za-z\u0021-\u007e]{8,20}$/;  //资金密码校验
export const REG_URL = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
