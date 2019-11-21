<template >
  <div class="distributeDetail">
    <!-- 表格 -->
    <el-table
      :data="tableData"
      v-loading="loading"
      size="medium"
      style="width: 100%"
      class="myTable"
      :header-cell-style="tableHeaderOption"
    >
      <el-table-column
        v-for="(item,index) in tableOptions"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width?item.width:110"
      >
        <template slot-scope="scope">
          <div v-if="item.prop==='status'">
            <el-tooltip
              :disabled="item.prop!=='status'||scope.row[item.prop]!==3"
              class="item border-error"
              effect="dark"
              :content="scope.row.failReason"
              placement="top"
            >
              <span>
                <i
                  :class="['statusDist','statusDist-'+scope.row[item.prop]]"
                  v-if=" item.prop==='status' "
                ></i>
                {{formatStatus(scope.row[item.prop],item.prop)}}
              </span>
            </el-tooltip>

            <!-- {{this.enum.getEnumname({code:scope.row[item.prop],type:''})}} -->
          </div>
          <div v-else>{{scope.row[item.prop]?scope.row[item.prop]:'--'}}</div>

          <!-- <div v-if="item.prop==='status'">
            <i :class="['statusDist','statusDist-'+scope.row[item.prop]]"></i>
            {{formatStatus(scope.row[item.prop],item.prop)}}
          </div>
          <div v-else>{{scope.row[item.prop]?scope.row[item.prop]:'--'}}</div>-->
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <br />
    <div class="flex-end">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totalCount"
        :current-page="page"
        :page-size="20"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <!-- dialog -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'

import { get_distTasksOfMaterial } from '@/server/index'

@Component({
  components: {}
})
export default class DistributeDetail extends Vue {
  @Prop() id: any
  //
  @Provide()
  tableHeaderOption: object = {
    background: '#fff',
    'line-height': '24px',
    color: 'rgb(144, 147, 153)',
    'font-size': '12px',
    // 'padding-left': '10px',
    'font-family': 'PingFangSC-Medium'
    // 'borer-right': 'none'
  } //table  css
  loading: boolean = false
  tableData: any = []
  tableOptions: any = [
    { prop: 'svid', label: 'SVID' },
    { prop: 'assetId', label: '媒资ID' },
    { prop: 'contentId', label: '内容ID' },
    { prop: 'status', label: '分发状态' },
    { prop: 'platformName', label: '分发平台' },
    { prop: 'startTime', label: '分发开始时间', width: 160 },
    { prop: 'cost', label: '分发耗时' },
    { prop: 'gacctId', label: '分发账号' },
    { prop: 'hbGroupName', label: '工作组' },
    { prop: 'hbTaskName', label: '任务名称' }
  ]
  page: number = 1
  totalCount: number = 100

  /**
   * methods
   */
  mounted() {
    this.queryData()
  }
  formatStatus(status: any, type: any) {
    return (this as any).enum.getEnumname(status, 'statusDist')
  }
  // 调用接口查询
  queryData() {
    this.loading = true
    // console.log('attachmentId', this.id)
    get_distTasksOfMaterial({
      attachmentId: this.id,
      page: 1,
      rows: 20
    })
      .then(res => {
        console.log('分发详情', res)
        this.tableData = res.data.result.content
        this.totalCount = res.data.result.totalElements
      })
      .finally(() => {
        this.loading = false
      })
  }

  // 分页
  currentChange(page: number) {
    this.page = page
    this.queryData()
  }
}
</script>
<style lang="scss" scoped>
.distributeDetail {
  width: 100%;
  height: 100%;
  .myTable {
    // 表头居中
    /deep/.myTable-header-cell {
      text-align: center;
    }
  }
  // 分发状态icon
  .statusDist {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }
  .statusDist-0,
  .statusDist-2,
  .statusProduct-0,
  .statusProduct-2 {
    background: #1890ff;
  }
  .statusDist-1,
  .statusProduct-1 {
    background: #52c41a;
  }
  .statusDist-3,
  .statusProduct-3 {
    background: #f5222d;
  }
}
</style>