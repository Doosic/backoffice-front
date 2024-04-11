<template>
  <router-view></router-view>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue';
import { UserService } from "@/api/user/UserService.js";
import router from "@/router/index.js";
const {proxy} = getCurrentInstance();

const userService = new UserService();

onMounted(() => {
  userService.getUserInfo().then((res) => {
    if(!res.success){
      router.push({path: '/login'});
      return;
    }

    proxy.$userInfo.setUserInfo(res.data);
  })
})
</script>

<style scoped>
</style>
