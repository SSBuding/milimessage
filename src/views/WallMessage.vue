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
      <NoteCard
        v-for="(_, index) in data"
        :key="index"
        :note="_"
        class="card-inner"
      ></NoteCard>
    </div>
    <div
      class="add"
      :style="{ bottom: addBottom + 'px' }"
      @click="changeModal"
      v-show="!modal"
    >
      <span class="iconfont icon-tianjia"> </span>
    </div>
    <MlModal :title="title" :isModal="modal" @change-modal="changeModal">
      <NewCard :id="id"></NewCard>
    </MlModal>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { ref, onMounted, onUnmounted } from "vue";
import { wallType, label } from "@/utils/data";
import NoteCard from "@/components/NoteCard.vue";
import MlModal from "@/components/MlModal.vue";
import NewCard from "@/components/NewCard.vue";
import { note } from "../../mock/index";

const { data } = note;
let title = "写留言";
const id = ref(0);
const nlabel = ref(-1);
const addBottom = ref(30);
const selectLabel = (index) => {
  nlabel.value = index;
};
//监听页面滚动
function scrollBottom() {
  // 距离顶部高度
  let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  // 屏幕高度
  let clientHeight = document.documentElement.clientHeight;
  // 内容高度
  let scrollHeight = document.documentElement.scrollHeight;
  // 230为footbar+30
  if (scrollTop + clientHeight + 230 >= scrollHeight) {
    addBottom.value = scrollTop + clientHeight + 230 - scrollHeight;
  } else {
    addBottom.value = 30;
  }
}
// 切换弹窗
let modal = ref(false);
const changeModal = () => {
  modal.value = !modal.value;
};
onMounted(() => {
  window.addEventListener("scroll", scrollBottom);
});
onUnmounted(() => {
  window.removeEventListener("scroll", scrollBottom);
});
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
  .card {
    // display: flex;
    // flex-wrap: wrap;
    // padding-top: 28px;
    // justify-content: center;
    display: grid;
    padding-top: 28px;
    grid-template-columns: repeat(auto-fill, 300px);
    gap: 12px 6px;
    justify-content: center;
    align-items: center;
    //border: 1px solid #bfa;
    padding-left: 56px;
    padding-right: 56px;
    .card-inner {
      justify-self: center;
      //align-self: center;
    }
  }
  .add {
    width: 56px;
    height: 56px;
    background: @gray-1;
    box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.08);
    border-radius: 28px;
    position: fixed;
    right: 30px;

    display: flex;
    justify-content: center;
    align-items: center;
    transition: @tr;
    .icon-tianjia {
      color: @gray-10;
      font-size: 24px;
    }
  }
}
</style>
