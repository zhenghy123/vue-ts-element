<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
@Component({
  components: {}
})
export default class App extends Vue {
  // 存储用户信息
  @Action('setUser') setUser: any
  @Action('setClientHeight') setClientHeight: any

  created() {
    this.setUser(sessionStorage.tsToken)
  }
  mounted() {
    this.setClientHeightFun()
  }
  /**
   * 设置的是宽度写的是高度
   */
  setClientHeightFun() {
    let that = this
    that.setClientHeight(document.body.clientWidth)
    // console.log('--------------------', document.body.clientWidth)

    window.onresize = () => {
      // _this.screenWidth = document.documentElement.clientWidth // 窗口宽度
      that.setClientHeight(document.body.clientWidth)
      // 定义窗口大小变更通知事件
      // that.$bus.emit('windowResize')
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100%;
}
</style>
