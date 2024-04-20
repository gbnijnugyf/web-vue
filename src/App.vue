<script setup lang="ts">
import { RouterView } from "vue-router";
import { onMounted } from 'vue';

</script>
<script lang="ts">
function chanegId(
  elArr: NodeListOf<Element>,
  option: "add" | "remove",
  id: string
) {
  if (!elArr) {
    return;
  }
  if (option === "add") {
    elArr.forEach((el: Element | null) => {
      if (el) {
        // 增加id
        el.setAttribute("id", id);
      }
    });
  } else if (option === "remove") {
    elArr.forEach((el: Element | null) => {
      if (el) {
        el.removeAttribute("id");
      }
    });
  }
}

export function changeTheme(color: string) {
  console.log(color);
  const elHeader = document.querySelectorAll(".el-header");
  const elCalendar = document.querySelectorAll(".calendar-container");
  const elMenuItem = document.querySelectorAll(".el-sub-menu");
  console.log(elCalendar)
  const elAllArr: NodeListOf<Element>[] = [elHeader, elCalendar, elMenuItem];
  if (!elHeader) {
    return;
  }
  if (color === "blue") {
    elAllArr.forEach((elarr: NodeListOf<Element>) => {
      chanegId(elarr, "remove", "yellow");
      chanegId(elarr, "add", "blue");
    });
  } else if (color === "yellow") {
    elAllArr.forEach((elarr: NodeListOf<Element>) => {
      chanegId(elarr, "remove", "blue");
      chanegId(elarr, "add", "yellow");
    });
  }
}
</script>

<template>
  <div class="common-layout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.common-layout {
  border: 1px solid black;
  width: 100vw;
  height: 90vh;

  .el-main {
    margin: 0 auto;
    width: 80%;
    height: 100%;
  }
}

</style>

