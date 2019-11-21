<template>
  <el-container class="layout-content" :style="{'width':clientWidth+'px'}">
    <!-- 左侧菜单 -->
    <el-aside width="207px">
      <slot name="left"></slot>
    </el-aside>

    <!-- 右侧页面 -->
    <el-main>
      <!-- 面包屑 -->
      <div class="top">
        <!-- <i class="fa fa-home"></i> -->
        <el-breadcrumb class="breadcrumb" separator="/">
          <el-breadcrumb-item
            v-for="(item,index) in breadCrumbItems"
            :key="index"
            :to="{path:item.path}"
          >{{item.title}}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <!-- 页面内容 -->
      <div class="content">
        <slot name="content"></slot>
      </div>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Provide, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'

@Component({
  components: {}
})
export default class Content extends Vue {
  @State('clientWidth') clientWidth: any

  @Provide() breadCrumbItems: any // 面包屑的数组

  @Watch('$route') handleRouteChange(to: any) {
    this.initBreadCrumbItems(to)
  }

  getClientwidth() {
    return document.documentElement.clientWidth + 'px'
  }
  created() {
    this.initBreadCrumbItems(this.$route)
  }

  initBreadCrumbItems(router: any) {
    // console.log(router);
    // 根路由title
    let breadCrumbItems: any = [{ path: '/', title: '管理后台' }]

    // 遍历父级到当前子路由的页面的title和path 存储到数组里
    for (const index in router.matched) {
      if (router.matched[index].meta && router.matched[index].meta.title) {
        // 对两个重复的生产详情做处理
        if (
          Number(index) > 0 &&
          router.matched[index].meta &&
          router.matched[index].meta.title ===
            router.matched[Number(index) - 1].meta.title
        ) {
        } else {
          breadCrumbItems.push({
            path: router.matched[index].path ? router.matched[index].path : '/',
            title: router.matched[index].meta.title
          })
        }
      }
    }

    this.breadCrumbItems = breadCrumbItems
  }
}
</script>

<style lang="scss" scoped>
.layout-content {
  width: 100%;
  height: 100%;
  padding: 24px;
  min-width: 1333px;
  min-height: 920px;
  .el-main {
    padding: 24px;
    // display: flex;
    // flex-direction: column;
    background: #fff;
    .top {
      background: #fff;
      // height: 54px;
      border-right: none;
      // border-bottom: 1px solid #e6e6e6;
      display: flex;
      align-items: center;
      i {
        font-size: 20px;
        cursor: pointer;
        padding-left: 16px;
      }
      .breadcrumb {
        // padding-left: 16px;
        line-height: 22px;
      }
      /deep/.el-breadcrumb__inner.is-link {
        color: rgba(0, 0, 0, 0.45);
        font-weight: normal;
      }
      /deep/.el-breadcrumb__item:last-child .el-breadcrumb__inner,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover,
      .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
        color: rgba(0, 0, 0, 0.65);
      }
    }
    .content {
      // padding: 10px;
      // height: calc(100% - 54px);
      box-sizing: border-box;
      background: #fff;
      padding-bottom: 20px;
    }
  }
}
</style>