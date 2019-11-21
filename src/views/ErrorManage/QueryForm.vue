
<template>
  <!-- 生产查询 -->
  <div>
    <el-form :model="queryForm" label-position="top" class="queryForm">
      <el-row>
        <!-- 来点动画 -->
        <!-- <el-collapse-transition>
        <transition-group>-->
        <el-col
          style="width:20%"
          v-for="(item,index) in queryArray"
          :key="index"
          v-show="item.show"
        >
          <el-form-item :label="item.label">
            <el-input
              v-if="item.type==='input'"
              v-model.trim="queryForm[item.key]"
              :maxlength="item.length"
              :placeholder="item.holder"
            ></el-input>
            <!-- select -->
            <el-select
              v-if="item.type==='select'"
              v-model="queryForm[item.key]"
              :placeholder="item.holder"
              clearable
            >
              <el-option
                v-for="item in []"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
            <!-- 日期 -->
            <el-date-picker
              v-if="item.type==='date'"
              v-model="queryForm[item.key]"
              type="date"
              :placeholder="item.holder"
            ></el-date-picker>
            <!-- <el-date-picker
              v-if="item.type==='date'"
              v-model="queryForm[item.key]"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>-->
          </el-form-item>
        </el-col>
        <!-- </transition-group>
        </el-collapse-transition>-->
        <el-col style="margin-top:29px;width:20%">
          <el-button type="primary" size="mini" @click="handleSearch">
            <i class="el-icon-search"></i> 搜索
          </el-button>
          <el-button size="mini" @click="resetForm">
            <i class="el-icon-refresh"></i> 重置
          </el-button>
          <el-button type="text" size="mini" @click="toggleSearch">
            {{this.searchShow?'收起':'展开'}}
            <i
              :class="{'el-icon-arrow-up':this.searchShow,'el-icon-arrow-down':!this.searchShow}"
            ></i>
          </el-button>
        </el-col>
      </el-row>
    </el-form>
    <!-- <el-row>
      <el-col class="flex-end">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit } from 'vue-property-decorator'
@Component({
  components: {}
})
export default class ProductionQuery extends Vue {
  @Provide()
  searchShow: boolean = true //查询条件切换
  queryArray: any = [
    {
      type: 'input',
      label: '故障名称：',
      key: '故障名称：',
      length: 20,
      holder: '请输入故障名称',
      selectData: [],
      show: true
    },
    {
      type: 'input',
      label: '创建账号：',
      key: '创建账号：',
      length: 20,
      holder: '请输入创建账号',
      selectData: [],
      show: true
    },
    {
      type: 'select',
      label: '故障分类：',
      key: '故障分类：',
      holder: '请选择故障分类',
      selectData: [],
      show: true
    },
    {
      type: 'select',
      label: '紧急程度：',
      key: '紧急程度：',
      holder: '请选择紧急程度',
      selectData: [],
      show: true
    },
    {
      type: 'select',
      label: '故障状态：',
      key: '故障状态：',
      holder: '请选择故障状态',
      selectData: [],
      show: this.searchShow
    },
    {
      type: 'date',
      label: '创建时间：',
      key: '创建时间：',
      holder: '请选择创建时间',
      selectData: [],
      show: this.searchShow
    },
    {
      type: 'date',
      label: '更新时间：',
      key: '更新时间：',
      holder: '请选择更新时间',
      selectData: [],
      show: this.searchShow
    }
  ]
  queryForm: object = {}
  proStaOptions: Array<any> = []
  disStaOptions: Array<any> = []
  sourStaOptions: Array<any> = []
  groupStaOptions: Array<any> = []
  taskStaOptions: Array<any> = []

  /**
   * methods
   */
  @Emit('handleSearch')
  handleSearch() {
    return this.queryForm
  }
  resetForm() {
    this.queryForm = {}
  }
  // 收起 展开切换
  toggleSearch() {
    this.searchShow = !this.searchShow
    let data = this.queryArray
    data.forEach((item: any, index: number) => {
      if (index >= 4) {
        item.show = this.searchShow
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.queryForm {
  // 左右间隔
  .el-form-item {
    margin-right: 40px;
    // 选择框和input长度统一
    .el-select {
      width: 100%;
    }
    .el-range-editor--small.el-input__inner {
      width: auto;
    }
    // input-number 加减隐藏
    // /deep/.el-input-number__decrease,
    // /deep/.el-input-number__increase {
    //   display: none;
    // }
  }
}
</style>
