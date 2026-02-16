import { Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatChipsModule } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  imports: [
    RouterLink,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatChipsModule,
    MatInputModule,
    MatFormFieldModule,
    MatSnackBarModule,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  protected readonly title = signal('Electron + Angular + Material + Tailwind');
  protected readonly features = signal([
    {
      icon: 'bolt',
      title: 'Lightning Fast',
      description: 'Built with Angular 21 and modern build tools for optimal performance',
    },
    {
      icon: 'palette',
      title: 'Beautiful UI',
      description: 'Combines Tailwind CSS utilities with Material Design components',
    },
    {
      icon: 'devices',
      title: 'Cross Platform',
      description: 'Desktop apps for Windows, macOS, and Linux with Electron',
    },
    {
      icon: 'code',
      title: 'Developer Friendly',
      description: 'TypeScript, hot reload, and modern tooling out of the box',
    },
  ]);

  protected readonly signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(private snackBar: MatSnackBar) {}

  onQuickSignup(): void {
    if (this.signupForm.valid) {
      this.snackBar.open('Thank you for signing up! Check your email for confirmation.', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: ['success-snackbar'],
      });
      this.signupForm.reset();
    }
  }
}
