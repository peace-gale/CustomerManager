import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ICustomer } from '../interfaces/customer';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-search-customer',
  templateUrl: './search-customer.component.html',
  styleUrls: ['./search-customer.component.css'],
  standalone: false,
})
export class SearchCustomerComponent {
  searchControl = new FormControl('');
  @Output() searchResults = new EventEmitter<ICustomer[]>();
  customers: ICustomer[] = [];

  constructor(private customerService: CustomerService) {
    this.setupSearch();
  }

  setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      if (searchTerm) {
        this.searchCustomers(searchTerm);
      } else {
        this.loadAllCustomers();
      }
    });

    this.loadAllCustomers();
  }

  private loadAllCustomers() {
    this.customerService.getCustomers().subscribe(customers => {
      this.customers = customers;
      this.searchResults.emit(customers);
    });
  }

  private searchCustomers(searchTerm: string) {
    const term = searchTerm.toLowerCase();
    const filteredCustomers = this.customers.filter(customer => 
      customer.name.toLowerCase().includes(term) ||
      customer.email.toLowerCase().includes(term) ||
      customer.phone.toLowerCase().includes(term)
    );
    this.searchResults.emit(filteredCustomers);
  }
}
