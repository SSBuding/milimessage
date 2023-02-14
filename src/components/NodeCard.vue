<template>
  <div class="node-card" :style="{ width: width, background: background }">
    <div class="top">
      <p class="time">2022.07.12</p>
      <p class="label">ceshi</p>
    </div>
    <p class="message">这是测试段落，作为静态占位测试样式使用</p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon">
          <span class="iconfont icon-aixin1"></span>
          <span class="value">3</span>
        </div>

        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">3</span>
        </div>
      </div>
      <div class="name">米粒</div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
defineProps({
  width: {
    default: "288px",
  },
  background: {
    default: " rgba(252, 175, 162, 0.3)",
  },
});
</script>

<style lang="less" scoped>
@font-face {
  font-family: hanyi;
  src: url("@/assets/fonts/HYYanKaiW.ttf");
}
.node-card {
  height: 240px;
  padding: 10px 20px;
  box-sizing: border-box;
  position: relative;
  .top {
    display: flex;
    justify-content: space-between;
    padding-bottom: 16px;
    p {
      font-size: 12px;
      color: @gray-3;
    }
  }
  .message {
    height: 140px;
    font-size: 15px;
    font-family: hanyi;
    color: @gray-1;
    cursor: pointer;
  }
  .foot {
    display: flex;
    justify-content: space-between;
    position: absolute;
    bottom: 16px;
    left: 0;
    padding: 0 20px;
    box-sizing: border-box;
    width: 100%;
    .foot-left {
      display: flex;
      .value {
        font-size: @size-12;
        color: @gray-3;
        line-height: 16px;
        padding-left: @padding-4;
      }
      .iconfont {
        font-size: 16px;
        color: @gray-3;
      }
      .icon {
        padding-right: @padding-8;
        display: flex;
        align-items: center;
      }
      .icon-aixin1 {
        cursor: pointer;
        transition: @tr;
        &:hover {
          color: @like;
        }
      }
    }
    .name {
      font-family: hanyi;
      font-size: 17px;
      color: @gray-2;
      font-weight: 300;
    }
  }
}
</style>
