<template>
  <div class="financial-page">
    <scroll class="top-page">
      <section class="content">
        理财页面
      </section>
    </scroll>
    <m-nav></m-nav>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import MNav from "../../components/m-nav/m-nav";
  export default {
    name: "financial",
    components: {MNav, Scroll}
  }
</script>


