<template >
  <div class="dealDetails">
    <br />
    <h3 class="item-name">{{getDetailName()}}</h3>
    <br />

    <el-form :model="hoverForm" label-position="left" class="detail-Form">
      <el-row>
        <el-col
          v-for="(item,index) in hoverArray"
          :key="index"
          :style="{'width':item.widthAll?'100%':'47%','padding-right':'10px'}"
        >
          <el-form-item :label="item.label">
            <span
              :class="{'item-span':true,'value-gray':item.label.indexOf('URL')===-1,'value-url':item.label.indexOf('URL')!==-1}"
            >
              <span v-if="item.prop==='cost'">{{item.value+' ms'}}</span>
              <span v-else>{{item.value}}</span>
            </span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- dialog -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'

import { post_attachmentLogList } from '@/server/index'

@Component({})
export default class LogDetails extends Vue {
  @Prop() dealData: any

  @Provide()
  hoverForm: object = {}
  hoverArray: any = [
    {
      label: 'IP：',
      value: '',
      prop: 'ip',
      widthAll: false
    },
    {
      label: '回调IP：',
      value: '',
      prop: 'callbackIp',
      widthAll: false
    },
    {
      label: '视频名称：',
      value: '',
      prop: 'name',
      widthAll: false
    },
    {
      label: '操作人账号：',
      value: '',
      prop: 'operation',
      widthAll: false
    },
    {
      label: '来源：',
      value: '',
      prop: 'sourceName',
      widthAll: false
    },
    {
      label: '唯一标识ID：',
      value: '',
      prop: 'uniqueId',
      widthAll: false
    },
    {
      label: '分发平台：',
      value: '',
      prop: 'platformName',
      widthAll: false
    },
    {
      label: '分发平台编号：',
      value: '',
      prop: 'platformCode',
      widthAll: false
    },
    {
      label: '加入处理队列时间：',
      value: '',
      prop: 'joinQueueTime',
      widthAll: false
    },
    {
      label: '实际开始处理时间：',
      value: '',
      prop: 'actualStartTime',
      widthAll: false
    },
    {
      label: '实际结束时间：',
      value: '',
      prop: 'actualEndTime',
      widthAll: true
    },
    {
      label: '业务类型编号：',
      value: '',
      prop: 'businessTypeCode',
      widthAll: false
    },
    {
      label: '业务类型名称：',
      value: '',
      prop: 'businessTypeName',
      widthAll: false
    },
    {
      label: '处理状态编号：',
      value: '',
      prop: 'statusCode',
      widthAll: false
    },
    {
      label: '处理状态名称：',
      value: '',
      prop: 'statusName',
      widthAll: false
    },
    {
      label: '请求URL：',
      value: '',
      prop: 'reqUrl',
      widthAll: false
    },
    {
      label: '请求参数：',
      value: '',
      prop: 'reqParameters',
      widthAll: false
    },
    {
      label: '回调URL：',
      value: '',
      prop: 'callbackUrl',
      widthAll: false
    },
    {
      label: '回调参数：',
      value: '',
      prop: 'callbackParameters',
      widthAll: false
    },

    {
      label: '处理失败原因：',
      value: '',
      prop: 'failReason',
      widthAll: false
    },
    {
      label: '耗时：',
      value: '',
      prop: 'cost',
      widthAll: false
    },
    {
      label: '扩展描述：',
      value: '',
      prop: 'extraDescription',
      widthAll: true
    }
  ]

  /**
   * methods
   */
  mounted() {
    // console.log('logDetail', this.$route.query.id)
    let data: any = sessionStorage.getItem('dealData') || null
    if (data) {
      data = JSON.parse(data)
      this.hoverArray.forEach((item: any) => {
        item.value = data[item.prop]
      })
    }

    // post_attachmentLogList({
    //   uniqueId: this.$route.query.id,
    //   page: 1,
    //   rows: 20
    // }).then(res => {
    //   console.log(res)
    //   let data = res.data.result.content[0]
    //   this.hoverArray.forEach((item: any) => {
    //     item.value = data[item.prop]
    //   })
    // })
  }
  // formatStatus(status: any, type: any) {
  //   return (this as any).enum.getEnumname(status, 'sourceCode')
  // }
  // 判断是日志详情还是处理详情
  getDetailName() {
    if (window.location.hash === '#/logDetails1') {
      return '日志详情'
    } else {
      return '处理详情'
    }
  }
}
</script>
<style lang="scss" scoped>
.dealDetails {
  width: 100%;
  height: 100%;
  max-width: 1000px;
  .item-name {
    padding: 16px 0;
  }

  .detail-Form {
    /deep/.el-form-item {
      margin-bottom: 8px;
    }
    /deep/.el-form-item__label {
      line-height: normal;
    }
    // 设置省略号
    /deep/.el-form-item__content {
      line-height: normal;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
      word-break: break-all;
    }
    .item-span {
      // word-break: break-all;
    }
    .value-gray {
      color: #999;
    }
    .value-url {
      color: #409eff;
    }
  }
}
</style>