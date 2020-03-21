<template>
  <div class="account-page">
    <scroll class="top-page">
      <section class="content">
        中间的内容
      </section>
    </scroll>
    <m-nav></m-nav>
  </div>
</template>

<script>
  import Scroll from "../../components/scroll/scroll";
  import MNav from "../../components/m-nav/m-nav";
  export default {
    name: "account",
    components: {MNav, Scroll}
  }
</script>

