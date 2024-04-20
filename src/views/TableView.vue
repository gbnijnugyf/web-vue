<template>
  <div class="table-container">
    <el-row class="table-toolbar">
      <el-col :span="12">
        <el-button type="primary" @click="addRow"><el-icon><CirclePlus /></el-icon>新增</el-button>
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-input v-model="search" placeholder="搜索" style="width: 30%;"/>
        <el-button @click="searchRows">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="
        filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%"
    >
      <el-table-column type="index" width="50"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column prop="email" label="电子邮箱"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
    </el-table>
    <el-pagination
    class="table-pagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="total, prev, pager, next, jumper"
      :total="filteredData.length"
    >
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {CirclePlus} from '@element-plus/icons-vue';

const data = ref([
  { name: "John", email: "john@example.com", date: "2021-01-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  { name: "Jane", email: "jane@example.com", date: "2021-02-01" },
  // Add more data as needed
]);

const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10);

const filteredData = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter(
    (item) =>
      item.name.includes(search.value) || item.email.includes(search.value)
  );
});

const addRow = () => {
  data.value.push({
    name: "New user",
    email: "new@example.com",
    date: new Date().toISOString().slice(0, 10),
  });
};

const searchRows = () => {
  currentPage.value = 1;
};

const handleSizeChange = (val: number) => {
  pageSize.value = val;
};

const handleCurrentChange = (val: number) => {
  currentPage.value = val;
};
</script>

<style lang="scss">
.table-container{
    // height: 99%;
    // scrollbar-width: 0;
    background-color: white
}
.table-toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .el-col {
    background-color: white;
  }
}
.table-pagination{
    margin: 30%;
    margin-top: 1%;
}
</style>
