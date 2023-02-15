<template>
  <div class="new-card">
    <div class="colors">
      <p
        class="color-li"
        v-for="(e, index) in cardColor1"
        :key="index"
        :style="{ background: e }"
      ></p>
    </div>
    <div class="card-main">
      <textarea placeholder="留言..." class="message" maxlength="96"></textarea>
      <input type="text" placeholder="签名" class="name" />
    </div>
  </div>
</template>

<script setup>
import { cardColor, cardColor1 } from "@/utils/data";
</script>

<style lang="less" scoped>
.new-card {
  padding: 0 18px;
  .colors {
    height: 36px;
    display: flex;
    justify-content: start;
    align-items: center;
    padding: 10px 0;
    .color-li {
      box-sizing: border-box;
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      //float: left;
    }
    .color-selected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }
  .card-main {
    width: 100%;
    height: 240px;
    background: rgba(252, 175, 162, 0.31);
    padding: 12px;
    box-sizing: border-box;
    .message {
      background: none;
      border: none;
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      height: 172px;
      width: 100%;
      font-family: hanyi;
      font-size: 15px;
    }
    .name {
      font-family: hanyi;
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      line-height: 20px;
      border: #fff 1px solid;
    }
  }
}
</style>
