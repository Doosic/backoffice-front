<template>
  <c-breadcrumb :home="cBreadHome" :items="cBreadItems" class="mb-3"></c-breadcrumb>

  <div class="grid">
    <div class="col-12 xl:col-6">
      <Card>
        <template #content>
          <DataTable
              :value="roleList"
              :paginator="false"
              :rows="10"
              stripedRows
              data-key="roleId"
              selectionMode="single"
              v-model:selection="selectedAuthItem"
              @row-select="selectedAuth"
          >
            <template #header>
              <div class="flex-col sm:flex justify-content-between">
                <InputGroup class="align-items-baseline">
                  <Button type="button" icon="pi pi-user-plus" label="Menu create" outlined @click="createMenuDialogOpen" />
                  <Button type="button" icon="pi pi-user-plus" label="Function create" outlined @click="createFuncDialogOpen"/>
                </InputGroup>

                <InputGroup>
                  <InputGroupAddon>
                    <i class="pi pi-search cursor-pointer" />
                  </InputGroupAddon>
                  <InputText v-model="searchText" placeholder="Keyword Search" />
                </InputGroup>
              </div>
            </template>
            <template #empty> No contents found. </template>

            <Column field="authName" header="name" style="min-width: 3rem"></Column>
            <Column field="authType" header="type" style="min-width: 3rem" class="cursor-pointer">
              <template #body="slotProps">
                <Tag v-if="slotProps.data.roleType == 'MENU'" :value="slotProps.data.roleType" severity="info"/>
                <Tag v-else :value="slotProps.data.roleType" severity="warning"/>
              </template>
            </Column>
            <Column field="regUser.name" header="reguser" style="min-width: 3rem" class="cursor-pointer"></Column>
            <Column field="createDate" header="create-date" style="min-width: 3rem"></Column>

            <template #footer>
              <Paginator v-model:first="first" @Page="onPageClick" :page="3" :page-link-size="5" :rows="pagingInfo.rows" :total-records="pagingInfo.total" :rows-per-page-options="[10, 20, 30]">
              </Paginator>
            </template>

          </DataTable>
        </template>
      </Card>
    </div>

    <div class="col-12 xl:col-6">
      <Card v-if="selectCardItem == 'MENU'">
        <template #title>
          <div class="inline-flex align-items-center justify-content-center">
            <span class="font-bold white-space-nowrap">Menus</span>
            <Button class="ml-2" label="Preview" rounded @click="changePreview"></Button>
          </div>
        </template>
        <template #content>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-pencil"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="MenuAuthName" v-model.trim="updateMenuAuthName" readonly/>
          </InputGroup>

          <Tree v-model:selectionKeys="selectNode" :value="menuList" @node-select="nodeSelect" selection-mode="checkbox" class="w-full md:w-30rem"></Tree>
        </template>
        <template #footer>
          <div class="flex justify-content-end align-items-baseline">
            <Button class="ml-2" label="Update" rounded @click="updateRoleMenus"></Button>
          </div>
        </template>
      </Card>

      <Card v-if="selectCardItem == 'AUTH'">
        <template #title>
          <div class="inline-flex align-items-center justify-content-center">
            <span class="font-bold white-space-nowrap">Auths</span>
            <Button class="ml-2" label="Preview" rounded @click="changePreview"></Button>
          </div>
        </template>
        <template #content>
          <InputGroup>
            <InputGroupAddon>
              <i class="pi pi-pencil"></i>
            </InputGroupAddon>
            <InputText type="text" placeholder="MenuAuthName" v-model.trim="updateMenuAuthName" readonly/>
          </InputGroup>

          <Tree v-model:selectionKeys="selectNode" :value="authList" @node-select="nodeSelect" selection-mode="checkbox" class="w-full md:w-30rem"></Tree>
        </template>
        <template #footer>
          <div class="flex justify-content-end align-items-baseline">
            <Button class="ml-2" label="Update" rounded @click="updateRoleAuth"></Button>
          </div>
        </template>
      </Card>

      <Card v-if="selectCardItem == 'DEFAULT'">
        <template #title>
          <div class="inline-flex align-items-center justify-content-center">
            <span class="font-bold white-space-nowrap">Preview</span>
          </div>
        </template>
        <template #content>
          <div style="">Menu</div>
          <Tree :value="menuList" @node-select="nodeSelect" class="w-full md:w-30rem"></Tree>
          <div>Auth</div>
          <Tree :value="authList" @node-select="nodeSelect" class="w-full md:w-30rem"></Tree>
        </template>
      </Card>
    </div>
  </div>

  <auth-create-dialog v-if="createMenuDialog" v-model:visible="createMenuDialog" :style="{width: '450px'}" :modal="true" class="p-fluid" :create-dialog="createMenuDialog" @on-create="onCreateMenuSuccess" @on-close="onCreateMenuClose"></auth-create-dialog>
  <auth-func-create-dialog v-if="createFuncDialog" v-model:visible="createFuncDialog" :style="{width: '450px'}" :modal="true" class="p-fluid" :create-dialog="createFuncDialog" @on-create="onCreateFuncSuccess" @on-close="onCreateFuncClose"></auth-func-create-dialog>
  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import {ref, getCurrentInstance, watch, onBeforeMount} from "vue";
