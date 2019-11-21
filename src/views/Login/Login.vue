<template>
  <div class="login">
    <LoginHeader>
      <el-form
        size="small"
        :rules="rules"
        :model="ruleForm"
        ref="ruleForm"
        label-position="left"
        label-width="0px"
        slot="container"
      >
        <!-- <div class="title">
          <h3>账号密码登录</h3>
        </div>-->
        <!-- username -->
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="ruleForm.username"
            auto-complete="off"
            placeholder="请输入用户名"
          >
            <img slot="prefix" src="@/assets/user.png" alt class="el-input__icon icon-prepend" />
            <!-- <i slot="prepend " class="el-input__icon icon-prepend"></i> -->
          </el-input>
        </el-form-item>

        <!-- password -->
        <el-form-item prop="pwd">
          <el-input type="password" v-model="ruleForm.pwd" auto-complete="off" placeholder="请输入密码">
            <!-- <i slot="prefix" class="fa fa-lock"></i> -->
            <img slot="prefix" src="@/assets/password.png" alt class="icon-prepend" />
          </el-input>
        </el-form-item>

        <!-- code -->
        <!-- <el-form-item prop="code">
          <div class="form-code">
            <el-input
              style="width:153px"
              type="password"
              v-model="ruleForm.code"
              auto-complete="off"
              placeholder="请输入图形验证码"
              maxlength="4"
              @keyup.enter.native="handleSubmit"
            >
              <i slot="prepend" class="fa fa-shield"></i>
            </el-input>
            <img @click="msgCodeClilck" :src="msgCode" alt="s" />
          </div>
        </el-form-item>-->

        <!-- 登录button -->
        <el-form-item>
          <el-row>
            <el-col style="display:flex">
              <el-button
                class="login-btn"
                :loading="isLogin"
                @click.native.prevent="handleSubmit"
                type="primary"
              >登录</el-button>
              <el-button class="login-btn" @click.native.prevent="handleReset" type="primary">重置</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <!-- 7天登录和忘记密码 -->
        <!-- <el-form-item>
          <el-checkbox v-model="ruleForm.autoLogin" :checked="ruleForm.autoLogin">7天内自动登录</el-checkbox>
          <el-button @click="$router.push('/password')" type="text" class="forget">忘记密码？</el-button>
        </el-form-item>-->
      </el-form>
    </LoginHeader>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Provide } from 'vue-property-decorator'
import { State, Getter, Mutation, Action } from 'vuex-class'
import LoginHeader from './LoginHeader.vue'
import { post_login } from '@/server/index'

@Component({
  components: { LoginHeader }
})
export default class Login extends Vue {
  // 存储用户信息
  @Action('setUser') setUser: any

  @Provide() isLogin: boolean = false
  @Provide() msgCode: string = 'http://192.168.1.77:8080/kaptcha'

  @Provide() ruleForm: {
    username: String
    pwd: String
    // code: String
    // autoLogin: boolean
  } = {
    username: '',
    pwd: ''
    // code: ''
    // autoLogin: true // 是否自动登录
  }

  @Provide() rules = {
    username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
    pwd: [{ required: true, message: '请输入密码', trigger: 'blur' }]
    // code: [{ required: true, message: '请输入验证码', trigger: 'blur' }]
  }
  /**
   * 验证码-现在没有预防添加
   */
  msgCodeClilck(): void {
    this.msgCode = `http://192.168.1.77:8080/kaptcha?${Math.random()}`
  }
  // 重置
  handleReset() {
    this.ruleForm = { username: '', pwd: '' }
  }
  handleSubmit(): void {
    let params = {
      username: this.ruleForm.username,
      password: (this as any).$md5(this.ruleForm.pwd)
    }
    let _this = this as any
    ;(this.$refs['ruleForm'] as any).validate((valid: boolean) => {
      if (valid) {
        // console.log("校验通过");
        post_login(params)
          .then((res: any) => {
            _this.$message.success('登录成功' || res.data.message) //接口返回【操作成功】不太友好
            console.log('登录', res)
            // 存储token
            // let user = { userName: this.ruleForm.username }
            sessionStorage.setItem('tsToken', JSON.stringify(res.data.result))
            // 存储到vuex中
            this.setUser(JSON.stringify(res.data.result))
            // 登录成功 跳转 /
            this.$router.push('/productionQuery')
          })
          .catch(e => {
            console.log('login-error', e)
          })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.login {
  height: 100%;
  width: 100%;
  background-image: url('../../assets/bg.jpg');
  background-repeat: no-repeat;
  // background-position: center 110px;
  background-size: 100% 100%;
  // 左边距加大
  /deep/.el-input--prefix .el-input__inner {
    padding-left: 50px;
  }
  // 增加左右距离
  /deep/.el-input__prefix {
    padding: 0 8px;
  }
  .form-code {
    display: flex;
    align-items: center;
    img {
      height: 32px;
      margin-left: 10px;
    }
  }
  .icon-prepend {
    height: 20px;
    width: 20px;
    margin-top: 4px;
  }
  .login-btn {
    flex: 1;
    background-image: url('../../assets/btn.png');
    background-repeat: no-repeat;
    // background-position: center 110px;
    background-size: 100% 100%;
    border: none;
  }
  .login-btn:hover {
    opacity: 0.95;
  }
}
// .title {
//   margin: 0px auto 40px auto;
//   text-align: center;
//   color: #505458;
// }

i {
  font-size: 14px;
  margin-left: 8px;
}
.forget {
  float: right;
}
</style>

