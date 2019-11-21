<template>
  <!-- 点播视频快编工具 现场直播拆条工具 开路直播拆条工具 -->
  <div class="toolsStatistics">
    <h4>点播视频快编工具</h4>
    <br />
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item,index) in 4"
        :key="index"
        v-loading="getxAxisData.length===0"
        style="min-height:190px"
      >
        <TotalEcharts
          v-if="getxAxisData.length!==0"
          :xAxisData="getxAxisData"
          :seriesData="getseriesData(index,4)"
          :title="titleArray[index]"
        ></TotalEcharts>
      </el-col>
    </el-row>

    <br />
    <h4>现场直播拆条工具</h4>
    <br />
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item,index) in 4"
        :key="index"
        v-loading="getxAxisData.length===0"
        style="min-height:190px"
      >
        <TotalEcharts
          v-if="getxAxisData.length!==0"
          :xAxisData="getxAxisData"
          :seriesData="getseriesData(index,2)"
          :title="titleArray[index]"
        ></TotalEcharts>
      </el-col>
    </el-row>

    <br />
    <h4>开路直播拆条工具</h4>
    <br />
    <el-row :gutter="20">
      <el-col
        :span="6"
        v-for="(item,index) in 4"
        :key="index"
        v-loading="getxAxisData.length===0"
        style="min-height:190px"
      >
        <TotalEcharts
          v-if="getxAxisData.length!==0"
          :xAxisData="getxAxisData"
          :seriesData="getseriesData(index,3)"
          :title="titleArray[index]"
        ></TotalEcharts>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import TotalEcharts from './TotalEcharts.vue'

import { get_successRate } from '@/server/index'

@Component({
  components: { TotalEcharts }
})
export default class ToolsStatistics extends Vue {
  @Provide()
  titleArray: any = ['生产总量', '分发总量', '生产成功率', '分发成功率']
  getxAxisData: any = []

  productNumArr: any = [[], [], []]
  distNumArr: any = [[], [], []]
  productSuccessRateArr: any = [[], [], []]
  distSuccessRateArr: any = [[], [], []]

  // productNum1: any = []
  // productNum2: any = []
  // productNum3: any = []

  // distNum1: any = []
  // distNum2: any = []
  // distNum3: any = []

  // productSuccessRate1: any = []
  // productSuccessRate2: any = []
  // productSuccessRate3: any = []

  // distSuccessRate1: any = []
  // distSuccessRate2: any = []
  // distSuccessRate3: any = []

  // getseriesData: any = [];

  // getxAxisData(index: number): any {
  //   let data = [];
  //   for (let index = 0; index < 7; index++) {
  //     const element = '2019-11-0' + index;
  //     data.push(element);
  //   }
  //   return data;
  // }

  @Watch('getxAxisData')
  getxAxisDataChanged(val: string, oldVal: string) {
    this.getxAxisData = val
  }
  created() {
    // 生产率统计接口
    this.getSuccessRate()
  }
  getseriesData(index: number, type: number): any {
    switch (index) {
      case 0:
        return this.productNumArr[4 - type]
      case 1:
        return this.distNumArr[4 - type]
      case 2:
        return this.productSuccessRateArr[4 - type]
      case 3:
        return this.distSuccessRateArr[4 - type]
    }

    // if (type === '1') {
    //   switch (index) {
    //     case 0:
    //       return this.productNum1
    //     case 1:
    //       return this.distNum1
    //     case 2:
    //       return this.productSuccessRate1
    //     case 3:
    //       return this.distSuccessRate1
    //   }
    // } else if (type === '2') {
    //   switch (index) {
    //     case 0:
    //       return this.productNum2
    //     case 1:
    //       return this.distNum2
    //     case 2:
    //       return this.productSuccessRate2
    //     case 3:
    //       return this.distSuccessRate2
    //   }
    // } else if (type === '3') {
    //   switch (index) {
    //     case 0:
    //       return this.productNum3
    //     case 1:
    //       return this.distNum3
    //     case 2:
    //       return this.productSuccessRate3
    //     case 3:
    //       return this.distSuccessRate3
    //   }
    // }
  }

  // 生产率统计接口
  getSuccessRate() {
    // let productNum1 = []; //生产总量
    // let productNum2 = []; //生产总量
    // let productNum3 = []; //生产总量
    // let distNum1 = []; //分发总数
    // let distNum2 = []; //分发总数
    // let distNum3 = []; //分发总数
    // let productSuccessRate1 = []; //生产成功率
    // let productSuccessRate2 = []; //生产成功率
    // let productSuccessRate3 = []; //生产成功率
    // let distSuccessRate1 = []; //分发成功率
    // let distSuccessRate2 = []; //分发成功率
    // let distSuccessRate3 = []; //分发成功率

    get_successRate({ n: 7 }).then(res => {
      console.log('生产率统计接口', res)
      let result = res.data.result
      let _this = this as any
      // x数据
      _this.getxAxisData = _this._.cloneDeep(Object.keys(result))
      // console.log(_this.getxAxisData)

      //y数据
      _this.getxAxisData.forEach((item: any, index: number) => {
        let child = result[item].child
        let cdData = Object.keys(child)
        cdData.forEach((itm: any, ind: number) => {
          // 2：赛事直播拆条 3：开路直播拆条 4：点播拆条
          // console.log(itm, child[itm])
          // console.log(_this.productNumArr[4 - Number(itm)])

          _this.productNumArr[4 - Number(itm)].push(child[itm].productNum)
          _this.distNumArr[4 - Number(itm)].push(child[itm].distNum)
          _this.productSuccessRateArr[4 - Number(itm)].push(
            child[itm].productSuccessRate / 100
          )
          _this.distSuccessRateArr[4 - Number(itm)].push(
            child[itm].distSuccessRate / 100
          )

          // if (itm == 4) {
          //   // console.log(444444444444444)
          //   _this.productNum1.push(child[itm].productNum)
          //   _this.distNum1.push(child[itm].distNum)
          //   _this.productSuccessRate1.push(child[itm].productSuccessRate / 100)
          //   _this.distSuccessRate1.push(child[itm].distSuccessRate / 100)
          // } else if (itm == 2) {
          //   _this.productNum2.push(child[itm].productNum)
          //   _this.distNum2.push(child[itm].distNum)
          //   _this.productSuccessRate2.push(child[itm].productSuccessRate / 100)
          //   _this.distSuccessRate2.push(child[itm].distSuccessRate / 100)
          // } else if (itm == 3) {
          //   _this.productNum3.push(child[itm].productNum)
          //   _this.distNum3.push(child[itm].distNum)
          //   _this.productSuccessRate3.push(child[itm].productSuccessRate / 100)
          //   _this.distSuccessRate3.push(child[itm].distSuccessRate / 100)
          // }
        })
      })

      // 遍历结束
      // console.log('遍历结束', _this.getxAxisData)

      // _this.getxAxisData = JSON.parse(JSON.stringify(Object.keys(result)))
    })
  }
}
</script>

<style lang="scss" scoped>
.toolsStatistics {
}
</style>
