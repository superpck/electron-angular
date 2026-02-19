import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialExamples } from './material/material-examples';
import { TailwindExamples } from './tailwind/tailwind-examples';

@Component({
  selector: 'app-examples',
  imports: [
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
    MaterialExamples,
    TailwindExamples,
  ],
  templateUrl: './examples.html',
  styleUrl: './examples.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Examples {
  private readonly snackBar = inject(MatSnackBar);

  showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }
}
