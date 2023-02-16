<template>
  <div class="card-detail">
    <div class="top-bt">
      <p class="revoke">要墙主撕下该便签</p>
      <p class="report">举报</p>
    </div>
    <NoteCard :note="card"></NoteCard>
  </div>
</template>

<script setup>
import NoteCard from "./NoteCard.vue";
defineProps({
  card: {
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
}
</style>
