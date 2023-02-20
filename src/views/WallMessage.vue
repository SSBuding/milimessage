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
    <div class="card" v-show="id == 0">
      <NoteCard
        v-for="(e, index) in data"
        :key="index"
        :note="e"
        class="card-inner"
        :class="{ cardSelected: index === cardSelected }"
        @click="selectedCard(index)"
      ></NoteCard>
    </div>
    <div class="photo" v-show="id == 1">
      <PhotoCard
        :photo="e"
        class="photo-card"
        v-for="(e, index) in photo.data"
        :key="index"
        @click="selectedCard(index)"
      ></PhotoCard>
    </div>
    <div
      class="add"
      :style="{ bottom: addBottom + 'px' }"
      @click="addCard"
      v-show="!modal"
    >
      <span class="iconfont icon-tianjia"> </span>
    </div>
    <MlModal :title="title" :isModal="modal" @change-modal="changeModal">
      <NewCard
        :id="id"
        @change-modal="changeModal"
        v-if="cardSelected === -1"
        @click-bt="clickBt"
      ></NewCard>
      <CardDetail v-else :note="data[cardSelected]"></CardDetail>
    </MlModal>
    <MlViewer
      :isView="view"
      :photos="photoArr"
      :nowNumber="cardSelected"
      @view-switch="viewSwitch"
    ></MlViewer>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { ref, reactive, computed, onMounted, onUnmounted, watch } from "vue";
import { wallType, label } from "@/utils/data";
// import { getAssetsFile } from "@/utils/imgurl";
import NoteCard from "@/components/NoteCard.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import MlModal from "@/components/MlModal.vue";
import NewCard from "@/components/NewCard.vue";
import MlViewer from "@/components/MlViewer.vue";
import CardDetail from "@/components/CardDetail.vue";
import { note, photo } from "../../mock/index";
import { useRoute } from "vue-router";
const route = useRoute();

// 留言墙和照片墙的切换id
const id = computed(() => {
  return route.query.id;
});
const { data } = note;

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
const title = ref("写留言");
// 图片预览
const view = ref(false);
// 新建留言
const addCard = () => {
  title.value = "写留言";
  cardSelected.value = -1;
  modal.value = true;
};
// 切换弹窗
let modal = ref(false);
const changeModal = () => {
  modal.value = false;
  if (id.value == 1) {
    view.value = false;
  }
};
const clickBt = (e) => {
  console.log(e);
};
// 选择卡片
const cardSelected = ref(-1);
const selectedCard = (index) => {
  title.value = "详情";
  if (cardSelected.value === index) {
    cardSelected.value = -1;
    modal.value = false;
    if (id.value == 1) {
      view.value = false;
    }
  } else {
    cardSelected.value = index;
    modal.value = true;
    if (id.value == 1) {
      view.value = true;
    }
  }
};
const photoArr = reactive([]);
const getPhoto = () => {
  for (let i = 0; i < photo.data.length; i++) {
    photoArr.push(photo.data[i].imgurl);
  }
};
const viewSwitch = (e) => {
  if (e == 0) {
    cardSelected.value--;
  } else {
    cardSelected.value++;
  }
};
watch(id, () => {
  modal.value = false;
  nlabel.value = -1;
  view.value = false;
  cardSelected.value = -1;
});
onMounted(() => {
  window.addEventListener("scroll", scrollBottom);
  getPhoto();
  //
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
    padding-top: 8px;
    color: @gray-2;
    text-align: center;
    font-family: hanyi;
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
      font-family: hanyi;
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
      margin: 6px;
      //align-self: center;
    }
    .cardSelected {
      border: 1px solid @primary-color;
    }
  }
  .photo {
    width: 88%;
    margin: 0 auto;
    columns: 6;
    column-gap: @padding-4;
    padding-top: 28px;
  }
  .photo-card {
    //width: 200px;
    margin-top: @padding-4;
    // break-inside: avoid;
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
