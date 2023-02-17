<template>
  <div class="ml-viewer">
    <div class="bg"></div>
    <div class="viewer-photo">
      <img :src="getAssetsFile('1.png')" />
    </div>
    <div class="switch sw-left">
      <span class="iconfont icon-xiangzuo"></span>
    </div>
    <div class="switch sw-right">
      <span class="iconfont icon-xiangyou"></span>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { getAssetsFile } from "@/utils/imgurl";
</script>

<style lang="less" scoped>
.ml-viewer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .bg {
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(20px);
    width: 100%;
    height: 100%;
  }
  .viewer-photo {
    position: absolute;
    padding: 82px 454px 0 96px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      max-width: 100%;
    }
  }
  .switch {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: @gray-3;
    color: @gray-10;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.5;
    transition: @tr;
    cursor: pointer;
    .iconfont {
      font-size: 24px;
    }
    &:hover {
      opacity: 1;
    }
  }
  .sw-left {
    left: 20px;
  }
  .sw-right {
    right: 380px;
  }
}
</style>
