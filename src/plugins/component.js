import Card from "primevue/card";
import Breadcrumb from 'primevue/breadcrumb';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import Toast from 'primevue/toast';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Paginator from 'primevue/paginator';

export function addComponents(app) {
  app.component('Card', Card);
  app.component('Breadcrumb', Breadcrumb);
  app.component('InputGroup', InputGroup);
  app.component('InputGroupAddon', InputGroupAddon);
  app.component('InputText', InputText);
  app.component('Password', Password);
  app.component('Button', Button);
  app.component('DataTable', DataTable);
  app.component('Column', Column);
  app.component('Paginator', Paginator );
  app.component('Toast', Toast);
}