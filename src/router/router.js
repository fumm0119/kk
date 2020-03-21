import Vue from 'vue'
import Router from 'vue-router'
//首页
import Index from '../pages/index/index';
//币生币
import Financial from '../pages/financial/financial';
//资产
import Assets from '../pages/assets/assets';
//我的
import Account from '../pages/account/account';

//登陆
import Login from '../pages/login/login'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index
    }, {
      path: '/financial',
      component: Financial,
    }, {
      path: '/assets',
      component: Assets
    }, {
      path: '/account',
      component: Account
    }, {
      path:'/login',
      component: Login
    }
  ]
})
