<template>
  <div class="wall-index">
    <TopBar></TopBar>
    <video
      src="@/assets/images/qm1.mp4"
      autoplay
      muted
      loop
      class="bg-video"
    ></video>
    <RouterView></RouterView>
    <FootBar></FootBar>
  </div>
</template>
<script setup>
import TopBar from "@/components/TopBar.vue";
import FootBar from "@/components/FootBar.vue";

import { signIpApi } from "@/api";
import { onMounted } from "vue";
import { useStore } from "@/store";
const store = useStore();
const getUser = () => {
  signIpApi().then((res) => {
    // console.log(res);
    const user = {
      id: res.ip,
    };
    store.getUser(user);
  });
};

onMounted(() => getUser());
</script>

<style lang="less" scoped>
.wall-index {
  .bg-video {
    height: 1000px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: -1;
  }
}
</style>
