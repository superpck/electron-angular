import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-tailwind-examples',
  imports: [MatCardModule, MatIconModule],
  templateUrl: './tailwind-examples.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TailwindExamples {
  protected readonly colors = [
    { name: 'Red', class: 'bg-red-500' },
    { name: 'Blue', class: 'bg-blue-500' },
    { name: 'Green', class: 'bg-green-500' },
    { name: 'Purple', class: 'bg-purple-500' },
    { name: 'Yellow', class: 'bg-yellow-500' },
  ];
}
