import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MaterialModule } from './sharedmodule/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './pages/create-customer/create-customer.component';
import { HttpClientModule } from '@angular/common/http';
import { ViewCustomerComponent } from './pages/view-customer/view-customer.component';
import { EditCustomerComponent } from './pages/edit-customer/edit-customer.component';
import { ConfirmDeleteComponent } from './confirm-delete';
import { SearchCustomerComponent } from './search-customer/search-customer.component';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    CreateCustomerComponent,
    ViewCustomerComponent,
    EditCustomerComponent,
    SearchCustomerComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    MatIconModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
