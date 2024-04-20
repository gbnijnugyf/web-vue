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
};

const ruleForm = reactive({
    username: "",
    pass: "",
    email: "",
    date: "",
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

const size = ref<'default' | 'large' | 'small'>('default')
const value2 = ref('')
const shortcuts = [
    {
        text: '今天',
        value: new Date(),
    },
    {
        text: '昨天',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24)
            return date
        },
    },
    {
        text: '一周前',
        value: () => {
            const date = new Date()
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
            return date
        },
    },
]
const disabledDate = (time: Date) => {
    return time.getTime() > Date.now()
}
</script>

<template>
    <div class="register-container">
        <el-row>
            <el-col :span="24" class="register-header">注册</el-col>
            <el-col class="register-pannel">
                <el-form ref="ruleFormRef" style="max-width: 600px" :model="ruleForm" status-icon :rules="rules"
                    label-width="auto" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input v-model.number="ruleForm.username" placeholder="用户名" />
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" placeholder="密码" />
                    </el-form-item>
                    <el-form-item prop="email">
                        <el-input v-model="ruleForm.email" type="password" autocomplete="off" placeholder="电子邮箱" />
                    </el-form-item>
                    <el-date-picker v-model="value2" type="date" placeholder="Pick a day" :disabled-date="disabledDate"
                        :shortcuts="shortcuts" :size="size" />
                    <el-form-item>
                        <el-button type="primary" @click="submitForm(ruleFormRef)">
                            注册
                        </el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col><el-button @click="returnLogin">返回登录界面</el-button></el-col>
        </el-row>
    </div>
</template>

<style lang="scss">
.register-container {
    margin: 0 auto;
    width: 30%;
    min-width: 300px;

    .register-header {
        text-align: center;
        font-size: 24px;
    }

    .register-pannel {
        display: flex;
        justify-content: center;

        .el-button {
            width: 100%;
            margin: 0 auto;
            margin-top: 5%;
            background-color: rgb(122, 183, 113);
            border: none;
        }
    }

    .el-button {
        background-color: rgb(102, 102, 102);
        color: white;
        width: 100%
    }
}
</style>
