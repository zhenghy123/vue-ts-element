<template>
  <div class="layout">
    <!-- 头部 -->
    <LayoutHeader />

    <!-- 内容 -->
    <vuescroll ref="vs" :ops="scrollOps">
      <Content>
        <Sidebar slot="left"></Sidebar>
        <keep-alive slot="content" :include="keepAlive">
          <router-view></router-view>
        </keep-alive>
      </Content>
      <el-footer class="footer-wd">©2019 上海网达软件股份有限公司</el-footer>
    </vuescroll>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import LayoutHeader from './LayoutHeader.vue'
import Content from './Content.vue'
import Sidebar from './Sidebar.vue'
import vuescroll from 'vuescroll'
@Component({
  components: { LayoutHeader, Content, Sidebar, vuescroll }
})
export default class Layout extends Vue {
  @Provide()
  keepAlive: any = ['ProductionQuery', 'logQuery'] //组件的name
  scrollOps: any = {
    vuescroll: {
      mode: 'native',
      sizeStrategy: 'percent',
      detectResize: true
    },
    scrollPanel: {},
    rail: {},
    bar: {
      onlyShowBarOnScroll: false,
      keepShow: true,
      background: '#c1c1c1'
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  background: rgba(240, 242, 245, 1);
  display: flex;
  flex-direction: column;
  // min-width: 1333px;
  .footer-wd {
    height: 60px;
    // position: fixed;
    bottom: 0px;
    line-height: 20px;
    width: 100%;
    text-align: center;
    color: rgba(0, 0, 0, 0.45);
    font-size: 12px;
  }
}
</style>
