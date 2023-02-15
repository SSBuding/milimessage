<template>
  <Transition name="modal">
    <div class="ml-modal" v-if="isModal">
      <div class="ml-modal-head">
        <p class="modal-name">{{ title }}</p>
        <span class="iconfont icon-guanbi" @click="closeModal"></span>
      </div>
      <div class="ml-modal-main">
        <slot></slot>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
defineProps({
  title: {
    default: "标题",
  },
  isModal: {
    default: false,
  },
});
const emit = defineEmits(["change-modal"]);
const closeModal = () => {
  emit("change-modal");
};
</script>

<style lang="less" scoped>
.modal {
  &-enter {
    &-from {
      transform: translateX(360px);
    }
    &-active {
      transition: @tr ease-out;
    }
    &-to {
      transform: translateX(0px);
    }
  }
  &-leave {
    &-from {
      transform: translateX(0px);
    }
    &-active {
      transition: @tr ease-in;
    }
    &-to {
      transform: translateX(360px);
    }
  }
}
.ml-modal {
  width: 360px;
  height: 100%;
  position: fixed;
  right: 0;
  top: 52px;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(20px);

  .ml-modal-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: @padding-20;
    box-sizing: border-box;
    .modal-name {
      font-size: 16px;
      color: @gray-1;
      font-weight: 600;
    }
    .icon-guanbi {
      color: @gray-2;
      cursor: pointer;
      padding-left: 8px;
    }
  }
  .ml-modal-main {
    height: 80%;
    overflow-y: auto;
    overflow-x: auto;
    padding-bottom: 116px;
    box-sizing: border-box;
    margin: 2px;

    &::-webkit-scrollbar {
      // 滚动条整体样式
      width: 4px;
      height: 4px;
    }
    &::-webkit-scrollbar-thumb {
      // 滚动条里小方块
      border-radius: 4px;
      background: rgba(0, 0, 0, 0.2);
    }
    &::-webkit-scrollbar-track {
      // 滚动条里轨道
      border-radius: 4px;
      background: rgba(0, 0, 0, 0);
    }
  }
}
</style>
