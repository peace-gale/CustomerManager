import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer } from '../interfaces/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  //  View all customers
  getCustomers(): Observable<ICustomer[]> {
    return this.httpClient.get<ICustomer[]>("https://jsonplaceholder.typicode.com/users")
  }
  //  Create a customer
  createCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.httpClient.post<ICustomer>("https://jsonplaceholder.typicode.com/users", customer)
  }
  //  Edit a customer
  //   editCustomer(customer: ICustomer ): Observable<ICustomer>{
  //     return this.httpClient.put<ICustomer>(`https://jsonplaceholder.typicode.com/users/${customer.id}`, customer)
  //   }
  // Add this method to src/app/services/customer.service.ts
  updateCustomer(customer: ICustomer): Observable<ICustomer> {
    return this.httpClient.put<ICustomer>(`https://jsonplaceholder.typicode.com/users/${customer.id}`, customer);
  }
  //  Delete a customer
  deleteCustomer(id: number): Observable<ICustomer> {
    return this.httpClient.delete<ICustomer>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }
  //   View a customer
  getCustomer(id: number): Observable<ICustomer> {
    return this.httpClient.get<ICustomer>(`https://jsonplaceholder.typicode.com/users/${id}`)
  }




}
