
<template>
  <!-- 生产查询 -->
  <div>
    <el-form :model="queryForm" label-position="top" class="queryForm">
      <el-row>
        <!-- 来点动画 -->
        <!-- <el-collapse-transition>
        <transition-group>-->
        <el-col
          :class="{'col-wid':true}"
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
              :collapse-tags="item.multiple"
            >
              <!--  :multiple="item.multiple" -->
              <el-option
                v-for="item in item.selectData"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
            <!-- 日期 -->
            <el-date-picker
              v-if="item.type==='date'"
              v-model="queryForm[item.key]"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
            <!-- 秒 -->
            <div v-if="item.type==='second'">
              <el-row>
                <el-col :span="10" style="display:flex">
                  <el-input-number
                    v-model.trim="queryForm['minCost']"
                    :min="0"
                    :controls="false"
                    placeholder="请输入"
                  ></el-input-number>
                  <span>&nbsp;S</span>
                </el-col>
                <el-col :span="4" style="text-align:center">--</el-col>
                <el-col :span="10" style="display:flex">
                  <el-input-number
                    v-model.trim="queryForm['maxCost']"
                    :min="0"
                    :controls="false"
                    placeholder="请输入"
                  ></el-input-number>
                  <span>&nbsp;S</span>
                </el-col>
              </el-row>
            </div>
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
    <!-- {{this.source}} -->
    <!-- <el-row>
      <el-col class="flex-end">
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-col>
    </el-row>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Emit, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component({
  components: {}
})
export default class ProductionQuery extends Vue {
  @Getter('getData') getData: any

  @State('dealStatus') dealStatus: any
  @State('source') source: any
  @State('busType') busType: any
  @State('disPlate') disPlate: any

  @Provide()
  searchShow: boolean = true //查询条件切换
  queryArray: any = [
    {
      type: 'input',
      label: '任务ID：',
      key: 'taskId',
      length: 30,
      holder: '请输入任务ID',
      show: true
    },
    {
      type: 'input',
      label: '多段截取子ID：',
      key: 'ID1',
      length: 30,
      holder: '请输入多段截取子ID',
      show: true
    },
    {
      type: 'input',
      label: '媒资ID：',
      key: 'ID2',
      length: 30,
      holder: '请输入媒资ID',
      show: true
    },
    {
      type: 'input',
      label: '节目ID：',
      key: 'ID3',
      length: 30,
      holder: '请输入节目ID',
      show: true
    },
    {
      type: 'input',
      label: '素材作品ID：',
      key: 'ID4',
      length: 30,
      holder: '请输入素材作品ID',
      show: this.searchShow
    },
    {
      type: 'input',
      label: '视频名称：',
      key: 'name',
      length: 30,
      holder: '请输入视频名称',
      show: this.searchShow
    },
    {
      type: 'input',
      label: '用户账号：',
      key: 'operation',
      length: 30,
      holder: '请输入用户账号',
      show: this.searchShow
    },
    {
      type: 'select',
      label: '来源：',
      key: 'sourceCode',
      length: 30,
      holder: '请选择来源',
      selectData: [],
      multiple: true,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '处理状态：',
      key: 'statusCode',
      length: 30,
      holder: '请选择处理状态',
      selectData: [],
      show: this.searchShow
    },
    {
      type: 'select',
      label: '业务类型：',
      key: 'businessTypeCode',
      length: 30,
      holder: '请选择业务类型',
      selectData: [],
      multiple: true,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '分发平台：',
      key: 'platformCode',
      length: 30,
      holder: '请选择分发平台',
      selectData: [],
      show: this.searchShow
    },
    {
      type: 'second',
      label: '耗时范围：',
      key: 'costArr',
      length: 30,
      holder: '请输入',
      show: this.searchShow
    },
    {
      type: 'date',
      label: '时间范围：',
      key: 'timeArr',
      length: 30,
      holder: '请选择',
      show: this.searchShow
    }
  ]
  queryForm: any = {}
  proStaOptions: Array<any> = []
  disStaOptions: Array<any> = []
  sourStaOptions: Array<any> = []
  groupStaOptions: Array<any> = []
  taskStaOptions: Array<any> = []

  @Watch('source')
  sourceChanged(val: string, oldVal: string) {
    this.queryArray[7].selectData = val
  }
  @Watch('dealStatus')
  dealStatusChanged(val: string, oldVal: string) {
    this.queryArray[8].selectData = val
  }
  @Watch('busType')
  busTypeChanged(val: string, oldVal: string) {
    this.queryArray[9].selectData = val
  }
  @Watch('disPlate')
  disPlateChanged(val: string, oldVal: string) {
    this.queryArray[10].selectData = val
  }
  /**
   * methods
   */
  mounted() {
    // this.queryArray[7].selectData = this.source
    // this.queryArray[8].selectData = this.dealStatus
    // this.queryArray[9].selectData = this.busType
    // this.queryArray[10].selectData = this.disPlate
    // console.log(this.source)
  }
  @Emit('handleSearch')
  handleSearch() {
    let form: any = (this as any)._.cloneDeep(this.queryForm)
    // 唯一表示处理
    let idArr: any = []
    let idList: any = ['ID1', 'ID2', 'ID3', 'ID4']
    idArr.push(form.ID1 || null, form.ID2, form.ID3, form.ID4)
    idArr = idArr.filter((item: any) => {
      return item && item.trim()
    })
    if (idArr.length !== 0) {
      form.uniqueId = idArr.join(',')
    }
    idList.forEach((item: any) => {
      if (form[item]) {
        delete form[item]
      }
    })
    console.log(idArr)
    // 日期处理
    if (form.timeArr && form.timeArr.length !== 0) {
      form.startTime = new Date(form.timeArr[0]).getTime()
      form.endTime = new Date(form.timeArr[1]).getTime()
    }

    let arr = Object.keys(form)
    console.log(arr)
    let arrSelect = ['sourceCode', 'businessTypeCode']

    arr.map(item => {
      // undefined删除
      if (typeof form[item] === 'undefined') {
        delete form[item]
      } else if (
        //
        form[item] instanceof String &&
        !form[item]
      ) {
        delete form[item]
      } else if (
        // 空数组删除
        form[item] instanceof Array &&
        form[item].length === 0
      ) {
        delete form[item]
      } else if (form[item] === ',,,') {
        delete form[item]
      }
      // 数组select处理
      if (arrSelect.includes(item) && form[item] !== '') {
        form[item] = [form[item], '123']
      }
    })
    console.log('form', form)

    return form
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
  .col-wid {
    width: 20%;
    height: 80px;
  }
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
