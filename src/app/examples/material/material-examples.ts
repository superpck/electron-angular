import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-material-examples',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatChipsModule,
    MatBadgeModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './material-examples.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaterialExamples {
  protected readonly emailControl = new FormControl('', [Validators.required, Validators.email]);
  protected readonly selectedFruit = signal('apple');
  protected readonly isToggled = signal(false);
  protected readonly progress = signal(65);
  protected readonly fruits = ['Apple', 'Banana', 'Orange', 'Mango', 'Strawberry'];

  getErrorMessage(): string {
    if (this.emailControl.hasError('required')) {
      return 'Email is required';
    }
    return this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }
}
