<template>
  <div class="hoverContent">
    <h4 class="hover-name">处理详情</h4>
    <el-form :model="hoverForm" label-position="left" class="hoverForm">
      <el-row>
        <el-col
          v-for="(item,index) in hoverArray"
          :key="index"
          :style="{'width':item.widthAll?'100%':'47%'}"
        >
          <el-form-item :label="item.label">
            <span
              :class="{'value-gray':item.label.indexOf('URL')===-1,'value-url':item.label.indexOf('URL')!==-1}"
            >{{item.value}}</span>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>


<script lang="ts">
import { Component, Vue, Provide, Emit, Prop } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class HoverContent extends Vue {
  @Prop() hoverData: any

  @Provide()
  hoverForm: object = {}
  hoverArray: any = [
    {
      label: 'IP:',
      value: '',
      prop: 'ip',
      widthAll: false
    },
    {
      label: '回调IP:',
      value: '',
      prop: 'callbackIp',
      widthAll: false
    },
    {
      label: '能力提供方:',
      value: '',
      prop: 'abilityProviderName',
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
      prop: '',
      widthAll: false
    },
    {
      label: '分发平台编号：',
      value: '',
      prop: 'platformName',
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
      prop: 'joinQueueTime',
      widthAll: false
    },
    {
      label: '实际结束时间：',
      value: '',
      prop: 'actualStartTime',
      widthAll: true
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
    this.hoverArray.forEach((item: any) => {
      // console.log('prop', item.prop)
      item.value = this.hoverData[item.prop]
    })
  }
}
</script>

<style lang="scss" scoped>
.hoverContent {
  width: 620px;
  .hover-name {
    padding: 12px 0;
  }
  .hoverForm {
    /deep/.el-form-item {
      margin-bottom: 8px;
    }
    /deep/.el-form-item__label {
      line-height: normal;
    }
    // 设置省略号
    /deep/.el-form-item__content {
      line-height: normal;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .value-gray {
      color: #999;
    }
    .value-url {
      color: #409eff;
    }
  }
}
/deep/.el-tooltip__popper.is-light {
  border-radius: 4px;
  background-color: rgba(255, 255, 255, 1) !important;
  box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
  border: 1px solid rgba(233, 233, 233, 1) !important;
}
</style>