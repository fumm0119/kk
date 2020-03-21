<template>
  <div class="m-nav">
    <ul>
      <li v-for="item in navList" @click.stop.prevent="changePage(item.page)">
        <div class="top">
          <img :src="item.img_active" width="18" v-if="item.page == current_page">
          <img :src="item.img_default" width="18" v-else>
        </div>
        <div class="title" :class="{'active': item.page == current_page}">{{item.title}}</div>
      </li>

    </ul>
  </div>
</template>

<script>
  import home_default from './img/home_default.png'

  export default {
    name: "m-nav",
    data() {
      return {
        navList: [
          {
            page:'index',
            title: '首页',
            img_default: home_default,
            img_active: home_default
          }, {
            page:'financial',
            title: '币生币',
            img_default: home_default,
            img_active: home_default
          }, {
            page:'assets',
            title: '资产',
            img_default: home_default,
            img_active: home_default
          }, {
            page:'account',
            title: '我的',
            img_default: home_default,
            img_active: home_default
          }
        ],
        current_page:'index'
      }
    },
    methods:{
      changePage(page){
        this.current_page = page;
        this.$router.push(`/${page}`).catch(err=>{});

      }
    }
  }
</script>

<style scoped lang="scss">
  .m-nav {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: $white;
    height: 45px;
    ul {
      display: flex;
      align-items: center;
      li {
        flex:1;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding-top: 4px;
        line-height: 1.4;
        .title {
          color: $text;
          font-weight: bold;
          &.active {
            color:$text-active;
          }
        }
      }
    }
  }

</style>
