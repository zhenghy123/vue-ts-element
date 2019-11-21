
<template>
  <!-- 生产查询 -->
  <div class="productionQuery">
    <h3 class="item-name">生产查询</h3>
    <!-- 查询form -->
    <QueryForm ref="queryForm" @handleSearch="handleSearch" @resetForm="resetForm"></QueryForm>
    <!-- end -->
    <el-table
      :data="tableData"
      size="medium"
      v-loading="loading"
      style="width:100%"
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
          <div v-if="formatArr.includes(item.prop)">
            <el-tooltip
              :disabled="!['statusDist','statusProduct'].includes(item.prop)||scope.row[item.prop]!==3"
              class="item border-error"
              effect="dark"
              :content="item.prop==='statusDist'?scope.row.distErrorMsg:scope.row.productErrorMsg"
              placement="top"
            >
              <span>
                <i
                  :class="['statusDist','statusDist-'+scope.row[item.prop]]"
                  v-if=" item.prop==='statusDist' "
                ></i>
                <i
                  :class="['statusDist','statusProduct-'+scope.row[item.prop]]"
                  v-if="item.prop==='statusProduct'"
                ></i>
                {{formatCodeToName(scope.row[item.prop],item.prop)}}
              </span>
            </el-tooltip>
          </div>
          <div v-else>{{scope.row[item.prop]?scope.row[item.prop]:'--'}}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <div style="text-align:center">
            <el-button type="text" size="mini" @click="getDetail(scope.row)">查看详情</el-button>
            <!-- <el-button type="text" size="mini" @click="dealDetail(scope.$index)">处理详情</el-button>
            <el-button type="text" size="mini" @click="distributeDetail(scope.$index)">分发详情</el-button>-->
          </div>
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
        :page-size="rows"
        :current-page="page"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import QueryForm from './QueryForm.vue'
import { get_attachmentContentsDetail } from '@/server/index'

@Component({
  components: { QueryForm }
})
export default class ProductionQuery extends Vue {
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
    { prop: 'taskId', label: '任务ID', width: 250 },
    { prop: 'svid', label: 'SVID' },
    { prop: 'assetId', label: '媒资ID' },
    { prop: 'contentId', label: '内容ID' },
    { prop: 'programId', label: '节目ID' },
    { prop: 'id', label: '素材作品ID', width: 200 },
    { prop: 'title', label: '视频名称', width: 200 },
    { prop: 'statusProduct', label: '生产状态' },
    { prop: 'statusDist', label: '分发状态' },
    { prop: 'sourceCode', label: '生产来源' },
    { prop: 'hbGroupName', label: '工作组' },
    { prop: 'hbTaskName', label: '任务名称' },
    { prop: 'userName', label: '账号名称' }
  ]
  page: number = 1
  rows: number = 20
  totalCount: number = 0
  formatArr = ['statusProduct', 'statusDist', 'sourceCode']
  queryObj: any = null

  /**
   * methods
   */
  mounted() {
    this.handleSearch({})
  }
  // 搜搜条件
  handleSearch(obj: any) {
    console.log(1, obj)
    this.queryObj = obj
    this.queryData()
  }
  resetForm() {
    this.page = 1
    this.rows = 20
    this.queryObj = null
  }
  // 调用接口查询
  queryData() {
    console.log(this.page)
    this.loading = true
    get_attachmentContentsDetail({
      ...this.queryObj,
      page: this.page,
      rows: this.rows
    })
      .then(res => {
        console.log(res)
        this.tableData = res.data.result.content
        this.totalCount = res.data.result.totalElements
      })
      .finally(() => {
        this.loading = false
      })
  }
  formatCodeToName(code: any, type: string) {
    // console.log(1, code, type)

    return (this as any).enum.getEnumname(code, type)
  }
  // 内容详情-调试改传id
  getDetail(row: any) {
    console.log(row)

    let obj: object = {
      path: 'allDetail',
      query: { id: row.id, taskId: row.taskId }
    }
    this.$router.push(obj)
  }
  // 处理详情
  // dealDetail(index: number) {
  //   let obj: object = { path: 'dealDetail', query: 1 }
  //   this.$router.push(obj)
  // }
  // 分发详情
  // distributeDetail(index: number) {
  //   let obj: object = { path: 'distributeDetail', query: 1 }
  //   this.$router.push(obj)
  // }

  // 分页
  currentChange(page: number) {
    this.page = page
    this.queryData()
  }
}
</script>

<style lang="scss" scoped>
.productionQuery {
  width: 100%;
  height: 100%;
  .item-name {
    padding: 16px 0;
  }
  // 表头居中
  /deep/.myTable-header-cell {
    text-align: center;
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
