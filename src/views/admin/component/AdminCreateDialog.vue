<template>
  <Dialog v-bind="$attrs" v-bind:visible="createDialog">
    <template #header>
      <div class="inline-flex align-items-center justify-content-center gap-2">
        <span class="font-bold white-space-nowrap">Admin create</span>
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
      <InputText type="text" placeholder="Email" v-model.trim="email" />
    </InputGroup>

    <br/>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-key"></i>
      </InputGroupAddon>
      <Password
          type="text"
          placeholder="Password"
          v-model.trim="password"
          weakLabel="입력 조건을 일치시켜주세요."
          mediumLabel="입력 조건을 일치시켜주세요."
          strongLabel="사용 가능한 Password 입니다."
          @keyup="secondaryPasswordValid"
          toggleMask>
        <template #header>
          <h6>Pick a password</h6>
        </template>
        <template #footer>
          <Divider />
          <br/>
          <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>최소 8자 이상의 길이</li>
            <li>최소 하나 이상의 대문자, 소문자, 숫자를 포함</li>
          </ul>
        </template>
      </Password>
    </InputGroup>

    <br/>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-key"></i>
      </InputGroupAddon>
      <Password
          type="text"
          placeholder="Password Check"
          v-model.trim="passwordCheck"
          weakLabel="입력 조건을 일치시켜주세요."
          mediumLabel="입력 조건을 일치시켜주세요."
          strongLabel="사용 가능한 Password 입니다."
          :invalid="passwordInvalid"
          @keyup="secondaryPasswordValid"
          toggleMask>
        <template #header>
          <h6 style="color:red" v-if="passwordInvalid" id="username-help">비밀번호를 일치시켜주세요.</h6>
        </template>
        <template #footer>
          <Divider />
          <br/>
          <ul class="pl-2 ml-2 mt-0" style="line-height: 1.5">
            <li>최소 8자 이상의 길이</li>
            <li>최소 하나 이상의 대문자, 소문자, 숫자를 포함</li>
          </ul>
        </template>
      </Password>
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="Email" v-model.trim="email" />
    </InputGroup>

    <InputGroup>
      <InputGroupAddon>
        <i class="pi pi-envelope"></i>
      </InputGroupAddon>
      <InputText type="text" placeholder="Email" v-model.trim="email" />
    </InputGroup>

    <template #footer>
      <Button label="Cancel" icon="pi pi-times" text @click="closeDialog"/>
      <Button label="Save" icon="pi pi-check" text @click="createAdmin"/>
    </template>
  </Dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import { ref, defineEmits, defineProps } from "vue";
import { useToast } from "primevue/usetoast";
const toast = useToast();
import { AdminService } from "@/api/admin/AdminService.js";
const adminService = new AdminService();

const emit = defineEmits(['onCreate', 'onClose']);
const props = defineProps({
  createDialog : Boolean
})

const name = ref('');
const email = ref('');
const password = ref('');
const passwordCheck = ref('');

const passwordInvalid = ref(false);

const secondaryPasswordValid = () => {
  if(password.value == passwordCheck.value){
    passwordInvalid.value = false;
  }else{
    passwordInvalid.value = true;
  }
}

const createAdmin = () => {
  if(!validation()){
    return;
  }

  const sendData = {
    name: name.value,
    email : email.value,
    password : password.value,
  }

  adminService.createAdmin(sendData).then((res) => {
    if(!res.success){
      let message = '';
      switch (res.message) {
        case 'unauthorized error':
          message = '생성 권한이없습니다.';
          break;
        default:
          message = 'admin 생성에 실패하였습니다.';
      }
      showBottomErrorRight(message);
      return;
    }

    emit("onCreate");
  })
}

const closeDialog = () => {
  emit("onClose");
}

const validation = () => {
  if(name.value == ''){
    showBottomWarnRight('username을 입력해주세요');
    return false;
  }

  if(name.value.length < 2){
    showBottomWarnRight('username을 2글자 이상 입력해주세요');
    return false;
  }

  if(email.value == ''){
    showBottomWarnRight('email을 입력해주세요');
    return false;
  }

  if(email.value.length < 6){
    showBottomWarnRight('email을 6글자 이상 입력해주세요');
    return false;
  }

  const regisEmailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,}$/;
  if(!regisEmailPattern.test(email.value)){
    showBottomWarnRight('email을 다시 확인해주세요');
    return false;
  }

  if(password.value == ''){
    showBottomWarnRight('password를 입력해주세요');
    return false;
  }

  const regisPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if(!regisPasswordPattern.test(password.value)){
    showBottomWarnRight('password 입력 조건을 충족해주세요');
    return false;
  }

  if(passwordInvalid.value == true){
    showBottomWarnRight('비밀번호를 일치시켜주세요');
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