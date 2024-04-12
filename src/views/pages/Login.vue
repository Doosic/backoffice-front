<template>
  <div class="login-container">
    <Card class="login-card">
      <template #content>

        <div class="form-container">
          <h2><i class="pi pi-linkedin"></i> Back-Office Login</h2>

          <br/>

          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="Username" v-model.trim="email" />
          </InputGroup>

          <br/>

          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-user"></i>
            </InputGroupAddon>
            <Password
                type="text"
                placeholder="Password"
                v-model.trim="password"
                weakLabel="입력 조건을 일치시켜주세요."
                mediumLabel="입력 조건을 일치시켜주세요."
                strongLabel="사용 가능한 Password 입니다."
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

          <Button label="Submit" @click="isLogin()"/>
        </div>

      </template>
    </Card>
    <Toast position="bottom-right" group="br" />
  </div>

</template>

<script setup>
import {ref, getCurrentInstance} from "vue";
import { LoginService } from "@/api/login/LoginService.js";
const {proxy} = getCurrentInstance();
import router from "@/router/index.js";

import { useToast } from "primevue/usetoast";
const toast = useToast();

const loginService = new LoginService();

const email = ref('');
const password = ref('');

const isLogin = () => {
  // if(!validation()){
  //   return;
  // }

  const sendData = {
    email : email.value,
    password : password.value,
  }

  loginService.isLogin(sendData).then((res) => {
    if(!res.success){
      showBottomErrorRight("로그인에 실패하였습니다.");
      return;
    }

    proxy.$userInfo.setUserInfo(res.data);
    proxy.$userInfo.setIsLogin(true);
    router.push({path: '/'});
  })
}

const validation = () => {
  if(email.value == ''){
    showBottomWarnRight('username을 입력해주세요');
    return false;
  }

  if(password.value == ''){
    showBottomWarnRight('password를 입력해주세요');
    return false;
  }

  const regisPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/;
  if(!regisPattern.test(password.value)){
    showBottomWarnRight('password 입력 조건을 충족해주세요');
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-card {
  width: 450px;
  height: auto;
}

.form-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>