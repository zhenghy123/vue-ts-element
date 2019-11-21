<template>
  <div class="preview-video">
    <!-- <el-dialog
      title="预览"
      width="640px"
      :visible.sync="preDialogVisible"
      :before-close="handleClosePre"
      custom-class="padding: 0px"
      center
    >-->
    <div class="video-play" v-loading="isShowVideoLoading">
      <video
        ref="prevideo"
        :src="videoSrc"
        @play="videoplay"
        @pause="videopause"
        @ended="videoend"
        @timeupdate="timeupdateFun"
        @seeking="handleSeekingfun"
        @seeked="handleSeekedFun"
        autoplay="autoplay"
      ></video>
    </div>
    <!-- <div class="video-play" v-show="!isLoadingShow" v-loading="true"></div> -->
    <div class="preVideo-control">
      <div class="video-time">
        <span>
          {{ handleNumParse(currentTime) }}/{{
          handleNumParse(duration)
          }}
        </span>
      </div>
      <div class="video-icon">
        <span class="leftcon" @click="handleBackVideoFun">
          <svg
            width="24px"
            height="15px"
            viewBox="0 0 24 15"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-597.000000, -607.000000)" stroke="#E6E6E6" stroke-width="2">
                <g transform="translate(400.000000, 145.000000)">
                  <g transform="translate(196.000000, 462.000000)">
                    <path
                      d="M9.25142664,3.59297575 L13.5084301,12.0664398 C14.0042967,13.0534505 13.6061458,14.25556 12.6191351,14.7514266 C12.3405357,14.8913928 12.0330714,14.9642857 11.7212892,14.9642857 L3.20728225,14.9642857 C2.10271275,14.9642857 1.20728225,14.0688552 1.20728225,12.9642857 C1.20728225,12.6525035 1.28017511,12.3450392 1.42014132,12.0664398 L5.67714478,3.59297575 C6.1730114,2.60596507 7.37512095,2.20781414 8.36213164,2.70368075 C8.74647801,2.89677342 9.05833397,3.20862938 9.25142664,3.59297575 Z"
                      id="三角形"
                      transform="translate(7.464286, 7.500000) scale(-1, 1) rotate(90.000000) translate(-7.464286, -7.500000) "
                    />
                    <rect x="19" y="1" width="1" height="13" rx="0.5" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
        <div style="display: inline-block" @click="handleVideoIsPlay">
          <span class="playcon" v-if="isVideoPlayShow" @click="isPlayFun">
            <svg
              width="24px"
              height="15px"
              viewBox="0 0 24 15"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-623.000000, -607.000000)"
                  stroke="#E6E6E6"
                  stroke-width="2"
                >
                  <g transform="translate(400.000000, 145.000000)">
                    <g transform="translate(224.000000, 462.000000)">
                      <path
                        d="M9.28885438,3.57770876 L13.5527864,12.1055728 C14.0467649,13.0935298 13.6463162,14.2948759 12.6583592,14.7888544 C12.3806483,14.9277098 12.0744222,15 11.763932,15 L3.23606798,15 C2.13149848,15 1.23606798,14.1045695 1.23606798,13 C1.23606798,12.6895098 1.30835816,12.3832837 1.4472136,12.1055728 L5.71114562,3.57770876 C6.20512412,2.58975177 7.4064702,2.18930308 8.39442719,2.68328157 C8.781482,2.87680898 9.09532698,3.19065396 9.28885438,3.57770876 Z"
                        transform="translate(7.500000, 7.500000) rotate(90.000000) translate(-7.500000, -7.500000) "
                      />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
          <span class="pausecon" v-else @click="isPauseFun">
            <svg
              width="24px"
              height="15px"
              viewBox="0 0 24 15"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
            >
              <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g
                  transform="translate(-626.000000, -607.000000)"
                  stroke="#E6E6E6"
                  stroke-width="2"
                >
                  <g transform="translate(400.000000, 145.000000)">
                    <g transform="translate(226.000000, 462.000000)">
                      <rect x="1" y="1" width="1" height="13" rx="0.5" />
                      <rect x="10" y="1" width="1" height="13" rx="0.5" />
                    </g>
                  </g>
                </g>
              </g>
            </svg>
          </span>
        </div>
        <span class="rightcon" @click="handleForwadVideoFun">
          <svg
            width="24px"
            height="15px"
            viewBox="0 0 24 15"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(-647.000000, -607.000000)" stroke="#E6E6E6" stroke-width="2">
                <g transform="translate(400.000000, 145.000000)">
                  <g
                    transform="translate(257.000000, 469.500000) scale(-1, 1) translate(-257.000000, -469.500000) translate(247.000000, 462.000000)"
                  >
                    <path
                      d="M9.25142664,3.59297575 L13.5084301,12.0664398 C14.0042967,13.0534505 13.6061458,14.25556 12.6191351,14.7514266 C12.3405357,14.8913928 12.0330714,14.9642857 11.7212892,14.9642857 L3.20728225,14.9642857 C2.10271275,14.9642857 1.20728225,14.0688552 1.20728225,12.9642857 C1.20728225,12.6525035 1.28017511,12.3450392 1.42014132,12.0664398 L5.67714478,3.59297575 C6.1730114,2.60596507 7.37512095,2.20781414 8.36213164,2.70368075 C8.74647801,2.89677342 9.05833397,3.20862938 9.25142664,3.59297575 Z"
                      id="三角形"
                      transform="translate(7.464286, 7.500000) scale(-1, 1) rotate(90.000000) translate(-7.464286, -7.500000) "
                    />
                    <rect x="19" y="1" width="1" height="13" rx="0.5" />
                  </g>
                </g>
              </g>
            </g>
          </svg>
        </span>
      </div>
      <div class="video-progress">
        <el-slider
          v-model="timeNum"
          :max="maxduration"
          :format-tooltip="formatTimeToolTip"
          @change="handleChangeTimeFun"
          @input="handkeSliderChangeFun"
        ></el-slider>
      </div>
      <div class="video-voice" @mouseenter="handleEnterMouse" @mouseleave.passive="handleOutMouse">
        <div class="voice-progress" v-show="isShowVoicePro">
          <el-slider v-model="voiceNum" @input="handleVolumeFun" vertical height="55px"></el-slider>
        </div>
        <span v-if="isHaveVoice" @click="closeVoice">
          <svg
            width="24px"
            height="20px"
            viewBox="0 0 24 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(4.000000, 5.000000)" fill="#FFFFFF" fill-rule="nonzero">
                <path
                  d="M14.0745575,13.4798215 C13.9478079,13.5824196 13.7713596,13.6391613 13.5880929,13.6363636 C13.4048261,13.6333535 13.2315197,13.5710697 13.1102902,13.4645423 C12.8496816,13.2370474 12.8576644,12.8927522 13.1286507,12.6726562 C14.7212557,11.4134362 15.6365615,9.68161347 15.6365615,7.82913745 C15.6365615,5.98719885 14.732136,4.26538668 13.1558515,3.00722039 C12.8858205,2.7860834 12.8799051,2.44142952 13.1422511,2.21480743 C13.2642395,2.10900848 13.4378267,2.0476126 13.6209123,2.04545455 C13.8039978,2.04340809 13.979857,2.10079149 14.1058383,2.20374316 C15.9432502,3.6705501 17,5.68056034 17,7.82913745 C17,9.98930572 15.9310098,12.0109071 14.0745575,13.4798215 Z M12.0444185,10.7525023 C11.9195819,10.8513237 11.7468478,10.9078168 11.5656967,10.9090909 C11.3845456,10.9103224 11.2104619,10.8562278 11.0832343,10.7591496 C10.8157207,10.5552599 10.8118099,10.2282667 11.0744037,10.0207845 C11.8264286,9.4306737 12.244812,8.64387289 12.2414103,7.82614255 C12.2450394,7.02045937 11.8391807,6.24423865 11.1070092,5.6565559 C10.847567,5.44674354 10.856593,5.11971082 11.1273877,4.91819081 C11.2561365,4.82239034 11.4309606,4.76995016 11.611953,4.77284074 C11.7929454,4.77573133 11.9646574,4.83370595 12.0878925,4.9335308 C13.063389,5.71736218 13.604281,6.75208836 13.6,7.82614255 C13.6,8.9352242 13.0348118,9.97680987 12.0444185,10.7525023 L12.0444185,10.7525023 Z M7.32148429,14.8373095 L3.86749992,12.5471679 L0.982222203,12.5471679 C0.439755859,12.5471679 0,12.0995227 0,11.5473243 L0,3.79403742 C0,3.24183907 0.439755859,2.79419386 0.982222203,2.79419386 L3.86749992,2.79419386 L7.26893541,0.199599835 C7.56670555,-0.0274386394 7.96493266,-0.0637356295 8.29758992,0.10584162 C8.63024717,0.27541887 8.84023247,0.621761661 8.84,1.00047453 L8.84,13.9999406 C8.84,14.3668481 8.6427283,14.7043249 8.3258454,14.8791708 C8.00896251,15.0540168 7.62345651,15.038141 7.32148429,14.8378095 L7.32148429,14.8373095 Z M7.48,12.9545455 L7.48,2.04545455 L4.21935143,4.3906385 L1.36,4.3906385 L1.36,10.8967409 L4.18787714,10.8967409 L7.47956286,12.9541259 L7.48,12.9545455 Z"
                />
              </g>
            </g>
          </svg>
        </span>
        <span v-else @click="haveVoice">
          <svg
            width="24px"
            height="20px"
            viewBox="0 0 24 20"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
          >
            <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
              <g transform="translate(4.000000, 5.000000)" fill="#FFFFFF" fill-rule="nonzero">
                <g>
                  <g>
                    <path
                      d="M7.32148432,14.8373095 L3.86749992,12.5471679 L0.982222206,12.5471679 C0.439755859,12.5471679 0,12.0995227 0,11.5473243 L0,3.79403742 C0,3.24183907 0.439755859,2.79419386 0.982222206,2.79419386 L3.86749992,2.79419386 L7.26893541,0.199599835 C7.56670558,-0.0274386394 7.96493268,-0.0637356295 8.29758991,0.10584162 C8.6302472,0.27541887 8.84023249,0.621761661 8.84000019,1.00047453 L8.84000019,13.9999406 C8.84000019,14.3668481 8.64272833,14.7043248 8.3258454,14.8791708 C8.00896248,15.0540168 7.62345654,15.038141 7.32148432,14.8378094 L7.32148432,14.8373095 Z M7.48,12.9545455 L7.48,2.04545455 L4.21935143,4.3906385 L1.36,4.3906385 L1.36,10.8967409 L4.18787714,10.8967409 L7.4795629,12.9541259 L7.48,12.9545455 Z"
                      id="形状"
                    />
                  </g>
                </g>
                <path
                  d="M13.5603734,3.38028251 C13.9367229,3.38078498 14.2416891,3.68575124 14.2421916,4.06210069 L14.2512825,10.8711916 C14.2517833,11.2462445 13.9481487,11.5506909 13.5730959,11.5511916 C13.5724914,11.5511924 13.571887,11.5511924 13.5712825,11.5511916 C13.1949331,11.5506891 12.8899668,11.2457229 12.8894643,10.8693734 L12.8803734,4.06028251 C12.8798727,3.68522962 13.1835072,3.38078325 13.5585601,3.38028251 C13.5591645,3.38028171 13.559769,3.38028171 13.5603734,3.38028251 Z"
                  transform="translate(13.565828, 7.465737) rotate(45.000000) translate(-13.565828, -7.465737) "
                />
                <path
                  d="M13.5603734,3.38028251 C13.9367229,3.38078498 14.2416891,3.68575124 14.2421916,4.06210069 L14.2512825,10.8711916 C14.2517832,11.2462445 13.9481487,11.5506909 13.5730958,11.5511916 C13.5724914,11.5511924 13.5718869,11.5511924 13.5712825,11.5511916 C13.194933,11.5506891 12.8899668,11.2457229 12.8894643,10.8693734 L12.8803734,4.06028251 C12.8798727,3.68522962 13.1835072,3.38078325 13.5585601,3.38028251 C13.5591645,3.38028171 13.559769,3.38028171 13.5603734,3.38028251 Z"
                  transform="translate(13.565828, 7.465737) scale(-1, 1) rotate(45.000000) translate(-13.565828, -7.465737) "
                />
              </g>
            </g>
          </svg>
        </span>
      </div>
    </div>
    <!-- </el-dialog> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class PreviewVideo extends Vue {
  @Prop(Boolean) preDialogVisible!: boolean
  @Provide() isShowVoicePro: boolean = false
  @Provide() videoSrc: string =
    'http://jian.mam.miguvideo.com:38080/mnt1/clipcloud/trans/2019/08/16/5D56A652F3EC4730878700A30A2AE958/81cef83d-f1e3-47fa-b37c-0b50de343eaf.mp4?timestamp=20190918102318&encrypt=688c0f4988d54196a7e51bbd1b1b4947'
  // @Provide() videoSrc: string = '/i/movie.ogg'
  @Provide() timeNum: number = 0
  @Provide() voiceNum: number = 100
  @Provide() duration: number = 0
  @Provide() maxduration: number = 0
  @Provide() currentTime: number = 0
  @Provide() pregressNum: number = 0
  @Provide() isHaveVoice: boolean = true
  @Provide() isVideoPlayShow: boolean = true
  @Provide() isVoice: boolean = true
  @Provide() isShowVideoLoading: boolean = true
  get handleNumParse() {
    return function(val: any) {
      if (val) {
        var snum = 0
        snum = Math.round(val * 100) / 100
        var inNum = Math.floor(val)
        var fen = 0
        var hour = 0
        var result = ''
        var time = ''
        if (inNum >= 60) {
          fen = parseInt((inNum / 60).toString())
          inNum = parseInt((inNum % 60).toString())
          if (fen > 60) {
            hour = parseInt((fen / 60).toString())
            fen = parseInt((fen % 60).toString())
          }
        }
        if (inNum < 10) {
          time = '0' + inNum
        } else {
          time = inNum.toString()
        }
        result = time
        if (fen < 10) {
          time = '0' + fen
        } else {
          time = fen.toString()
        }
        result = time + ':' + result
        if (hour < 10) {
          time = '0' + hour
        } else {
          time = hour.toString()
        }
        result = time + ':' + result
        return result
      } else {
        return '00:00:00'
      }
    }
  }

  @Watch('preDialogVisible') handleDialogVisible(to: any) {}
  // 关闭预览窗口
  handleClosePre() {
    ;(this as any).$refs.prevideo.pause()
    this.$emit('handleClosePre')
  }
  // 移入音频
  handleEnterMouse() {
    this.isShowVoicePro = true
  }
  // 移出音频
  handleOutMouse() {
    this.isShowVoicePro = false
  }
  // 静音控制
  handleIsHaveVoice() {
    // this.isHaveVoice = !this.isHaveVoice
    // if (this.isHaveVoice) {
    //   ;(this as any).$refs.prevideo.muted = false
    // } else {
    //   ;(this as any).$refs.prevideo.muted = true
    // }
  }
  // 关闭声音
  closeVoice() {
    this.isHaveVoice = false
    ;(this as any).$refs.prevideo.muted = true
  }
  // 开启声音
  haveVoice() {
    this.isHaveVoice = true
    ;(this as any).$refs.prevideo.muted = false
  }
  // 控制播放/暂停
  handleVideoIsPlay() {
    this.isVideoPlayShow = !this.isVideoPlayShow
  }
  // 视频已就绪
  videoplay(val: any) {
    if (val) {
      this.duration = val.srcElement.duration
      this.maxduration = Math.floor(this.duration)
    }
    this.isVideoPlayShow = false
  }
  // 视频暂停时运行
  videopause() {
    this.isVideoPlayShow = true
  }
  // 播放位置改变时触发事件
  timeupdateFun(val: any) {
    if (val.srcElement.currentTime > 0) {
      this.isShowVideoLoading = false
    } else {
      this.isShowVideoLoading = true
    }
    this.currentTime = Math.floor(val.srcElement.currentTime)
    this.timeNum = this.currentTime
  }
  // 视频播放结束时运行
  videoend() {
    this.isVideoPlayShow = true
  }
  // 点击播放
  isPlayFun() {
    ;(this as any).$refs.prevideo.play()
  }
  // 点击暂停
  isPauseFun() {
    ;(this as any).$refs.prevideo.pause()
  }
  // 时间进度条改变事件
  handleChangeTimeFun(val: any) {
    // this.pregressNum = parseInt(val)
    // ;(this as any).$refs.prevideo.currentTime = parseInt(val)
    // console.log('44444444444444', val)
    // this.timeNum = parseInt(val)
  }
  // 快进
  handleForwadVideoFun() {
    var currentTimes = (this as any).$refs.prevideo.currentTime
    currentTimes = parseInt(currentTimes) + 5
    if (currentTimes > (this as any).duration) {
      currentTimes = (this as any).duration
    }
    ;(this as any).$refs.prevideo.currentTime = currentTimes
  }
  // seeking事件
  handleSeekingfun() {
    if ((this as any).$refs.prevideo.seeking) {
      // console.log('111111111111')
    }
  }
  // seeked事件
  handleSeekedFun() {
    // console.log('2222222')
  }
  // 视频后退
  handleBackVideoFun() {
    var backCurrentTime = (this as any).$refs.prevideo.currentTime
    backCurrentTime = parseInt(backCurrentTime) - 5
    if (backCurrentTime < 0) {
      backCurrentTime = 0
    }
    ;(this as any).$refs.prevideo.currentTime = backCurrentTime
  }
  // 鼠标拖拽时触发事件
  handkeSliderChangeFun(val: any) {
    var num = val - this.currentTime
    if (num != 0) {
      ;(this as any).$refs.prevideo.currentTime = val
    }
  }
  // 处理音量事件
  handleVolumeFun(val: any) {
    var voiceNum = val / 100
    ;(this as any).$refs.prevideo.volume = voiceNum
    if (voiceNum == 0) {
      this.closeVoice()
    } else {
      this.haveVoice()
    }
  }
  // tip时间格式化
  formatTimeToolTip(val: any) {
    return this.realFormatSecond(val)
  }

  realFormatSecond(second: any) {
    var secondType = typeof second
    if (secondType === 'number' || secondType === 'string') {
      second = parseInt(second)
      var hours = Math.floor(second / 3600)
      second = second - hours * 3600
      var mimute = Math.floor(second / 60)
      second = second - mimute * 60
      if (hours == 0) {
        return ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
      } else {
        return (
          hours +
          ':' +
          ('0' + mimute).slice(-2) +
          ':' +
          ('0' + second).slice(-2)
        )
      }
    } else {
      return '00:00'
    }
  }
}
</script>

