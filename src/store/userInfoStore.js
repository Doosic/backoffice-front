import { defineStore } from "pinia";
import { ref } from "vue";

export const userInfoStore = defineStore("userInfo", () => {

  const isLogin = ref(false);
  const userInfo = ref({
    adminId: null,
    email: '',
    name: '',
    status: '',
  })

  const getIsLogin = () => {
    return isLogin.value;
  }
  const setIsLogin = (param) => {
    isLogin.value = param;
  }

  const getUserInfo = () => {
    return userInfo.value;
  }
  const setUserInfo = (param) => {
    userInfo.value = param;
  }

  return {
    getIsLogin,
    setIsLogin,
    getUserInfo,
    setUserInfo,
  }
})