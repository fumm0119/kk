<template>
  <section class="page assets-page">
    <scroll class="top-page">
      <div class="page-content">
        资产页面
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
      }
    }
  }
</script>
<style src="./style.scss" lang="scss" scoped></style>

