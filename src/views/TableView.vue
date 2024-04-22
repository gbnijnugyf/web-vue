<template>
  <div class="table-container">
    <el-row class="table-toolbar">
      <el-col :span="12">
        <el-button type="primary" @click="openDialog('add')"
          ><el-icon><CirclePlus /></el-icon>新增</el-button
        >
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-input v-model="search" placeholder="搜索用户名" style="width: 30%" />
        <el-button @click="searchRows">搜索</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="
        filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
      "
      style="width: 100%; height: min-content"
    >
      <el-table-column prop="id" label="序号" width="60"></el-table-column>
      <el-table-column prop="name" label="用户名"></el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        width="160"
      ></el-table-column>
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="190"
      ></el-table-column>
      <el-table-column
        prop="postcode"
        label="邮编"
        width="80"
      ></el-table-column>
      <el-table-column prop="date" label="日期" width="103"></el-table-column>
      <el-table-column label="操作" width="100">
        <template #default="{ row }">
          <a size="mini" @click="openDialog('edit', row)">编辑</a>
          <a size="mini" @click="openDialog('delete', row)">删除</a>
        </template>
      </el-table-column>
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

    <el-dialog v-model="dialogVisible" :title="dialogTitle">
      <el-form v-if="dialogTitle !== '删除'" ref="form" :model="currentRow" :rules="rules">
        <el-form-item label="用户名" prop="name">
          <el-input v-model="currentRow.name"></el-input>
        </el-form-item>
        <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="currentRow.email"></el-input>
        </el-form-item>
        <el-form-item label="省份" prop="province">
          <el-select v-model="currentRow.province" placeholder="请选择">
            <el-option
              v-for="item in provinces"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="city">
          <el-select v-model="currentRow.city" placeholder="请选择">
            <el-option
              v-for="item in cities"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地址">
          <el-input v-model="currentRow.address"></el-input>
        </el-form-item>
        <el-form-item label="邮编" prop="postcode">
          <el-input v-model="currentRow.postcode"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date">
          <el-date-picker
            v-model="currentRow.date"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <p v-else style="margin: 20px 10px;">确定永久删除用户：{{ currentRow.name }} 吗？</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";

const data = ref([
  {
    id: 1,
    name: "John",
    email: "john@example.com",
    date: "2021-01-01",
    province: "Guangdong",
    city: "Shenzhen",
    address: "Futian",
    postcode: "518000",
  },
  {
    id: 2,
    name: "Tom",
    email: "Tom@example.com",
    date: "2021-01-02",
    province: "Guangdong",
    city: "Shenzhen",
    address: "Futian",
    postcode: "518000",
  },
  {
    id: 3,
    name: "Jerry",
    email: "Jerry@example.com",
    date: "2021-01-03",
    province: "Guangdong",
    city: "Shenzhen",
    address: "Futian",
    postcode: "518000",
  },
  {
    id: 4,
    name: "Mike",
    email: "Mike@example.com",
    date: "2021-01-04",
    province: "Guangdong",
    city: "Shenzhen",
    address: "Futian",
    postcode: "518000",
  },

  // Add more data as needed
]);

const validateEmail = (_rule: any, value: any, callback: any) => {
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(value)) {
    callback(new Error("请输入有效的电子邮箱"));
  } else {
    callback();
  }
};

const validatePostcode = (_rule: any, value: any, callback: any) => {
  if (!/^\d{6}$/.test(value)) {
    callback(new Error("邮编必须是6位数字"));
  } else {
    callback();
  }
};

const rules = {
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入电子邮箱", trigger: "blur" },
    { validator: validateEmail, trigger: "blur" },
  ],
  province: [{ required: true, message: "请选择省份", trigger: "change" }],
  city: [{ required: true, message: "请选择城市", trigger: "change" }],
  postcode: [
    { required: true, message: "请输入邮编", trigger: "blur" },
    { validator: validatePostcode, trigger: "blur" },
  ],
  date: [{ required: true, message: "请选择日期", trigger: "change" }],
};

