import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, signal, viewChild } from '@angular/core';
import config from '../configs/config';
import { Router, RouterLink, RouterLinkActive, RouterOutlet, NavigationEnd } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { filter } from 'rxjs/operators';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DatePipe } from '@angular/common';

export interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  time: Date;
}

@Component({
  selector: 'app-layout',
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    ReactiveFormsModule,
    DatePipe,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Layout {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly router = inject(Router);

  protected readonly isLargeScreen = signal(false);
  protected readonly sidenavOpened = signal(false);
  protected readonly examplesExpanded = signal(false);
  protected readonly chatOpened = signal(false);
  protected readonly chatMessages = signal<ChatMessage[]>([]);
  protected readonly chatInput = new FormControl('');
  protected readonly config = config;

  private readonly messagesEnd = viewChild<ElementRef>('messagesEnd');

  private readonly currentUrl = signal(this.router.url);

  protected readonly isHomePage = computed(() => this.currentUrl().split('?')[0] === '/');

  protected readonly breadcrumbs = computed(() => {
    const url = this.currentUrl().split('?')[0];
    const skipPaths = ['/', '/login', '/signup', ''];
    if (skipPaths.includes(url)) return [];

    const labelMap: Record<string, string> = {
      examples: 'Examples',
      material: 'Material',
      tailwind: 'Tailwind',
      blank: 'Blank Page',
      users: 'Users',
    };

    return url
      .split('/')
      .filter(Boolean)
      .reduce(
        (acc, seg) => {
          const path = (acc.at(-1)?.url ?? '') + '/' + seg;
          return [...acc, { label: labelMap[seg] ?? seg, url: path }];
        },
        [] as { label: string; url: string }[],
      );
  });

  constructor() {
    this.breakpointObserver.observe('(min-width: 1024px)').subscribe(result => {
      this.isLargeScreen.set(result.matches);
      // Only auto-open sidenav on large screen when NOT on home page
      this.sidenavOpened.set(result.matches && !this.isHomePage());
    });

    // Auto-expand Examples sub-menu when navigating to any /examples route
    this.router.events
      .pipe(filter((e): e is NavigationEnd => e instanceof NavigationEnd))
      .subscribe(e => {
        const isHome = e.urlAfterRedirects.split('?')[0] === '/';
        this.currentUrl.set(e.urlAfterRedirects);
        // Auto-manage sidenav on large screen based on route
        if (this.isLargeScreen()) {
          this.sidenavOpened.set(!isHome);
        } else if (isHome) {
          this.sidenavOpened.set(false);
        }
        if (e.urlAfterRedirects.startsWith('/examples')) {
          this.examplesExpanded.set(true);
        }
      });

    // Set initial state on load
    if (this.router.url.startsWith('/examples')) {
      this.examplesExpanded.set(true);
    }
  }

  protected toggleSidenav(): void {
    this.sidenavOpened.update(v => !v);
  }

  protected toggleChat(): void {
    this.chatOpened.update(v => !v);
  }

  protected sendMessage(): void {
    const text = this.chatInput.value?.trim();
    if (!text) return;
    this.chatMessages.update(msgs => [...msgs, { text, sender: 'user', time: new Date() }]);
    this.chatInput.setValue('');
    setTimeout(() => this.messagesEnd()?.nativeElement.scrollIntoView({ behavior: 'smooth' }));
    // Simulated bot reply
    setTimeout(() => {
      this.chatMessages.update(msgs => [
        ...msgs,
        { text: `You said: "${text}". (bot not yet connected)`, sender: 'bot', time: new Date() },
      ]);
      setTimeout(() => this.messagesEnd()?.nativeElement.scrollIntoView({ behavior: 'smooth' }));
    }, 600);
  }

  protected toggleExamples(): void {
    this.examplesExpanded.update(v => !v);
  }
}

