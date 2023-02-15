<template>
  <div
    class="node-card"
    :style="{ width: width, background: cardColor[note.imgurl] }"
  >
    <div class="top">
      <p class="time">{{ dataOne(note.moment) }}</p>
      <p class="label">{{ label[note.type][note.label] }}</p>
    </div>
    <p class="message">{{ note.message }}</p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon">
          <span class="iconfont icon-aixin1"></span>
          <span class="value">{{ note.like }}</span>
        </div>

        <div class="icon">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ note.comment }}</span>
        </div>
      </div>
      <div class="name">{{ note.name }}</div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { label, cardColor } from "@/utils/data";
import { dataOne } from "@/utils/mlsg";
defineProps({
  width: {
    default: "288px",
  },
  note: Object,
});
</script>

<style lang="less" scoped>
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
    }
  }
}
</style>
