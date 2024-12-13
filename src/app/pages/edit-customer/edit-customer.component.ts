import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ICustomer } from '../../interfaces/customer';
import { ConfirmDeleteComponent } from '../../confirm-delete';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css'],
  standalone: false,
})
export class EditCustomerComponent implements OnInit {
  customerFormGroup!: FormGroup;
  loading = true;
  isSubmitting = false;
  customerId!: number;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.createCustomerForm();
    this.customerId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomerData();
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

  loadCustomerData() {
    this.customerService.getCustomer(this.customerId).subscribe({
      next: (customer: ICustomer) => {
        this.customerFormGroup.patchValue(customer);
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading customer data: ' + error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loading = false;
      }
    });
  }

  onSubmit() {
    this.isSubmitting = true;
    const updatedCustomer = { ...this.customerFormGroup.value, id: this.customerId };
    
    this.customerService.updateCustomer(updatedCustomer).subscribe({
      next: () => {
        this.snackBar.open('Customer updated successfully', 'Close', {
          duration: 3000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.router.navigate(['/customer']);
      },
      error: (error) => {
        this.snackBar.open('Error updating customer: ' + error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.isSubmitting = false;
      }
    });
  }
  onDelete() {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete this customer?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.customerService.deleteCustomer(this.customerId).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.router.navigate(['/customer']);
          },
          error: (error) => {
            this.snackBar.open('Error deleting customer: ' + error.message, 'Close', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
          }
        });
      }
    });
  }
}
