<template>
  <div class="wall-index">
    <TopBar></TopBar>
    <!-- <video
      src="@/assets/images/qm1.mp4"
      autoplay
      muted
      loop
      class="bg-video"
    ></video> -->
    <RouterView></RouterView>
  </div>
</template>
<script setup>
import TopBar from "@/components/TopBar.vue";
</script>
<style lang="less" scoped>
.wall-index {
  // .bg-video {
  //   height: 800px;
  //   position: fixed;
  //   top: 0;
  //   left: 0;
  //   z-index: 0;
  // }
}
</style>
