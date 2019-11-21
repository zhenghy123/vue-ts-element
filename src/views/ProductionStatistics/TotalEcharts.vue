<template>
  <!-- 点播视频快编工具 现场直播拆条工具 开路直播拆条工具 -->
  <div class="totalEcharts">
    <div class="chart-item">
      <p class="title">{{title}}</p>
      <ECharts ref="echarts" class="echart-item" theme="ovilia-green" :options="option"></ECharts>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Provide, Prop } from 'vue-property-decorator'
import ECharts from 'vue-echarts/components/ECharts.vue'
// import ECharts from 'echarts'

// 引入线形图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')

@Component({
  components: { ECharts }
})
export default class TotalEcharts extends Vue {
  @Prop() xAxisData: any
  @Prop() seriesData: any
  @Prop() title: any

  @Provide()
  echartHeight: string = '100%'
  option: object = {
    // title: {
    //   text: this.title
    // },
    lineStyle: {
      color: '#3ca0ff',
      type: 'solid'
    },
    areaStyle: {
      color: '#c1eaff'
    },
    textStyle: {
      align: 'right',
      color: '#666',
      fontSize: 12
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    grid: { show: 'true', borderWidth: '0', left: '15%', right: '15%' },
    calculable: true,
    xAxis: {
      type: 'category',
      boundaryGap: false,
      axisLine: {
        show: false
      },
      data: this.xAxisData
    },
    yAxis: {
      type: 'value',
      axisTick: {
        show: false
      },
      axisLine: {
        show: false
      },
      axisLabel: {
        margin: 2,
        formatter: function(value: any, index: any) {
          if (value >= 100000 && value < 10000000) {
            value = value / 10000 + '万'
          } else if (value >= 10000000) {
            value = value / 10000000 + '千万'
          }
          return value
        }
      }
    },
    series: [
      {
        data: this.seriesData,
        type: 'line',
        smooth: true,
        areaStyle: {},
        itemStyle: {
          normal: {
            color: '#00a9ff'
          }
        }
      }
    ]
  }

  /**
   * methods
   */
  getHeight() {
    let min = window.innerWidth > 1333 ? window.innerWidth : 1333
    let width = Math.floor(min / 5.3) //每个图标长度
    let height = Math.floor(width / 1.33) //266/200=1.33=width/height UI宽高比列
    // console.log('-----------', height)
    this.echartHeight = height + 'px'
    // return height + 'px'1
  }
  mounted() {
    // let _this = this as any
    // _this.getHeight()
    // window.addEventListener('resize', function() {
    //   _this.getHeight()
    // })
    // console.log('mounted', this.xAxisData, this.seriesData)
  }
  beforeDestroy() {
    // let _this = this
    // window.removeEventListener('resize', function() {
    //   _this.getHeight()
    // })
  }
}
</script>

<style lang="scss" scoped>
// @gray_light: #999;
// @gray_normal: #666;
// @gray_dark: #333;
// @font_small: 12px;

.totalEcharts {
  // border: 1px solid rgba(217, 217, 217, 1);
  .echart-item {
    min-height: 240px;
  }
  @media screen and (max-width: 1333px) {
    .echart-item {
      height: 240px;
    }
  }
  @media screen and (min-width: 1333px) and (max-width: 1599px) {
    .echart-item {
      height: 260px;
    }
  }
  @media screen and (min-width: 1600px) {
    .echart-item {
      height: 280px;
    }
  }
  .chart-item {
    position: relative;
    width: 100%;
    height: 100%;
  }
  .title {
    font-size: 14px;
    position: absolute;
    padding: 16px;
  }
  .echarts {
    width: 100%;
    // height: 100%;
    border: 1px solid rgba(217, 217, 217, 0.5);
    border-radius: 4px;
  }
  .echart-item :nth-child(1) {
    // width: 100% !important;
    // height: 105% !important;
    // transform: scale(1, 1.2);
    canvas {
      // width: 100% !important;
      // height: 100% !important;
    }
  }
}
</style>
