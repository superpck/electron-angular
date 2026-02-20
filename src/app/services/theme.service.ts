import { effect, Injectable, signal } from '@angular/core';

const STORAGE_KEY = 'theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly isDark = signal<boolean>(this.#loadInitialTheme());

  constructor() {
    effect(() => {
      this.#applyTheme(this.isDark());
    });
  }

  toggle(): void {
    this.isDark.update(v => !v);
  }

  #loadInitialTheme(): boolean {
    if (typeof localStorage === 'undefined') return false;
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) return stored === 'dark';
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  #applyTheme(dark: boolean): void {
    if (typeof document === 'undefined') return;
    const html = document.documentElement;
    html.classList.toggle('dark', dark);
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light');
  }
}