<style lang="scss" scoped>
.preview-video {
  // width: 640px;
  // height: 360px;
  .video-play {
    // height: 400px;
    // line-height: 400px;
    box-sizing: border-box;
    padding-top: 20px;
    background-color: #000000;
    /deep/.el-loading-mask {
      background-color: #000000;
    }
    /deep/.el-loading-spinner {
      top: 45.1%;
    }
  }
  /deep/.el-dialog--center .el-dialog__body {
    padding: 0px;
  }
  .preVideo-control {
    width: 640px;
    height: 55px;
    line-height: 55px;
    display: flex;
    flex-direction: row;
    background-color: #333;
    .video-time {
      width: 160px;
      margin-left: 16px;
      overflow: hidden;
      color: #ffffff;
      font-family: Source Han Sans SC;
    }
    .video-icon {
      width: 88px;
      font-size: 15px;
      height: 55px;
      line-height: 55px;
      margin-left: 26px;
      .leftcon {
        cursor: pointer;
      }
      .playcon {
        cursor: pointer;
        margin-left: 8px;
      }
      .pausecon {
        cursor: pointer;
        margin-left: 8px;
      }
      .rightcon {
        cursor: pointer;
      }
    }
    .video-progress {
      width: 284px;
      height: 55px;
      line-height: 55px;
      /deep/.el-slider__runway {
        height: 2px;
        margin: 25px 0;
      }
      /deep/.el-slider__bar {
        height: 2px;
      }
      /deep/.el-slider__button-wrapper {
        height: 31px;
        width: 31px;
      }
      /deep/.el-slider__button {
        width: 14px;
        height: 14px;
      }
    }
    .video-voice {
      margin-left: 30px;
      cursor: pointer;
      position: relative;
      .voice-progress {
        top: -45px;
        left: -6px;
        position: absolute;
        z-index: 2000;
        /deep/.el-slider.is-vertical .el-slider__runway {
          width: 2px;
        }
        /deep/.el-slider__button-wrapper {
          height: 32px;
          width: 32px;
        }
        /deep/.el-slider__button {
          width: 8px;
          height: 8px;
        }
        /deep/.el-slider.is-vertical .el-slider__bar {
          width: 2px;
        }
      }
    }
  }
}
</style>
