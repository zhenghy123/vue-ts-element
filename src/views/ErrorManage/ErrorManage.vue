
<template>
  <!-- 报障管理 -->
  <div class="errorManage">
    <h3 class="item-name">报障管理</h3>
    <!-- 查询form -->
    <QueryForm ref="queryForm"></QueryForm>
    <!-- end -->
    <el-table
      :data="tableData"
      style="width: 100%"
      class="myTable"
      :header-cell-style="tableHeaderOption"
    >
      <el-table-column
        v-for="(item,index) in tableOptions"
        :key="index"
        :prop="item.prop"
        :label="item.label"
      >
        <!-- <template slot-scope="scope">
          <el-tooltip placement="top" effect="light">
            <div slot="content">
              <HoverContent></HoverContent>
            </div>
            <span>{{item.prop}}</span>
          </el-tooltip>
        </template>-->
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <div style="text-align:center">
            <el-link type="primary" class="op-deal">已处理</el-link>
            <el-button type="text" @click="getDetail(scope.$index)">查看</el-button>
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
        :page-size="20"
        @current-change="currentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import QueryForm from './QueryForm.vue'

@Component({
  components: { QueryForm }
})
export default class ErrorManage extends Vue {
  @Provide()
  tableData: any = [{ 任务ID: 12 }]
  tableOptions: any = [
    { prop: '故障名称', label: '故障名称' },
    { prop: '故障简述', label: '故障简述' },
    { prop: '分类', label: '分类' },
    { prop: '紧急度', label: '紧急度' },
    { prop: '故障状态', label: '故障状态' },
    { prop: '创建时间', label: '创建时间' },
    { prop: '最后一次更新时间', label: '最后一次更新时间' },
    { prop: '创建账号', label: '创建账号' }
  ]
  page: number = 1
  totalCount: number = 100
  tableHeaderOption: object = {
    background: 'rgba(250, 250, 250, 1)',
    'line-height': '22px',
    color: 'rgb(144, 147, 153)',
    'font-size': '14px',
    'padding-left': '10px',
    'font-family': 'PingFangSC-Medium'
  } //table  css

  /**
   * methods
   */
  // 搜搜条件
  handleSearch(obj: any) {
    console.log(obj)
  }
  // 调用接口查询
  queryData() {
    console.log(this.page)
  }
  // 故障详情
  getDetail(index: number) {
    let obj: object = { path: 'errorDetail', query: 1 }
    this.$router.push(obj)
  }
  // 分页
  currentChange(page: number) {
    this.page = page
    this.queryData()
  }
}
</script>

<style lang="scss" scoped>
.errorManage {
  width: 100%;
  height: 100%;
  .item-name {
    padding: 16px 0;
  }
  .op-deal {
    font-size: 14px;
    height: 14px;
    line-height: 14px;
    padding: 0 4px;
    margin: 0 4px;
    border-right: 1px solid rgba(0, 0, 0, 0.09);
    vertical-align: text-top;
  }
  // 表头居中
  /deep/.myTable-header-cell {
    text-align: center;
  }
  // 日期组件长度控制
  /deep/.el-date-editor.el-input,
  .el-date-editor.el-input__inner {
    width: 100%;
  }
}
</style>
