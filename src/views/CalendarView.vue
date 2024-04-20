<template>
  <div class="calendar-container">
    <div class="user-avator">
      <el-col style="margin-left: 37%">欢迎 哈哈</el-col>
      <el-image style="width: 100%; height: 80%" :src="url" :fit="fit" />
    </div>
    <div class="calendar-div">
      <el-calendar v-model="value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
const value = ref(new Date());
const url =
  "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
const fit = "fill";
</script>

<style scoped lang="scss">
.calendar-container {
  display: flex;
  justify-content: space-between;
  // background-color: var(--el-color-primary-light-7);

  min-height: 500px;
  .user-avator {
    width: 25%;
    .el-img {
    }
  }
  .calendar-div {
    width: 75%;
    .el-calendar {
      --el-calendar-cell-width: 54px;
    }
  }
}
#yellow {
  background-color: rgb(237, 227, 208);
}
#blue {
  background-color: rgb(203,225,252);
}
</style>
