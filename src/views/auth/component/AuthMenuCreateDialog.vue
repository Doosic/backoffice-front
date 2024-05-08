<template>
  <Dialog v-bind="$attrs" v-bind:visible="createDialog">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Menu create</span>
      </div>
    </template>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-pencil"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="MenuAuthName" v-model.trim="authName" />
    </InputGroup>

    <br/>

     <Tree v-model:selectionKeys="selectNode" :value="menuList" @node-select="nodeSelect" selection-mode="checkbox" class="w-full"></Tree>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
      <Button label="Save" icon="pi pi-check" text @click="createMenu"/>
    </template>
  </Dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import { ref, defineEmits, defineProps, onBeforeMount } from "vue";
import { MenuService } from "@/api/menu/MenuService.js";
import { AuthService } from "@/api/auth/AuthService.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const emit = defineEmits(['onCreate', 'onClose']);
const props = defineProps({
  createDialog : Boolean
})

const menuService = new MenuService();
const authService = new AuthService();
const selectNode = ref({});
const menuList = ref([]);
const authName = ref('');

onBeforeMount(() => {
  menuService.getAllMenu().then((res) => {
    menuList.value = res.data;
  })
})

const createMenu = () => {
  if(!validation()){
    return;
  }

  const sendData = {
    authName: authName.value,
    menuKeys: Object.keys(selectNode.value)
  }

  authService.createAuthAndMenu(sendData).then((res) => {

    if(!res.success){
      let message = '';
      switch (res.message) {
        case 'unauthorized error':
          message = '생성 권한이없습니다.';
          break;
        default:
          message = 'auth menu 생성에 실패하였습니다.';
      }
      showBottomErrorRight(message);
      return;
    }

    emit("onCreate");
  })
}

const nodeSelect = () => {
  console.log(selectNode.value);
}

const closeDialog = () => {
  emit("onClose");
}

const validation = () => {
  if(authName.value == ''){
    showBottomWarnRight('menuAuthName을 입력해주세요');
    return false;
  }

  if(authName.value.length < 2){
    showBottomWarnRight('menuAuthName을 2글자 이상 입력해주세요');
    return false;
  }

  if(Object.keys(selectNode.value).length == 0){
    showBottomWarnRight('menu를 선택해주세요');
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