const provinces = [
  { value: '湖北', label: '湖北' },
  // add more provinces as needed
];

const cities = [
  { value: '武汉', label: '武汉' },
  { value: '荆州', label: '荆州' },
  { value: '宜昌', label: '宜昌' },
  { value: '襄阳', label: '襄阳' },
  // add more cities as needed
];


const form = ref();

const submitDialog = () => {
  if (dialogTitle.value === "删除") {
    const index = data.value.findIndex((item) => item.id === currentRow.id);
    if (index !== -1) {
      data.value.splice(index, 1);
    }
    dialogVisible.value = false;
  } else {
    form.value.validate((valid: boolean) => {
      if (valid) {
        if (dialogTitle.value === "新增") {
          addRow();
        } else if (dialogTitle.value === "编辑") {
          const index = data.value.findIndex((item) => item.id === currentRow.id);
          if (index !== -1) {
            data.value.splice(index, 1, { ...currentRow });
          }
        }
        dialogVisible.value = false;
      }
    });
  }
};


const search = ref("");
const currentPage = ref(1);
const pageSize = ref(10);
const dialogVisible = ref(false);
const dialogTitle = ref("");
const currentRow = reactive<{
  id: number;
  name: string;
  email: string;
  date: string;
  province: string;
  city: string;
  address: string;
  postcode: string;
}>(
  {} as {
    id: number;
    name: string;
    email: string;
    date: string;
    province: string;
    city: string;
    address: string;
    postcode: string;
  }
);

const filteredData = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter(
    (item) =>
      item.name.includes(search.value) || item.email.includes(search.value)
  );
});

const addRow = () => {
  data.value.push({
    id: data.value.length + 1,
    name: currentRow.name,
    email: currentRow.email,
    date: new Date(currentRow.date).toISOString().split("T")[0],
    province: currentRow.province,
    city: currentRow.city,
    address: currentRow.address,
    postcode: currentRow.postcode,
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

const openDialog = (type: string, row = {}) => {
  console.log(type, row);
  if (type === "add") {
    console.log("1");
    dialogTitle.value = "新增";
    currentRow.name = "";
    currentRow.email = "";
    currentRow.date = "";
    currentRow.province = "";
    currentRow.city = "";
    currentRow.address = "";
    currentRow.postcode = "";
  } else if (type === "edit") {
    dialogTitle.value = "编辑";
    Object.assign(currentRow, row);
  } else if (type === "delete") {
    dialogTitle.value = "删除";
    Object.assign(currentRow, row);
  }
  dialogVisible.value = true;
  console.log(dialogVisible.value);
};

//   console.log(23);
//   if (dialogTitle.value === "新增") {
//     addRow();
//   } else if (dialogTitle.value === "编辑") {
//     const index = data.value.findIndex(
//       (item: {
//         id: number;
//         name: string;
//         email: string;
//         date: string;
//         province: string;
//         city: string;
//         address: string;
//         postcode: string;
//       }) => item.id === currentRow.id
//     );
//     if (index !== -1) {
//       data.value.splice(index, 1, { ...currentRow } as {
//         id: number;
//         name: string;
//         email: string;
//         date: string;
//         province: string;
//         city: string;
//         address: string;
//         postcode: string;
//       });
//     }
//   } else if (dialogTitle.value === "删除") {
//     const index = data.value.findIndex(
//       (item: { id: number }) => item.id === currentRow.id
//     );
//     if (index !== -1) {
//       data.value.splice(index, 1);
//     }
//   }
//   dialogVisible.value = false;
// };
</script>

<style lang="scss">
.table-container {
  height: 80vh;
  background-color: white;
}
.table-toolbar {
  width: 100%;
  display: flex;
  justify-content: space-between;
  .el-col {
    background-color: white;
  }
}
.table-pagination {
  margin: 30%;
  margin-top: 1%;
}
a {
  color: rgb(63, 158, 255);
  cursor: pointer;
}
</style>
