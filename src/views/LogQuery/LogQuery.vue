
<template>
  <!-- 日志查询 -->
  <div class="logQuery">
    <el-button type="primary" class="clear-log" size="mini" @click="clearLog">清空日志</el-button>
    <h3 class="item-name">日志查询</h3>
    <!-- 查询form -->
    <QueryForm ref="queryForm" @handleSearch="handleSearch" @resetForm="resetForm"></QueryForm>
    <!-- end -->
    <el-table
      :data="tableData"
      v-loading="loading"
      size="medium"
      style="width: 100%"
      class="myTable"
      :header-cell-style="tableHeaderOption"
    >
      <!--  show-overflow-tooltip -->
      <el-table-column
        v-for="(item,index) in tableOptions"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        show-overflow-tooltip
        :width="item.width?item.width:110"
      >
        <template slot-scope="scope">
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
          <!-- {{scope.row[item.prop]?scope.row[item.prop]:'--'}} -->
          <!-- <el-popover
            placement="top-start"
            trigger="click"
            :ref="'popover'+index"
            :disabled="false"
          >
            <div>
              <HoverContent :hoverData="scope.row"></HoverContent>
            </div>
            <span slot="reference">{{scope.row[item.prop]}}</span>
          </el-popover>-->
          <!-- <el-tooltip placement="top" effect="light" :open-delay="200">
            <div slot="content">
              <HoverContent :hoverData="scope.row"></HoverContent>
          </div>-->
          <!-- <span>{{scope.row[item.prop]}}</span> -->
          <!-- </el-tooltip> -->
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" fixed="right">
        <template slot-scope="scope">
          <div style="text-align:center">
            <el-button type="text" size="mini" @click="getDetail(scope.row)">查看详情</el-button>
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
        :current-page="page"
        :page-size="rows"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import QueryForm from './QueryForm.vue'
import HoverContent from './HoverContent.vue'

import {
  get_attachmentLogDelete,
  post_attachmentLogList,
  get_findEnumInfo,
  get_platformList
} from '@/server/index'

@Component({
  components: { QueryForm, HoverContent }
})
export default class LogQuery extends Vue {
  name: any = 'logQuery'
  @Action('setData') setData: any

  @Provide()
  loading: boolean = false
  tableData: any = []
  tableOptions: any = [
    { prop: 'ip', label: 'IP' },
    { prop: 'callbackIp', label: '回调IP' },
    { prop: 'name', label: '视频名称' },
    { prop: 'operation', label: '操作人账号' },
    { prop: 'uniqueId', label: '唯一标识ID', width: 260 },
    { prop: 'joinQueueTime', label: '加入处理列队时间', width: 160 },
    { prop: 'actualStartTime', label: '实际开始处理时间', width: 160 },
    { prop: 'actualEndTime', label: '实际结束时间', width: 160 },
    { prop: 'platformName', label: '分发平台' },
    { prop: 'sourceName', label: '生产来源', width: 150 },
    { prop: 'businessTypeName', label: '业务类型', width: 150 },
    { prop: 'statusName', label: '处理状态' },
    { prop: 'cost', label: '耗时（ms）' },
    { prop: 'extraDescription', label: '扩展描述' }
  ]
  page: number = 1
  rows: number = 20
  totalCount: number = 0
  tableHeaderOption: object = {
    background: '#fff',
    'line-height': '24px',
    color: 'rgb(144, 147, 153)',
    'font-size': '12px',
    // 'padding-left': '10px',
    'font-family': 'PingFangSC-Medium'
    // 'borer-right': 'none'
  } //table  css
  queryObj: any = null
  dealStatus: any = [] //处理状态
  source: any = [] //来源
  busType: any = [] //业务类型
  disPlate: any = [] //能力提供方

  /**
   * methods
   */
  mounted() {
    // 枚举查询
    this.getEnumInfo(1)
    this.getEnumInfo(2)
    this.getEnumInfo(3)
    this.getPlatformList()
    this.handleSearch(null)
  }
  getDetail(row: any) {
    // let obj: object = {
    //   path: 'logDetails1',
    //   query: { id: row.uniqueId }
    // }
    sessionStorage.setItem('dealData', JSON.stringify(row))
    this.$router.push('/logDetails1')
  }
  // 清楚日志
  clearLog() {
    get_attachmentLogDelete({
      date: new Date().toLocaleDateString().replace(/\//g, '-'),
      dayNum: 30
    }).then(res => {
      console.log('清除日志', res)
      this.$message.success('清空' + res.data.msg + ',' + res.data.result)
    })
  }
  // 枚举
  getEnumInfo(type: number) {
    console.log('开始枚举查询')

    // 1-处理状态；2-来源；3-业务类型；4-能力提供方
    let _this = this
    // let type = 1
    // let fun = function() {
    get_findEnumInfo({ type: type }).then(res => {
      if (type === 1) {
        _this.dealStatus = res.data.result
        _this.setData({ key: 'dealStatus', data: res.data.result })
      } else if (type === 2) {
        _this.source = res.data.result
        _this.setData({ key: 'source', data: res.data.result })
      } else if (type === 3) {
        _this.busType = res.data.result
        _this.setData({ key: 'busType', data: res.data.result })
      } else if (type === 4) {
        // _this.disPlate = res.data.result
        // _this.setData({ key: 'disPlate', data: res.data.result })
      }
      console.log(res)
    })
  }
  // 分发平台
  getPlatformList() {
    let _this = this
    get_platformList({}).then(res => {
      res.data.result.forEach((item: any) => {
        item.code = item.id
        item.name = item.platformName
      })
      _this.setData({ key: 'disPlate', data: res.data.result })
    })
  }
  // 搜搜条件
  handleSearch(obj: any) {
    console.log(obj)
    this.queryObj = obj
    this.queryData(obj)
  }
  // 重置
  resetForm() {
    this.page = 1
    this.rows = 20
    this.queryObj = null
  }
  // 调用接口查询
  queryData(obj: any) {
    this.loading = true
    let _this = this as any
    post_attachmentLogList({
      ...this.queryObj,
      page: this.page,
      rows: this.rows
    })
      .then(res => {
        console.log(res)
        _this.tableData = res.data.result.content
        _this.totalCount = res.data.result.totalElements
      })
      .finally(() => {
        this.loading = false
      })
  }
  // 分页
  currentChange(page: number) {
    this.page = page
    this.queryData({})
  }
}
</script>

<style lang="scss" scoped>
.logQuery {
  width: 100%;
  height: 100%;
  position: relative;
  .clear-log {
    position: absolute;
    right: 0;
    top: -24px;
  }
  .item-name {
    padding: 16px 0;
  }
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
  // 表头居中
  /deep/.myTable-header-cell {
    text-align: center;
  }
}
</style>
