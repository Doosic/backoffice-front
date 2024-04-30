import Card from "primevue/card";
import Breadcrumb from 'primevue/breadcrumb';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Column from "primevue/column";
import Paginator from 'primevue/paginator';
import Tag from "primevue/tag";
import Tree from "primevue/tree";

export function addComponents(app) {
  app.component('Card', Card);
  app.component('Breadcrumb', Breadcrumb);
  app.component('InputGroup', InputGroup);
  app.component('InputGroupAddon', InputGroupAddon);
  app.component('InputText', InputText);
  app.component('Password', Password);
  app.component('Button', Button);
  app.component('Dialog', Dialog);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Tag', Tag);
  app.component('Paginator', Paginator );
  app.component('Toast', Toast);
  app.component('Tree', Tree);
}