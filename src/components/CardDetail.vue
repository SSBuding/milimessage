<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">要墙主撕下该便签</p>
      <p class="report">举报</p>
    </div>
    <NoteCard :note="note"></NoteCard>
    <div class="form">
      <textarea class="message" placeholder="请输入..."></textarea>
      <div class="bt">
        <input type="text" class="name" placeholder="签名" />
        <MlButton>评论</MlButton>
      </div>
    </div>
    <p class="title">评论{{ note.comment }}</p>
    <div class="comment">
      <div class="comment-li" v-for="(e, index) in data" :key="index">
        <div
          class="user-head"
          :style="{ backgroundImage: portrait[e.imgurl] }"
        ></div>
        <div class="com-m">
          <div class="m-top">
            <p class="m-name">{{ e.name }}</p>
            <p class="m-time">{{ dataOne(e.moment) }}</p>
          </div>
          <div class="mm">{{ e.message }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NoteCard from "./NoteCard.vue";
import MlButton from "./MlButton.vue";
import { comment } from "../../mock";
import { portrait } from "@/utils/data";
import { dataOne } from "@/utils/mlsg";
const { data } = comment;
defineProps({
  note: {
    default: {},
  },
});
</script>

<style lang="less" scoped>
.card-detail {
  position: relative;
  padding: 0 @padding-20;
  .top-bt {
    position: fixed;
    top: 0;
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
}
</style>
