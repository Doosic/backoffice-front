<template>
  <Dialog v-bind="$attrs" v-bind:visible="createDialog">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Function create</span>
      </div>
    </template>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-pencil"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="FunctionAuthName" v-model.trim="authName" />
    </InputGroup>

    <br/>

    <Tree v-model:selectionKeys="selectNode" :value="authList" @node-select="nodeSelect" selection-mode="checkbox" class="w-full"></Tree>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
      <Button label="Save" icon="pi pi-check" text @click="createFunc"/>
    </template>
  </Dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import { ref, defineEmits, defineProps, onBeforeMount } from "vue";
import { FuncService } from "@/api/func/FuncService.js";
import { AuthService } from "@/api/auth/AuthService.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();

const emit = defineEmits(['onCreate', 'onClose']);
const props = defineProps({
  createDialog : Boolean
})

const funcService = new FuncService();
const authService = new AuthService();
const selectNode = ref({});
const authList = ref([]);
const authName = ref('');

onBeforeMount(() => {
  funcService.getAllFunc().then((res) => {
    authList.value = res.data;
  })
})

const createFunc = () => {
  if(!validation()){
    return;
  }

  const sendData = {
    authName: authName.value,
    authKeys: Object.keys(selectNode.value)
  }

  authService.createAuthAndFunc(sendData).then((res) => {

    if(!res.success){
      let message = '';
      switch (res.message) {
        case 'unauthorized error':
          message = '생성 권한이없습니다.';
          break;
        default:
          message = 'auth func 생성에 실패하였습니다.';
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
    showBottomWarnRight('function을 선택해주세요');
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