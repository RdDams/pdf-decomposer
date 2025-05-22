# pdf-decomposer

📚 Extract text and images (as buffers) from PDF files using native parsing and OCR with Tesseract.

## Features

- 📄 Extract raw text from PDFs (including OCR for scanned documents)
- 🖼️ Convert PDF pages to image buffers
- 🧠 Use Tesseract OCR for image-to-text extraction
- ⚡ Buffer-based API — easy to integrate in Node.js pipelines
- 🛠️ Built with TypeScript for better type safety

## Prerequisites

## 🛠 Installing Poppler

This package (`pdf-decomposer`) relies on **Poppler** command-line tools (`pdftotext`, `pdfimages`, `pdftoppm`) to extract content from PDF files. These tools must be installed on your system and accessible from the terminal.

---

### ✅ Ubuntu / Debian

```bash
sudo apt update
sudo apt install poppler-utils
```

### ✅ MacOS

```bash
brew install poppler
```

## Installation

```bash
npm install pdf-decomposer
```

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](./CONTRIBUTING.md) before submitting a pull request.

We are committed to fostering a welcoming and respectful environment for everyone. By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).
