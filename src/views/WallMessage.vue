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
        v-for="(e, index) in cards"
        :key="index"
        :note="e"
        class="card-inner"
        :class="{ cardSelected: index === cardSelected }"
        @to-detail="selectedCard(index)"
      ></NoteCard>
    </div>
    <div class="photo" v-show="id == 1">
      <!-- <PhotoCard
        :photo="e"
        class="photo-card"
        v-for="(e, index) in cards"
        :key="index"
        @click="selectedCard(index)"
      ></PhotoCard> -->
      <p>开发者遇到bug,正在努力修复中</p>
    </div>
    <!-- 卡片状态 -->
    <div class="none-msg" v-if="isOk === 0">
      <img :src="none[id].url" />
      <p>{{ none[id].msg }}</p>
    </div>
    <!-- loading动画 -->
    <div class="loading" v-show="isOk === -1">
      <div id="lottie"></div>
      <p>加载中...</p>
    </div>
    <!-- 没有更多 -->
    <p class="bottom-tip" v-show="isOk === 2">没有更多了...</p>

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
      <CardDetail v-else :note="cards[cardSelected]"></CardDetail>
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
import {
  ref,
  reactive,
  computed,
  onMounted,
  onUnmounted,
  watch,
  nextTick,
} from "vue";
import { wallType, label, none } from "@/utils/data";

import NoteCard from "@/components/NoteCard.vue";
import PhotoCard from "@/components/PhotoCard.vue";
import MlModal from "@/components/MlModal.vue";
import NewCard from "@/components/NewCard.vue";
import MlViewer from "@/components/MlViewer.vue";
import CardDetail from "@/components/CardDetail.vue";

import lottie from "lottie-web";
import loading from "@/assets/images/reveal-loading.json";
import { useRoute } from "vue-router";
import { useStore } from "@/store";

import { findWallPageApi } from "@/api";
const store = useStore();
const route = useRoute();

const cards = ref([]);
const page = ref(1);
const pagesize = ref(8);
// 是否加载中
const isOk = ref(-1);
// 留言墙和照片墙的切换id
const id = computed(() => {
  return route.query.id;
});
const user = computed(() => {
  return store.user;
});

const nlabel = ref(-1);
const addBottom = ref(30);
const selectLabel = (index) => {
  nlabel.value = index;
  cards.value = [];
  page.value = 1;
  getWallCard(id.value);
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
  if (scrollTop + clientHeight == scrollHeight) {
    getWallCard(id.value);
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
  //console.log(e);
  cards.value.unshift(e);
  changeModal();
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
// 获取卡片
const getWallCard = (id) => {
  if (page.value > 0) {
    isOk.value = -1;
    let data = {
      type: id,
      page: page.value,
      pagesize: pagesize.value,
      userId: user.id,
      label: nlabel.value,
    };
    findWallPageApi(data).then((res) => {
      cards.value = cards.value.concat(res.message);
      if (res.message.length) {
        page.value++;
      } else {
        page.value = 0;
      }
      setTimeout(() => {
        if (cards.value.length > 0) {
          isOk.value = 1;
          if (page.value == 0) {
            isOk.value = 2;
          }
        } else {
          isOk.value = 0;
        }
      }, 10);

      if (id == 1) {
        for (let i = 0; i < cards.value.length; i++) {
          photoArr.push(cards.value[i].imgurl);
        }
      }
    });
  }
};
const getUser = () => {
  let timer = setInterval(() => {
    if (user.value) {
      clearInterval(timer);
      getWallCard(id.value);
    }
  }, 10);
};

const loadingHandle = () => {
  if (isOk.value === -1) {
    nextTick(async () => {
      let params1 = {
        container: document.getElementById("lottie"),
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: loading,
      };
      lottie.loadAnimation(params1);
    });
  }
};

onMounted(() => {
  window.addEventListener("scroll", scrollBottom);

  loadingHandle();
  getUser();
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
  .none-msg {
    width: 100%;
    text-align: center;
    padding-top: 80px;
    position: absolute;
    top: 280px;
    img {
      display: inline;
    }
    p {
      font-family: serif;
      font-weight: 700;
      font-size: 24px;
      color: @gray-3;
    }
  }
  .loading {
    text-align: center;
    width: 100%;
    p {
      margin-top: -10px;
      font-family: serif;
      font-size: 24px;
      color: @gray-3;
    }
  }
  #lottie {
    margin-top: 20px;
    height: 200px;
  }

  .bottom-tip {
    text-align: center;
    color: @gray-3;
    padding: 20px;
  }
}
</style>
