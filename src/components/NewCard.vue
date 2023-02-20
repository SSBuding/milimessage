<template>
  <div class="new-card">
    <div class="colors" v-show="id == 0">
      <p
        class="color-li"
        v-for="(e, index) in cardColor1"
        :key="index"
        :style="{ background: e }"
        :class="{ colorSelected: index == colorSelected }"
        @click="changeColor(index)"
      ></p>
    </div>
    <!--  判断 -->
    <div class="add-photo" v-if="id == 1">
      <input
        type="file"
        name="file"
        id="file"
        multiple="multiple"
        @change="showPhoto"
      />
      <div class="add-bt" v-if="url == ''">
        <span class="iconfont icon-tianjia"></span>
      </div>
      <div class="change-bt" v-if="url != ''">
        <span class="iconfont icon-warning"></span>
      </div>
      <div class="photo-div"><img :src="url" /></div>
    </div>
    <div
      class="card-main"
      :style="{ background: id == 0 ? cardColor[colorSelected] : cardColor[5] }"
    >
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
        该留言墙大部分创意和样式来自于"一刻时光"，原作者为"逸刻"。请不要利用此平台服务制作、上传、下载、复制、发布、传播或者转载如下内容：<br />
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
      <MlButton size="max" class="submit" @click="submit">确定</MlButton>
    </div>
  </div>
</template>

<script setup>
import "@/assets/fonts/icon/iconfont.css";
import { cardColor, cardColor1, label } from "@/utils/data";
import { getObjectURL } from "@/utils/mlsg";
import MlButton from "./MlButton.vue";
import { ref } from "vue";
import { useStore } from "@/store";
import { insertWallApi } from "@/api";
const store = useStore();
const user = store.user;
const props = defineProps({
  id: {
    defualt: 0,
  },
});
const url = ref("");
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
const emit = defineEmits(["change-modal", "click-bt"]);
const closeModal = () => {
  emit("change-modal");
};

const submit = () => {
  if (!name.value) {
    name.value = "匿名";
  }
  let data = {
    type: props.id,
    message: message.value,
    name: name.value,
    userId: user.id,
    moment: new Date(),
    label: labelSelected.value,
    color: 5,
    imgurl: "",
  };
  if (message.value && props.id == 0) {
    data.color = colorSelected.value;
    insertWallApi(data).then(() => {
      message.value = "";
      emit("click-bt", data);
    });
  }
};
const showPhoto = () => {
  let aa = getObjectURL(document.getElementById("file").files[0]);

  url.value = aa;
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
      border: 1px solid @primary-color;
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
      font-family: hanyi;
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
  .add-photo {
    padding-bottom: 20px;
    position: relative;
    #file {
      position: absolute;
      z-index: 10;
      top: -10px;
      height: 74px;
      width: 64px;
      opacity: 0;
      cursor: pointer;
    }
    .add-bt {
      width: 64px;
      height: 64px;
      border: 1px solid @gray-3;
      border-radius: 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .icon-tianjia {
      font-size: 24px;
    }
  }
  .photo-div {
    max-height: 200px;
    width: 100%;
    background: #f0f0f0;
    overflow: hidden;
    display: flex;
    align-items: center;
    img {
      width: 100%;
    }
  }
  .change-bt {
    position: absolute;
    top: 12px;
    left: 12px;
    height: 40px;
    width: 40px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    align-items: center;
    justify-content: center;
    .icon-warning {
      color: #fff;
    }
  }
}
</style>
