<template >
  <div class="errorDetail">
    <h3 class="item-name">故障信息</h3>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class ErrorDetail extends Vue {
  //
  @Provide()
  activeName: string = 'first'

  /**
   * methods
   */

  // 调用接口查询
  handleClick() {
    console.log()
  }
}
</script>
<style lang="scss" scoped>
.errorDetail {
  width: 100%;
  height: 100%;
  .item-name {
    padding: 16px 0;
  }
}
</style>