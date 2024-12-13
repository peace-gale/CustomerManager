import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <div class="dialog-container">
      <h2 mat-dialog-title class="dialog-title">{{data.title}}</h2>
      <mat-dialog-content class="dialog-content">{{data.message}}</mat-dialog-content>
      <mat-dialog-actions align="end" class="dialog-actions">
        <button mat-button [mat-dialog-close]="false">Cancel</button>
        <button mat-raised-button color="warn" [mat-dialog-close]="true">Delete</button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .dialog-container {
      padding: 24px;
      background: white;
      border-radius: 8px;
    }
    .dialog-title {
      color: #0A2463;
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 16px 0;
    }
    .dialog-content {
      color: #333333;
      font-size: 16px;
      margin-bottom: 24px;
    }
    .dialog-actions {
      padding: 0;
      margin: 0;
      gap: 16px;
    }
  `],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule
  ]
})
export class ConfirmDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {title: string; message: string}
  ) {}
} 