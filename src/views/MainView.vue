<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { House, Switch, Monitor } from "@element-plus/icons-vue";
import { ArrowDown } from "@element-plus/icons-vue";
import { RouterView } from "vue-router";
import router from "@/router";
import { changeTheme } from "@/App.vue";

const item = {
  date: "2016-05-02",
  name: "Tom",
  address: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 20 }).fill(item));
const username = ref(localStorage.getItem("userName"));

onMounted(() => {
  username.value = localStorage.getItem("userName");
});

function handleSelect(keyPath: string) {
  router.push(keyPath);
}

const quit = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userName");
  router.push("/login");
};

const displayCalendar = () => {
  router.push("/main/calendar");
};
</script>
<template>
  <el-container class="main-container">
    <el-aside class="my-aside" width="18%">
      <el-scrollbar>
        <el-menu :default-openeds="['1']">
          <el-menu-item
            class="el-sub-menu"
            index="1"
            @click="handleSelect('/main')"
            ><el-icon><Monitor /></el-icon>首页</el-menu-item
          >

          <el-sub-menu index="2">
            <template #title>
              <el-icon><House /></el-icon>管理模块
            </template>
            <el-menu-item-group>
              <el-menu-item index="2-1" @click="handleSelect('/main/table')"
                >用户管理</el-menu-item
              >
              <el-menu-item index="2-2">文章管理</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
          <el-sub-menu index="3">
            <template #title>
              <el-icon><Switch /></el-icon>主题切换
            </template>
            <el-menu-item-group>
              <el-menu-item index="3-1" @click="changeTheme('blue')"
                >蓝色</el-menu-item
              >
              <el-menu-item index="3-2" @click="changeTheme('yellow')"
                >黄色</el-menu-item
              >
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <div class="toolbar">
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ username }}
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="quit">退出</el-dropdown-item>
                <el-dropdown-item @click="displayCalendar"
                  >日历</el-dropdown-item
                >
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>

      <el-main style="min-height: min-content">
        <RouterView />
      </el-main>
    </el-container>
  </el-container>
</template>

<style lang="scss">
.main-container {
  // width: 100%;
  // height: 90%;
  .el-sub-menu {
    background-color: rgb(95, 133, 209);
  }
  .el-header {
    position: relative;
    background-color: rgb(95, 133, 209);
    color: var(--el-text-color-primary);
  }
  @media (max-width: 999px) {
    .my-aside {
      display: none;
    }
  }
  #yellow {
    background-color: rgb(188, 144, 80);
  }
  #blue {
    background-color: rgb(95, 133, 209);
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: white;
  display: flex;
  align-items: center;
  margin-top: 10%;
}
// .el-container{
//   height: min-content
// }
</style>
