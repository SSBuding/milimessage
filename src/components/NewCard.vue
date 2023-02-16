<template>
  <div class="new-card">
    <div class="colors">
      <p
        class="color-li"
        v-for="(e, index) in cardColor1"
        :key="index"
        :style="{ background: e }"
        :class="{ colorSelected: index == colorSelected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <div class="card-main" :style="{ background: cardColor[colorSelected] }">
      <textarea
        placeholder="留言..."
        class="message"
        maxlength="96"
        v-model="message"
      ></textarea>
      <input type="text" placeholder="签名" class="name" v-model="name" />
    </div>
    <div class="labels">
      <p class="title">选择标签</p>
      <div class="label">
        <p
          v-for="(e, index) in label[id]"
          :key="index"
          class="label-li"
          :class="{ labelSelected: index == labelSelected }"
          @click="changeLabel(index)"
        >
          {{ e }}
        </p>
      </div>
    </div>
    <div>
      <p class="title">免责声明</p>
      <p class="mzsm">
        一刻时光是本人独自开发的，为便于与用户交流的留言平台。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
        1、反对宪法所确定的基本原则的;<br />
        2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家 统一的;<br />
        3、损害国家荣誉和利益的； 4、煽动民族仇恨、民族歧视，破坏民族团结的;<br />
        5、破坏国家宗教政策，宣扬邪教和封建迷信的;<br />
        6、散布谣言，扰乱社会秩序，破坏社会稳定的;<br />
        7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的;<br />
        8、侮辱或者诽谤他人，侵害他人合法权益的;<br />
        9、含有法律、行政法规禁止的其他内容的信息。
      </p>
    </div>
    <div class="footbt">
      <MlButton size="max" nom="secondary" @click="closeModal">丢弃</MlButton>
      <MlButton size="max" class="submit">确定</MlButton>
    </div>
  </div>
</template>

<script setup>
import { cardColor, cardColor1, label } from "@/utils/data";
import MlButton from "./MlButton.vue";
import { ref } from "vue";
defineProps({
  id: {
    defualt: 0,
  },
});
const colorSelected = ref(0);
const changeColor = (index) => {
  colorSelected.value = index;
};
const labelSelected = ref(0);
const changeLabel = (index) => {
  labelSelected.value = index;
};
// 留言信息
const message = ref("");
// 签名
const name = ref("");
const emit = defineEmits(["change-modal"]);
const closeModal = () => {
  emit("change-modal");
};
</script>

<style lang="less" scoped>
.new-card {
  padding: 0 18px 100px;
  position: relative;
  .colors {
    display: flex;
    justify-content: start;
    align-items: center;
    padding-bottom: @padding-12;
    .color-li {
      box-sizing: border-box;
      width: 24px;
      height: 24px;
      margin-right: @padding-8;
      cursor: pointer;
      transition: @tr;
      //float: left;
    }
    .colorSelected {
      border: 1px solid rgba(59, 115, 240, 1);
    }
  }
  .card-main {
    width: 100%;
    height: 240px;

    padding: 12px;
    box-sizing: border-box;
    transition: @tr;
    .message {
      background: none;
      border: none;
      resize: none;
      padding: @padding-8;
      box-sizing: border-box;
      height: 172px;
      width: 100%;
      font-family: hanyi;
      font-size: 15px;
    }
    .name {
      font-family: hanyi;
      font-size: 15px;
      width: 100%;
      box-sizing: border-box;
      padding: @padding-8;
      background: none;
      line-height: 20px;
      border: #fff 1px solid;
    }
  }
  .title {
    font-weight: 600;
    padding-top: 30px;
    color: @gray-1;
    padding-bottom: 12px;
  }
  .label {
    display: flex;
    flex-wrap: wrap;
    width: 320px;

    .label-li {
      padding: 2px 8px;
      border-radius: 20px;
      margin: 16px @padding-4 0 0;
      cursor: pointer;
      color: @gray-2;
      transition: @tr;
    }
    .labelSelected {
      background: #ebebeb;
      font-weight: 600;
      color: @gray-1;
    }
  }

  .mzsm {
    padding-top: 10px;
    font-size: 12px;
    color: @gray-3;
  }
  .footbt {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    position: fixed;
    left: 0;
    bottom: 52px;
    background: rgba(255, 255, 255, 0.6);
    width: 100%;
    backdrop-filter: blur(10px);
    .submit {
      padding-left: 20px;
      width: 200px;
    }
  }
}
</style>
