<template>
  <div class="account-page">
    <scroll class="top-page">
      <section class="content">
        <div class="user-info">
          <div class="user-avatar">头像</div>
          <div class="user-righ-status">
            <div class="login" v-if="isLogin">已登录状态</div>
            <div class="no-login" v-else>未登录状态</div>
          </div>

        </div>

      </section>
    </scroll>
    <m-nav></m-nav>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import MNav from "../../components/m-nav/m-nav";
  import lib from '../../common/util/lib'
  export default {
    name: "account",
    components: {MNav, Scroll},
    data() {
      return {

      }
    },
    computed: {
      isLogin() {
        return lib.isLogin()
      }
    },

    methods: {

    }
  }
</script>
<style lang="scss">
  @import './style.scss';
</style>

