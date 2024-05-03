<template>
  <c-breadcrumb :home="cBreadHome" :items="cBreadItems" class="mb-3"></c-breadcrumb>

  <div class="grid">
    <div class="col-12 xl:col-6">
      <Card>
        <template #content>
          <DataTable
              :value="authList"
              :paginator="false"
              :rows="10"
              stripedRows
              data-key="authId"
              selectionMode="single"
              v-model:selection="selectedAuthItem"
              @row-select="selectedAuth"
          >
            <template #header>
              <div class="flex justify-content-between align-items-baseline">
                <InputGroup class="col-8">
                  <Button class="mr-2 col-4" style="height: 33px;" type="button" icon="pi pi-user-plus" label="Menu create" outlined @click="createMenuDialogOpen" />
                  <Button class="col-4" style="height: 33px;" type="button" icon="pi pi-user-plus" label="Function create" outlined />
                </InputGroup>

                <InputGroup class="col-4">
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
                <Tag :value="slotProps.data.authType" severity="info"/>
              </template>
            </Column>
            <Column field="regUser.name" header="reguser" style="min-width: 3rem" class="cursor-pointer"></Column>
            <Column field="createDate" header="create-date" style="min-width: 3rem"></Column>

            <template #footer>
              <Paginator v-model:first="first" :page="3" :page-link-size="5" :rows="pagingInfo.rows" :total-records="pagingInfo.total" :rows-per-page-options="[10, 20, 30]">
                <template #start>
                  <Button type="button" icon="pi pi-refresh" text />
                </template>
                <template #end>
                  <Button type="button" icon="pi pi-download" text />
                </template>
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
            <Button class="ml-2" label="Update" rounded @click="updateAuths"></Button>
          </div>
        </template>
      </Card>

      <Card v-if="selectCardItem == 'FUNC'">
        <template #title>
          <div class="inline-flex align-items-center justify-content-center">
            <span class="font-bold white-space-nowrap">Menus</span>
            <Button class="ml-2" label="Preview" rounded @click="changePreview"></Button>
          </div>
        </template>
        <template #content>
          <Tree v-model:selectionKeys="selectNode" :value="menuList" @node-select="nodeSelect" selection-mode="checkbox" class="w-full md:w-30rem"></Tree>
        </template>
        <template #footer>
          <div class="flex justify-content-end align-items-baseline">
            <Button class="ml-2" label="Update" rounded @click="updateAuths"></Button>
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
          <div>Function</div>
          <Tree :value="menuList" @node-select="nodeSelect" class="w-full md:w-30rem"></Tree>
        </template>
      </Card>
    </div>
  </div>

  <auth-create-dialog v-if="createMenuDialog" v-model:visible="createMenuDialog" :style="{width: '450px'}" :modal="true" class="p-fluid" :create-dialog="createMenuDialog" @on-create="onCreateMenuSuccess" @on-close="onCreateMenuClose"></auth-create-dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import {ref, getCurrentInstance, watch, onBeforeMount} from "vue";
import CBreadcrumb from "@/components/CBreadcrumb.vue";
import AuthCreateDialog from "@/views/auth/component/AuthMenuCreateDialog.vue";
import { AuthService } from "@/api/auth/AuthService.js";
import { MenuService } from "@/api/menu/MenuService.js";
import {useRoute} from "vue-router";
const route = useRoute();
import router from "@/router/index.js";
import { useToast } from "primevue/usetoast";
import AdminCreateDialog from "@/views/admin/component/AdminCreateDialog.vue";
const toast = useToast();
const { proxy } = getCurrentInstance();
const authService = new AuthService();
const menuService = new MenuService();

const authList = ref([]);
const menuList = ref([]);

const createMenuDialog = ref(false);
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
  menuService.getAllMenu().then((res) => {
    menuList.value = res.data;
  })
})

const nodeSelect = () => {
  console.log(selectNode.value);
}

const selectedAuth = () => {
  selectCardItem.value = selectedAuthItem.value.authType;
  updateMenuAuthName.value = selectedAuthItem.value.authName;

  let params = {
    authId: selectedAuthItem.value.authId
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

const changePreview = () => {
  selectCardItem.value = 'DEFAULT';
  selectedAuthItem.value = {};
}

const updateAuths = () => {
  if(!updateValidation()){
    return;
  }

  const sendData = {
    authId: selectedAuthItem.value.authId,
    menuKeys: Object.keys(selectNode.value)
  }

  authService.updateAuthAndMenu(sendData).then((res) => {
    console.log(res);
    if(!res.success){
      if(res.statusCode == 812){
        showBottomWarnRight('name이 중복되었습니다.');
      }
      return;
    }
    showBottomSuccessRight('업데이트가 완료되었습니다.');
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
    authList.value = res.data.itemList;

    first.value = (params.pageNum-1) * 10;
    pagingInfo.value.page = Number(params.pageNum);
    pagingInfo.value.rows = Number(params.pageRowCount);
    pagingInfo.value.total = res.data.itemTotalCnt;
  })
}

const onRefresh = () => {
  valueToRouteQuery(setRouterQuery({}));
}

const onPageClick = (pageInfo) => {
  valueToRouteQuery(setRouterQuery({
    page: pageInfo.page + 1,
    rows: pageInfo.rows,
    search: pageInfo.search,
  }));
}

const clickSearch = () => {
  valueToRouteQuery(setRouterQuery({
    search: searchText.value
  }));
}

const setRouterQuery = ({search="" ,page=1, rows=10}) => {
  return {
    search: proxy.$utils.getDefaultArgumentValue(search, route.query.search),
    page: proxy.$utils.getDefaultArgumentValue(page, route.query.page),
    rows: proxy.$utils.getDefaultArgumentValue(rows, route.query.rows),
  }
}

const createMenuDialogOpen = () => {
  createMenuDialog.value = true;
}

const onCreateMenuSuccess = () => {
  createMenuDialog.value = false;
  showBottomSuccessRight("auth 생성 완료되었습니다.");
  getAuths();
}

const onCreateMenuClose = () => {
  createMenuDialog.value = false;
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