# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.3] - 2026-02-20

`subVersion: 2026.02.20-1`

### Added

#### Dark / Light Mode
- **ThemeService** (`src/app/services/theme.service.ts`) — singleton service managing global theme state via `isDark` signal
- Toggles `.dark` class on `<html>` element; change is reflected in both Angular Material (`color-scheme`) and Tailwind CSS (`dark:` variant)
- Theme persisted to `localStorage` under the key `theme`; restored automatically on app load
- `@custom-variant dark (&:where(.dark, .dark *))` configured in `styles.scss` for Tailwind v4 dark variant
- `html { color-scheme: light }` / `html.dark { color-scheme: dark }` added to `material-theme.scss` for Material Design 3 dark colours
- All page templates (`home`, `users`, `examples`, `material-examples`, `tailwind-examples`, `user-detail-dialog`, `login`, `signup`, `blank`) updated with `dark:` Tailwind utility classes
- `mat-slide-toggle` in the sidenav footer switches between Light mode and Dark mode; icon and label update reactively

#### Top Bar Toggle
- `mat-slide-toggle` in the sidenav footer toggles the top navigation bar (`<mat-toolbar>`) visibility
- `topnavVisible` signal initialised from `localStorage` key `topnavVisible`; changes persisted via `effect()`
- When the top bar is hidden a **floating FAB-style menu button** (fixed, top-left) is rendered so the sidenav can still be opened; button background and icon colour follow the active theme

---

## [1.0.2] - 2026-02-19

`subVersion: 2026.02.19-3`

### Added

#### User Detail Modal
- Clicking a user card or table row opens a **Material dialog** (`UserDetailDialog`) with full user details
- Dialog content organised into 4 sections: **Contact** (email, phone, cell), **Personal** (DOB, gender, nationality), **Location** (full address), **Account** (username, registered date)
- Large avatar displayed in dialog header alongside full name (with title), gender/age, and nationality chip
- `User` interface extended with `login.username` and `registered` fields

#### Dialog Backdrop & Scroll Lock
- Custom `dialog-freeze-backdrop` class applies `backdrop-filter: blur(4px)` and dark semi-transparent overlay when dialog is open
- **Background scroll locked** on `mat-sidenav-content` (`.layout-sidenav-content`) via `dialog-scroll-lock` CSS class added on open and removed on `afterClosed()` — works correctly with Angular Material's sidenav scroll container

---

## [1.0.1] - 2026-02-19

`subVersion: 2026.02.19-2`

### Added

