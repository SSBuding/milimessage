<template>
  <div
    class="node-card"
    :style="{ width: width, background: cardColor[note.color] }"
  >
    <div class="top">
      <p class="time">{{ dataOne(note.moment) }}</p>

      <p class="label">{{ label[note.type][note.label] }}</p>
    </div>
    <p class="message" @click="toDetail">{{ note.message }}</p>
    <div class="foot">
      <div class="foot-left">
        <div class="icon" @click="clickLike">
          <span
            class="iconfont icon-aixin1"
            :class="{ islike: note.like[0].count > 0 }"
          ></span>
          <span class="value">{{ note.like[0].count }}</span>
        </div>

        <div class="icon" v-show="note.comcount[0].count > 0">
          <span class="iconfont icon-liuyan"></span>
          <span class="value">{{ note.comcount[0].count }}</span>
        </div>
      </div>
      <div class="name">{{ note.name }}</div>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { insertFeedbackApi } from "@/api";
import { label, cardColor } from "@/utils/data";
import { dataOne } from "@/utils/mlsg";
// import { onMounted } from "vue";
import { useStore } from "@/store";
const store = useStore();
const props = defineProps({
  width: {
    default: "288px",
  },
  note: {
    default: {},
  },
});
const user = store.user;

const emit = defineEmits(["to-detail"]);
const toDetail = () => {
  emit("to-detail");
};

const clickLike = () => {
  if (props.note.islike[0].count == 0) {
    let data = {
      wallId: props.note.id,
      userId: user.id,
      type: 0,
      moment: new Date(),
    };
    insertFeedbackApi(data).then(() => {
      props.note.like[0].count++;
      props.note.islike[0].count++;
    });
  }
};
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
      .islike {
        color: @like;
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
