<template>
  <Dialog v-bind="$attrs" v-bind:visible="updateDialog">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Admin update</span>
      </div>
    </template>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-user"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="Name" v-model.trim="name" />
    </InputGroup>

    <br/>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="Email" v-model.trim="email" disabled />
    </InputGroup>


    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
      <Button label="Update" icon="pi pi-check" text @click="updateAdmin"/>
    </template>
  </Dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import { ref, onBeforeMount, defineEmits, defineProps } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { AdminService } from "@/api/admin/AdminService.js";
const adminService = new AdminService();

const emit = defineEmits(['onUpdate', 'onClose']);
const props = defineProps({
  updateDialog : Boolean,
  adminInfo: Object
})

const adminId = ref(null);
const name = ref('');
const email = ref('');

onBeforeMount(() => {
  const params = {
    adminId : props.adminInfo.adminId
  }

  adminService.getAdmin(params).then((res) => {
    if(!res.success){
      showBottomErrorRight("정상적으로 데이터를 가져오지 못했습니다.");
      return;
    }

    adminId.value = res.data.adminId;
    name.value = res.data.name;
    email.value = res.data.email;
  })
})

const updateAdmin = () => {
  if(!validation()){
    return;
  }

  const sendData = {
    adminId : adminId.value,
    name: name.value,
  }

  adminService.updateAdmin(sendData).then((res) => {
    if(!res.success){
      let message = '';
      switch (res.message) {
        case 'unauthorized error':
          message = '정보변경 권한이없습니다.';
          break;
        default:
          message = 'admin 정보변경에 실패하였습니다.';
      }
      showBottomErrorRight(message);
      return;
    }

    emit("onUpdate");
  })
}

const closeDialog = () => {
  emit("onClose");
}

const validation = () => {
  if(adminId.value == null){
    showBottomErrorRight('필수값이 존재하지 않습니다. 새로고침 후 다시시도해주세요.');
    return false;
  }

  if(name.value == ''){
    showBottomWarnRight('username을 입력해주세요');
    return false;
  }

  if(name.value.length < 2){
    showBottomWarnRight('username을 2글자 이상 입력해주세요');
    return false;
  }

  return true;
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