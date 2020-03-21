<template>
  <section class="page assets-page">
    <m-header>资产</m-header>
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
    name: "assets",
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

