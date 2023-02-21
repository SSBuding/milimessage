<template>
  <div class="ml-photo-card">
    <!-- <img :src="getAssetsFile(`${photo.imgurl}.png`)" alt="" class="photo-img" /> -->
    <img :src="baseUrl + photo.imgurl" alt="" class="photo-img" />
    <div class="photo bg" @click="toDetail"></div>
    <div class="photo-like">
      <span
        class="iconfont icon-aixin1"
        @click="clickLike"
        :class="{ islike: photo.like[0].count > 0 }"
      ></span>
      <span class="like-data">{{ photo.like[0].count }}</span>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
//import { label, cardColor } from "@/utils/data";
// import { getAssetsFile } from "@/utils/imgurl";
import { baseUrl } from "@/utils/env";
import { insertFeedbackApi } from "@/api";
import { useStore } from "@/store";
const store = useStore();
const user = store.user;
const props = defineProps({
  photo: {
    default: {},
  },
});
const emit = defineEmits(["to-detail"]);
const toDetail = () => {
  emit("to-detail");
};
const clickLike = () => {
  if (props.photo.islike[0].count == 0) {
    let data = {
      wallId: props.photo.id,
      userId: user.id,
      type: 0,
      moment: new Date(),
    };
    insertFeedbackApi(data).then(() => {
      props.photo.like[0].count++;
      props.photo.islike[0].count++;
    });
  }
};
</script>

<style lang="less" scoped>
.ml-photo-card {
  position: relative;
  .photo-img {
    width: 100%;
  }
  .photo-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: raba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    opacity: 0;
    transition: @tr;
  }
  .photo-like {
    position: absolute;
    left: @padding-8;
    top: @padding-8;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 20px;
    height: 28px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    backdrop-filter: blur(10px);
    opacity: 0;
    transition: @tr;
    cursor: pointer;
    .icon-aixin1 {
      color: @gray-3;
      padding-right: @padding-4;
    }
    .like-data {
      color: @gray-1;
    }
  }
  &:hover {
    .photo-bg {
      opacity: 1;
    }
    .photo-like {
      opacity: 1;
    }
  }
  .islike {
    color: @like;
  }
}
</style>
