<template>
  <div class="login-page">
    <div class="page-center">
      <div class="info">
        <div class="title">
          <!-- <img src="@/assets/logo.png" alt /> -->
          <!-- <span>统一后台管理系统</span> -->
          <span class="name">网达统一管理后台</span>
        </div>
        <!-- <div class="detail">
          <span>米修在线, 让每个人都有机会学习编程, 更有能力选择学习想要学习的课程!</span>
        </div>-->
      </div>
      <!-- 插槽 -->
      <div class="login-container">
        <slot name="container"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class LayoutHeader extends Vue {}
</script>

<style lang="scss" scoped>
.login-page {
  width: 100%;
  height: 100%;
  // background-image: url('../../assets/login3-bg.jpg');
  // background-repeat: no-repeat;
  // background-position: center 110px;
  // background-size: 100%;
  .page-center {
    width: 307px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    // position: absolute;
    // width: 400px;
    // height: 540px;
    // margin: auto;
    // top: 60px;
    // right: 0;
    // left: 0;
    .info {
      text-align: center;
      // height: 150px;
      margin-bottom: 10px;
      .title {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: Center;
        font-size: 32px;
        color: rgba(0, 0, 0, 0.85);
        // font-family: 'Myriad Pro', 'Helvetica Neue', Arial, Helvetica,
        //   sans-serif;
        // font-weight: 600;
        img {
          width: 253px;
          height: 50px;
          // padding-bottom: 3px;
        }
        .name {
          width: 100%;
          font-size: 30px;
          color: #fff;
          text-align: center;
        }
      }
      .detail {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-bottom: 40px;
        line-height: 1.5;
      }
    }
    .login-container {
      // padding: 30px;
      padding: 15px;
      border-radius: 5px;
      // background: hsla(0, 0%, 100%, 0.3);
      overflow: hidden;
      // -webkit-border-radius: 5px;
      // border-radius: 5px;
      // -moz-border-radius: 5px;
      // background-clip: padding-box;
      // padding: 35px 35px 15px 35px;
      // background: #fff;
      // border: 1px solid #eaeaea;
      // box-shadow: 0 0 25px #cac6c6;
    }
  }
}
</style>
