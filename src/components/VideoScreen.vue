<template>
  <div class="screenMediaplaywrap">
    <div class="screenMedia-play" v-loading="isShowVideoLoading" v-show="isVideoShow">
      <video
        width="100%"
        height="100%"
        :src="videoSrc"
        autoplay="autoplay"
        @canplay="videocanplay"
        @play="videoPlayFun"
        @ended="videoEndedFun"
        ref="videoScreenMedia"
        controls
      ></video>
    </div>
    <div v-if="!videoSrc" class="media-mask no-video">暂无</div>
    <div class="media-mask" v-show="!isVideoShow && videoSrc">
      <img width="100%" height="100%" :src="imgSrc" alt />
      <span class="videoPlayCon" @click="handleIsPlayFun">
        <svg
          width="58px"
          height="58px"
          viewBox="0 0 58 58"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
        >
          <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g transform="translate(-1115.000000, -299.000000)" fill-rule="nonzero">
              <g transform="translate(1116.000000, 300.000000)">
                <path
                  d="M28,56 C12.5362891,56 0,43.4637109 0,28 C0,12.5362891 12.5362891,0 28,0 C43.4637109,0 56,12.5362891 56,28 C56,43.4637109 43.4637109,56 28,56 Z"
                  stroke="#FFFFFF"
                  fill-opacity="0.65"
                  fill="#000000"
                />
                <path
                  d="M24.3370213,39.9356711 L37.5299039,30.040644 C38.2614047,29.4922762 38.2614047,28.6040251 37.5299039,28.0556573 L24.3370213,18.1606302 C23.6055205,17.6122623 23.0137112,17.9076299 23.0137112,18.8200723 L23.0137112,39.276229 C23.0137112,40.1909058 23.6066377,40.484039 24.3370213,39.9362297 L24.3370213,39.9356711 Z"
                  fill="#FFFFFF"
                />
              </g>
            </g>
          </g>
        </svg>
      </span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Watch, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class videoItem extends Vue {
  @Prop({ type: String, default: require('../assets/images/image.jpg') })
  imgSrc!: string
  @Prop({
    type: String
    // default:
    //   'http://jian.mam.miguvideo.com:38080/mnt1/clipcloud/trans/2019/08/16/5D56A652F3EC4730878700A30A2AE958/81cef83d-f1e3-47fa-b37c-0b50de343eaf.mp4?timestamp=20190918102318&encrypt=688c0f4988d54196a7e51bbd1b1b4947'
  })
  videoSrc!: string
  @Provide() isVideoShow: boolean = false
  @Provide() isShowVideoLoading: boolean = true

  handleIsPlayFun() {
    this.isVideoShow = !this.isVideoShow
    this.isVideoShow && (this as any).$refs.videoScreenMedia.play()
  }
  videoPlayFun(val: any) {
    if (val) {
      this.isShowVideoLoading = false
    }
  }
  videocanplay(val: any) {
    this.isShowVideoLoading = false
    // this.isVideoShow && (this as any).$refs.videoScreenMedia.play();
    console.log('can play')
  }
  videoEndedFun() {
    this.isVideoShow = false
  }
}
</script>
<style lang="scss" scoped>
.screenMediaplaywrap {
  .screenMedia-play {
    width: 400px;
    height: 225px;
    background-color: #000000;
  }
  .no-video {
    background: #333;
    width: 400px;
    height: 225px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }
  .media-mask {
    position: relative;
    width: 400px;
    height: 225px;
    color: #656565;
    .videoPlayCon {
      position: absolute;
      z-index: 10;
      font-size: 36px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      cursor: pointer;
    }
  }
  /deep/.el-loading-mask {
    background-color: #000000;
  }
}
</style>
