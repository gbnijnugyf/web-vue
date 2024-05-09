<template>
  <div class="user-page">
    <div class="avatar-container">
      <img class="avatar" :src="user.avatar" alt="User avatar" />
    </div>
    <div class="info-container">
      <h2 style="margin-left: 37%">用户基本信息</h2>
      <el-table :data="userInfo" style="width: 100%">
        <el-table-column prop="item"></el-table-column>
        <el-table-column prop="info"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BASEURL_STATIC, getUserInfo } from "@/service/service";
import { getPicUrl } from "@/utils/utils";
import { onMounted, ref } from "vue";


const user = ref({
  avatar: "../public/avatarEg.jpg1",
});
const userInfo = ref([
  { item: "用户名", info: "John Doe" },
  { item: "电子邮件", info: "john@example.com" },
  { item: "余额", info: "0" },
  { item: "生日", info: "2024-3-11" },
]);
onMounted(async () => {
  try {
    const res = await getUserInfo();
    console.log(res.data.data); 
    const userData = res.data.data;
    userInfo.value = [
      { item: "用户名", info: userData.userName },
      { item: "电子邮件", info: userData.email },
      { item: "余额", info: userData.balance===null?"":userData.balance },
      { item: "生日", info: userData.birthday===null?"":userData.birthday },
    ];
    user.value = {
      avatar: getPicUrl(userData.picture),
    };
  } catch (error) {
    console.error(error);
  }
});
// export default {
//   data() {
//     return {
//       user: {
//         avatar: "../public/avatarEg.jpg",
//       },
//       userInfo: [
//         { item: "用户名", info: "John Doe" },
//         { item: "电子邮件", info: "john@example.com" },
//         { item: "余额", info: "0" },
//         { item: "生日", info: "2024-3-11" },
//         // More user info as needed
//       ],
//     };
//   },
// };
</script>

<style lang="scss">
.user-page {
  display: flex;
  gap: 20px;
}

.avatar-container,
.info-container {
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.15);
}

.avatar-container {
  width: 200px;
  height: 200px;
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.info-container {
  flex-grow: 1;
}
</style>
