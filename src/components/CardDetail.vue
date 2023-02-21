<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">要墙主撕下该便签</p>
      <p class="report">举报</p>
    </div>
    <NoteCard :note="note"></NoteCard>
    <div class="form">
      <textarea
        class="message"
        placeholder="请输入..."
        v-model="message"
      ></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" v-model="name" />
        <MlButton :class="{ notAllowed: !isDis }" @click="submit"
          >发布</MlButton
        >
      </div>
    </div>
    <p class="title">评论{{ note.comcount[0].count }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(e, index) in comments" :key="index">
        <div
          class="user-head"
          :style="{ backgroundImage: portrait[e.imgurl] }"
        ></div>
        <div class="com-m">
          <div class="m-top">
            <p class="m-name">{{ e.name }}</p>
            <p class="m-time">{{ dataOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.comment }}</div>
        </div>
      </div>
      <p class="more" @click="getComment" v-show="nowPage > 0">加载更多</p>
    </div>
  </div>
</template>

<script setup>
import NoteCard from "./NoteCard.vue";
import MlButton from "./MlButton.vue";

import { portrait } from "@/utils/data";
import { dataOne } from "@/utils/mlsg";

import { computed, ref, onMounted, inject, watch } from "vue";
import { useStore } from "@/store";
import { insertCommentApi, findCommentPageApi } from "@/api";

const $message = inject("$message");
const store = useStore();
const user = store.user;
const comments = ref([]);
const nowPage = ref(1);
const pagesize = ref(8);
const props = defineProps({
  note: {
    default: {},
  },
});
const name = ref("匿名");
const message = ref("");

const isDis = computed(() => {
  if (message.value && name.value) {
    return true;
  } else {
    return false;
  }
});

const submit = () => {
  if (isDis) {
    let img = Math.floor(Math.random() * 14);

    let data = {
      wallId: props.note.id,
      userId: user.id,
      imgurl: img,
      moment: new Date(),
      name: name.value,
      comment: message.value,
    };
    insertCommentApi(data).then(() => {
      comments.value.unshift(data);
      props.note.comcount[0].count++;
      message.value = "";
    });
    $message({ type: "success", message: "发布成功" });
  }
};

// 获取评论
const getComment = () => {
  if (pagesize.value > 0) {
    let data = {
      id: props.note.id,
      page: nowPage.value,
      pagesize: pagesize.value,
    };
    findCommentPageApi(data).then((res) => {
      comments.value = comments.value.concat(res.message);

      if (res.message.length == pagesize.value) {
        nowPage.value++;
      } else {
        nowPage.value = 0;
      }
    });
  }
};
watch(
  () => props.note,
  () => {
    nowPage.value = 1;
    comments.value = [];
    getComment();
  }
);
onMounted(() => {
  getComment();
});
</script>

<style lang="less" scoped>
.card-detail {
  position: relative;
  padding: @padding-20;
  .top-bt {
    position: fixed;
    top: 30px;
    left: 0;
    padding: @padding-20;
    display: flex;
    .revoke {
      color: @primary-color;
      cursor: pointer;
      padding-right: 30px;
      font-size: @size-16;
    }
    .report {
      font-size: @size-16;
      color: @warning-color;
      cursor: pointer;
    }
  }

  .form {
    .message {
      background: none;
      border: 1px solid rgba(148, 148, 148, 1);
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      height: 56px;
      width: 100%;
      margin-top: @padding-12;
    }
    .bt {
      display: flex;
      padding-top: 6px;
      justify-content: space-between;
      align-items: center;
    }
    .name {
      width: 200px;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      line-height: 20px;

      border: 1px solid rgba(148, 148, 148, 1);
    }
  }
  .title {
    font-weight: 600;
    padding-top: 30px;
    padding-bottom: 20px;
  }
  .comment-li {
    display: flex;
    padding-bottom: 30px;
    .user-head {
      flex: none;
      width: 28px;
      height: 28px;
      border-radius: 20px;
      overflow: hidden;
    }
    .com-m {
      padding-left: @padding-8;
    }
    .m-top {
      display: flex;
      align-items: center;
      .m-name {
        font-weight: 600;
      }
      .m-time {
        font-size: @size-12;
        padding-left: 4px;
        color: @gray-3;
      }
    }
    .mm {
      padding-top: @padding-4;
    }
  }
  .more {
    color: @gray-2;
    text-align: center;
    cursor: pointer;
    margin: 20px;
  }
}
</style>
