<template>
  <Dialog v-bind="$attrs" v-bind:visible="deleteDialog">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Admin delete</span>
      </div>
    </template>

    <div class="confirmation-content">
      <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
      <span >Are you sure you want to delete <b>{{props.adminInfo.name}}</b>?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="closeDialog"/>
      <Button label="Yes" icon="pi pi-check" text @click="deleteAdmin"/>
    </template>
  </Dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import { defineEmits, defineProps } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { AdminService } from "@/api/admin/AdminService.js";
const adminService = new AdminService();

const emit = defineEmits(['onDelete', 'onClose']);
const props = defineProps({
  deleteDialog : Boolean,
  adminInfo: Object
})

const deleteAdmin = () => {
  if(!validation()){
    return;
  }

  const sendData = {
    adminId : props.adminInfo.adminId
  }

  adminService.deleteAdmin(sendData).then((res) => {
    if(!res.success){
      showBottomErrorRight("admin 삭제에 실패하였습니다.");
      return;
    }

    emit("onDelete");
  })
}

const validation = () => {
  if(props.adminInfo.adminId == null){
    showBottomErrorRight('필수값이 존재하지 않습니다. 새로고침 후 다시시도해주세요.');
    return false;
  }

  return true;
}

const closeDialog = () => {
  emit("onClose");
}

const showBottomWarnRight = (detailMsg) => {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: detailMsg, group: 'br', life: 3000 });
};
const showBottomErrorRight = (detailMsg) => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: detailMsg, group: 'br', life: 3000 });
};
</script>

<style scoped>

</style>