import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  standalone: false,
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  customerFormGroup!: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.createCustomerForm();
  }

  createCustomerForm() {
    this.customerFormGroup = this.formBuilder.group({
      id: [''],
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      website: [''],
      address: this.formBuilder.group({
        suite: [''],
        street: [''],
        city: [''],
        zipcode: [''],
        geo: this.formBuilder.group({
          lat: [''],
          lng: ['']
        })
      }),
      company: this.formBuilder.group({
        name: [''],
        catchPhrase: [''],
        bs: ['']
      })
    });
  }

  submitForm() {
    if (this.isSubmitting) return;
    
    this.isSubmitting = true;
    const customerData = this.customerFormGroup.value;
    
    this.customerService.createCustomer(customerData).subscribe({
      next: () => {
        this.snackBar.open('Customer created successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.snackBar.open('Error creating customer: ' + error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isSubmitting = false;
      }
    });
  }
}