import CBreadcrumb from "@/components/CBreadcrumb.vue";
import AuthCreateDialog from "@/views/auth/component/AuthMenuCreateDialog.vue";
import AuthFuncCreateDialog from "@/views/auth/component/AuthFuncCreateDialog.vue";
import { AuthService } from "@/api/auth/AuthService.js";
import { MenuService } from "@/api/menu/MenuService.js";
import { FuncService } from "@/api/func/FuncService.js";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();

import { useToast } from "primevue/usetoast";
const toast = useToast();
const { proxy } = getCurrentInstance();
const authService = new AuthService();
const menuService = new MenuService();
const funcService = new FuncService();

const roleList = ref([]);
const menuList = ref([]);
const authList = ref([]);

const createMenuDialog = ref(false);
const createFuncDialog = ref(false);
const searchText = ref('');
const first = ref(0);
const selectedAuthItem = ref({});
const selectNode = ref();
const selectCardItem = ref('DEFAULT');
const updateMenuAuthName = ref('');

const cBreadHome = ref({
  icon: 'pi pi-home'
});

const cBreadItems = ref([
  { label: 'Admin' },
  { label: 'AuthList' }
]);

const pagingInfo = ref({
  rows : 10,
  total: 0,
  page: 1,
})

watch(() => route.query, (newValue, oldValue) =>  {
  getAuths();
})

watch(() => selectedAuthItem.value, (newValue, oldValue) =>  {
  if(selectedAuthItem.value == null){
    changePreview();
  }
})

onBeforeMount(() => {
  getAuths();
  menuService.getAllFuncAndMenu().then((res) => {
    menuList.value = res.data.menuList;
    authList.value = res.data.authList;
  })
})

const nodeSelect = () => {
  console.log(selectNode.value);
}

const selectedAuth = () => {
  selectCardItem.value = selectedAuthItem.value.roleType;
  updateMenuAuthName.value = selectedAuthItem.value.authName;

  if(selectedAuthItem.value.roleType == 'MENU'){
    selectMenuKeys(selectedAuthItem.value.roleId);
  }else if(selectedAuthItem.value.roleType == 'AUTH'){
    selectFuncKeys(selectedAuthItem.value.roleId);
  }
}

const selectMenuKeys = (authId) => {
  let params = {
    menuId: authId
  }

  menuService.getMenuKeys(params).then((res) => {
    selectNode.value = {};
    for(let i = 0; i < res.data.length; i++){
      selectNode.value[res.data[i].key] = {
        checked: true,
        partialChecked: false
      }
    }
  })
}

const selectFuncKeys = (authId) => {
  let params = {
    authId: authId
  }

  funcService.getAuthKeys(params).then((res) => {
    selectNode.value = {};
    for(let i = 0; i < res.data.length; i++){
      selectNode.value[res.data[i].key] = {
        checked: true,
        partialChecked: false
      }
    }
  })
}

