import { ChangeDetectionStrategy, Component, computed, effect, inject, signal, viewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { User, UserService } from '../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UserDetailDialog } from './user-detail-dialog/user-detail-dialog';

@Component({
  selector: 'app-users',
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatChipsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './users.html',
  styleUrl: './users.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Users {
  private readonly userService = inject(UserService);
  private readonly dialog = inject(MatDialog);
  private readonly document = inject(DOCUMENT);

  protected readonly loading = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly users = signal<User[]>([]);
  protected readonly viewMode = signal<'card' | 'table'>('card');
  protected readonly searchControl = new FormControl('');
  private readonly searchQuery = signal('');

  protected readonly tableColumns = ['avatar', 'name', 'email', 'phone', 'location', 'nat'];
  protected readonly tableDataSource = new MatTableDataSource<User>();
  private readonly paginator = viewChild(MatPaginator);

  protected readonly filteredUsers = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.users();
    return this.users().filter(
      u =>
        `${u.name.first} ${u.name.last}`.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.location.country.toLowerCase().includes(q) ||
        u.location.city.toLowerCase().includes(q),
    );
  });

  constructor() {
    this.searchControl.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(v => this.searchQuery.set(v ?? ''));

    // Sync filtered data → tableDataSource and reset to page 1 on filter change
    effect(() => {
      this.tableDataSource.data = this.filteredUsers();
      this.tableDataSource.paginator?.firstPage();
    });

    // Wire paginator once it appears in the DOM (table mode)
    effect(() => {
      const p = this.paginator();
      if (p) this.tableDataSource.paginator = p;
    });

    this.userService.getUsers().subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users. Please try again.');
        this.loading.set(false);
      },
    });
  }

  protected retry(): void {
    this.loading.set(true);
    this.error.set(null);
    this.userService.getUsers().subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('Failed to load users. Please try again.');
        this.loading.set(false);
      },
    });
  }

  protected fullName(user: User): string {
    return `${user.name.first} ${user.name.last}`;
  }

  protected openDetail(user: User): void {
    const scrollEl = this.document.querySelector<HTMLElement>('.layout-sidenav-content');
    scrollEl?.classList.add('dialog-scroll-lock');

    const ref = this.dialog.open(UserDetailDialog, {
      data: user,
      width: '520px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'user-detail-panel',
      backdropClass: 'dialog-freeze-backdrop',
    });

    ref.afterClosed().subscribe(() => {
      scrollEl?.classList.remove('dialog-scroll-lock');
    });
  }
}
