import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-blank',
  imports: [MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './blank.html',
  styleUrl: './blank.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blank {}
