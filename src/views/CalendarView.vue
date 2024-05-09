<template>
  <div class="calendar-container">
    <div class="user-avator">
      <el-col style="margin-left: 37%">欢迎 {{ user.name }}</el-col>
      <el-image
        style="width: 100%; height: 80%"
        :src="user.avatar"
        :fit="fit"
      />
    </div>
    <div class="calendar-div">
      <el-calendar v-model="value" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { BASEURL_STATIC, getUserInfo } from "@/service/service";
import { getPicUrl } from "@/utils/utils";
import { onMounted, ref } from "vue";
const value = ref(new Date());
const user = ref({
  avatar: "../public/avatarEg.jpg1",
  name: "未登录",
});
onMounted(async () => {
  console.log("CalendarView mounted");
  const res = await getUserInfo();
  user.value = {
    avatar: getPicUrl(res.data.data.picture),
    name: res.data.data.userName,
  };
});
// const url = "../public/avatarEg.jpg";
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
  background-color: rgb(203, 225, 252);
}
</style>
