<template >
  <div class="contentDetail">
    <!-- 视频信息 -->
    <h4 class="item-name">视频信息</h4>
    <el-form ref="videoForm" :model="form" label-position="left" inline class="videoForm">
      <div class="form-left">
        <el-form-item
          v-for="(item ,index) in videoFormOptions"
          :key="index"
          :label="item.label"
          show-overflow-tooltip
        >{{item.value}}</el-form-item>
      </div>
      <!-- video -->
      <div class="form-right">
        <!-- <PreviewVideo :preDialogVisible="true"></PreviewVideo> -->
        <VideoScreen :videoSrc="previewUrl" :imgSrc="cover"></VideoScreen>
      </div>
    </el-form>

    <!-- 状态信息 -->
    <h4 class="item-name">视频信息</h4>
    <el-form ref="statusForm" :model="form" llabel-position="left" inline class="statusForm">
      <el-form-item
        v-for="(item ,index) in statusFormOptions"
        :key="index"
        :label="item.label"
      >{{item.value}}</el-form-item>
      <br />
    </el-form>

    <!-- 其他信息 -->
    <h4 class="item-name">视频信息</h4>
    <el-form ref="otherForm" :model="form" label-position="left" inline class="otherForm">
      <el-form-item
        v-for="(item ,index) in otherFormOptions"
        :key="index"
        :label="item.label"
      >{{item.value}}</el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import PreviewVideo from '@/components/PreviewVideo.vue'
import VideoScreen from '@/components/VideoScreen.vue'
import DistributeDetail from './DistributeDetail.vue'

import { get_attachmentContentsDetail } from '@/server/index'

@Component({
  components: { PreviewVideo, VideoScreen }
})
export default class ContentDetail extends Vue {
  @Prop() id: any

  @Provide()
  previewUrl: any = ''
  cover: any = ''
  form: object = {}
  // 视频信息
  videoFormOptions: any = [
    { label: '素材作品id：', value: '' },
    { label: 'pid：', value: '' },
    { label: 'SVID:', value: '' },
    { label: '任务taskId：', value: '' },
    { label: '节目id：', value: '' },
    { label: '媒资id：', value: '' },
    { label: '内容id：', value: '' },
    { label: '视频时长：', value: '' },
    { label: '视频名称：', value: '' }
  ]
  // 状态信息
  statusFormOptions: any = [
    { label: '预处理状态：', value: '' },
    { label: '生产失败原因：', value: '' },
    { label: '生产状态：', value: '' },
    { label: '分发失败原因：', value: '' },
    { label: '分发状态：', value: '' },
    // { label: '分发平台：', value: '' },
    // { label: '分发时间：', value: '' },
    { label: '发布状态：', value: '' },
    { label: '播控状态：', value: '' }
  ]
  // 其他信息
  otherFormOptions: any = [
    { label: '源文件地址：', value: '' },
    { label: '视频来源：', value: '' },
    { label: '创建时间：', value: '' },
    { label: '创建人：', value: '' },
    { label: '更新时间：', value: '' },
    { label: '更新人：', value: '' },
    { label: '工作组：', value: '' },
    { label: '任务名称：', value: '' }
  ]

  /**
   * methods
   */
  mounted() {
    console.log('内容详情id', this.id)
    // 获取详情
    this.getDetail()
  }
  getDetail() {
    get_attachmentContentsDetail({
      id: this.id,
      page: 1,
      rows: 20
    }).then(res => {
      console.log('内容详情', res)
      let data =
        res.data.result.content && res.data.result.content.length !== 0
          ? res.data.result.content[0]
          : null
      if (data) {
        let op1 = this.videoFormOptions
        op1[0].value = data.id
        op1[1].value = data.pid
        op1[2].value = data.svid
        op1[3].value = data.taskId
        op1[4].value = data.programId
        op1[5].value = data.assetId
        op1[6].value = data.contentId
        op1[7].value = data.duration
        op1[8].value = data.title

        let op2 = this.statusFormOptions
        op2[0].value = data.statusPre === 1 ? '已完成' : '待处理'
        op2[1].value = data.productErrorMsg
        op2[2].value = (this as any).enum.getEnumname(
          data.statusProduct,
          'statusProduct'
        )
        op2[3].value = data.distErrorMsg
        op2[4].value = (this as any).enum.getEnumname(
          data.statusDist,
          'statusDist'
        )
        op2[6].value =
          data.gkStatus < 7
            ? '未审核'
            : data.gkStatus == 7
            ? '审核拒绝'
            : data.gkStatus >= 8
            ? '审核通过'
            : ''
        op2[5].value = data.gkStatus < 10 ? '未发布' : '已发布'
        // 7  播控拒绝  未发布
        // 8  播控通过  未发布
        // 9  播控通过  未发布
        // 10  播控通过  已发布
        // 播控状态  <8 按枚举展示  >=8 播控审核通过
        // 发布状态  <=7待审核  8,9未发布  10已发布
        // 播控状态： 7以前的都是未审核，7审核拒绝 8及之后的 审核通过
        // 发布状态： 10以前都是未发布 ，10 及以后都是已发布

        let op3 = this.otherFormOptions
        op3[0].value = data.previewUrl
        op3[1].value = (this as any).enum.getEnumname(
          data.sourceCode,
          'sourceCode'
        )
        op3[2].value = data.createdTime
        op3[3].value = data.createdBy
        op3[4].value = data.updatedTime
        op3[5].value = data.updatedBy
        op3[6].value = data.hbGroupName
        op3[7].value = data.hbTaskName

        this.previewUrl = data.previewUrl
        this.cover = data.cover
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.contentDetail {
  width: 100%;
  height: 100%;
  .item-name {
    padding: 16px 0;
  }
  .el-form-item {
    width: 300px;
    margin-bottom: 8px;
    // 设置省略号
    /deep/.el-form-item__content {
      word-break: break-all;
    }
  }
  // 视频信息
  .videoForm {
    display: flex;
    .form-left {
      min-width: 620px;
      width: 55%;
      /deep/.el-form-item__content {
        width: 190px;
        word-break: break-all;
      }
    }
    .form-right {
      flex: 1;
      height: 240px;
      overflow: hidden;
    }
  }
  // 状态信息
  .statusForm {
    width: 620px;
    /deep/.el-form-item__content {
      width: 190px;
      word-break: break-all;
    }
  }
  // 其他信息
  .otherForm {
    width: 620px;
    /deep/.el-form-item__content {
      width: 190px;
      word-break: break-all;
    }
  }
}
</style>