const changePreview = () => {
  selectCardItem.value = 'DEFAULT';
  selectedAuthItem.value = {};
}

const updateRoleMenus = () => {
  if(!updateValidation()){
    return;
  }

  const sendData = {
    roleId: selectedAuthItem.value.roleId,
    menuKeys: Object.keys(selectNode.value)
  }

  authService.updateRoleMenu(sendData).then((res) => {
    if(!res.success){
      if(res.statusCode == 'duplicated data'){
        showBottomWarnRight('name이 중복되었습니다.');
      }
      if(res.message == 'unauthorized error'){
        showBottomErrorRight('생성 권한이 없습니다.');
        return;
      }
      showBottomErrorRight("auth menu 업데이트에 실패하였습니다.");
      return;
    }
    showBottomSuccessRight('업데이트가 완료되었습니다.');
  })
}

const updateRoleAuth = () => {
  if(!updateValidation()){
    return;
  }

  const sendData = {
    roleId: selectedAuthItem.value.roleId,
    authKeys: Object.keys(selectNode.value)
  }

  authService.updateRoleAuth(sendData).then((res) => {
    let message = '업데이트가 완료되었습니다.';

    if(!res.success){
      switch (res.message) {
        case 'duplicated data':
          message = 'name이 중복되었습니다.';
          break;
        case 'unauthorized error':
          message = '생성 권한이없습니다.';
          break;
        default:
          message = 'auth func 업데이트에 실패하였습니다.';
      }
      showBottomErrorRight(message);
      return;
    }

    showBottomSuccessRight(message);
  })
}

const updateValidation = () => {
  if(Object.keys(selectNode.value).length == 0){
    showBottomWarnRight('menu를 선택해주세요');
    return false;
  }

  return true;
}

const getAuths = () => {
  let params = {}
  params.text = route.query.search != undefined ? route.query.search : searchText.value;
  params.pageNum = route.query.page != undefined ? route.query.page : pagingInfo.value.page;
  params.pageRowCount = route.query.rows != undefined ? route.query.rows : pagingInfo.value.rows;

  authService.getAuths(params).then((res) => {
    if(!res.success){
      return;
    }
    roleList.value = res.data.itemList;

    first.value = (params.pageNum-1) * 10;
    pagingInfo.value.page = Number(params.pageNum);
    pagingInfo.value.rows = Number(params.pageRowCount);
    pagingInfo.value.total = res.data.itemTotalCnt;
  })
}

const onPageClick = (pageInfo) => {
  valueToRouteQuery({
    page: pageInfo.page + 1,
    rows: pageInfo.rows,
    search: searchText.value,
  });
}

const clickSearch = () => {
  valueToRouteQuery({
    page: pagingInfo.value.page,
    rows: pagingInfo.value.rows,
    search: searchText.value
  });
}

const valueToRouteQuery = (query) => {
  try{
    router.push({'query': query }).catch((e)=>{});
  }catch(e){}
}

const createMenuDialogOpen = () => {
  createMenuDialog.value = true;
}
const createFuncDialogOpen = () => {
  createFuncDialog.value = true;
}

const onCreateMenuSuccess = () => {
  createMenuDialog.value = false;
  showBottomSuccessRight("auth 생성 완료되었습니다.");
  getAuths();
}
const onCreateFuncSuccess = () => {
  createFuncDialog.value = false;
  showBottomSuccessRight("auth 생성 완료되었습니다.");
  getAuths();
}

const onCreateMenuClose = () => {
  createMenuDialog.value = false;
}
const onCreateFuncClose = () => {
  createFuncDialog.value = false;
}


const showBottomSuccessRight = (detailMsg) => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: detailMsg, group: 'br', life: 3000 });
};
const showBottomWarnRight = (detailMsg) => {
  toast.add({ severity: 'warn', summary: 'Warn Message', detail: detailMsg, group: 'br', life: 3000 });
};
</script>

<style scoped>

</style>