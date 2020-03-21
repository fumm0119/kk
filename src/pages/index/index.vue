<template>
  <section class="page index-page">
    <m-header>首页</m-header>
    <scroll class="mid-page" :probeType="probeType" :listenScroll="listenScroll">
      <div class="page-content">

      </div>
    </scroll>
    <m-nav></m-nav>

  </section>
</template>

<script>
  import MHeader from "../../components/m-header/m-header";
  import Scroll from "../../components/scroll/scroll";
  import MNav from "../../components/m-nav/m-nav";

  export default {
    name: "index",
    components: {MNav, Scroll, MHeader},
    data() {
      return {
        probeType:3,
        listenScroll:true
      }
    }
  }
</script>
<style src="./style.scss" lang="scss" scoped></style>
