<!--
 * new page
 * @author: Bu_ding
 * @since: 2023-02-20
 * MlMessage.vue
-->
<template>
  <Transition name="down">
    <div class="ml-message" v-if="isShow">
      <div class="ml-m-i">
        <i class="iconfont" :class="style[type].icon"></i>
        <span class="text">{{ message }}</span>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { onMounted, ref } from "vue";
defineProps({
  message: {
    type: String,
    default: "",
  },
  type: {
    type: String,
    default: " warning",
  },
});

const style = {
  warning: {
    icon: "icon-warning",
  },
  error: {
    icon: "icon-error",
  },
  success: {
    icon: "icon-success",
  },
};

const isShow = ref(false);
onMounted(() => {
  isShow.value = true;
  setTimeout(() => {
    isShow.value = false;
  }, 3000);
});
</script>

<style lang="less" scoped>
.down {
  &-enter {
    &-from {
      transform: translateY(-30px);
      opacity: 0;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(0px);
      opacity: 1;
    }
  }

  &-leave {
    &-from {
      transform: translateY(0px);
      opacity: 1;
    }
    &-active {
      transition: all 0.3s;
    }
    &-to {
      transform: translateY(-30px);
      opacity: 0;
    }
  }
}
.ml-message {
  width: 100%;
  height: 40px;
  position: fixed;
  z-index: 9999;
  top: 20px;
  line-height: 40px;
  display: flex;
  justify-content: center;
  .ml-m-i {
    padding: 0 20ox;
    border-radius: 4px;
    color: @gray-1;
    background: @gray-10;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  }
  i {
    margin-right: 6px;
    vertical-align: middle;
  }
  .text {
    vertical-align: middle;
  }
}
.icon-success {
  color: @primary-color;
}
.icon-warning {
  color: @warning-color;
}
.icon-error {
  color: @error-color;
}
</style>
