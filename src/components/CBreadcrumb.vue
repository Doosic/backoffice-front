<template>
      <Card v-bind="$attrs">
        <template #content>
          <Breadcrumb :home="props.home" :model="props.items" />
        </template>
      </Card>
</template>

<script setup>
import { defineProps } from 'vue'
const props = defineProps({
  home: Object,
  items: Array,
});

</script>

<style scoped>

</style>