import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './pages/customer/customer.component';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';

const routes: Routes = [
{ path: "customer", component: CustomerComponent},
{ path: "", component: CustomerComponent},
{ path: "createcustomer", component: CreateCustomerComponent},
{path: "viewcustomer/:id", component:ViewCustomerComponent},
{ path: "edit-customer/:id", component: EditCustomerComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
