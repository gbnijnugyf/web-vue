<script setup lang="ts">
import { reactive, ref } from "vue";
import router from "@/router";
import type { FormInstance, FormRules } from "element-plus";

const ruleFormRef = ref<FormInstance>();

const checkUsername = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error("请输入用户名"));
    }
};


const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请输入密码"));
    } else {
        if (ruleForm.checkPass !== "") {
            if (!ruleFormRef.value) return;
            ruleFormRef.value.validateField("checkPass", () => null);
        }
        callback();
    }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
        callback(new Error("请再次输入密码"));
    } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致"));
    } else {
        callback();
    }
};

const ruleForm = reactive({
    username: "",
    pass: "",
    checkPass: "",
});

const rules = reactive<FormRules<typeof ruleForm>>({
    pass: [{ validator: validatePass, trigger: "blur" }],
    checkPass: [{ validator: validatePass2, trigger: "blur" }],
    username: [{ validator: checkUsername, trigger: "blur" }],
});

const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
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
</script>

<template>
    <div class="forget-container">
        <el-row>
            <el-col :span="24" class="forget-header">修改密码</el-col>
            <el-col class="forget-pannel">
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                    label-width="auto" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model.number="ruleForm.username" placeholder="用户名" />
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="新密码" />
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" placeholder="确认密码" />
                    </el-form-item>

                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            确认
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col><el-button @click="returnLogin">返回登录界面</el-button></el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.forget-container {
    margin: 0 auto;
    width: 30%;
    min-width: 300px;
    .forget-header {
        text-align: center;
        font-size: 24px;
    }

    .forget-pannel {
        display: flex;
        justify-content: center;

        .el-button {
            width: 100%;
            margin: 0 auto;
            background-color: rgb(122,183,113);
            border: none;
        }
    }
    .el-button{
        background-color: rgb(102,102,102);
        color: white;
        width: 100%
    }
}
</style>