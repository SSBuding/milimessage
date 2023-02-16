<template>
  <div class="top-bar">
    <div class="logo">
      <img src="@/assets/images/mlsg.svg" class="logo-img" />
      <p class="logo-name">米粒时光</p>
    </div>
    <div class="menu">
      <MlButton nom="cprimary" class="menu-message">留言墙</MlButton>
      <MlButton nom="csecondary" class="menu-photo">照片墙</MlButton>
    </div>
    <div class="user">
      <div class="user-head"></div>
    </div>
  </div>
</template>

<script setup>
import MlButton from "./MlButton.vue";
</script>

<style lang="less" scoped>
.menu {
  .menu-message {
    margin-right: 24px;
  }
}
.top-bar {
  width: 100%;
  height: 52px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  box-sizing: border-box;
  padding: 0 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .logo {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 200px;
  }
  .logo-name {
    font-size: 20px;
    color: @gray-1;
    font-weight: 600;
    padding-left: 10px;
    font-family: hanyi;
  }
  .user {
    width: 200px;
    .user-head {
      float: right;
      border-radius: 50%;
      height: 36px;
      width: 36px;
      background-image: linear-gradient(180deg, #7be7ff 2%, #1e85e2);
    }
  }
}
</style>
