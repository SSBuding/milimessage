<template>
  <div class="foot-bar">
    <div class="foot-bar-inner">
      <div class="foot-left">
        <div class="logo">
          <img src="@/assets/images/mlsg.svg" class="logo-img" />
          <p class="logo-name">米粒时光</p>
        </div>
        <p class="top-p">
          米粒时光是本人独自开发的，为便于与用户交流的留言平台。
        </p>
        <p class="top-p">
          用户将留言便签贴在留言墙上，用户可以自定义便签颜色和内容属性，不仅可以用于交流，也是一场记录
        </p>
        <p class="state">
          <span>作者声明</span>
          <span
            >本网页参考B站up主
            <a href="https://space.bilibili.com/485469670" target="_blank"
              >yike陈</a
            >
            开发
          </span>
          <span>备案/许可证号暂未申请</span>
        </p>
      </div>
      <div class="link">
        <p class="title">链接</p>
        <div class="link-inner">
          <a href="http://www.huohuo90.com/" target="_blank" class="link-name"
            >逸刻时光</a
          >
          <a
            href="https://space.bilibili.com/288313145"
            target="_blank"
            class="link-name"
            >作者b站</a
          >
        </div>
      </div>
      <div class="foot-right">
        <p class="title">打赏</p>
        <div class="right-inner">
          <div>
            <img src="@/assets/images/wx.png" />
            <p class="ds-title">微信支付</p>
          </div>
          <div>
            <img src="@/assets/images/zfb.png" />
            <p class="ds-title">支付宝支付</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.foot-bar {
  display: flex;
  width: 100%;
  height: 200px;
  background: @gray-1;
  padding: 20px;
  box-sizing: border-box;
  .foot-bar-inner {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    p {
      color: rgba(255, 255, 255, 0.5);
    }
  }
  .foot-left {
    .logo {
      display: flex;
      align-items: center;
      margin-bottom: 24px;
      .logo-name {
        font-size: 20px;
        color: @gray-10;
        font-weight: 600;
        padding-left: 10px;
      }
    }
    .top-p {
      font-size: @size-12;
      padding-bottom: 4px;
      width: 400px;
    }
    .state {
      font-size: @size-12;
      padding-top: 30px;
      padding-bottom: 26px;
      span {
        padding-right: 20px;
      }
      a {
        color: rgba(255, 255, 255, 0.5);

        font-size: @size-12;
      }
    }
  }
  .title {
    font-size: @size-16;
    padding-bottom: 12px;
  }
  .link {
    flex: 1;
    padding: 0 40px;
    .link-inner {
      a {
        color: rgba(255, 255, 255, 0.5);
        padding-right: 20px;
        font-size: @size-12;
      }
    }
  }
  .foot-right {
    .right-inner {
      display: flex;
      img {
        width: 100px;
        height: 100px;
        padding-right: 40px;
      }
      .ds-title {
        font-size: @size-12;
        padding-top: 8px;
      }
    }
  }
}
</style>
