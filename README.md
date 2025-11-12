# DOM-PDF

[English](./README-en.md) | 中文

## 项目简介

DOM-PDF 是一个轻量级的 PDF 在线查看工具。本项目通过为 PDF.js 提供 Web 界面封装,使浏览器插件（如沉浸式翻译）能够在 PDF 页面中正常工作。

**核心特性:**
- 使 PDF 页面支持浏览器插件（默认的 `file://` 协议会阻止插件运行）
- 基于 IndexedDB 的本地存储,刷新后自动恢复上次查看的 PDF

## 技术栈

- **框架**: React 19 + TypeScript
- **PDF 渲染**: PDF.js
- **构建工具**: Vite + Rolldown
- **存储**: IndexedDB

## 指南

### 使用指南

1. **上传 PDF**
   - 打开应用,点击虚线框或直接拖拽 PDF 文件
   - 选择文件后,显示文件名和大小
   - 点击 "View PDF" 按钮查看

2. **查看 PDF**
   - PDF 将通过 PDF.js viewer 渲染
   - 支持所有标准 PDF.js 功能（缩放、翻页、搜索等）
   - **浏览器插件可在此页面正常工作**

3. **关闭 PDF**
   - 点击左上角白色呼吸灯
   - 在确认对话框中选择 "Remove"
   - 返回文件上传界面

4. **自动恢复**
   - 刷新页面后,上次查看的 PDF 会自动恢复
   - 关闭浏览器后重新打开,PDF 仍会保留

## 浏览器兼容性

- Chrome/Edge: ✅ 完全支持
- Firefox: ✅ 完全支持  
- Safari: ✅ 完全支持 (需 iOS 15+ / macOS 12+)

## 许可证

MIT
