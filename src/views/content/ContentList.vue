<template>
  <c-breadcrumb :home="cBreadHome" :items="cBreadItems" class="mb-3"></c-breadcrumb>

  <Card>
    <template #content>
      <DataTable
        :value="contentList"
        :paginator="false"
        :rows="10"
        data-key="contentId"
        stripedRows
      >
        <template #header>
          <div class="flex justify-content-end">
            <InputGroup class="col-3">
              <InputGroupAddon>
                <i class="pi pi-search cursor-pointer"/>
              </InputGroupAddon>
              <InputText v-model="searchText" placeholder="Keyword Search" />
            </InputGroup>
          </div>
        </template>
        <template #empty> No contents found. </template>
        <template #loading> Loading customers data. Please wait. </template>

        <Column field="createDate" header="createDate" style="min-width: 3rem"></Column>
        <Column field="title" header="title" style="min-width: 3rem" class="cursor-pointer"></Column>
        <Column field="user.nickName" header="username" style="min-width: 3rem"></Column>

        <template #footer>
          <Paginator v-model:first="first" @Page="onPageClick" :page="3" :page-link-size="5" :rows="pagingInfo.rows" :total-records="pagingInfo.total" :rows-per-page-options="[10, 20, 30]">
            <template #start>
              <Button type="button" icon="pi pi-refresh" text @click="onRefresh" />
            </template>
            <template #end>
              <Button type="button" icon="pi pi-download" text @click="downloadExcel" />
            </template>
          </Paginator>
        </template>

      </DataTable>
    </template>
  </Card>
</template>

<script setup>
import {ref, onBeforeMount, getCurrentInstance, watch} from "vue";
import CBreadcrumb from "@/components/CBreadcrumb.vue";
import { ContentService } from "@/api/content/ContentService.js";
import {useRoute} from "vue-router";
const route = useRoute();
import router from "@/router/index.js";
const { proxy } = getCurrentInstance();
const contentService = new ContentService();
const contentList = ref([]);
const searchText = ref('');
const first = ref(0);

const cBreadHome = ref({
  icon: 'pi pi-home'
});

const cBreadItems = ref([
  { label: 'Contents' },
  { label: 'ContentList' }
]);

const pagingInfo = ref({
  rows : 10,
  total: 100,
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

  contentService.getContents(params).then((res) => {
    if(!res.success){
      return;
    }
    contentList.value = res.data.itemList;

    first.value = (params.pageNum-1) * 10;
    pagingInfo.value.page = params.pageNum;
    pagingInfo.value.rows = params.pageRowCount;
    pagingInfo.value.total = res.data.itemTotalCnt;
  })
}

const onRefresh = () => {
  valueToRouteQuery(setRouterQuery({}));
}

const downloadExcel = () => {
  console.log('엑셀자료 다운로드');
}

const onPageClick = (pageInfo) => {
  valueToRouteQuery(setRouterQuery({
    page: pageInfo.page + 1,
    rows: pageInfo.rows,
    search: pageInfo.search,
  }));
}

const valueToRouteQuery = (query) => {
  try{
    router.push({path: '/content/list','query': query }).catch((e)=>{});
  }catch(e){}
}

const setRouterQuery = ({search="" ,page=1, rows=10}) => {
  return {
    search: proxy.$utils.getDefaultArgumentValue(search, route.query.search),
    page: proxy.$utils.getDefaultArgumentValue(page, route.query.page),
    rows: proxy.$utils.getDefaultArgumentValue(rows, route.query.rows),
  }
}
</script>

<style scoped>

</style>