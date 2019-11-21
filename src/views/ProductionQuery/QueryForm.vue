
<template>
  <!-- 生产查询 -->
  <div>
    <el-form :model="queryForm" label-position="top" class="queryForm">
      <el-row>
        <!-- 来点动画 -->
        <!-- <el-collapse-transition>
        <transition-group>-->
        <el-col
          v-for="(item,index) in queryArray"
          :key="index"
          :class="{'col-wid':true}"
          v-show="item.show"
        >
          <!--  :class="{'col-wid':true,'show_in':item.show,'show_on':!item.show}" -->
          <el-form-item :label="item.label">
            <el-input
              v-if="item.type==='input'"
              v-model.trim="queryForm[item.key]"
              :placeholder="item.holder"
            ></el-input>
            <!--   :maxlength="item.length" -->
            <el-select
              v-if="item.type==='select'"
              v-model="queryForm[item.key]"
              :placeholder="item.holder"
              :filterable="item.search"
              clearable
            >
              <el-option
                v-for="item in item.selectData"
                :key="item.code"
                :label="item.name"
                :value="item.code"
              ></el-option>
            </el-select>
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
import { Component, Vue, Provide, Emit, Watch } from 'vue-property-decorator'
import { post_workgroup, get_groupTask } from '@/server/index'

@Component({
  components: {}
})
export default class ProductionQuery extends Vue {
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
      label: 'SVID：',
      key: 'svid',
      length: 30,
      holder: '请输入SVID',
      show: true
    },
    {
      type: 'input',
      label: '媒资D：',
      key: 'assetId',
      length: 30,
      holder: '请输入媒资D',
      show: true
    },
    {
      type: 'input',
      label: '节目ID：',
      key: 'programId',
      length: 30,
      holder: '请输入节目ID',
      show: true
    },
    {
      type: 'input',
      label: '素材作品ID：',
      key: 'id',
      length: 30,
      holder: '请输入素材作品ID',
      show: this.searchShow
    },
    {
      type: 'input',
      label: '视频名称：',
      key: 'title',
      length: 30,
      holder: '请输入视频名称',
      show: this.searchShow
    },
    {
      type: 'select',
      label: '生产状态：',
      key: 'statusProduct',
      length: 30,
      holder: '请选择生产状态',
      selectData: (this as any).enum.statusProduct,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '分发状态：',
      key: 'statusDist',
      length: 30,
      holder: '请选择分发状态',
      selectData: (this as any).enum.statusDist,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '生产来源：',
      key: 'sourceCode',
      length: 30,
      holder: '请选择生产来源',
      selectData: (this as any).enum.sourceCode,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '工作组：',
      key: 'hbGroupId',
      length: 30,
      holder: '请选择工作组',
      selectData: [],
      search: true,
      show: this.searchShow
    },
    {
      type: 'select',
      label: '任务：',
      key: 'hbTaskId',
      length: 30,
      holder: '请选择任务',
      selectData: [],
      show: (this as any).searchShow
    },
    {
      type: 'input',
      label: '账号名称：',
      key: 'userName',
      length: 30,
      holder: '请输入账号名称',
      selectData: [],
      show: (this as any).searchShow
    }
  ]
  queryForm: object = {}
  // proStaOptions: Array<any> = []
  // disStaOptions: Array<any> = []
  // sourStaOptions: Array<any> = []
  // groupStaOptions: Array<any> = []
  // taskStaOptions: Array<any> = []

  @Watch('queryForm.hbGroupId')
  onChildChanged(val: string, oldVal: string) {
    let _this = this as any
    if (JSON.stringify(_this.queryForm) !== '{}') {
      let hbGroupId = _this.queryForm['hbGroupId']
      let hbTaskId = _this.queryForm['hbTaskId']

      console.log('queryForm change', hbGroupId)

      delete _this.queryForm['hbTaskId']
      if (hbGroupId === '') {
        console.log('工作组清空')
        _this.queryArray[10].selectData = []
      }
      if (hbGroupId !== '') {
        get_groupTask({ groupId: hbGroupId }).then(res => {
          res.data.result.forEach((item: any, index: number) => {
            item.code = item.taskId
            item.name = item.taskName
          })
          this.queryArray[10].selectData = res.data.result
        })
      }
    }
  }
  /**
   * methods
   */
  mounted() {
    // 工作组查询
    this.getGroupList()
  }
  getGroupList() {
    post_workgroup({}).then(res => {
      res.data.result.forEach((item: any, index: number) => {
        item.code = item.groupId
        item.name = item.groupName
      })
      this.queryArray[9].selectData = res.data.result
    })
  }

  @Emit('handleSearch')
  handleSearch() {
    let _this = this as any
    Object.keys(this.queryForm).forEach((item: any, index: number) => {
      console.log(_this.queryForm[item])

      if (_this.queryForm[item] === '') {
        delete _this.queryForm[item]
      }
    })
    return this.queryForm
  }
  @Emit('resetForm')
  resetForm() {
    this.queryForm = {}
    this.queryArray[10].selectData = []
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
    // .el-form-item__label {
    //   height: auto;
    //   line-height: normal !important;
    //   padding-bottom: 8px !important;
    // }
    // 选择框和input长度统一
    .el-select {
      width: 100%;
      overflow: hidden;
    }
  }
  .col-wid {
    width: 20%;
    height: 80px;
  }
  .show_in {
    width: 20%;
    animation: go_in 1s;
    opacity: 1;
    animation-fill-mode: forwards;
  }
  @keyframes go_in {
    0% {
      opacity: 0;
      width: 0;
    }
    99% {
      opacity: 1;
    }
    100% {
      // height: 100%;
      opacity: 1;
      width: 20%;
      height: 100%;
      display: block;
    }
  }
  .show_on {
    animation: go_on 1s;
    opacity: 0;
    height: 100%;
    display: block;
    width: 25%;
    animation-fill-mode: forwards;
  }
  @keyframes go_on {
    0% {
      opacity: 1;
      height: 100%;
      width: 25%;
    }
    100% {
      opacity: 0;
      height: 0;
      width: 0;
      display: none;
    }
  }
}
</style>
