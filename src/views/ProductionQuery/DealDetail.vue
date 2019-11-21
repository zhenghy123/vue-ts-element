<template >
  <div class="dealDetail">
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
        :width="item.width?item.width:100"
      >
        <template slot-scope="scope">
          <!-- <el-tooltip placement="top" effect="light" :open-delay="300">
            <div slot="content">
              <HoverContent :dealData="scope.row"></HoverContent>
          </div>-->
          <div v-if="'statusName'===item.prop">
            <el-tooltip
              :disabled="'statusName'!==item.prop||scope.row[item.prop]!=='处理失败'"
              class="item border-error"
              effect="dark"
              :content="item.prop==='statusName'?scope.row.failReason:''"
              placement="top"
            >
              <span>
                <i
                  :class="['statusDist','statusDist-'+scope.row['statusCode']]"
                  v-if=" item.prop==='statusName' "
                ></i>
                {{scope.row[item.prop]?scope.row[item.prop]:'--'}}
              </span>
            </el-tooltip>
          </div>
          <div v-else>{{scope.row[item.prop]?scope.row[item.prop]:'--'}}</div>
          <!-- <span>{{scope.row[item.prop]?scope.row[item.prop]:'--'}}</span> -->
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="getDetail(scope.row)">查看详情</el-button>
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
        :page-size="20"
        @current-change="currentChange"
      ></el-pagination>
    </div>
    <!-- dialog -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import HoverContent from './HoverContent.vue'

import { post_attachmentLogList } from '@/server/index'

@Component({
  components: { HoverContent }
})
export default class DealDetail extends Vue {
  @Prop() taskId: any
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
    { prop: 'name', label: '视频名称' },
    { prop: 'operation', label: '操作人账号' },
    { prop: 'uniqueId', label: '唯一标识ID', width: 200 },
    { prop: 'joinQueueTime', label: '加入处理队列时间', width: 160 },
    { prop: 'actualStartTime', label: '实际开始处理时间', width: 160 },
    { prop: 'actualEndTime', label: '实际结束时间', width: 160 },
    { prop: 'platformName', label: '分发平台' },
    { prop: 'sourceName', label: '生产来源' },
    { prop: 'businessTypeName', label: '业务类型', width: 150 },
    { prop: 'statusName', label: '处理状态' },
    { prop: 'failReason', label: '处理失败原因' },
    { prop: 'cost', label: '耗时' },
    { prop: 'extraDescription', label: '扩展描述' }
  ]
  page: number = 1
  totalCount: number = 0

  /**
   * methods
   */
  mounted() {
    this.queryData()
  }
  // 查询详情
  getDetail(row: any) {
    // let obj: object = {
    //   path: 'logDetails',
    //   query: { id: (this as any).id }
    // }
    sessionStorage.setItem('dealData', JSON.stringify(row))
    this.$router.push('/logDetails')
  }
  // 调用接口查询
  queryData() {
    console.log(this.page)
    let params = {
      taskId: this.taskId,
      uniqueId: this.id,
      page: 1,
      rows: 20
    }
    // 不存在删除
    if (!this.taskId) {
      delete params.taskId
    }
    this.loading = true
    post_attachmentLogList(params)
      .then(res => {
        console.log('处理详情', res)
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
.dealDetail {
  width: 100%;
  height: 100%;
  // 分发状态icon
  .statusDist {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    display: inline-block;
  }
  .statusDist-1,
  .statusDist-2 {
    background: #1890ff;
  }
  .statusDist-3 {
    background: #52c41a;
  }
  .statusDist-4,
  .statusDist-5 {
    background: #f5222d;
  }
  .myTable {
    // 表头居中
    /deep/.myTable-header-cell {
      text-align: center;
    }
  }
}
</style>