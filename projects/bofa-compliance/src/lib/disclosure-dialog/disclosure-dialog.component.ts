import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

export interface DisclosureData {
  title: string;
  body: string;
}

/** The "please read this" modal legal requires before certain actions. */
@Component({
  selector: 'bofa-disclosure-dialog',
  templateUrl: './disclosure-dialog.component.html',
  styleUrls: ['./disclosure-dialog.component.scss'],
})
export class DisclosureDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DisclosureDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DisclosureData
  ) {}

  accept(): void {
    this.dialogRef.close(true);
  }

  decline(): void {
    this.dialogRef.close(false);
  }
}
