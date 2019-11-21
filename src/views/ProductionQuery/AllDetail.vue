<template >
  <div class="allDetail">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="myTabs">
      <el-tab-pane label="内容详情" name="first">
        <ContentDetail v-if="activeName==='first'" :id="this.$route.query.id"></ContentDetail>
      </el-tab-pane>
      <el-tab-pane label="处理详情" name="second">
        <DealDetail
          v-if="activeName==='second'"
          :id="this.$route.query.id"
          :taskId="this.$route.query.taskId"
        ></DealDetail>
      </el-tab-pane>
      <el-tab-pane label="分发详情" name="third">
        <DistributeDetail v-if="activeName==='third'" :id="this.$route.query.id"></DistributeDetail>
      </el-tab-pane>
    </el-tabs>
    <!-- <router-view></router-view> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import ContentDetail from './ContentDetail.vue'
import DealDetail from './DealDetail.vue'
import DistributeDetail from './DistributeDetail.vue'

@Component({
  components: { ContentDetail, DealDetail, DistributeDetail }
})
export default class AllDetail extends Vue {
  //
  @Provide()
  activeName: string = 'first'

  /**
   * methods
   */
  mounted() {
    console.log(111111, this.$route.query.id)
  }

  // 调用接口查询
  handleClick() {
    console.log()
  }
}
</script>
<style lang="scss" scoped>
.allDetail {
  width: 100%;
  height: 100%;
  .myTabs {
    /deep/.el-tabs__header {
      margin: 9px 0 15px;
    }
  }
}
</style>