import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user-detail-dialog',
  imports: [DatePipe, MatButtonModule, MatChipsModule, MatDialogModule, MatDividerModule, MatIconModule],
  templateUrl: './user-detail-dialog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserDetailDialog {
  protected readonly user = inject<User>(MAT_DIALOG_DATA);
  protected readonly dialogRef = inject(MatDialogRef<UserDetailDialog>);

  protected get fullName(): string {
    return `${this.user.name.title} ${this.user.name.first} ${this.user.name.last}`;
  }

  protected get fullAddress(): string {
    const { street, city, state, country, postcode } = this.user.location;
    return `${street.number} ${street.name}, ${city}, ${state} ${postcode}, ${country}`;
  }
}
