# DOM-PDF

English | [中文](./README.md)

## Overview

DOM-PDF is a lightweight online PDF viewer. This project wraps PDF.js with a web interface, enabling browser extensions (such as immersive translation tools) to work properly on PDF pages.

**Key Features:**
- Enables browser extensions on PDF pages (default `file://` protocol blocks extensions)
- IndexedDB-based local storage with automatic restoration of last viewed PDF

## Tech Stack

- **Framework**: React 19 + TypeScript
- **PDF Rendering**: PDF.js
- **Build Tool**: Vite + Rolldown
- **Storage**: IndexedDB

## Guide

### Usage Instructions

1. **Upload PDF**
   - Open the app, click the dashed area or drag-and-drop a PDF file
   - After selecting a file, the filename and size will be displayed
   - Click the "View PDF" button to view

2. **View PDF**
   - PDF will be rendered via PDF.js viewer
   - Supports all standard PDF.js features (zoom, pagination, search, etc.)
   - **Browser extensions work normally on this page**

3. **Close PDF**
   - Click the white breathing light in the top-left corner
   - Select "Remove" in the confirmation dialog
   - Returns to file upload interface

4. **Auto Restoration**
   - After refreshing the page, the last viewed PDF will be automatically restored
   - PDF persists even after closing and reopening the browser

## Browser Compatibility

- Chrome/Edge: ✅ Fully supported
- Firefox: ✅ Fully supported  
- Safari: ✅ Fully supported (requires iOS 15+ / macOS 12+)

## License

MIT
