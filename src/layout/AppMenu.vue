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
    for(let i = 0; i < menuList.value.length; i++){
      if(menuList.value[i].items.length > 0){
        parseJsonRecursively(menuList.value[i].items);
      }
    }
  })
})

const parseJsonRecursively = (items) => {
  for(let i = 0; i < items.length; i++){
    if(items[i].query != ''){
      items[i].query = JSON.parse(items[i].query);
    }

   if(items[i].length > 0){
     items[i] = parseJsonRecursively(items[i].items);
   }
  }
}

</script>

<style lang="scss" scoped></style>