<script setup lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import { changePassword } from "@/service/service";

const ruleFormRefLast = ref<FormInstance>();
const ruleFormRefNew = ref<FormInstance>();

const checkUsername = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入用户名"));
  }
  callback();
};

const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== ruleFormNew.newPass) {
    callback(new Error("两次输入密码不一致"));
  } else {
    callback();
  }
};

const ruleFormLast = reactive({
  username: "",
  pass: "",
});
const ruleFormNew = reactive({
  newPass: "",
  checkPass: "",
});

const rulesLast = reactive<FormRules<typeof ruleFormLast>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }],
});
const rulesNew = reactive<FormRules<typeof ruleFormNew>>({
  newPass: [{ validator: validatePass, trigger: "blur" }],
  checkPass: [{ validator: validatePass2, trigger: "blur" }],
});

const submitForm = () => {
  if (!ruleFormRefLast.value) return;
  ruleFormRefLast.value.validate((valid) => {
    if (!valid) {
      console.log("error submit!");
      return false;
    }
    if (!ruleFormRefNew.value) return;
    ruleFormRefNew.value.validate(async (valid) => {
      if (valid) {
        console.log(ruleFormLast, ruleFormNew);

        const res = await changePassword({
          userName: ruleFormLast.username,
          oldPassword: ruleFormLast.pass,
          newPassword: ruleFormNew.newPass,
        });
        console.log(res);
        if (res.data.code === '0') {
          ElMessage.success(res.data.message)
          router.push("/");
        }else{
          ElMessage.error(res.data.message)
        }
        console.log("submit!");
      } else {
        console.log("error submit!");
        return false;
      }
    });
  });
};

const returnLogin = () => {
  router.push("/");
};
</script>

<template>
  <div class="register-container">
    <el-row>
      <el-col :span="24" class="register-header">修改密码</el-col>
    </el-row>

    <el-row class="register-pannel">
      <el-col :xs="24" :sm="12">
        <el-form
          ref="ruleFormRefLast"
          style="max-width: 600px"
          :model="ruleFormLast"
          status-icon
          :rules="rulesLast"
          label-width="auto"
          class="register-form"
        >
          <el-form-item prop="username">
            <el-input v-model="ruleFormLast.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleFormLast.pass"
              type="password"
              autocomplete="off"
              placeholder="密码"
            />
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-form
          ref="ruleFormRefNew"
          style="max-width: 600px"
          :model="ruleFormNew"
          status-icon
          :rules="rulesNew"
          label-width="auto"
          class="register-form"
        >
          <el-form-item prop="newPass">
            <el-input
              v-model="ruleFormNew.newPass"
              placeholder="新密码"
              type="password"
            />
          </el-form-item>
          <el-form-item prop="checkPass">
            <el-input
              v-model="ruleFormNew.checkPass"
              type="password"
              autocomplete="off"
              placeholder="确认新密码"
            />
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :xs="24" :sm="12">
        <el-button class="other" id="register" @click="submitForm()"
          >修改密码</el-button
        >
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-button class="other" id="forget" @click="returnLogin"
          >返回登录界面</el-button
        >
      </el-col>
    </el-row>
    <!-- <el-row
      ><el-col
        ><el-button @click="returnLogin">返回登录界面</el-button></el-col
      ></el-row
    > -->
  </div>
</template>

<style lang="scss">
.register-container {
  margin: 0 auto;
  margin-top: 5%;

  width: 80%;
  min-width: 300px;

  .register-header {
    text-align: center;
    font-size: 24px;
  }

  .register-pannel {
    display: flex;
    justify-content: center;
    .register-form {
      margin-top: 4%;
      margin-left: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 80%;
    }
    .el-button {
      width: 100%;
      margin: 0 auto;
      margin-top: 5%;
      background-color: rgb(122, 183, 113);
      border: none;
    }
  }
  .register-pannel:before {
    content: "";
    position: absolute;
    top: 10%;
    bottom: 10%;
    left: 50%;
    border-left: 2px solid rgb(233, 233, 233);
    // border-bottom: 2px solid red;
  }
  @media screen and (max-width: 768px) {
    .register-pannel:before {
      top: 60%;
      left: 10%;
      right: 10%;
      bottom: auto;
      border-left: none;
      border-top: 2px solid rgb(233, 233, 233);
    }
  }
  .el-button {
    background-color: rgb(102, 102, 102);
    color: white;
    width: 100%;
  }
}
.avatar-uploader > .el-upload {
  width: 50%;
  margin-left: 25%;
  //   margin-top: 6%;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .avatar {
  width: 100%;
  height: 100%;
  display: block;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
</style>
