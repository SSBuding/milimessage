<template>
  <div class="wall-message">
    <p class="title">{{ wallType[id].name }}</p>
    <p class="sologan">{{ wallType[id].slogan }}</p>
    <div class="label">
      <span
        class="label-list"
        :class="{ lbselected: nlabel == -1 }"
        @click="selectLabel(-1)"
      >
        全部
      </span>
      <span
        class="label-list"
        :class="{ lbselected: nlabel == index }"
        v-for="(e, index) in label[id]"
        :key="index"
        @click="selectLabel(index)"
      >
        {{ e }}
      </span>
    </div>
    <div class="card">
      <NodeCard></NodeCard>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { wallType, label } from "@/utils/data";
import NodeCard from "@/components/NodeCard.vue";
const id = ref(0);
const nlabel = ref(-1);
// 切换label
const selectLabel = (index) => {
  nlabel.value = index;
};
</script>

<style lang="less" scoped>
.wall-message {
  min-height: 700px;
  padding-top: 52px;
  .title {
    font-size: 56px;
    color: @gray-1;
    text-align: center;
    font-weight: 600;
    padding-top: 46px;
    padding-bottom: @padding-8;
  }
  .sologan {
    color: @gray-2;
    text-align: center;
  }
  .label {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    .label-list {
      display: flex;
      align-items: center;
      padding: 0 14px;
      height: 30px;
      margin: @padding-4;
      color: @gray-2;
      box-sizing: border-box;
      cursor: pointer;
    }
    .lbselected {
      color: @gray-1;
      font-weight: 600;
      border: 1px solid @gray-1;
      border-radius: 16px;
    }
  }
}
</style>
