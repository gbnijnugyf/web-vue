<script setup lang="ts">
import router from '@/router';
import { ref } from 'vue';

const username = ref('');
const password = ref('');

const handleLogin = () => {
  if(username.value === '' || password.value === '') {
    alert('请输入用户名和密码')
    return;
  }else{
    router.push('/main')
  }
  // if(username.value === 'admin' && password.value === 'admin') {
  //   router.push('/main')
  // }
};

const forget = () => {
  router.push('/forget')
}
const register = () => {
  router.push('/register')
}
</script>

<template>
  <div class="login-container">
    <el-row><el-col :span="24" class="login-header">登录</el-col></el-row>
    <el-row class="login-row">
      <el-col :xs="24" :sm="12">
        <div class="login-option">
          <el-button id="qq"><i id="qq-icon"></i>QQ登录</el-button>
          <el-button id="wechat"><i id="wechat-icon"></i>微信登录</el-button>
          <el-button id="ali"><i id="ali-icon"></i>支付宝登录</el-button>
        </div>
      </el-col>
      <!-- <hr id="line" /> -->
      <el-col :xs="24" :sm="12">
        <div class="login-pannel">
          <el-form class="login-from">
            <el-form-item>
              <el-input v-model="username" placeholder="用户名"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="password" type="password" placeholder="密码"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin">登录</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button class="other" id="register" @click="register">注册</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="other" id="forget" @click="forget">修改密码</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss">
.login-container {
  margin: 0 auto;
  margin-top: 5%;
  width: 80%
}

.login-header {
  text-align: center;
  font-size: 24px;

  // padding: 2%;
}

.login-row {
  display: flex;

  @media screen and (max-width: 650px) {
    flex-direction: column;
  }
}

.el-row {
  margin: 0 auto;
  width: 80%;

  .el-col {
    // border: 1px solid black;
    background-color: rgb(242, 242, 242);

    .login-option {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;

      .el-button {
        margin-left: 0;
        width: 50%;
      }

      #qq {
        background-color: rgb(90, 130, 194);
        color: white;
      }

      #wechat {
        background-color: rgb(123, 172, 78);
        color: white;
      }
      #ali{
        background-color: rgb(234,235,234);
      }
    }

    .login-pannel {
      padding-top: 3%;
      margin: 0 auto;
      width: 50%;

      .el-button {
        margin: 0 auto;
      }
    }

    .login-pannel:before {
      content: "";
      position: absolute;
      top: 10%;
      bottom: 10%;
      left: 50%;
      border-left: 2px solid rgb(233, 233, 233);
      // border-bottom: 2px solid red;
    }

    @media screen and (max-width: 768px) {
      .login-pannel:before {
        top: 40%;
        left: 10%;
        right: 10%;
        bottom: auto;
        border-left: none;
        border-top: 2px solid rgb(233, 233, 233);
      }
    }
  }

  .other {
    // margin: 0 auto;
    width: 100%;
    background-color: rgb(80, 80, 80);
    color: white;
  }

}

#wechat-icon {
  background-image: url('../../public/wechat.png');
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

#qq-icon {
  background-image: url('../../public/qq.png');
  background-size: cover;
  width: 30px;
  height: 30px;
  margin-right: 5px;
}

#ali-icon {
  background-image: url('../../public/alipay.png');
  background-size: cover;
  width: 25px;
  height: 25px;
  margin-right: 5px;
}
</style>
