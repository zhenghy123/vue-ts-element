<template>
  <div class="layout-header">
    <el-row>
      <el-col :xs="10" :sm="12" :md="14" :lg="16" :xl="18">
        <div class="system-info">
          <img class="logo" src="@/assets/logo.svg" alt />
          <span class="line-logo"></span>
          <span class="title" @click="gotoHome">网达统一管理后台</span>
        </div>
      </el-col>
      <el-col :xs="14" :sm="12" :md="10" :lg="8" :xl="6">
        <el-dropdown @command="userCommand" class="system-user" trigger="click">
          <span class="userinfo-inner">
            <img :src="require('@/assets/头像.svg')" alt />
            <span>{{getUser.userName}}</span>
            <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item command="usercenter">个人中心</el-dropdown-item> -->
            <!-- divided -->
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import { post_logout } from '@/server/index'

@Component({
  components: {}
})
export default class LayoutHeader extends Vue {
  @Getter('user') getUser: any

  userCommand(command: string): void {
    let _this = this
    if (command == 'logout') {
      post_logout({}).then((res: any) => {
        sessionStorage.removeItem('tsToken')
        this.$router.replace('/login')
      })
      post_logout({}).then((res: any) => {
        sessionStorage.removeItem('tsToken')
        this.$router.replace('/login')
      })
    }

    // if (command == 'usercenter') this.$router.push('/user')
  }
  gotoHome(): void {
    // this.$router.push('/home')
  }
  created() {
    // console.log(this.getUser);
  }
}
</script>

<style lang="scss" scoped>
.layout-header {
  background: #fff;
  // line-height: 64px;
  color: rgba(0, 0, 0, 0.65);
  height: 64px;
  box-shadow: 0 1px 4px 0 rgba(0, 21, 41, 0.12);
}

.system-info {
  text-align: left;
  .logo {
    // width: 40px;
    height: 24px;
    // border-radius: 50px;
    margin-top: 20px;
    margin-left: 20px;
    margin-right: 10px;
    float: left;
    position: relative;
  }
  .line-logo {
    display: inline-block;
    width: 1px;
    height: 24px;
    background-color: rgba(232, 232, 232, 1);
    margin-right: 8px;
    vertical-align: sub;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
    color: rgba(0, 173, 238, 1);
    line-height: 64px;
    cursor: pointer;
  }
}
.system-user {
  text-align: right;
  float: right;
  padding-right: 16px;
  .userinfo-inner {
    height: 64px;
    line-height: 64px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 16px;
    cursor: pointer;
    display: flex;
    align-content: center;
    img {
      width: 24px;
      height: 100%;
      // border-radius: 20px;
      // margin: 0px 10px;
      // float: right;
    }
    span {
      margin: 0 8px;
    }
    i {
      margin: 24px 0;
    }
  }
}
</style>
