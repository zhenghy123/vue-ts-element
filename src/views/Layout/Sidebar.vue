<template>
  <el-scrollbar class="el-scrollbar">
    <!--  :default-active="$router.currentRoute.path" -->
    <el-menu class="el-menu-slide" :default-active="onRoutes" router>
      <template
        v-for="item in getRouters"
        v-if="item.hidden&&item.children&&item.children.length>0"
      >
        <el-menu-item
          v-if="item.children.length==1"
          :index="item.children[0].path"
          :key="item.name"
        >
          <img
            class="icn-img"
            v-if="item.children[0].meta.icon"
            :src="require(`@/assets/images/${item.children[0].meta.icon}.svg`)"
            alt
          />
          <!-- <i v-if="item.children[0].meta.icon" :class="item.children[0].meta.icon"></i> -->
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
        <!-- 多个子元素 -->
        <el-submenu v-else :index="item.children[0].path" :key="item.name">
          <template slot="title">
            <i v-if="item.meta.icon" :class="item.meta.icon"></i>
            <span v-if="item.meta&&item.meta.title" slot="title">{{item.meta.title}}</span>
          </template>
          <el-menu-item v-for="child in item.children" :index="child.path" :key="child.name">
            <i v-if="child.meta.icon" :class="child.meta.icon"></i>
            <span v-if="child.meta&&child.meta.title" slot="title">{{child.meta.title}}</span>
          </el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide, Watch } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
@Component({
  components: {}
})
export default class Sidebar extends Vue {
  @Getter('routers') getRouters: any

  created() {
    // console.log(this.getRouters)
  }
  get onRoutes() {
    let route = this.$route.meta.parent
      ? this.$route.meta.parent
      : this.$route.path
    // console.log('rrrrrrrrrrrrrrrrrrrrrrrrr', route, this.$route)
    return route
  }
}
</script>

<style lang="scss" scoped>
.el-scrollbar {
  height: 100%;
  border-right: 1px solid #e6e6e6;
  background: #fff;
  /deep/.el-scrollbar__wrap {
    overflow: hidden;
  }
  .el-menu-slide {
    border-right: none;
    i {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 14px;
    }
    // /deep/.el-menu-item.is-active {
    //   }
    /deep/.el-menu-item.is-active {
      color: rgba(24, 144, 255, 1);
      background: rgba(24, 144, 255, 0.15);
      border-right: 3px solid #409eff;
    }
    /deep/.el-menu-item,
    .el-submenu__title {
      height: 46px;
      line-height: 46px;
      width: 207px;
      box-sizing: border-box;
    }
    .icn-img {
      margin-right: 12px;
    }
  }
}
</style>
