<template>
  <div class="layout-topbar">
    <router-link to="/" class="layout-topbar-logo">
      <i class="pi pi-linkedin" alt="logo"></i>
      <span class="ml-2">Todo List</span>
    </router-link>

    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle()">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <div class="layout-topbar-menu" >
      <button  class="p-link layout-topbar-button">
        <i class="pi pi-calendar"></i>
        <span>Calendar</span>
      </button>

      <button v-if="proxy.$userInfo.getIsLogin()" class="p-link layout-topbar-button">
        <i class="pi pi-sign-in"></i>
        <span>Profile</span>
      </button>
      <button v-else class="p-link layout-topbar-button" @click="goLoginPage()">
        <i class="pi pi-user"></i>
        <span>Profile</span>
      </button>

      <button  class="p-link layout-topbar-button">
        <i class="pi pi-cog"></i>
        <span>Settings</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {getCurrentInstance} from "vue";
import { useLayout } from "@/layout/composables/layout.js";
const { onMenuToggle } = useLayout();
const {proxy} = getCurrentInstance();

import {useRouter} from "vue-router";
const router = useRouter();

const goLoginPage = () => {
  router.push({path: '/login'})
}
</script>

<style scoped>

</style>