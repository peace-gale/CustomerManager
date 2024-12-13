import { Component, OnInit } from '@angular/core';
import { ICustomer } from '../../interfaces/customer';
import { ConfirmDeleteComponent } from '../../confirm-delete';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-customer',
  standalone: false,
  
  templateUrl: './view-customer.component.html',
  styleUrl: './view-customer.component.css'
})
export class ViewCustomerComponent implements OnInit {
  customer: ICustomer | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerService: CustomerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadCustomerDetails(id);
  }

  loadCustomerDetails(id: number): void {
    this.customerService.getCustomer(id).subscribe({
      next: (customer: ICustomer | null) => {
        this.customer = customer;
        this.loading = false;
      },
      error: (error: { message: string | null; }) => {
        this.error = error.message;
        this.loading = false;
        this.snackBar.open('Error loading customer details', 'Close', {
          duration: 5000,
          horizontalPosition: 'end',
          verticalPosition: 'top'
        });
      }
    });
  }

  onEdit(): void {
    if (this.customer) {
      this.router.navigate(['/edit-customer', this.customer.id]);
    }
  }

  onDelete(): void {
    if (!this.customer) return;

    const dialogRef = this.dialog.open(ConfirmDeleteComponent, {
      data: {
        title: 'Confirm Delete',
        message: `Are you sure you want to delete customer "${this.customer.name}"?`
      }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.customerService.deleteCustomer(this.customer!.id).subscribe({
          next: () => {
            this.snackBar.open('Customer deleted successfully', 'Close', {
              duration: 3000,
              horizontalPosition: 'end',
              verticalPosition: 'top'
            });
            this.router.navigate(['/customer']);
          },
          error: (error: { message: string; }) => {
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

