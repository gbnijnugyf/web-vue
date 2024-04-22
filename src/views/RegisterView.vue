<script setup lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();
const imageUrl = ref<string>();

const handleAvatarSuccess = (res: any, file: File) => {
  imageUrl.value = URL.createObjectURL(file);
};

const beforeAvatarUpload = (file: File) => {
  const isJPG = file.type === "image/jpeg";
  const isPNG = file.type === "image/png";
  const isLt2M = file.size / 1024 / 1024 < 2;

  if (!isJPG && !isPNG) {
    ElMessage.error("上传头像图片只能是 JPG 或 PNG 格式!");
  }
  if (!isLt2M) {
    ElMessage.error("上传头像图片大小不能超过 2MB!");
  }

  if ((isJPG || isPNG) && isLt2M) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target) imageUrl.value = e.target.result as string;
    };
    reader.readAsDataURL(file);
  }

  return (isJPG || isPNG) && isLt2M;
};

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
    if (ruleForm.email !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const checkEmail = (rule: any, value: any, callback: any) => {
  if (!value) {
    return callback(new Error("请输入邮箱"));
  }
  //邮箱校验
  const reg = /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/;
  if (!reg.test(value)) {
    return callback(new Error("邮箱格式不正确"));
  }
  callback();
};

const ruleForm = reactive({
  username: "",
  pass: "",
  email: "",
  date: "", //TODO: 需要格式转换为yy-mm-dd
});

const rules = reactive<FormRules<typeof ruleForm>>({
  pass: [{ validator: validatePass, trigger: "blur" }],
  email: [{ validator: checkEmail, trigger: "blur" }],
  username: [{ validator: checkUsername, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
        console.log(ruleForm.date)
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};

const returnLogin = () => {
  router.push("/");
};

const size = ref<"default" | "large" | "small">("default");
// const value2 = ref("");
const shortcuts = [
  {
    text: "今天",
    value: new Date(),
  },
  {
    text: "昨天",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24);
      return date;
    },
  },
  {
    text: "一周前",
    value: () => {
      const date = new Date();
      date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
      return date;
    },
  },
];
const disabledDate = (time: Date) => {
  return time.getTime() > Date.now();
};
</script>

<template>
  <div class="register-container">
    <el-row>
      <el-col :span="24" class="register-header">注册</el-col>
    </el-row>

    <el-row class="register-pannel">
      <el-col :xs="24" :sm="12">
        <el-form
          ref="ruleFormRef"
          style="max-width: 600px"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="auto"
          class="register-form"
        >
          <el-form-item prop="username">
            <el-input v-model.number="ruleForm.username" placeholder="用户名" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              v-model="ruleForm.email"
              autocomplete="off"
              placeholder="电子邮箱"
            />
          </el-form-item>
          <el-date-picker
            v-model="ruleForm.date"
            type="date"
            placeholder="Pick a day"
            :disabled-date="disabledDate"
            :shortcuts="shortcuts"
            :size="size"
          />
          <el-form-item/>
        </el-form>
      </el-col>
      <el-col :xs="24" :sm="12">
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <el-button class="other" id="register" @click="submitForm(ruleFormRef)"
          >注册</el-button
        >
      </el-col>
      <el-col :span="12">
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
      margin-left: 10%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      // align-items: flex-start;
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
// .avatar-uploader{
//     border: 1px dashed #d9d9d9;
//     width: 50%;
//     margin: 0 auto;
// }
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
