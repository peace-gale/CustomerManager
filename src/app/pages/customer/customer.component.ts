import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { ICustomer } from '../../interfaces/customer';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDeleteComponent } from '../../confirm-delete';

@Component({
  selector: 'app-customer',
  standalone: false,
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  displayedColumns: string[] = ['id', 'name', 'phone', 'email', 'address', 'actions'];
  dataSource!: ICustomer[];
  loading = true;

  constructor(
    private customerService: CustomerService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers() {
    this.loading = true;
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.dataSource = customers;
        this.loading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading customers: ' + error.message, 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
        this.loading = false;
      }
    });
  }

  onEdit(id: number): void {
    this.router.navigate(['/edit-customer', id]);
  }

  onDelete(customer: ICustomer): void {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete customer "${customer.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.customerService.deleteCustomer(customer.id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.loadCustomers();
          },
          error: (error) => {
            this.snackBar.open('Error deleting customer: ' + error.message, 'Close', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.loading = false;
          }
        });
      }
    });
  }

  onSearchResults(customers: ICustomer[]) {
    this.dataSource = customers;
  }

  onViewCustomer(id: number): void {
    this.router.navigate(['/viewcustomer', id]);
  }

  deleteCustomer(id: number) {
    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Delete Customer',
        message: 'Are you sure you want to delete this customer?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loading = true;
        this.customerService.deleteCustomer(id).subscribe({
          next: () => {
            this.dataSource = this.dataSource.filter(customer => customer.id !== id);
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.loading = false;
          },
          error: (error) => {
            console.error('Error deleting customer:', error);
            this.snackBar.open('Error deleting customer', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.loading = false;
          }
        });
      }
    });
  }
}
