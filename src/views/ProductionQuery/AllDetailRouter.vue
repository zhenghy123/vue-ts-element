<template >
  <div class="allDetailRouter">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class AllDetailRouter extends Vue {
  //

  /**
   * methods
   */
  mounted() {}
}
</script>
<style lang="scss" scoped>
.allDetailRouter {
  width: 100%;
  height: 100%;
}
</style>