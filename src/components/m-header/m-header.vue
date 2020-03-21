<template>
  <header class="m-header">
    <div class="return">
      <img src="../../images/arrow_left_black.png" width="28">
    </div>
    <div class="right">
      <slot></slot>
    </div>
  </header>

</template>

<script>
  export default {
    name: "m-header"
  }
</script>

<style scoped lang="scss">
  .m-header {
    position: fixed;
    top:0;
    left:0;
    right:0;
    height: 44px;
    background:$white;
    z-index: 100;
    display: flex;
    align-items: center;
    .return {
      position: absolute;
      left:15px;
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      font-size: 17px;
    }
  }

</style>
