<template>
  <div class="table-container">
    <el-row class="table-toolbar">
      <el-col :span="12">
        <el-button type="primary" @click="openDialog('add')"
          ><el-icon><CirclePlus /></el-icon>新增</el-button
        >
      </el-col>
      <el-col :span="12" style="text-align: right">
        <el-input
          v-model="search"
          placeholder="搜索用户名"
          style="width: 30%"
        />
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
      <el-table-column prop="user_name" label="用户名"></el-table-column>
      <!-- <el-table-column
        prop="email"
        label="电子邮箱"
        width="160"
      ></el-table-column> -->
      <el-table-column prop="province" label="省份"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        width="290"
      ></el-table-column>
      <el-table-column
        prop="zip"
        label="邮编"
        width="80"
      ></el-table-column>
      <el-table-column prop="date_" label="日期" width="103"></el-table-column>
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
      <el-form
        v-if="dialogTitle !== '提示'"
        ref="form"
        :model="currentRow"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="user_name">
          <el-input v-model="currentRow.user_name"></el-input>
        </el-form-item>
        <!-- <el-form-item label="电子邮箱" prop="email">
          <el-input v-model="currentRow.email"></el-input>
        </el-form-item> -->
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
        <el-form-item label="邮编" prop="zip">
          <el-input v-model="currentRow.zip"></el-input>
        </el-form-item>
        <el-form-item label="日期" prop="date_">
          <el-date-picker
            v-model="currentRow.date_"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </el-form-item>
      </el-form>
      <p v-else style="margin: 20px 10px">
        确定永久删除用户：{{ currentRow.user_name }} 吗？
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, watch, watchEffect } from "vue";
import { CirclePlus } from "@element-plus/icons-vue";
import { addTableData, getTableData } from "@/service/service";
import type { API } from "@/service/typing";

const data = ref<Array<API.TTbaleItem>>([
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
  // email: [
  //   { required: true, message: "请输入电子邮箱", trigger: "blur" },
  //   { validator: validateEmail, trigger: "blur" },
  // ],
  province: [{ required: true, message: "请选择省份", trigger: "blur" }],
  city: [{ required: true, message: "请选择城市", trigger: "blur" }],
  zip: [
    { required: true, message: "请输入邮编", trigger: "blur" },
    { validator: validatePostcode, trigger: "blur" },
  ],
  date_: [{ required: true, message: "请选择日期", trigger: "change" }],
};

const provinces = [
  { value: "湖北", label: "湖北" },
  // add more provinces as needed
];

const cities = [
  { value: "武汉", label: "武汉" },
  { value: "荆州", label: "荆州" },
  { value: "宜昌", label: "宜昌" },
  { value: "襄阳", label: "襄阳" },
  // add more cities as needed
];

const form = ref();

const submitDialog = () => {
  if (dialogTitle.value === "提示") {
    const index = data.value.findIndex((item) => item.id === currentRow.id);
    if (index !== -1) {
      data.value.splice(index, 1);
    }
    dialogVisible.value = false;
  } else {
    form.value.validate((valid: boolean) => {
      if (valid) {
        if (dialogTitle.value === "新增用户") {
          addRow();
        } else if (dialogTitle.value === "修改用户") {
          const index = data.value.findIndex(
            (item) => item.id === currentRow.id
          );
          if (index !== -1) {
            data.value.splice(index, 1, {
              ...currentRow,
              date_: new Date(currentRow.date_).toISOString().split("T")[0],
            });
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
const currentRow = reactive<API.TTbaleItem>(
  {} as API.TTbaleItem
);

onMounted(async () => {
  const res = await getTableData({ page: currentPage.value, pageSize: pageSize.value });
  if(res.data.code === '0') {
    data.value = res.data.data;
  }
});

watchEffect(() => {
  getTableData({ page: currentPage.value, pageSize: pageSize.value });
});

const filteredData = computed(() => {
  if (!search.value) return data.value;
  return data.value.filter(
    (item) =>
      item.user_name.includes(search.value)
  );
});

const addRow = async () => {
  // data.value.push({
  //   id: data.value.length + 1,
  //   name: currentRow.name,
  //   date_: new Date(currentRow.date_).toISOString().split("T")[0],
  //   province: currentRow.province,
  //   city: currentRow.city,
  //   address: currentRow.address,
  //   zip: currentRow.zip,
  // });
  const dataTemp:API.TTbaleItem = {
    id: data.value.length + 1,
    user_name: currentRow.user_name,
    date_: new Date(currentRow.date_).toISOString().split("T")[0],
    province: currentRow.province,
    city: currentRow.city,
    address: currentRow.address,
    zip: currentRow.zip,
  }
  const res = await addTableData(dataTemp);
  if(res.data.code === '0') {
    data.value.push(dataTemp);
  }

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
    dialogTitle.value = "新增用户";
    currentRow.user_name = "";
    currentRow.date_ = "";
    currentRow.province = "";
    currentRow.city = "";
    currentRow.address = "";
    currentRow.zip = "";
  } else if (type === "edit") {
    dialogTitle.value = "修改用户";
    Object.assign(currentRow, row);
  } else if (type === "delete") {
    dialogTitle.value = "提示";
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
