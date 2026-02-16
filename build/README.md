# Build Icons Directory

This directory is used for build resources.

## Application Icon

The application icon is located at: **`public/assets/images/logo1.png`**

Electron Builder will automatically convert this PNG file to the appropriate format for each platform:
- **macOS**: Converts to .icns format
- **Windows**: Converts to .ico format
- **Linux**: Uses PNG directly

## Icon Requirements

For best results, ensure `public/assets/images/logo1.png` meets these requirements:
- **Minimum size**: 512x512 pixels
- **Recommended size**: 1024x1024 pixels
- **Format**: PNG with transparency
- **Aspect ratio**: Square (1:1)

## Updating the Icon

To use a different icon:
1. Replace `public/assets/images/logo1.png` with your new icon
2. Ensure it meets the size requirements above
3. Run the build command again

No additional icon conversion tools are needed - Electron Builder handles this automatically!
