<template>
  <!-- 生产统计 -->
  <div class="productionStatistics">
    <h3 class="item-name">生产统计</h3>

    <el-row :gutter="20" class="totalCount">
      <el-col :span="8" v-for="(item,index) in totalData" :key="index">
        <div class="count-item" :style="{'background':item.color}">
          <div class="title">{{ item.title }}</div>
          <p class="count">{{ parseFloat(item.count).toLocaleString() }}</p>
        </div>
      </el-col>
    </el-row>
    <br />
    <!-- 工具统计展示 -->
    <ToolsStatistics></ToolsStatistics>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import ToolsStatistics from './ToolsStatistics.vue'

import {
  get_totalCount,
  get_materialTotal,
  get_distributionTotal,
  get_productTotal
} from '@/server/index'

@Component({
  components: { ToolsStatistics }
})
export default class ProductionStatistics extends Vue {
  @Provide()
  tabPosition: string = 'line'
  totalData: any = [
    { title: '生产总量', count: 0, color: 'rgba(94, 199, 147, 1)' },
    { title: '分发总量', count: 0, color: 'rgba(213, 84, 92, 1)' },
    { title: '上传总量', count: 0, color: 'rgba(155, 135, 248, 1)' }
  ]

  mounted() {
    this.getTotalCount()
  }
  // 生产总量统计接口
  getTotalCount() {
    get_totalCount({}).then(res => {
      // console.log(parseFloat(res.data.result.productTotal).toLocaleString())

      this.totalData[0].count = res.data.result.productTotal
      this.totalData[1].count = res.data.result.distTotal
      this.totalData[2].count = res.data.result.uploadTotal
    })
  }
  // 获取全部总量数据
  getAllTotalCount() {
    let user: any = sessionStorage.getItem('tsToken')
    user = JSON.parse(user)

    get_materialTotal({
      userId: user && user.userId ? user.userId : null
    }).then(res => {
      this.totalData[2].count = parseFloat(
        res.data.result.total
      ).toLocaleString()
      //  parseFloat(total).toLocaleString()
    })

    // 查询分发作品总量接口
    get_distributionTotal({
      userId: user && user.userId ? user.userId : null
    }).then(res => {
      this.totalData[1].count = parseFloat(
        res.data.result.total
      ).toLocaleString()
    })

    get_productTotal({
      userId: user && user.userId ? user.userId : null
    }).then(res => {
      this.totalData[0].count = parseFloat(
        res.data.result.total
      ).toLocaleString()
    })
  }
}
</script>

<style lang="scss" scoped>
.productionStatistics {
  width: 100%;
  height: 100%;
  .item-name {
    padding: 16px 0;
  }
  .totalCount {
    color: rgba(255, 255, 255, 1);
    .count-item {
      box-sizing: border-box;
      padding: 24px 32px;
      height: 118px;
      border-radius: 4px;
      // background: rgba(94, 199, 147, 1);
      .title {
        font-size: 14px;
      }
      .count {
        font-size: 40px;
        text-align: right;
      }
    }
  }
}
</style>