#### Users Page
- **UserService** (`src/app/services/user.service.ts`) — fetches 100 users from [randomuser.me](https://randomuser.me/) with full TypeScript interfaces (`User`, `UserName`, `UserPicture`, `UserLocation`)
- **Users component** (`src/app/users/`) — standalone, OnPush
  - Real-time search by name, email, city, or country with clear button
  - **Card / Table view toggle** (`mat-button-toggle-group`) — persists during search
  - **Card view**: responsive auto-fill grid (min 300 px), avatar, name, gender/age, email, phone, location, nationality chip
  - **Table view**: `MatTableDataSource` with sticky header; columns — avatar, name, email, phone, location, nat
  - **Pagination** (table view only): `MatPaginator` with page sizes 10 / 25 / 50, first/last buttons; resets to page 1 on search change
  - Loading spinner, error state with Retry, empty search result state
  - Credit link to [randomuser.me](https://randomuser.me/) shown below data
- Route `/users` added inside Layout children
- **Users** nav item (`group` icon) added to sidenav
- `provideHttpClient()` registered in `app.config.ts`
- `'users'` label added to breadcrumb `labelMap`

#### Breadcrumb Navigation
- Auto-generated breadcrumb bar displayed on all layout pages except Home
- Resolves URL segments using a `labelMap` in `layout.ts`; supports `/examples`, `/examples/material`, `/examples/tailwind`, `/blank`, `/users`
- First item is always a Home link with a `home` icon; last item is rendered as plain text (not a link)
- Updates reactively via `currentUrl` signal on every `NavigationEnd` event

#### Chat Panel
- Chat icon button (`chat`) added to the top-right of the navigation bar; highlights when the panel is open
- **Right-side drawer** (`<mat-sidenav position="end">`, 360 px, `over` mode) — accessible from any page
- Chat UI features:
  - Scrollable message list with empty-state illustration
  - User bubbles (indigo, right-aligned) and bot bubbles (white, left-aligned) with timestamps
  - `<mat-form-field>` text input; send on **Enter** key or Send button (disabled when empty)
  - Auto-scroll to latest message after each send/reply
  - Placeholder bot reply after 600 ms (ready for AI integration)

#### Blank Page Template
- New `Blank` component (`src/app/blank/`) — standalone, OnPush scaffold with two Material card sections
- Route `/blank` added inside Layout children in `app.routes.ts`
- **Blank Page** nav item added to sidenav (after divider, before Docs)

#### Sidenav Behaviour on Home
- Sidenav is **hidden by default** when navigating to `/`
- Hamburger menu button is visible on **all screen sizes** on the Home page so users can show the sidenav manually
- Navigating to any other route automatically re-opens the sidenav on `lg+` screens

---

## [1.0.0] - 2026-02-19

### Added

#### Home Page
- **Hero section** — animated badge, large gradient headline, descriptive subtitle, and three CTA buttons (Get Started → `/signup`, View Examples → `/examples`, View Demo)
- **Tech stack chips** — Angular 21, Electron, Material 3, Tailwind 4, TypeScript displayed as `mat-chip` set
- **Features grid** — four animated `mat-card` tiles (Lightning Fast, Beautiful UI, Cross Platform, Developer Friendly) with gradient icon, title, and description
- **Inline Quick Signup form** — `ReactiveFormsModule` form with Full Name and Email fields (required / email validators), "Sign Up Free" submit button disabled when invalid, and `MatSnackBar` confirmation toast on success; "Already have an account? Sign in" link to `/login`
- **Get Started Today section** — three benefit tiles (Instant Setup, Cloud Ready, 24/7 Support)

#### Layout & Navigation
- **Layout component** (`src/app/layout/`) — shared shell wrapping all authenticated pages
  - **Top navigation bar** (`mat-toolbar`) with logo and Sign In button
  - **Responsive sidenav** (`mat-sidenav`) — `side` mode on `lg+`, `over` mode on smaller screens with hamburger toggle
  - **Sidenav footer** displaying app name and version from `configs/config.ts`
  - **Footer** with branding and links
- **Expandable sub-menu** for Examples in the sidenav with animated `chevron_right` icon

#### Routing
- `Layout` component added as parent route; `login` and `signup` routes remain outside (no layout)
- Sub-routes for examples:
  - `/examples` — combined overview (Material + Tailwind columns)
  - `/examples/material` — Material Design examples standalone page
  - `/examples/tailwind` — Tailwind CSS examples standalone page

#### Examples
- **MaterialExamples component** (`src/app/examples/material/`) — Material Buttons, Forms, Chips & Badges, Progress & Loading
- **TailwindExamples component** (`src/app/examples/tailwind/`) — Tailwind Buttons, Colors & Grid, Badges, Progress

#### Config
- `src/app/configs/config.ts` — centralised app configuration (`appName`, `version`, `subVersion`, `apiBaseUrl`)

### Changed

- **Home page** — removed inline `mat-toolbar` and `<footer>` (now provided by Layout)
- `home.ts` — removed `MatToolbarModule`, switched to `inject()` pattern, added `OnPush` change detection
- **Examples page** — split monolithic component into two focused sub-components (`MaterialExamples`, `TailwindExamples`); parent retains Interactive Examples card

### Refactored

- All new components use `ChangeDetectionStrategy.OnPush`
- Replaced constructor injection with `inject()` function throughout
- Removed `@HostBinding`/`@HostListener` usage in favour of `host` object bindings
