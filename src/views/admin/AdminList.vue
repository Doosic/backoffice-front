<template>
  <c-breadcrumb :home="cBreadHome" :items="cBreadItems" class="mb-3"></c-breadcrumb>

  <Card>
    <template #content>
      <DataTable
        :value="adminList"
        :paginator="false"
        :rows="10"
        data-key="contentId"
        stripedRows
      >
        <template #header>
          <div class="flex justify-content-between align-items-baseline w-full gap-2">
            <Button type="button" icon="pi pi-user-plus" label="Admin create" outlined @click="createAdminDialog()" />

            <InputGroup style="width: 350px;">
              <InputGroupAddon>
                <i class="pi pi-search cursor-pointer" @click="clickSearch"/>
              </InputGroupAddon>
              <InputText v-model="searchText" placeholder="Keyword Search" @keyup.enter="clickSearch"/>
            </InputGroup>
          </div>
        </template>
        <template #empty> No contents found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column field="email" header="email" style="min-width: 3rem"></Column>
        <Column field="name" header="name" style="min-width: 3rem" class="cursor-pointer"></Column>
        <Column field="status" header="status" style="min-width: 3rem" class="cursor-pointer"></Column>
        <Column field="createDate" header="create-date" style="min-width: 3rem"></Column>
        <Column :exportable="false" style="min-width:8rem">
          <template #body="slotProps">
            <Button @click="updateAdminDialog(slotProps.data)" icon="pi pi-pencil" outlined rounded class="mr-2" :disabled="slotProps.data.status != 'USE'"/>
            <Button @click="unlockAdminDialog(slotProps.data)" :icon="`pi ${slotProps.data.status == 'USE' ? 'pi-unlock' : 'pi-lock'}`" :severity="`${slotProps.data.status == 'USE' ? '' : 'danger'}`" outlined rounded  class="mr-2" :disabled="slotProps.data.status == 'USE'"/>
            <Button @click="deleteAdminDialog(slotProps.data)" icon="pi pi-trash" outlined rounded severity="danger"/>
          </template>
        </Column>

        <template #footer>
          <Paginator v-model:first="first" @Page="onPageClick" :page="3" :page-link-size="5" :rows="pagingInfo.rows" :total-records="pagingInfo.total" :rows-per-page-options="[10, 20, 30]">
          </Paginator>
        </template>

      </DataTable>
    </template>
  </Card>

  <admin-create-dialog v-if="createDialog" v-model:visible="createDialog" :style="{width: '450px'}" :modal="true" class="p-fluid" :create-dialog="createDialog" @on-create="onCreateSuccess" @on-close="onCreateClose"></admin-create-dialog>
  <admin-update-dialog v-if="updateDialog" v-model:visible="updateDialog" :admin-info="adminInfo" :style="{width: '450px'}" :modal="true" class="p-fluid" :update-dialog="updateDialog" @on-update="onUpdateSuccess" @on-close="onUpdateClose"></admin-update-dialog>
  <admin-delete-dialog v-if="deleteDialog" v-model:visible="deleteDialog" :admin-info="adminInfo" :style="{width: '450px'}" :modal="true" class="p-fluid" :delete-dialog="deleteDialog" @on-delete="onDeleteSuccess" @on-close="onDeleteClose"></admin-delete-dialog>
  <admin-un-lock-dialog v-if="unlockDialog" v-model:visible="unlockDialog" :admin-info="adminInfo" :style="{width: '450px'}" :modal="true" class="p-fluid" :unlock-dialog="unlockDialog" @on-unlock="onUnlockSuccess" @on-close="onUnlockClose"></admin-un-lock-dialog>

  <Toast position="bottom-right" group="br" />
</template>

<script setup>
import {ref, onBeforeMount, getCurrentInstance, watch} from "vue";
import CBreadcrumb from "@/components/CBreadcrumb.vue";
import AdminCreateDialog from "@/views/admin/component/AdminCreateDialog.vue";
import AdminUpdateDialog from "@/views/admin/component/AdminUpdateDialog.vue";
import AdminDeleteDialog from "@/views/admin/component/AdminDeleteDialog.vue";
import AdminUnLockDialog from "@/views/admin/component/AdminUnLockDialog.vue";
import { AdminService } from "@/api/admin/AdminService.js";
import {useRoute} from "vue-router";
const route = useRoute();
import router from "@/router/index.js";
import { useToast } from "primevue/usetoast";
const toast = useToast();
const { proxy } = getCurrentInstance();
const adminService = new AdminService();

const adminList = ref([]);
const searchText = ref('');
const first = ref(0);
const adminInfo = ref({});
const createDialog = ref(false);
const updateDialog = ref(false);
const deleteDialog = ref(false);
const unlockDialog = ref(false);

const cBreadHome = ref({
  icon: 'pi pi-home'
});

const cBreadItems = ref([
  { label: 'Admin' },
  { label: 'AdminList' }
]);

const pagingInfo = ref({
  rows : 10,
  total: 10,
  page: 1,
})

watch(() => route.query, (newValue, oldValue) =>  {
  getContents();
})

onBeforeMount(() => {
  getContents();
})

const getContents = () => {
  let params = {}
  params.text = route.query.search != undefined ? route.query.search : searchText.value;
  params.pageNum = route.query.page != undefined ? route.query.page : pagingInfo.value.page;
  params.pageRowCount = route.query.rows != undefined ? route.query.rows : pagingInfo.value.rows;

  adminService.getAdmins(params).then((res) => {
    if(!res.success){
      return;
    }
    adminList.value = res.data.itemList;

    first.value = (params.pageNum-1) * 10;
    pagingInfo.value.page = Number(params.pageNum);
    pagingInfo.value.rows = Number(params.pageRowCount);
    pagingInfo.value.total = res.data.itemTotalCnt;
  })
}

const downloadExcel = () => {
  console.log('엑셀자료 다운로드');
}

const onPageClick = (pageInfo) => {
  valueToRouteQuery({
    page: pageInfo.page + 1,
    rows: pageInfo.rows,
    search: pageInfo.search,
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

const createAdminDialog = () => {
  createDialog.value = true;
}
const updateAdminDialog = (propsData) => {
  adminInfo.value = propsData;
  updateDialog.value = true;
}
const deleteAdminDialog = (propsData) => {
  adminInfo.value = propsData;
  deleteDialog.value = true;
}
const unlockAdminDialog = (propsData) => {
  adminInfo.value = propsData;
  unlockDialog.value = true;
}


const onCreateSuccess = () => {
  createDialog.value = false;
  showBottomSuccessRight("admin 생성 완료되었습니다.");
  getContents();
}
const onUpdateSuccess = () => {
  updateDialog.value = false;
  showBottomSuccessRight("admin 정보변경이 완료되었습니다.");
  getContents();
}
const onDeleteSuccess = () => {
  deleteDialog.value = false;
  showBottomSuccessRight("admin 삭제가 완료되었습니다.");
  getContents();
}
const onUnlockSuccess = () => {
  unlockDialog.value = false;
  showBottomSuccessRight("admin 잠금해제가 완료되었습니다.");
  getContents();
}

const onCreateClose = () => {
  createDialog.value = false;
}
const onUpdateClose = () => {
  updateDialog.value = false;
}
const onDeleteClose = () => {
  deleteDialog.value = false;
}
const onUnlockClose = () => {
  unlockDialog.value = false;
}
const showBottomSuccessRight = (detailMsg) => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: detailMsg, group: 'br', life: 3000 });
};
</script>

<style scoped>

</style>