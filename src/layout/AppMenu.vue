<template>
  <ul class="layout-menu">
    <template v-for="(item, i) in menuList" :key="item">
      <app-menu-item v-if="!item.separator" :item="item" :index="i"></app-menu-item>
      <li v-if="item.separator" class="menu-separator"></li>
    </template>
  </ul>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';

import AppMenuItem from './AppMenuItem.vue';
import { MenuService } from "@/api/menu/MenuService.js";
const menuService = new MenuService();
const menuList = ref([]);
onBeforeMount(() => {
  menuList.value = [];
  menuService.getMenus().then((res) => {
    if(!res.success){
      return;
    }
    menuList.value = res.data;
  })
})
</script>

<style lang="scss" scoped></style>
