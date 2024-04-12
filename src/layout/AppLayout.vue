<template>
  <div class="layout-wrapper" :class="containerClass">
    <app-topbar></app-topbar>
      <div class="layout-sidebar">
        <app-sidebar></app-sidebar>
      </div>
      <div class="layout-main-container">
        <div class="layout-main">
            <router-view></router-view>
        </div>
        <app-footer></app-footer>
      </div>
  </div>

</template>

<script setup>
import AppTopbar from "@/layout/AppTopbar.vue";
import AppSidebar from "@/layout/AppSidebar.vue";
import AppFooter from "@/layout/AppFooter.vue";

import { computed, watch, ref, getCurrentInstance, onBeforeMount } from 'vue';
import { useLayout } from '@/layout/composables/layout';
const { layoutConfig, layoutState, isSidebarActive } = useLayout();

const userService = new AdminService();
import { AdminService } from "@/api/admin/AdminService.js";

import router from "@/router/index.js";
const {proxy} = getCurrentInstance();

const outsideClickListener = ref(null);

watch(isSidebarActive, (newVal) => {
  if (newVal) {
    bindOutsideClickListener();
  } else {
    unbindOutsideClickListener();
  }
});

onBeforeMount(() => {
  userService.getUserInfo().then((res) => {
    if(!res.success){
      router.push({path: '/login'});
      return;
    }

    proxy.$userInfo.setIsLogin(true);
    proxy.$userInfo.setUserInfo(res.data);
  })
})

const containerClass = computed(() => {
  return {
    'layout-theme-light': layoutConfig.darkTheme.value === 'light',
    'layout-theme-dark': layoutConfig.darkTheme.value === 'dark',
    'layout-overlay': layoutConfig.menuMode.value === 'overlay',
    'layout-static': layoutConfig.menuMode.value === 'static',
    'layout-static-inactive': layoutState.staticMenuDesktopInactive.value && layoutConfig.menuMode.value === 'static',
    'layout-overlay-active': layoutState.overlayMenuActive.value,
    'layout-mobile-active': layoutState.staticMenuMobileActive.value,
    'p-ripple-disabled': layoutConfig.ripple.value === false
  };
});

const bindOutsideClickListener = () => {
  if (!outsideClickListener.value) {
    outsideClickListener.value = (event) => {
      if (isOutsideClicked(event)) {
        layoutState.overlayMenuActive.value = false;
        layoutState.staticMenuMobileActive.value = false;
        layoutState.menuHoverActive.value = false;
      }
    };
    document.addEventListener('click', outsideClickListener.value);
  }
};

const unbindOutsideClickListener = () => {
  if (outsideClickListener.value) {
    document.removeEventListener('click', outsideClickListener);
    outsideClickListener.value = null;
  }
};

const isOutsideClicked = (event) => {
  const sidebarEl = document.querySelector('.layout-sidebar');
  const topbarEl = document.querySelector('.layout-menu-button');

  return !(sidebarEl.isSameNode(event.target) || sidebarEl.contains(event.target) || topbarEl.isSameNode(event.target) || topbarEl.contains(event.target));
};
</script>

<style scoped>

</style>