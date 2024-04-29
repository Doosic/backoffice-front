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
              data-key="contentId"
              stripedRows
              selectionMode="single"
          >
            <template #header>
              <div class="flex justify-content-between align-items-baseline">
                <Button class="mr-2 col-3" style="height: 33px;" type="button" icon="pi pi-user-plus" label="Menu create" outlined />
                <Button class="col-3" style="height: 33px;" type="button" icon="pi pi-user-plus" label="Auth create" outlined />
                <InputGroup class="col-4">
                  <InputGroupAddon>
                    <i class="pi pi-search cursor-pointer" />
                  </InputGroupAddon>
                  <InputText v-model="searchText" placeholder="Keyword Search" />
                </InputGroup>
              </div>
            </template>
            <template #empty> No contents found. </template>

            <Column field="email" style="min-width: 3rem"></Column>
            <Column field="name" style="min-width: 3rem" class="cursor-pointer"></Column>
            <Column field="status" style="min-width: 3rem" class="cursor-pointer"></Column>
            <Column field="createDate" style="min-width: 3rem"></Column>

            <template #footer>
              <Paginator v-model:first="first" :page="3" :page-link-size="5" :rows="5" :total-records="10" :rows-per-page-options="[10, 20, 30]">
                <template #start>
                  <Button type="button" icon="pi pi-refresh" text />
                </template>
                <template #end>
                  <Button type="button" icon="pi pi-download" text  />
                </template>
              </Paginator>
            </template>

          </DataTable>
        </template>
      </Card>
    </div>

    <div class="col-12 xl:col-6">
      <Card>

      </Card>
    </div>
  </div>
</template>

<script setup>
import {ref} from "vue";
import CBreadcrumb from "@/components/CBreadcrumb.vue";

const authList = ref([]);
const searchText = ref('');
const first = ref(0);

const cBreadHome = ref({
  icon: 'pi pi-home'
});

const cBreadItems = ref([
  { label: 'Admin' },
  { label: 'AuthList' }
]);
</script>

<style scoped>

</style>