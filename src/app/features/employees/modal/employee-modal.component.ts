import {Component, Inject} from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'employee-modal',
  templateUrl: './employee-modal.component.html',
})
export class EmployeeModal {
  constructor(
    public dialogRef: MatDialogRef<EmployeeModal>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}