# Electron Angular Starter

A modern desktop application starter template combining Electron, Angular 21, Material Design, and Tailwind CSS 4.

## Features

- ⚡ **Angular 21** - Latest Angular with standalone components and signals
- 🎨 **Material Design 3** - Beautiful Material UI components
- 🌈 **Tailwind CSS 4** - Utility-first CSS framework
- 🖥️ **Electron** - Cross-platform desktop app
- 📱 **Responsive** - Works on all screen sizes
- 🔒 **TypeScript** - Type-safe code
- 🎯 **Modern Tooling** - Hot reload, fast builds

## Getting Started

### Installation

```bash
# Install dependencies
npm install
```

## Development

### Web Development Mode

To start a local development server, run:

```bash
npm start
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`.

### Electron Development Mode

Run the app as an Electron desktop application:

```bash
# Terminal 1: Start Angular dev server
npm start

# Terminal 2: Start Electron (in a separate terminal)
npm run electron:dev
```

## Building for Production

### Build Web App Only

```bash
npm run build
```

Output will be in `dist/angular/browser/`

### Build Desktop Apps

Build for your current platform:

```bash
npm run electron:build
```

Build for specific platforms:

```bash
# macOS (DMG and ZIP)
npm run electron:build-mac

# Windows (NSIS installer and portable)
npm run electron:build-win

# Linux (AppImage and DEB)
npm run electron:build-linux
```

Built applications will be in the `release/` directory.

## Project Structure

```
electron-angular/
├── src/
│   ├── app/
│   │   ├── home/          # Landing page
│   │   ├── examples/      # Component examples
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── styles.scss        # Global styles
│   └── index.html         # Main HTML
├── public/
│   └── assets/
│       └── images/        # Application icons
├── electron-main.js       # Electron main process
├── preload.js            # Electron preload script
└── package.json          # Dependencies and scripts
```

## Available Scripts

- `npm start` - Start Angular dev server
- `npm run build` - Build Angular app for production
- `npm test` - Run tests
- `npm run electron` - Run Electron (requires built Angular app)
- `npm run electron:dev` - Run Electron in development mode
- `npm run electron:build` - Build desktop app for current platform
- `npm run electron:build-mac` - Build for macOS
- `npm run electron:build-win` - Build for Windows
- `npm run electron:build-linux` - Build for Linux

## Technologies

- [Angular 21](https://angular.dev) - Web framework
- [Electron](https://www.electronjs.org/) - Desktop framework
- [Material Design](https://material.angular.io/) - UI components
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Programming language

## Building Icons

The application icon is located at **`public/assets/images/logo1.png`**

Electron Builder automatically converts this PNG file to the appropriate format for each platform (ICNS for macOS, ICO for Windows, PNG for Linux).

### Icon Requirements:
- **Minimum size**: 512x512 pixels
- **Recommended size**: 1024x1024 pixels  
- **Format**: PNG with transparency
- **Aspect ratio**: Square (1:1)

To use a different icon, simply replace `public/assets/images/logo1.png` with your new icon file and rebuild.

## Code Scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

## Running Tests

To execute unit tests with Vitest:

```bash
npm test
```

## Additional Resources

- [Angular CLI Documentation](https://angular.dev/tools/cli)
- [Electron Documentation](https://www.electronjs.org/docs/latest)
- [Material Design Guidelines](https://m3.material.io/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

## Credits

This project was built with the assistance of [GitHub Copilot](https://github.com/features/copilot), an AI pair programmer that helped accelerate development and improve code quality.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

