<template>
  <c-breadcrumb :home="cBreadHome" :items="cBreadItems"></c-breadcrumb>
</template>

<script setup>
import CBreadcrumb from "@/components/CBreadcrumb.vue";
import {ref} from "vue";

const cBreadHome = ref({
  icon: 'pi pi-home'
});

const cBreadItems = ref([
  { label: 'Home' },
  { label: 'DashBoard' }
]);
</script>

<style scoped>

</style>